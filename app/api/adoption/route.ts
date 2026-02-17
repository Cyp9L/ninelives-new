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
NOUVELLE DEMANDE D'ADOPTION
===========================

ANIMAL SOUHAITÉ
${data.animalName || 'Non spécifié'}

COORDONNÉES
-----------
Nom: ${data.lastName}
Prénom: ${data.firstName}
Email: ${data.email}
Téléphone mobile: ${data.mobilePhone}
Téléphone fixe: ${data.landlinePhone || 'Non renseigné'}
Âge: ${data.age} ans

Adresse: ${data.address}
${data.postalCode} ${data.city}

LOGEMENT
--------
Type: ${data.housingType}
Superficie: ${data.surface} m²
${data.floor ? `Étage: ${data.floor}` : ''}
${data.hasGardenEnclosed ? '✓ Jardin clôturé' : ''}
${data.hasBalcony ? '✓ Balcon/terrasse' : ''}
${data.noBalcony ? '✓ Sans balcon' : ''}
Propriétaire: ${data.isOwner}
${data.isOwner === 'Non' ? `Permission animal: ${data.hasPermission}` : ''}
Déménagement prévu: ${data.movingSoon}
${data.movingSoon === 'Oui' ? `Adresse projet: ${data.movingAddress}` : ''}

FOYER
-----
Salarié(e): ${data.employed}
${data.employedOther ? `Précision: ${data.employedOther}` : ''}
Nombre d'adultes: ${data.numAdults}
Nombre d'enfants: ${data.numChildren}
${data.childrenAges ? `Âges des enfants: ${data.childrenAges}` : ''}
Quelqu'un à la maison en journée: ${data.someoneHomeDuringDay}
${data.hoursAbsence ? `Heures d'absence: ${data.hoursAbsence}` : ''}
Allergies/asthme: ${data.hasAllergies}
${data.childrenCompatible ? `Enfants futurs compatibles: ${data.childrenCompatible}` : ''}
${data.childrenCompatibleOther ? `Précision: ${data.childrenCompatibleOther}` : ''}
${data.coupleSeparation ? `En cas de séparation: ${data.coupleSeparation}` : ''}

ANIMAUX ACTUELS
---------------
A un animal maintenant: ${data.hasAnimalNow}
${data.currentAnimalDetails ? `Détails: ${data.currentAnimalDetails}` : ''}
${data.currentAnimalsSterilized ? '✓ Stérilisés' : ''}
${data.currentAnimalsVaccinated ? '✓ Vaccinés' : ''}
${data.currentAnimalsTested ? '✓ Testés FIV/FeLV' : ''}

A eu un animal avant: ${data.hadAnimalBefore}
${data.previousAnimalDetails ? `Détails: ${data.previousAnimalDetails}` : ''}

A dû se séparer d'un animal: ${data.hadToSeparate}
${data.separationReason ? `Raison: ${data.separationReason}` : ''}

${data.adoptedFromShelter ? `A déjà adopté en refuge: ${data.adoptedFromShelter}` : ''}

PROJET D'ADOPTION
-----------------
Type d'animal: ${data.animalType}
Date d'adoption souhaitée: ${data.adoptionDate}

MOTIVATIONS:
${data.motivation}

OPINION SUR LA STÉRILISATION:
${data.sterilizationOpinion}

Soin pendant absences: ${data.careAbsence.join(', ')}
${data.careAbsenceOther ? `Autre: ${data.careAbsenceOther}` : ''}

Engagement long terme: ${data.longTermCommitment}
Tout le monde d'accord: ${data.everyoneAgrees}
Connaît les besoins de l'animal: ${data.knowsAnimalNeeds}
A pensé aux dégâts: ${data.thoughtAboutDamages}

BUDGET & SOINS
--------------
Connaît frais vétérinaires: ${data.knowsVetCosts}
${data.vetCostsEstimate ? `Estimation annuelle: ${data.vetCostsEstimate}` : ''}
Seuil paiement urgence: ${data.emergencyPaymentThreshold}

ACTION SI ANIMAL MALADE:
${data.sickAnimalAction}

REPAS:
${data.mealsDescription}

Budget mensuel connu: ${data.knowsMonthlyBudget}
${data.monthlyBudgetEstimate ? `Estimation: ${data.monthlyBudgetEstimate}` : ''}

${data.rabbitHabitat ? `Habitat lapin: ${data.rabbitHabitat}` : ''}

Localisation animal au travail: ${data.animalLocationWork}
${data.animalLocationWorkSurface ? `Surface: ${data.animalLocationWorkSurface} m²` : ''}

Localisation animal à la maison: ${data.animalLocationHome}
${data.animalLocationHomeSurface ? `Surface: ${data.animalLocationHomeSurface} m²` : ''}

${data.secondRabbit ? `Second lapin: ${data.secondRabbit}` : ''}

DIVERS
------
Comment a connu l'association: ${data.howHeardAbout}
${data.howHeardAboutOther ? `Précision: ${data.howHeardAboutOther}` : ''}

${data.remarks ? `REMARQUES/QUESTIONS:\n${data.remarks}` : ''}
`;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Adoptions Nine Lives <onboarding@resend.dev>',
      to: ['ninelives@comax.fr'],
      subject: `Nouvelle demande d'adoption${data.animalName ? ` - ${data.animalName}` : ''}`,
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
