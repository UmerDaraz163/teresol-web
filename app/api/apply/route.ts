// app/api/apply/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const recipientEmail = 'umardraz555@gmail.com'; // Using your test email for now

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const cvFile = formData.get('cv') as File | null;

    if (!name || !email || !jobTitle || !cvFile) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const buffer = Buffer.from(await cvFile.arrayBuffer());

    const { data, error } = await resend.emails.send({
      from: 'Teresol Careers <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `New Job Application: ${jobTitle}`,
      
      // ✅ FIX: Format the replyTo field correctly
      replyTo: `${name} <${email}>`,
      
      html: `
        <h1>New Job Application</h1>
        <p><strong>Position:</strong> ${jobTitle}</p>
        <p><strong>Applicant Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p>The applicant's CV is attached to this email.</p>
      `,
      attachments: [
        {
          filename: cvFile.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      console.error({ error });
      return NextResponse.json({ error: 'Error sending email.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Application sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
