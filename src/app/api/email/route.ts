import { NextResponse } from 'next/server';
import mailgun from 'mailgun-js';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message, location, messageDrag } = body;

  const apiKey = process.env.REACT_APP_MAILGUN_API_KEY || process.env.MAILGUN_API_KEY;
  const domain = process.env.REACT_APP_MAILGUN_DOMAIN || process.env.MAILGUN_DOMAIN;
  const recipient = process.env.REACT_APP_EMAIL_RECIPIENT || process.env.EMAIL_RECIPIENT;

  if (!apiKey || !domain || !recipient) {
    console.error('Missing Mailgun configuration');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  const mg = mailgun({
    apiKey,
    domain,
  });

  const emailData = {
    from: email,
    to: recipient,
    name: name,
    subject: `[JOB] You got a job!`,
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Preference to Work: ${location}</p>
           <p>Message Drag n' Drop: ${messageDrag}</p>
           <p>Message: ${message}</p>`,
  };

  try {
    await new Promise((resolve, reject) => {
      mg.messages().send(emailData, (error: any, body: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error in sending' }, { status: 500 });
  }
}
