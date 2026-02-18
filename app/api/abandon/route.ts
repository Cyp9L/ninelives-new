import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

  // Helper: only render a field row if value is defined and non-empty
  const f = (label: string, value: any): string => {
    if (value === undefined || value === null || value === '') return '';
    return `<div class="field"><span class="label">${label}:</span> <span class="value">${value}</span></div>`;
  };

  const animalName = data.name || 'Non nommé';
  const speciesEmoji = data.species === 'Chat' ? '🐱' : data.species === 'Chien' ? '🐶' : '🐾';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: #b91c1c; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header .animal-name { font-size: 20px; margin-top: 8px; font-weight: 300; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 6px; border-left: 4px solid #b91c1c; }
    .section h2 { margin-top: 0; color: #b91c1c; font-size: 18px; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; color: #4b5563; }
    .value { color: #1f2937; }
    .long-text { white-space: pre-wrap; background: #f9fafb; padding: 10px; border-radius: 4px; margin-top: 5px; }
    a { color: #b91c1c; text-decoration: none; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${speciesEmoji} Demande de prise en charge</h1>
    <div class="animal-name">${animalName} — ${data.species || 'Espèce non précisée'}</div>
  </div>

  <div class="content">

    <!-- COORDONNÉES -->
    <div class="section">
      <h2>👤 Coordonnées du demandeur</h2>
      ${f('Nom', data.lastName)}
      ${f('Prénom', data.firstName)}
      ${f('Email', data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : '')}
      ${f('Téléphone', data.phone ? `<a href="tel:${data.phone}">${data.phone}</a>` : '')}
      ${f('Adresse', data.address)}
    </div>

    <!-- ANIMAL - INFOS GÉNÉRALES -->
    <div class="section">
      <h2>${speciesEmoji} Informations sur l'animal</h2>
      ${f('Espèce', data.species)}
      ${f('Sexe', data.sex)}
      ${f('Nom', data.name)}
      ${f('Âge', data.age)}
      ${data.history ? `
        <div class="field"><span class="label">Son histoire:</span><div class="long-text">${data.history}</div></div>
      ` : ''}
      ${data.character ? `
        <div class="field"><span class="label">Son caractère:</span><div class="long-text">${data.character}</div></div>
      ` : ''}
      ${data.compatibility ? `
        <div class="field"><span class="label">Ententes (chats, chiens, enfants):</span><div class="long-text">${data.compatibility}</div></div>
      ` : ''}
      ${data.abandonReason ? `
        <div class="field"><span class="label">Raison de l'abandon / solutions testées:</span><div class="long-text">${data.abandonReason}</div></div>
      ` : ''}
    </div>

    <!-- ANIMAL - SANTÉ -->
    <div class="section">
      <h2>🏥 Santé</h2>
      ${data.sex === 'Mâle' ? f('Castré', data.isCastrated) : ''}
      ${data.sex === 'Femelle' ? f('Stérilisée', data.isSterilized) : ''}
      ${f('Identifié', data.isIdentified)}
      ${data.isIdentified === 'Oui' ? f('N° d\'identification / carte', data.identificationNumber) : ''}
      ${data.isIdentified === 'Je ne sais pas' ? '<div class="field" style="color:#92400e; background:#fef3c7; padding:8px; border-radius:4px;">⚠️ Le demandeur ne sait pas si l\'animal est identifié</div>' : ''}
      ${f('Vacciné', data.isVaccinated)}
      ${data.isVaccinated === 'Oui' ? `
        ${f('Maladies vaccinées', data.vaccineTypes)}
        ${f('Date derniers vaccins', data.lastVaccineDate)}
      ` : ''}
      ${data.species === 'Chat' ? `
        ${f('Testé FIV/FeLV', data.isTestedFIV)}
        ${data.isTestedFIV === 'Oui' ? `
          ${f('Date du test', data.fivTestDate)}
          ${f('Contact avec d\'autres chats depuis', data.contactSinceTest)}
        ` : ''}
      ` : ''}
      ${f('Prêt à mettre à jour sanitairement à ses frais', data.willingToPayHealth)}
      ${data.healthStatus ? `
        <div class="field"><span class="label">État de santé / maladies / blessures:</span><div class="long-text">${data.healthStatus}</div></div>
      ` : ''}
    </div>

  </div>
</body>
</html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Prise en charge Nine Lives <onboarding@resend.dev>',
      to: ['asso@ninelives.fr'],
      subject: `Prise en charge — ${data.species || 'Animal'}${data.name ? ` "${data.name}"` : ''} — ${data.firstName} ${data.lastName}`,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    console.log('Email sent successfully:', emailData);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
