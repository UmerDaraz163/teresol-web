import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import pool from '@/lib/db'; // Assuming '@/lib/db' exports your connection pool

// Ensure the application form can be successfully parsed.
export const config = {
  api: {
    bodyParser: false,
  },
};

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

    // --- Core Required Fields (Common to both Internship and Full-Time) ---
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const rawJobId = formData.get('jobId') as string; // '0' for internships or actual ID
    const cvFile = formData.get('cv') as File | null;
    const isInternship = formData.get('isInternship') === '1';

    if (!name || !email || !jobTitle || !rawJobId || !cvFile) {
      return NextResponse.json({ error: 'Missing core required fields: name, email, job title, or CV.' }, { status: 400 });
    }

    // --- Full-Time Job Application Fields (May be null for Internship) ---
    // NOTE: 'candidate_name_cnic' field removed per schema update
    const father_spouse_name = formData.get('father_spouse_name') as string;
    const year_of_birth = formData.get('year_of_birth') as string;
    const address = formData.get('address') as string;
    const medical_illness = formData.get('any_medical_illness') as string; // Form field key is 'any_medical_illness'

    // Education
    const highest_degree = formData.get('highest_degree') as string;
    const degree_title = formData.get('degree_title') as string;
    const university_name = formData.get('university_name') as string;
    const degree_start_year = formData.get('degree_start_year') as string;
    const degree_completion_year = formData.get('degree_completion_year') as string;
    const future_study_plans = formData.get('future_study_plans') as string;

    // Professional & Financial
    const professional_exp_years = formData.get('professional_exp_years') as string;
    const current_company_name = formData.get('current_company_name') as string;
    const current_designation = formData.get('current_designation') as string;
    const current_salary = formData.get('current_salary') as string;
    const tenure_last_job = formData.get('tenure_last_job') as string;
    const reason_for_quitting = formData.get('reason_for_quitting') as string;
    const expected_salary = formData.get('expected_salary') as string;
    // Format date field for MySQL/MariaDB (input is YYYY-MM-DD)
    const earliest_join_date = formData.get('earliest_join_date') as string || null;
    const expected_stay_duration = formData.get('expected_stay_duration') as string;
    const willing_to_travel = formData.get('willing_to_travel') as string;

    // Other Details & Referral
    const field_of_interest = formData.get('field_of_interest') as string;
    const shortlisted_elsewhere = formData.get('shortlisted_elsewhere') as string;
    const other_org_name = formData.get('other_org_name') as string;
    const other_app_status = formData.get('other_app_status') as string;
    const heard_about_us = formData.get('heard_about_us') as string;
    const relative_at_teresol = formData.get('relative_at_teresol') as string;
    const referral_name = formData.get('referral_name') as string;
    const referral_contact = formData.get('referral_contact') as string;
    const candidate_notes = formData.get('candidate_notes') as string;


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

    // --- 5. Insert ALL fields into Database ---

    // Define the list of all columns, matching the provided schema
    const columns = [
      'job_id', 'name', 'email', 'phone', 'is_internship', 'cv_filename', 'internship_dept',
      'father_spouse_name', 'year_of_birth', 'address', 'any_medical_illness', // NOTE: 'any_medical_illness' used here
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
      father_spouse_name || null, year_of_birth ? parseInt(year_of_birth) : null, address || null, medical_illness || null, // Value for 'any_medical_illness'
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

    // --- 8. Enhanced Email Content for Full-Time Applications ---
    
    // Helper to format key details for the email body
    const applicationSummary = isInternship 
        ? `<p style="margin: 0 0 10px 0;"><strong>Internship Stream:</strong> ${internshipDept}</p>`
        : `
          <h3 style="margin-top: 25px; margin-bottom: 10px; font-size: 18px; color: #333;">Summary of Experience</h3>
          <p style="margin: 0 0 5px 0;"><strong>Total Experience:</strong> ${professional_exp_years || '0'} Years</p>
          <p style="margin: 0 0 5px 0;"><strong>Last Role/Company:</strong> ${current_designation || 'N/A'} at ${current_company_name || 'N/A'}</p>
          <p style="margin: 0 0 5px 0;"><strong>Current Salary:</strong> ${current_salary || 'Not Provided'}</p>
          <p style="margin: 0 0 10px 0;"><strong>Expected Salary:</strong> ${expected_salary || 'Not Provided'}</p>
          <p style="margin: 0 0 10px 0;"><strong>Earliest Joining:</strong> ${earliest_join_date || 'ASAP'}</p>
          <p style="margin: 0 0 10px 0;"><strong>Candidate Notes:</strong> ${candidate_notes || 'None'}</p>
        `;

    await transporter.sendMail({
      from: `"Teresol Careers" <${SMTP_USER}>`,
      to: recipientEmail,
      replyTo: `${name} <${email}>`,
      subject: `New Application: ${positionDisplay} from ${name}`,
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        
        <div style="background-color: ${isInternship ? '#ffc107' : '#007bff'}; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">${isInternship ? 'New Internship Application' : 'New Full-Time Application'}</h1>
        </div>

        <div style="padding: 30px;">
            <p style="font-size: 16px; margin-bottom: 20px;">
                A new application has been submitted through the Teresol Careers portal. All detailed information (including education history, employment records, and personal details) has been saved to the database.
            </p>

            <div style="border-left: 4px solid #007bff; background-color: #f8f9fa; padding: 15px; border-radius: 4px;">
                <h2 style="margin-top: 0; margin-bottom: 15px; font-size: 20px; color: #007bff;">
                    Applicant Details
                </h2>
                
                <p style="margin: 0 0 10px 0; font-size: 15px;">
                    <strong>Position Applied For:</strong> <span style="font-weight: bold; color: #212529;">${positionDisplay}</span>
                </p>
                <p style="margin: 0 0 10px 0; font-size: 15px;">
                    <strong>Applicant Name:</strong> ${name}
                </p>
                <p style="margin: 0 0 10px 0; font-size: 15px;">
                    <strong>Email:</strong> 
                    <a href="mailto:${email}" style="color: #007bff; text-decoration: none; font-weight: 500;">${email}</a>
                </p>
                <p style="margin: 0 0 0 0; font-size: 15px;">
                    <strong>Phone:</strong> ${phone || 'Not provided'}
                </p>
            </div>
            
            <div style="margin-top: 20px;">
                ${applicationSummary}
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 15px; color: #5cb85c; text-align: center; font-weight: bold;">
                <span style="font-size: 18px;">📄</span> The candidate's CV is attached to this email.
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
