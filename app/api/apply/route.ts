// app/api/apply/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import pool from '@/lib/db'; // Assuming '@/lib/db' exports your connection pool

// Ensure the application form can be successfully parsed.
export const config = {
  api: {
    bodyParser: false,
  },
};

// --- HELPER DATA: Maps form fields to user-friendly labels ---
const FIELD_MAP: { [key: string]: string } = {
    // Core
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    jobTitle: 'Position Applied For',
    jobId: 'Job ID',
    // Personal
    father_spouse_name: "Father's/Spouse's Name",
    year_of_birth: 'Year of Birth',
    address: 'Full Address',
    any_medical_illness: 'Medical History',
    // Education
    highest_degree: 'Highest Degree',
    degree_title: 'Degree Title',
    university_name: 'University Name',
    degree_start_year: 'Degree Start Year',
    degree_completion_year: 'Degree Completion Year',
    future_study_plans: 'Future Study Plans',
    // Professional & Financial
    professional_exp_years: 'Total Professional Experience (Years)',
    current_company_name: 'Current/Last Company',
    current_designation: 'Current/Last Designation',
    current_salary: 'Current Salary',
    tenure_last_job: 'Tenure in Last Job',
    reason_for_quitting: 'Reason for Quitting',
    expected_salary: 'Expected Salary',
    earliest_join_date: 'Earliest Joining Date',
    expected_stay_duration: 'Expected Stay Duration (Years)',
    willing_to_travel: 'Willing to Travel',
    // Other Details & Referral
    field_of_interest: 'Field of Interest',
    shortlisted_elsewhere: 'Shortlisted Elsewhere',
    other_org_name: 'Other Organization Name',
    other_app_status: 'Other Application Status',
    heard_about_us: 'How Candidate Heard About Us',
    relative_at_teresol: 'Relative at Teresol',
    referral_name: 'Referral Name',
    referral_contact: 'Referral Contact',
    candidate_notes: 'Candidate Notes',
};

// Helper function to dynamically generate HTML table for non-null fields
function generateDetailsTable(formDataEntries: { key: string, value: string }[], isInternship: boolean) {
    let html = '';
    let sections: { [key: string]: { label: string, keys: string[] } } = {
        personal: { label: 'Personal Information', keys: ['father_spouse_name', 'year_of_birth', 'address', 'any_medical_illness'] },
        education: { label: 'Education Details', keys: ['highest_degree', 'degree_title', 'university_name', 'degree_start_year', 'degree_completion_year', 'future_study_plans'] },
        professional: { label: 'Professional & Financial Details', keys: ['professional_exp_years', 'current_company_name', 'current_designation', 'current_salary', 'tenure_last_job', 'reason_for_quitting', 'expected_salary', 'earliest_join_date', 'expected_stay_duration', 'willing_to_travel'] },
        other: { label: 'Other Information', keys: ['field_of_interest', 'shortlisted_elsewhere', 'other_org_name', 'other_app_status', 'heard_about_us', 'relative_at_teresol', 'referral_name', 'referral_contact', 'candidate_notes'] }
    };

    // If it's an internship, simplify the sections
    if (isInternship) {
        sections = {
            other: { label: 'Additional Information', keys: ['field_of_interest', 'heard_about_us', 'relative_at_teresol', 'referral_name', 'referral_contact', 'candidate_notes'] }
        };
    }

    const sectionKeys = Object.keys(sections);

    for (const sectionKey of sectionKeys) {
        const section = sections[sectionKey];
        const rows = formDataEntries
            .filter(entry => section.keys.includes(entry.key) && entry.value)
            .map(entry => `
                <tr>
                    <td style="padding: 8px 15px; border-bottom: 1px solid #eee; background-color: #fff; width: 40%; font-weight: 500;">${FIELD_MAP[entry.key] || entry.key}</td>
                    <td style="padding: 8px 15px; border-bottom: 1px solid #eee; background-color: #fff; width: 60%;">${entry.value}</td>
                </tr>
            `).join('');

        if (rows) {
            html += `
                <h3 style="margin-top: 30px; margin-bottom: 10px; font-size: 18px; color: #007bff; border-bottom: 2px solid #eee; padding-bottom: 5px;">
                    ${section.label}
                </h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #f1f1f1; border-radius: 4px;">
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            `;
        }
    }

    return html;
}

