import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml } from '@/lib/sanitize';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidImage(base64: string): boolean {
  try {
    const buffer = Buffer.from(base64, 'base64');
    if (buffer.length < 12) return false;

    const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    const isWebp =
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50;

    return isJpeg || isPng || isWebp;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const { images = [], ...data } = await request.json();

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

  // Helper: only render a field row if value is defined and non-empty
  const f = (label: string, value: unknown): string => {
    if (value === undefined || value === null || value === '') return '';
    return `<div class="field"><span class="label">${label}:</span> <span class="value">${value}</span></div>`;
  };

  const animalName = escapeHtml(data.name || 'Non nommé');
  const speciesEmoji = data.species === 'Chat' ? '🐱' : data.species === 'Chien' ? '🐶' : '🐾';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
      .header { background: #B11F29; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
      .header h1 { margin: 0; font-size: 24px; }
      .header .animal-name { font-size: 20px; margin-top: 8px; font-weight: 300; }
      .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
      .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 6px; border-left: 4px solid #B11F29; }
      .section h2 { margin-top: 0; color: #B11F29; font-size: 18px; }
      .field { margin-bottom: 10px; }
      .label { font-weight: bold; color: #4b5563; }
      .value { color: #1f2937; }
      .long-text { white-space: pre-wrap; background: #f9fafb; padding: 10px; border-radius: 4px; margin-top: 5px; }
      a { color: #B11F29; text-decoration: none; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${speciesEmoji} Demande de prise en charge</h1>
    <div class="animal-name">${animalName} — ${escapeHtml(data.species || 'Espèce non précisée')}</div>
  </div>

  <div class="content">

    <!-- COORDONNÉES -->
    <div class="section">
      <h2>👤 Coordonnées du demandeur</h2>
      ${f('Nom', escapeHtml(data.lastName))}
      ${f('Prénom', escapeHtml(data.firstName))}
      ${f('Email', data.email ? `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>` : '')}
      ${f('Téléphone', data.phone ? `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>` : '')}
      ${f('Adresse', escapeHtml(data.address))}
    </div>

    <!-- ANIMAL - INFOS GÉNÉRALES -->
    <div class="section">
      <h2>${speciesEmoji} Informations sur l'animal</h2>
      ${f('Espèce', escapeHtml(data.species))}
      ${f('Sexe', escapeHtml(data.sex))}
      ${f('Nom', escapeHtml(data.name))}
      ${f('Âge', escapeHtml(data.age))}
      ${data.history ? `
        <div class="field"><span class="label">Son histoire:</span><div class="long-text">${escapeHtml(data.history)}</div></div>
      ` : ''}
      ${data.character ? `
        <div class="field"><span class="label">Son caractère:</span><div class="long-text">${escapeHtml(data.character)}</div></div>
      ` : ''}
      ${data.compatibility ? `
        <div class="field"><span class="label">Ententes (chats, chiens, enfants):</span><div class="long-text">${escapeHtml(data.compatibility)}</div></div>
      ` : ''}
      ${data.abandonReason ? `
        <div class="field"><span class="label">Raison de l'abandon / solutions testées:</span><div class="long-text">${escapeHtml(data.abandonReason)}</div></div>
      ` : ''}
    </div>

    <!-- ANIMAL - SANTÉ -->
    <div class="section">
      <h2>🏥 Santé</h2>
      ${data.sex === 'Mâle' ? f('Castré', escapeHtml(data.isCastrated)) : ''}
      ${data.sex === 'Femelle' ? f('Stérilisée', escapeHtml(data.isSterilized)) : ''}
      ${f('Identifié', escapeHtml(data.isIdentified))}
      ${data.isIdentified === 'Oui' ? f('N° d\'identification / carte', escapeHtml(data.identificationNumber)) : ''}
      ${data.isIdentified === 'Je ne sais pas' ? '<div class="field" style="color:#92400e; background:#fef3c7; padding:8px; border-radius:4px;">⚠️ Le demandeur ne sait pas si l\'animal est identifié</div>' : ''}
      ${f('Vacciné', escapeHtml(data.isVaccinated))}
      ${data.isVaccinated === 'Oui' ? `
        ${f('Maladies vaccinées', escapeHtml(data.vaccineTypes))}
        ${f('Date derniers vaccins', escapeHtml(data.lastVaccineDate))}
      ` : ''}
      ${data.species === 'Chat' ? `
        ${f('Testé FIV/FeLV', escapeHtml(data.isTestedFIV))}
        ${data.isTestedFIV === 'Oui' ? `
          ${f('Date du test', escapeHtml(data.fivTestDate))}
          ${f('Contact avec d\'autres chats depuis', escapeHtml(data.contactSinceTest))}
        ` : ''}
      ` : ''}
      ${f('Prêt à mettre à jour sanitairement à ses frais', escapeHtml(data.willingToPayHealth))}
      ${data.healthStatus ? `
        <div class="field"><span class="label">État de santé / maladies / blessures:</span><div class="long-text">${escapeHtml(data.healthStatus)}</div></div>
      ` : ''}
    </div>

  </div>
</body>
</html>
  `;

  const validImages = images
    .slice(0, 3)
    .filter((img: { filename: string; data: string }) => (
      typeof img?.data === 'string' &&
      img.data.length < 1.5 * 1024 * 1024 &&
      isValidImage(img.data)
    ));

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Prise en charge Nine Lives <asso@ninelives.fr>',
      to: ['asso@ninelives.fr'],
      ...(data.email ? { cc: [data.email], reply_to: [data.email] } : {}),
      subject: `Prise en charge — ${data.species || 'Animal'}${data.name ? ` "${data.name}"` : ''} — ${data.firstName} ${data.lastName}`,
      html: htmlBody,
      attachments: validImages.map((img: { filename: string; data: string }) => ({
        filename: img.filename,
        content: Buffer.from(img.data, 'base64'),
      })),
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
