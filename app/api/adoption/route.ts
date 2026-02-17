import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  // Honeypot check
  if (data.honeypot) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Validate required fields
  const requiredFields = ['catName', 'lastName', 'firstName', 'email', 'phone', 'address', 'city', 'postalCode'];
  for (const field of requiredFields) {
    if (!data[field]) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
  }

  // TODO: Send email using Resend or SMTP
  // For now, log to console
  console.log('Adoption form submission:', data);

  // Build email body
  const emailBody = `
Nouvelle demande d'adoption

Chat souhaité: ${data.catName}

INFORMATIONS PERSONNELLES
Nom: ${data.lastName}
Prénom: ${data.firstName}
Email: ${data.email}
Téléphone: ${data.phone}

ADRESSE
${data.address}
${data.postalCode} ${data.city}

LOGEMENT
Type: ${data.housing}
Jardin: ${data.hasGarden}
Balcon: ${data.hasBalcony}
Statut: ${data.owner}

AUTRES ANIMAUX
${data.otherAnimals}

EXPÉRIENCE AVEC LES CHATS
${data.experience}

BUDGET PRÉVU
${data.budget}

MOTIVATION
${data.motivation}
  `;

  try {
    // TODO: Replace with actual email sending
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'adoptions@ninelives.fr',
    //   to: 'ninelives@comax.fr',
    //   subject: `Demande d'adoption - ${data.catName}`,
    //   text: emailBody
    // });

    console.log('Email body:', emailBody);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}