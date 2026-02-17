import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();

  if (data.honeypot) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: #00947e; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 6px; border-left: 4px solid #00947e; }
    .section h2 { margin-top: 0; color: #00947e; font-size: 18px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: bold; color: #4b5563; }
    .value { color: #1f2937; margin-left: 10px; }
    a { color: #00947e; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🐱 Nouvelle demande d'adoption</h1>
  </div>
  
  <div class="content">
    <div class="section">
      <h2>👤 Informations personnelles</h2>
      <div class="field"><span class="label">Nom:</span><span class="value">${data.lastName}</span></div>
      <div class="field"><span class="label">Prénom:</span><span class="value">${data.firstName}</span></div>
      <div class="field"><span class="label">Âge:</span><span class="value">${data.age} ans</span></div>
      <div class="field"><span class="label">Email:</span><span class="value"><a href="mailto:${data.email}">${data.email}</a></span></div>
      <div class="field"><span class="label">Téléphone:</span><span class="value"><a href="tel:${data.phone}">${data.phone}</a></span></div>
      ${data.contactSlots ? `<div class="field"><span class="label">Créneaux:</span><span class="value">${data.contactSlots}</span></div>` : ''}
      <div class="field"><span class="label">Adresse:</span><span class="value">${data.address}, ${data.postalCode} ${data.city}</span></div>
    </div>

    <div class="section">
      <h2>🐈 Chat souhaité</h2>
      <div class="field"><span class="label">Chat:</span><span class="value">${data.catName}</span></div>
      ${data.hasMetCat ? `<div class="field"><span class="label">A rencontré le chat:</span><span class="value">${data.hasMetCat}</span></div>` : ''}
    </div>

    <div class="section">
      <h2>🏠 Logement</h2>
      <div class="field"><span class="label">Type:</span><span class="value">${data.housingType}</span></div>
      <div class="field"><span class="label">Statut:</span><span class="value">${data.ownerOrTenant}</span></div>
      ${data.landlordAgreement ? `<div class="field"><span class="label">Accord propriétaire:</span><span class="value">${data.landlordAgreement}</span></div>` : ''}
      ${data.numRooms ? `<div class="field"><span class="label">Nombre de pièces:</span><span class="value">${data.numRooms}</span></div>` : ''}
      ${data.floor ? `<div class="field"><span class="label">Étage:</span><span class="value">${data.floor}</span></div>` : ''}
      ${data.balconySecured ? `<div class="field"><span class="label">Balcon sécurisé:</span><span class="value">${data.balconySecured}</span></div>` : ''}
      ${data.hasOutdoor ? `<div class="field"><span class="label">Extérieur:</span><span class="value">${data.hasOutdoor}</span></div>` : ''}
      ${data.outdoorSecured ? `<div class="field"><span class="label">Extérieur sécurisé:</span><span class="value">${data.outdoorSecured}</span></div>` : ''}
    </div>

    <div class="section">
      <h2>👨‍👩‍👧‍👦 Foyer</h2>
      <div class="field"><span class="label">Nombre de personnes:</span><span class="value">${data.numPeopleHousehold}</span></div>
      <div class="field"><span class="label">Enfants:</span><span class="value">${data.hasChildren}</span></div>
      ${data.childrenAges ? `<div class="field"><span class="label">Âges:</span><span class="value">${data.childrenAges}</span></div>` : ''}
      ${data.childrenUsedToAnimals ? `<div class="field"><span class="label">Habitués aux animaux:</span><span class="value">${data.childrenUsedToAnimals}</span></div>` : ''}
      <div class="field"><span class="label">Animaux à domicile:</span><span class="value">${data.hasAnimalsHome}</span></div>
      ${data.hasAnimalsHome === 'Oui' ? `
        <div class="field"><span class="label">Chiens:</span><span class="value">${data.numDogs || 0}</span></div>
        <div class="field"><span class="label">Chats:</span><span class="value">${data.numCats || 0}</span></div>
        <div class="field"><span class="label">Lapins:</span><span class="value">${data.numRabbits || 0}</span></div>
        <div class="field"><span class="label">Autres:</span><span class="value">${data.numOthers || 0}</span></div>
        <div class="field"><span class="label">Détails:</span><span class="value">${data.animalsDetails}</span></div>
        <div class="field"><span class="label">Stérilisés:</span><span class="value">${data.animalsSterilized ? '✓' : '✗'}</span></div>
        <div class="field"><span class="label">Identifiés:</span><span class="value">${data.animalsIdentified ? '✓' : '✗'}</span></div>
        <div class="field"><span class="label">Vaccinés:</span><span class="value">${data.animalsVaccinated ? '✓' : '✗'}</span></div>
        <div class="field"><span class="label">Testés FIV/FeLV:</span><span class="value">${data.animalsTested ? '✓' : '✗'}</span></div>
      ` : ''}
      <div class="field"><span class="label">Heures seul/jour:</span><span class="value">${data.hoursAlonePerDay}</span></div>
      <div class="field"><span class="label">Où sera le chat:</span><span class="value">${data.catLocation}</span></div>
    </div>

    <div class="section">
      <h2>💭 Motivation & Expérience</h2>
      <div class="field"><span class="label">Pourquoi adopter:</span><span class="value">${data.whyAdopt}</span></div>
      <div class="field"><span class="label">A déjà eu un chat:</span><span class="value">${data.hadCatBefore}</span></div>
      ${data.previousCatExperience ? `<div class="field"><span class="label">Expérience:</span><span class="value">${data.previousCatExperience}</span></div>` : ''}
      <div class="field"><span class="label">Foyer d'accord:</span><span class="value">${data.householdAgrees}</span></div>
    </div>

    <div class="section">
      <h2>💰 Budget & Soins</h2>
      <div class="field"><span class="label">Budget mensuel:</span><span class="value">${data.monthlyBudget}</span></div>
      <div class="field"><span class="label">Plan alimentation:</span><span class="value">${data.feedingPlan}</span></div>
      <div class="field"><span class="label">A du matériel:</span><span class="value">${data.hasEquipment}</span></div>
      <div class="field"><span class="label">A un vétérinaire:</span><span class="value">${data.hasVet}</span></div>
      ${data.vetContact ? `<div class="field"><span class="label">Contact vétérinaire:</span><span class="value">${data.vetContact}</span></div>` : ''}
    </div>

    ${data.goingOnVacation === 'Oui' ? `
      <div class="section">
        <h2>✈️ Vacances</h2>
        <div class="field"><span class="label">Dates:</span><span class="value">${data.vacationDates}</span></div>
        <div class="field"><span class="label">Garde:</span><span class="value">${data.vacationCare}</span></div>
      </div>
    ` : ''}

    ${data.questions ? `
      <div class="section">
        <h2>❓ Questions</h2>
        <div class="field"><span class="value">${data.questions}</span></div>
      </div>
    ` : ''}
  </div>
</body>
</html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Adoption Nine Lives <onboarding@resend.dev>',
      to: ['asso@ninelives.fr'],
      subject: `Demande d'adoption - ${data.catName} - ${data.firstName} ${data.lastName}`,
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
