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
      from: 'Portfolio Contact <onboarding@resend.dev>', 
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
      
      let userMessage = 'Error sending email';
      if (error.message?.includes('verify a domain')) {
        userMessage = 'Email service configuration needed. Please contact the site owner.';
      }
      
      return NextResponse.json({ 
        message: userMessage, 
        error: error.message || 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      message: 'Error in sending',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
