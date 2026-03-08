import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml } from '@/lib/sanitize';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();

  if (data.honeypot) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Verify captcha
  const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: data.captchaToken,
    }),
  });
  const turnstileData = await turnstileRes.json();
  if (!turnstileData.success) {
    return NextResponse.json({ error: 'Captcha verification failed' }, { status: 400 });
  }
  const f = (label: string, value: any): string => {
    if (value === undefined || value === null || value === '') return '';
    return `<div class="field"><span class="label">${label}:</span> <span class="value">${value}</span></div>`;
  };

  const safeSubject = data.subject || 'Pas de sujet';
  const safeFirstName = escapeHtml(data.firstName);
  const safeLastName = escapeHtml(data.lastName);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = data.message ? escapeHtml(data.message) : '';
  const safeDonationNote = data.donationNote ? escapeHtml(data.donationNote) : '';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
<style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: #015768; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header .subject { font-size: 18px; margin-top: 8px; font-weight: 300; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 6px; border-left: 4px solid #009AB6; }
    .section h2 { margin-top: 0; color: #015768; font-size: 18px; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; color: #4b5563; }
    .value { color: #1f2937; }
    .long-text { white-space: pre-wrap; background: #f9fafb; padding: 10px; border-radius: 4px; margin-top: 5px; }
    a { color: #046C79; text-decoration: none; }
</style>
</head>
<body>
  <div class="header">
    <h1>📬 Nouveau message de contact</h1>
    <div class="subject">${escapeHtml(safeSubject)}</div>
  </div>

  <div class="content">

    <div class="section">
      <h2>👤 Expéditeur</h2>
      ${f('Prénom', safeFirstName)}
      ${f('Nom', safeLastName)}
      ${f('Email', data.email ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : '')}
    </div>

    <div class="section">
      <h2>💬 Message</h2>
      ${f('Sujet', escapeHtml(safeSubject))}
      ${data.message ? `<div class="field"><span class="label">Message:</span><div class="long-text">${safeMessage}</div></div>` : ''}
      ${data.donationNote ? `<div class="field"><span class="label">Note don (lieu de retrait):</span><div class="long-text">${safeDonationNote}</div></div>` : ''}
    </div>

  </div>
</body>
</html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Contact Nine Lives <asso@ninelives.fr>',
      to: ['asso@ninelives.fr'],
      reply_to: data.email,
      ...(data.email ? { cc: [data.email], reply_to: [data.email] } : {}),
      subject: `Contact — ${data.subject || 'Message'} — ${data.firstName} ${data.lastName}`,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    console.log('Email sent successfully:', emailData);
    return NextResponse.json({ success: true, message: "Message envoyé avec succès. Une copie vous a été envoyée par email." });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
