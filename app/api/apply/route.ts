import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import  pool  from '@/lib/db';

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
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const cvFile = formData.get('cv') as File | null;

    // Retrieve fields sent from client component
    const rawJobId = formData.get('jobId') as string;
    // 🛑 FIX: Correctly interpret the '1' or '0' string as a boolean
    const isInternship = formData.get('isInternship') === '1'; 

    if (!name || !email || !jobTitle || !rawJobId || !cvFile) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // 4. Conditional DB Insertion Logic
    // dbJobId is initialized to rawJobId since rawJobId is always non-null ('0' or actual ID)
    let dbJobId: string = rawJobId; 
    let internshipDept: string | null = null;
    let positionDisplay: string;
    
    if (isInternship) {
        // If it's an internship, save the jobTitle (e.g., "Software Internship Application")
        // into the internship_dept column.
        internshipDept = jobTitle;
        // dbJobId remains rawJobId ('0') to satisfy the NOT NULL constraint.
        dbJobId = rawJobId; 
        positionDisplay = jobTitle;
    } else {
        // If it's a regular job, use the actual job ID and title.
        dbJobId = rawJobId; 
        internshipDept = null;
        positionDisplay = jobTitle;
    }

    // 5. Insert into Database
    await pool.query(
      `INSERT INTO job_applications (job_id, name, email, phone, is_internship, cv_filename, internship_dept, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [dbJobId, name, email, phone || null, isInternship ? 1 : 0, cvFile.name, internshipDept] 
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

    // 8. Send the email with the attachment (updated HTML for clarity)
    await transporter.sendMail({
      from: `"Teresol Careers" <${SMTP_USER}>`,
      to: recipientEmail,
      replyTo: `${name} <${email}>`,
      subject: `New Application: ${positionDisplay} from ${name}`, // Updated subject
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        
        <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">${isInternship ? 'New Internship Application' : 'New Job Application'}</h1>
        </div>

        <div style="padding: 30px;">
            <p style="font-size: 16px; margin-bottom: 20px;">
                A new application has been submitted through the Teresol Careers portal.
            </p>

            <div style="border-left: 4px solid #007bff; background-color: #f8f9fa; padding: 15px; border-radius: 4px;">
                <h2 style="margin-top: 0; margin-bottom: 15px; font-size: 20px; color: #007bff;">
                    Applicant Details
                </h2>
                
                <p style="margin: 0 0 10px 0; font-size: 15px;">
                    <strong>Position:</strong> <span style="font-weight: bold; color: #212529;">${positionDisplay}</span>
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
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
