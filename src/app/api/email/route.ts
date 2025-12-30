import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message, location, messageDrag } = body;

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.EMAIL_RECIPIENT;

  if (!apiKey || !recipient) {
    console.error('Missing Resend configuration:', { 
      hasApiKey: !!apiKey, 
      hasRecipient: !!recipient 
    });
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  console.log('Email request received from:', email);

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // You can customize this after verifying your domain
      to: recipient,
      replyTo: email,
      subject: `[Portfolio Contact] Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Preference to Work:</strong> ${location}</p>
        <p><strong>Drag & Drop Message:</strong> ${messageDrag}</p>
        <p><strong>Additional Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend error details:', JSON.stringify(error, null, 2));
      return NextResponse.json({ 
        message: 'Error sending email', 
        error: error.message || 'Unknown error' 
      }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error in sending' }, { status: 500 });
  }
}
