import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lead form on /for/remitian: notifies Francis so he can send the first look review personally.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function POST(request: Request) {
  let body: { email?: unknown; website?: unknown; page?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real visitors never fill the hidden "website" field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ message: 'ok' });
  }

  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ message: 'Please enter a valid email.' }, { status: 400 });
  }
  const page = typeof body.page === 'string' ? body.page.slice(0, 300) : '/for/remitian';

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.EMAIL_RECIPIENT;
  if (!apiKey || !recipient) {
    console.error('Missing Resend configuration for remitian-lead');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  const when = new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' });
  const ua = request.headers.get('user-agent') ?? '';

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: 'Remitian page <onboarding@resend.dev>',
      to: recipient,
      replyTo: email,
      subject: `[Remitian page] First look requested by ${email}`,
      html: `
        <h2>Someone asked for the first look review</h2>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>When:</strong> ${esc(when)} (Ottawa time)</p>
        <p><strong>Page:</strong> ${esc(page)}</p>
        <p><strong>Browser:</strong> ${esc(ua)}</p>
        <p>Reply to this email to send the review. Notes: ~/dev/remitian/notes/first-look-review.md</p>
      `,
    });
    if (error) {
      console.error('Resend error (remitian-lead):', error);
      return NextResponse.json({ message: 'Could not send. Please try again.' }, { status: 500 });
    }
    return NextResponse.json({ message: 'ok' });
  } catch (err) {
    console.error('Error sending remitian-lead email:', err);
    return NextResponse.json({ message: 'Could not send. Please try again.' }, { status: 500 });
  }
}