export async function POST(request: Request) {
  // 1. Load SMTP credentials and the new recipient email from environment variables
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  const recipientEmail = process.env.JOB_APPLICATION_RECIPIENT;

  // 2. Basic validation
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !recipientEmail) {
    console.error('SMTP credentials or recipient email for jobs are not configured.');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    // 3. Parse the multipart form data
    const formData = await request.formData();
    
    // --- FIX FOR TS2802 ERROR: Use Array.from to iterate over FormData entries ---
    const formFields: { [key: string]: string } = {};
    const formDataEntries: { key: string, value: string }[] = [];

    // Array.from is used to correctly iterate the FormData iterator
    Array.from(formData.entries()).forEach(([key, value]) => {
        // Only process string values and skip the control fields
        if (key !== 'cv' && key !== 'isInternship' && typeof value === 'string') {
            const trimmedValue = value.trim();
            formFields[key] = trimmedValue;
            // Only add to the list of displayed fields if it has a non-empty value
            if (trimmedValue) {
                formDataEntries.push({ key, value: trimmedValue });
            }
        }
    });


    // --- Core Required Fields (Must be re-extracted from formFields) ---
    const name = formFields.name;
    const email = formFields.email;
    const phone = formFields.phone;
    const jobTitle = formFields.jobTitle;
    const rawJobId = formFields.jobId; // '0' for internships or actual ID
    const cvFile = formData.get('cv') as File | null;
    const isInternship = formData.get('isInternship') === '1';

    if (!name || !email || !jobTitle || !rawJobId || !cvFile) {
      return NextResponse.json({ error: 'Missing core required fields: name, email, job title, or CV.' }, { status: 400 });
    }

    // --- Full-Time Job Application Fields (extracted from formFields) ---
    const father_spouse_name = formFields.father_spouse_name;
    const year_of_birth = formFields.year_of_birth;
    const address = formFields.address;
    const any_medical_illness = formFields.any_medical_illness;

    // Education
    const highest_degree = formFields.highest_degree;
    const degree_title = formFields.degree_title;
    const university_name = formFields.university_name;
    const degree_start_year = formFields.degree_start_year;
    const degree_completion_year = formFields.degree_completion_year;
    const future_study_plans = formFields.future_study_plans;

    // Professional & Financial
    const professional_exp_years = formFields.professional_exp_years;
    const current_company_name = formFields.current_company_name;
    const current_designation = formFields.current_designation;
    const current_salary = formFields.current_salary;
    const tenure_last_job = formFields.tenure_last_job;
    const reason_for_quitting = formFields.reason_for_quitting;
    const expected_salary = formFields.expected_salary;
    const earliest_join_date = formFields.earliest_join_date || null;
    const expected_stay_duration = formFields.expected_stay_duration;
    const willing_to_travel = formFields.willing_to_travel;

    // Other Details & Referral
    const field_of_interest = formFields.field_of_interest;
    const shortlisted_elsewhere = formFields.shortlisted_elsewhere;
    const other_org_name = formFields.other_org_name;
    const other_app_status = formFields.other_app_status;
    const heard_about_us = formFields.heard_about_us;
    const relative_at_teresol = formFields.relative_at_teresol;
    const referral_name = formFields.referral_name;
    const referral_contact = formFields.referral_contact;
    const candidate_notes = formFields.candidate_notes;


    // 4. Conditional DB Insertion Logic
    let dbJobId: string = rawJobId;
    let internshipDept: string | null = null;
    let positionDisplay: string;

    if (isInternship) {
      internshipDept = jobTitle;
      dbJobId = rawJobId; // which is '0'
      positionDisplay = jobTitle;
    } else {
      dbJobId = rawJobId;
      internshipDept = null;
      positionDisplay = jobTitle;
    }

    // --- 5. Insert ALL fields into Database (Query not changed) ---

    // Define the list of all columns
    const columns = [
      'job_id', 'name', 'email', 'phone', 'is_internship', 'cv_filename', 'internship_dept',
       'father_spouse_name', 'year_of_birth', 'address', 'any_medical_illness',
      'highest_degree', 'degree_title', 'university_name', 'degree_start_year', 'degree_completion_year', 'future_study_plans',
      'professional_exp_years', 'current_company_name', 'current_designation', 'current_salary', 'tenure_last_job', 'reason_for_quitting',
      'expected_salary', 'earliest_join_date', 'expected_stay_duration', 'willing_to_travel',
      'field_of_interest', 'shortlisted_elsewhere', 'other_org_name', 'other_app_status', 'heard_about_us', 'relative_at_teresol',
      'referral_name', 'referral_contact', 'candidate_notes',
      'created_at' // Last column
    ];
    
    // Define the list of all values (must match columns order)
    const values = [
      dbJobId, name, email, phone || null, isInternship ? 1 : 0, cvFile.name, internshipDept,
      // Personal Info
      father_spouse_name || null, year_of_birth ? parseInt(year_of_birth) : null, address || null, any_medical_illness || null,
      // Education
      highest_degree || null, degree_title || null, university_name || null, degree_start_year ? parseInt(degree_start_year) : null, degree_completion_year ? parseInt(degree_completion_year) : null, future_study_plans || null,
      // Professional & Financial
      professional_exp_years ? parseFloat(professional_exp_years) : 0, current_company_name || null, current_designation || null, current_salary || null, tenure_last_job || null, reason_for_quitting || null,
      expected_salary || null, earliest_join_date, expected_stay_duration || null, willing_to_travel || 'No',
      // Other Details & Referral
      field_of_interest || null, shortlisted_elsewhere || 'No', other_org_name || null, other_app_status || null, heard_about_us || null, relative_at_teresol || 'No',
      referral_name || null, referral_contact || null, candidate_notes || null,
      // Timestamp
      new Date(),
    ];

    // Create the placeholders string (?, ?, ?, ...)
    const placeholders = columns.map(() => '?').join(', ');
    const columnsString = columns.join(', ');

    // Execute the insertion query
    await pool.query(
      `INSERT INTO job_applications (${columnsString}) VALUES (${placeholders})`,
      values
    );

    // 6. Create a buffer from the uploaded file
    const buffer = Buffer.from(await cvFile.arrayBuffer());

    // 7. Create the Nodemailer transporter (same as the contact form)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    // --- 8. Generate Email Content (User-Friendly Design with Dynamic Fields) ---
    
    const detailsTableHTML = generateDetailsTable(formDataEntries, isInternship);

    await transporter.sendMail({
      from: `"Teresol Careers" <${SMTP_USER}>`,
      to: recipientEmail,
      replyTo: `${name} <${email}>`,
      subject: `New Application: ${positionDisplay} from ${name}`,
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        
        <div style="background-color: ${isInternship ? '#ffc107' : '#007bff'}; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">${isInternship ? 'New Internship Application' : 'New Full-Time Application'}</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">
                ${isInternship ? 'Stream:' : 'Position:'} ${positionDisplay}
            </p>
        </div>

        <div style="padding: 30px;">
            <p style="font-size: 16px; margin-bottom: 20px; border-bottom: 1px dashed #eee; padding-bottom: 15px;">
                A new application has been submitted through the Teresol Careers portal. All submitted details have been saved to the database.
            </p>

            <div style="border: 1px solid #007bff; background-color: #e6f0ff; padding: 15px; border-radius: 4px;">
                <h2 style="margin-top: 0; margin-bottom: 15px; font-size: 20px; color: #007bff; text-align: center;">
                    Core Applicant Details
                </h2>
                <table style="width: 100%; border-collapse: separate; border-spacing: 0 10px;">
                    <tbody>
                        <tr>
                            <td style="width: 40%; font-weight: bold; padding: 0;">Applicant Name:</td>
                            <td style="width: 60%; padding: 0;">${name}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 0;">Email:</td>
                            <td style="padding: 0;">
                                <a href="mailto:${email}" style="color: #0056b3; text-decoration: none; font-weight: 500;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 0;">Phone:</td>
                            <td style="padding: 0;">${phone || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 0;">Type:</td>
                            <td style="padding: 0;">${isInternship ? 'Internship' : 'Full-Time Employment'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            ${detailsTableHTML}

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 15px; color: #5cb85c; text-align: center; font-weight: bold;">
                <span style="font-size: 18px;">📄</span> The candidate's CV is attached to this email (File: ${cvFile.name}).
            </p>
        </div>

        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #6c757d;">
            This is an automated notification from the Teresol Careers system.
        </div>
    </div>
`,
      attachments: [
        {
          filename: cvFile.name,
          content: buffer,
          contentType: cvFile.type,
        },
      ],
    });

    return NextResponse.json({ message: 'Application sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error("Critical error during application submission:", error);
    return NextResponse.json({ error: 'Internal Server Error. Please check server logs.' }, { status: 500 });
  }
}