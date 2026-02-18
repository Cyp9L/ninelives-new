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

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: #f7a063; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .header .type { font-size: 14px; opacity: 0.9; margin-top: 5px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 6px; border-left: 4px solid #f7a063; }
    .section h2 { margin-top: 0; color: #f7a063; font-size: 18px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: bold; color: #4b5563; }
    .value { color: #1f2937; margin-left: 10px; }
    .list { margin: 10px 0; padding-left: 20px; }
    .list li { margin-bottom: 5px; }
    a { color: #f7a063; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .alert { background: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🙋‍♀️ Nouvelle candidature bénévole/FA</h1>
    <div class="type">${escapeHtml(data.volunteerType)}</div>
  </div>
  
  <div class="content">
    <div class="section">
      <h2>👤 Coordonnées</h2>
      <div class="field"><span class="label">Nom:</span><span class="value">${escapeHtml(data.lastName)}</span></div>
      <div class="field"><span class="label">Prénom:</span><span class="value">${escapeHtml(data.firstName)}</span></div>
      <div class="field"><span class="label">Âge:</span><span class="value">${escapeHtml(String(data.age))} ans</span></div>
      <div class="field"><span class="label">Email:</span><span class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span></div>
      <div class="field"><span class="label">Téléphone:</span><span class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></span></div>
      ${data.contactSlots ? `<div class="field"><span class="label">Créneaux:</span><span class="value">${escapeHtml(data.contactSlots)}</span></div>` : ''}
      <div class="field"><span class="label">Adresse:</span><span class="value">${escapeHtml(data.address)}, ${escapeHtml(data.postalCode)} ${escapeHtml(data.city)}</span></div>
    </div>

    ${(data.volunteerType === 'Famille d\'accueil' || data.volunteerType === 'Les deux') ? `
      <div class="section">
        <h2>🏠 Logement</h2>
        <div class="field"><span class="label">Superficie:</span><span class="value">${escapeHtml(String(data.surface))} m²</span></div>
        <div class="field"><span class="label">Type:</span><span class="value">${escapeHtml(data.housingType)}</span></div>
        <div class="field"><span class="label">Nombre de pièces:</span><span class="value">${escapeHtml(String(data.numRooms))}</span></div>
        ${data.floor ? `<div class="field"><span class="label">Étage:</span><span class="value">${escapeHtml(data.floor)}</span></div>` : ''}
        ${data.balconySecured ? `<div class="field"><span class="label">Balcon sécurisé:</span><span class="value">${escapeHtml(data.balconySecured)}</span></div>` : ''}
        ${data.balconySecuredHow ? `<div class="field"><span class="label">Comment:</span><span class="value">${escapeHtml(data.balconySecuredHow)}</span></div>` : ''}
        <div class="field"><span class="label">Extérieur:</span><span class="value">${escapeHtml(data.hasOutdoor)}</span></div>
        ${data.outdoorSecured ? `<div class="field"><span class="label">Extérieur sécurisé:</span><span class="value">${escapeHtml(data.outdoorSecured)}</span></div>` : ''}
        <div class="field"><span class="label">Peut faire quarantaines:</span><span class="value">${escapeHtml(data.canDoQuarantine)}</span></div>
        ${data.wantPitieSalpetriereQuarantine ? `<div class="field"><span class="label">Quarantaine Pitié-Salpêtrière:</span><span class="value">${escapeHtml(data.wantPitieSalpetriereQuarantine)}</span></div>` : ''}
        ${data.quarantineRoom ? `<div class="field"><span class="label">Pièce quarantaine:</span><span class="value">${escapeHtml(data.quarantineRoom)}</span></div>` : ''}
      </div>

      <div class="section">
        <h2>👨‍👩‍👧‍👦 Foyer</h2>
        <div class="field"><span class="label">Nombre de personnes:</span><span class="value">${escapeHtml(String(data.numPeopleHousehold))}</span></div>
        <div class="field"><span class="label">Enfants:</span><span class="value">${escapeHtml(data.hasChildren)}</span></div>
        ${data.childrenAges ? `<div class="field"><span class="label">Âges:</span><span class="value">${escapeHtml(data.childrenAges)}</span></div>` : ''}
        ${data.childrenUsedToAnimals ? `<div class="field"><span class="label">Habitués aux animaux:</span><span class="value">${escapeHtml(data.childrenUsedToAnimals)}</span></div>` : ''}
        <div class="field"><span class="label">Animaux à domicile:</span><span class="value">${escapeHtml(data.hasAnimalsHome)}</span></div>
        ${data.hasAnimalsHome === 'Oui' ? `
          <div class="field"><span class="label">Chiens:</span><span class="value">${escapeHtml(String(data.numDogs || 0))}</span></div>
          <div class="field"><span class="label">Chats:</span><span class="value">${escapeHtml(String(data.numCats || 0))}</span></div>
          <div class="field"><span class="label">Autres:</span><span class="value">${escapeHtml(String(data.numOthers || 0))}</span></div>
          <div class="field"><span class="label">Détails:</span><span class="value">${escapeHtml(data.animalsDetails)}</span></div>
          <div class="field"><span class="label">Où vivent-ils:</span><span class="value">${escapeHtml(data.animalsLocation)}</span></div>
          <div class="field">
            <span class="label">Statut:</span>
            <span class="value">
              ${data.animalsSterilized ? '✓ Stérilisés ' : ''}
              ${data.animalsIdentified ? '✓ Identifiés ' : ''}
              ${data.animalsVaccinated ? '✓ Vaccinés ' : ''}
              ${data.animalsTested ? '✓ Testés FIV/FeLV' : ''}
            </span>
          </div>
        ` : ''}
        <div class="field"><span class="label">Heures seul/jour:</span><span class="value">${escapeHtml(data.hoursAlonePerDay)}</span></div>
      </div>

      <div class="section">
        <h2>💭 Motivation</h2>
        <div class="field"><span class="label">Pourquoi FA:</span><span class="value">${escapeHtml(data.whyFoster)}</span></div>
        <div class="field"><span class="label">A déjà été FA:</span><span class="value">${escapeHtml(data.beenFosterBefore)}</span></div>
        ${data.fosterReferences ? `<div class="field"><span class="label">Références:</span><span class="value">${escapeHtml(data.fosterReferences)}</span></div>` : ''}
      </div>

      <div class="section">
        <h2>🐈 Expérience Chats</h2>
        <div class="field"><span class="label">Niveau:</span><span class="value">${escapeHtml(data.catExperience)}</span></div>
        ${data.catCarePractices.length > 0 ? `
          <div class="field">
            <span class="label">Soins pratiqués:</span>
            <ul class="list">
              ${data.catCarePractices.map((practice: string) => `<li>${escapeHtml(practice)}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${data.catCareOther ? `<div class="field"><span class="label">Autre:</span><span class="value">${escapeHtml(data.catCareOther)}</span></div>` : ''}
        <div class="field"><span class="label">Réaction chat caché:</span><span class="value">${escapeHtml(data.catHidingReaction)}</span></div>
        <div class="field"><span class="label">Réaction litière:</span><span class="value">${escapeHtml(data.catLitterIssueReaction)}</span></div>
        <div class="field"><span class="label">Dealbreakers:</span><span class="value">${escapeHtml(data.catDealbreakers)}</span></div>
        <div class="field"><span class="label">Nombre de chats possibles:</span><span class="value">${escapeHtml(String(data.numCatsCanFoster))}</span></div>
        ${data.catTypes.length > 0 ? `
          <div class="field">
            <span class="label">Types de chats:</span>
            <ul class="list">
              ${data.catTypes.map((type: string) => `<li>${escapeHtml(type)}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${data.fosterDuration.length > 0 ? `
          <div class="field">
            <span class="label">Durée d'accueil:</span>
            <ul class="list">
              ${data.fosterDuration.map((duration: string) => `<li>${escapeHtml(duration)}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${data.fosterDurationOther ? `<div class="field"><span class="label">Précision:</span><span class="value">${escapeHtml(data.fosterDurationOther)}</span></div>` : ''}
        <div class="field"><span class="label">Vacances prochaines:</span><span class="value">${escapeHtml(data.goingOnVacation)}</span></div>
        ${data.vacationDates ? `<div class="field"><span class="label">Dates:</span><span class="value">${escapeHtml(data.vacationDates)}</span></div>` : ''}
        ${data.vacationCare ? `<div class="field"><span class="label">Qui s'occupe:</span><span class="value">${escapeHtml(data.vacationCare)}</span></div>` : ''}
        <div class="field"><span class="label">Foyer d'accord:</span><span class="value">${escapeHtml(data.householdAgrees)}</span></div>
        ${data.householdAgrees === 'Non' ? `<div class="alert">⚠️ Le foyer n'est pas entièrement d'accord</div>` : ''}
      </div>

      <div class="section">
        <h2>💰 Alimentation & Matériel</h2>
        <div class="field"><span class="label">Plan alimentation:</span><span class="value">${escapeHtml(data.feedingPlan)}</span></div>
        <div class="field"><span class="label">Matériel disponible:</span><span class="value">${escapeHtml(data.hasEquipment)}</span></div>
        <div class="field"><span class="label">Vétérinaire associatif:</span><span class="value">${escapeHtml(data.hasAssociationVet)}</span></div>
        ${data.vetCastration ? `<div class="field"><span class="label">Tarif castration:</span><span class="value">${escapeHtml(data.vetCastration)}</span></div>` : ''}
        ${data.vetOvariectomy ? `<div class="field"><span class="label">Tarif ovariectomie:</span><span class="value">${escapeHtml(data.vetOvariectomy)}</span></div>` : ''}
        ${data.vetVaccination ? `<div class="field"><span class="label">Tarif vaccination:</span><span class="value">${escapeHtml(data.vetVaccination)}</span></div>` : ''}
        ${data.vetContact ? `<div class="field"><span class="label">Contact vétérinaire:</span><span class="value">${escapeHtml(data.vetContact)}</span></div>` : ''}
      </div>
    ` : ''}

    <div class="section">
      <h2>🚗 Disponibilités</h2>
      ${data.canDoTransport.length > 0 ? `
        <div class="field">
          <span class="label">Transport:</span>
          <ul class="list">
            ${data.canDoTransport.map((option: string) => `<li>${escapeHtml(option)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      ${data.transportDistance ? `<div class="field"><span class="label">Distance:</span><span class="value">${escapeHtml(data.transportDistance)}</span></div>` : ''}
      <div class="field"><span class="label">Autres missions:</span><span class="value">${escapeHtml(data.openToOtherMissions)}</span></div>
      ${data.otherMissions ? `<div class="field"><span class="label">Lesquelles:</span><span class="value">${escapeHtml(data.otherMissions)}</span></div>` : ''}
    </div>

    ${data.questions ? `
      <div class="section">
        <h2>❓ Questions</h2>
        <div class="field"><span class="value">${escapeHtml(data.questions)}</span></div>
      </div>
    ` : ''}
  </div>
</body>
</html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Bénévolat Nine Lives <onboarding@resend.dev>',
      to: ['cyprien.bl@gmail.com'],
      ...(data.email ? { cc: [data.email] } : {}),
      subject: `Nouvelle candidature ${data.volunteerType} - ${data.firstName} ${data.lastName}`,
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
