import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();

  // Honeypot check
  if (data.honeypot) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Build email body
  const emailBody = `
NOUVELLE CANDIDATURE BÉNÉVOLE/FAMILLE D'ACCUEIL
================================================

TYPE DE CANDIDATURE: ${data.volunteerType}

COORDONNÉES
-----------
Nom: ${data.lastName}
Prénom: ${data.firstName}
Âge: ${data.age} ans
Email: ${data.email}
Téléphone: ${data.phone}
${data.contactSlots ? `Créneaux de contact: ${data.contactSlots}` : ''}

Adresse: ${data.address}
${data.postalCode} ${data.city}

${data.volunteerType === 'Famille d\'accueil' || data.volunteerType === 'Les deux' ? `
LOGEMENT
--------
Superficie: ${data.surface} m²
Type: ${data.housingType}
Nombre de pièces: ${data.numRooms}
${data.floor ? `Étage: ${data.floor}` : ''}
${data.balconySecured ? `Balcon sécurisé: ${data.balconySecured}` : ''}
${data.balconySecuredHow ? `Comment: ${data.balconySecuredHow}` : ''}
Extérieur: ${data.hasOutdoor}
${data.outdoorSecured ? `Extérieur sécurisé: ${data.outdoorSecured}` : ''}
Sécurisé pour lapin: ${data.rabbitSecured}
${data.willSecureForRabbit ? `Prêt à sécuriser: ${data.willSecureForRabbit}` : ''}
Peut faire quarantaines: ${data.canDoQuarantine}
${data.wantPitieSalpetriereQuarantine ? `Quarantaine Pitié-Salpêtrière: ${data.wantPitieSalpetriereQuarantine}` : ''}
${data.quarantineRoom ? `Pièce quarantaine: ${data.quarantineRoom}` : ''}

FOYER
-----
Nombre de personnes: ${data.numPeopleHousehold}
Enfants: ${data.hasChildren}
${data.childrenAges ? `Âges: ${data.childrenAges}` : ''}
${data.childrenUsedToAnimals ? `Habitués aux animaux: ${data.childrenUsedToAnimals}` : ''}

Animaux à domicile: ${data.hasAnimalsHome}
${data.hasAnimalsHome === 'Oui' ? `
Chiens: ${data.numDogs}
Chats: ${data.numCats}
Lapins: ${data.numRabbits}
Autres: ${data.numOthers}
Détails: ${data.animalsDetails}
Où vivent-ils: ${data.animalsLocation}
${data.animalsSterilized ? '✓ Stérilisés' : ''}
${data.animalsIdentified ? '✓ Identifiés' : ''}
${data.animalsVaccinated ? '✓ Vaccinés' : ''}
${data.animalsTested ? '✓ Testés FIV/FeLV' : ''}
` : ''}

Heures seul par jour: ${data.hoursAlonePerDay}

MOTIVATION
----------
${data.whyFoster}

A déjà été FA: ${data.beenFosterBefore}
${data.fosterReferences ? `Références: ${data.fosterReferences}` : ''}

EXPÉRIENCE CHATS
----------------
Niveau: ${data.catExperience}

Soins pratiqués:
${data.catCarePractices.join(', ')}
${data.catCareOther ? `Autre: ${data.catCareOther}` : ''}

RÉACTION CHAT CACHÉ:
${data.catHidingReaction}

RÉACTION LITIÈRE:
${data.catLitterIssueReaction}

DEALBREAKERS CHATS:
${data.catDealbreakers}

Nombre de chats possibles: ${data.numCatsCanFoster}

Types de chats:
${data.catTypes.join(', ')}

Durée d'accueil:
${data.fosterDuration.join(', ')}
${data.fosterDurationOther ? `Précision: ${data.fosterDurationOther}` : ''}

Vacances prochaines: ${data.goingOnVacation}
${data.vacationDates ? `Dates: ${data.vacationDates}` : ''}
${data.vacationCare ? `Qui s'occupe: ${data.vacationCare}` : ''}

Foyer d'accord: ${data.householdAgrees}

ALIMENTATION & MATÉRIEL
-----------------------
Plan alimentation: ${data.feedingPlan}
Matériel disponible: ${data.hasEquipment}

Vétérinaire associatif: ${data.hasAssociationVet}
${data.vetCastration ? `Castration: ${data.vetCastration}` : ''}
${data.vetOvariectomy ? `Ovariectomie: ${data.vetOvariectomy}` : ''}
${data.vetVaccination ? `Vaccination: ${data.vetVaccination}` : ''}
${data.vetContact ? `Contact vétérinaire: ${data.vetContact}` : ''}
` : ''}

DISPONIBILITÉS
--------------
Transport: ${data.canDoTransport.join(', ')}
${data.transportDistance ? `Distance: ${data.transportDistance}` : ''}

Autres missions: ${data.openToOtherMissions}
${data.otherMissions ? `Lesquelles: ${data.otherMissions}` : ''}

${data.questions ? `
QUESTIONS
---------
${data.questions}
` : ''}
`;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Bénévolat Nine Lives <onboarding@resend.dev>',
      to: ['cyprien.bl@gmail.com'],
      subject: `Nouvelle candidature ${data.volunteerType} - ${data.firstName} ${data.lastName}`,
      text: emailBody,
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
