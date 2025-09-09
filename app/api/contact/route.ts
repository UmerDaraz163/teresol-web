import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  // 1. Load SMTP credentials from environment variables
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  const recipientEmail = process.env.CONTACT_FORM_RECIPIENT;

  // 2. Basic validation to ensure credentials are set
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !recipientEmail) {
    console.error('SMTP credentials or recipient email are not configured in environment variables.');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    // 3. Parse form data from the request
    const formData = await request.json();
    const { name, email, phone, company, service, message } = formData;

    // 4. Create a Nodemailer "transporter"
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // Use SSL for port 465
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    // 5. Define email content
    const subject = `New Teresol Inquiry: ${service || 'General Question'} from ${name}`;
    const submissionDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
    
    // 6. Send the email using the transporter
    await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`, // The "from" field will show the sender's name but use your email to send
      to: recipientEmail,
      replyTo: email, // When you reply, it goes to the user's actual email
      subject: subject,
      // ✅ Your HTML email template is now included here
      html: `
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f6;">
          <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
            
            <div style="background-color: #0d47a1; color: #ffffff; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h1 style="margin: 0; font-size: 24px;">New Teresol Website Inquiry</h1>
            </div>

            <div style="padding: 24px; color: #333;">
              <h2 style="font-size: 18px; color: #0d47a1; margin-top: 0;">Submission Details</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: bold; color: #555;">Sender Name:</td>
                  <td style="padding: 12px 0;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: bold; color: #555;">Company:</td>
                  <td style="padding: 12px 0;">${company || 'Not Provided'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: bold; color: #555;">Contact Email:</td>
                  <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #0d6efd; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: bold; color: #555;">Phone Number:</td>
                  <td style="padding: 12px 0;">${phone || 'Not Provided'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: bold; color: #555;">Service of Interest:</td>
                  <td style="padding: 12px 0;">${service || 'Not Specified'}</td>
                </tr>
              </table>

              <h2 style="font-size: 18px; color: #0d47a1; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 24px;">Message</h2>
              <div style="background-color: #f8f9fa; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.6;">
                <p style="margin: 0;">${message}</p>
              </div>
            </div>

            <div style="text-align: center; padding: 20px; font-size: 12px; color: #777; background-color: #f4f7f6; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0;">Submitted on: ${submissionDate} (PKT)</p>
              <p style="margin: 5px 0 0 0;">This is an automated notification from the Teresol website.</p>
            </div>
          </div>
        </body>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
  }
}
