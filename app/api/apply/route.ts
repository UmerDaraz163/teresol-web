import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  // 1. Load SMTP credentials and the new recipient email from environment variables
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  const recipientEmail = process.env.JOB_APPLICATION_RECIPIENT; // Using the new variable

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

    if (!name || !email || !jobTitle || !cvFile) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // 4. Create a buffer from the uploaded file
    const buffer = Buffer.from(await cvFile.arrayBuffer());

    // 5. Create the Nodemailer transporter (same as the contact form)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    // 6. Send the email with the attachment
    await transporter.sendMail({
      from: `"Teresol Careers" <${SMTP_USER}>`,
      to: recipientEmail,
      replyTo: `${name} <${email}>`,
      subject: `New Job Application: ${jobTitle} from ${name}`,
      html: `
        <h1>New Job Application</h1>
        <p><strong>Position:</strong> ${jobTitle}</p>
        <p><strong>Applicant Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr>
        <p>The applicant's CV is attached to this email.</p>
      `,
      // ✅ Nodemailer handles attachments seamlessly
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
