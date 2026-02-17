import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAllCats } from '@/lib/trello';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();

  if (data.honeypot) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Look up cat for image
  let catImageHtml = '';
  if (data.animalName) {
    try {
      const { all: cats } = await getAllCats();
      const cat = cats.find((c: any) => c.name === data.animalName);
      if (cat && cat.images[0] && cat.images[0] !== '/images/default-cat.jpg') {
        const requestUrl = new URL(request.url);
        const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
        const absoluteImageUrl = `${baseUrl}${cat.images[0]}`;
        catImageHtml = `
          <div style="text-align:center; margin: 15px 0;">
            <img src="${absoluteImageUrl}" alt="${data.animalName}" style="max-width:250px; border-radius:8px;" />
          </div>`;
      }
    } catch (e) {
      console.error('Could not fetch cat image:', e);
    }
  }

  // Helper: only render a field row if value is defined and non-empty
  const f = (label: string, value: any): string => {
    if (value === undefined || value === null || value === '') return '';
    return `<div class="field"><span class="label">${label}:</span> <span class="value">${value}</span></div>`;
  };

  // Helper: render boolean as ✓ / ✗
  const bool = (label: string, value: any): string => {
    if (value === undefined || value === null) return '';
    return `<div class="field"><span class="label">${label}:</span> <span class="value">${value ? '✓ Oui' : '✗ Non'}</span></div>`;
  };

  // Helper: render array as comma-separated
  const arr = (label: string, value: any): string => {
    if (!value || !Array.isArray(value) || value.length === 0) return '';
    return `<div class="field"><span class="label">${label}:</span> <span class="value">${value.join(', ')}</span></div>`;
  };

  const catName = data.animalName || 'Non spécifié';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: #00947e; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header .cat-name { font-size: 20px; margin-top: 8px; font-weight: 300; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 6px; border-left: 4px solid #00947e; }
    .section h2 { margin-top: 0; color: #00947e; font-size: 18px; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; color: #4b5563; }
    .value { color: #1f2937; }
    .long-text { white-space: pre-wrap; background: #f9fafb; padding: 10px; border-radius: 4px; margin-top: 5px; }
    a { color: #00947e; text-decoration: none; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🐱 Nouvelle demande d'adoption</h1>
    <div class="cat-name">${catName}</div>
    ${catImageHtml}
  </div>

  <div class="content">

    <!-- INFORMATIONS PERSONNELLES -->
    <div class="section">
      <h2>👤 Informations personnelles</h2>
      ${f('Nom', data.lastName)}
      ${f('Prénom', data.firstName)}
      ${f('Âge', data.age ? data.age + ' ans' : '')}
      ${f('Email', data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : '')}
      ${f('Téléphone mobile', data.mobilePhone ? `<a href="tel:${data.mobilePhone}">${data.mobilePhone}</a>` : '')}
      ${f('Téléphone fixe', data.landlinePhone ? `<a href="tel:${data.landlinePhone}">${data.landlinePhone}</a>` : '')}
      ${f('Adresse', [data.address, data.postalCode, data.city].filter(Boolean).join(', '))}
    </div>

    <!-- ANIMAL SOUHAITÉ -->
    <div class="section">
      <h2>🐈 Animal souhaité</h2>
      ${f('Chat souhaité', data.animalName)}
      ${f('Type d\'animal', data.animalType)}
      ${f('Date d\'adoption souhaitée', data.adoptionDate)}
    </div>

    <!-- LOGEMENT -->
    <div class="section">
      <h2>🏠 Logement</h2>
      ${f('Type de logement', data.housingType)}
      ${f('Superficie', data.surface ? data.surface + ' m²' : '')}
      ${data.housingType === 'Maison' ? bool('Jardin clôturé', data.hasGardenEnclosed) : ''}
      ${data.housingType === 'Appartement' ? `
        ${bool('Balcon ou terrasse', data.hasBalcony)}
        ${bool('Sans balcon ou terrasse', data.noBalcony)}
        ${f('Étage', data.floor)}
      ` : ''}
      ${f('Propriétaire', data.isOwner)}
      ${data.isOwner === 'Non' ? f('Permission d\'avoir un animal', data.hasPermission) : ''}
      ${f('Déménagement prévu', data.movingSoon)}
      ${data data.movingSoon)}
      ${data.movingSoon === 'Oui' ? f('Adresse du projet', data.movingAddress) : ''}
    </div>

    <!-- FOYER -->
    <div class="section">
      <h2>👨‍👩‍👧‍👦 Foyer</h2>
      ${f('Emploi', data.employed)}
      ${data.employed === 'Autre' ? f('Précision emploi', data.employedOther) : ''}
      ${f('Nombre d\'adultes', data.numAdults)}
      ${f('Nombre d\'enfants', data.numChildren)}
      ${parseInt(data.numChildren) > 0 ? f('Âges des enfants', data.childrenAges) : ''}
      ${f('Quelqu\'un à la maison en journée', data.someoneHomeDuringDay)}
      ${data.someoneHomeDuringDay === 'Non' ? f('Heures d\'absence', data.hoursAbsence) : ''}
      ${f('Allergies ou asthme', data.hasAllergies)}
      ${data.numChildren === '0' ? `
        ${f('Projet enfants compatible', data.childrenCompatible)}
        ${data.childrenCompatible === 'Autre' ? f('Précision', data.childrenCompatibleOther) : ''}
      ` : ''}
      ${parseInt(data.numAdults) > 1 ? f('En cas de séparation, qui garde l\'animal', data.coupleSeparation) : ''}
    </div>

    <!-- ANIMAUX -->
    <div class="section">
      <h2>🐾 Animaux</h2>
      ${f('Animal à la maison actuellement', data.hasAnimalNow)}
      ${data.hasAnimalNow === 'Oui' ? `
        ${f('Détails (espèce, race, sexe, âge)', data.currentAnimalDetails)}
        ${bool('Stérilisés', data.currentAnimalsSterilized)}
        ${bool('Vaccinés', data.currentAnimalsVaccinated)}
        ${bool('Testés FIV/FeLV', data.currentAnimalsTested)}
      ` : ''}
      ${f('A déjà eu un animal', data.hadAnimalBefore)}
      ${data.hadAnimalBefore === 'Oui' ? f('Détails', data.previousAnimalDetails) : ''}
      ${f('A dû se séparer d\'un animal', data.hadToSeparate)}
      ${data.hadToSeparate === 'Oui' ? f('Raison', data.separationReason) : ''}
      ${(data.hasAnimalNow === 'Oui' || data.hadAnimalBefore === 'Oui') ? f('Déjà adopté en refuge/association', data.adoptedFromShelter) : ''}
    </div>

    <!-- PROJET D'ADOPTION -->
    <div class="section">
      <h2>💭 Projet d'adoption</h2>
      ${data.motivation ? `
        <div class="field"><span class="label">Motivations:</span><div class="long-text">${data.motivation}</div></div>
      ` : ''}
      ${data.sterilizationOpinion ? `
        <div class="field"><span class="label">Opinion sur la stérilisation:</span><div class="long-text">${data.sterilizationOpinion}</div></div>
      ` : ''}
      ${arr('Garde en cas d\'absence', data.careAbsence)}
      ${data.careAbsence?.includes('Autre') ? f('Précision garde', data.careAbsenceOther) : ''}
      ${f('Engagement longue durée', data.longTermCommitment)}
      ${f('Tout le monde d\'accord', data.everyoneAgrees)}
      ${f('Connaît les besoins de l\'animal', data.knowsAnimalNeeds)}
      ${f('A pensé aux dégâts/nuisances', data.thoughtAboutDamages)}
    </div>

    <!-- BUDGET & SOINS -->
    <div class="section">
      <h2>💰 Budget & Soins</h2>
      ${f('Connaît les frais vétérinaires', data.knowsVetCosts)}
      ${data.knowsVetCosts === 'Oui' ? f('Estimation frais véto/an', data.vetCostsEstimate) : ''}
      ${f('Seuil de difficulté en urgence', data.emergencyPaymentThreshold)}
      ${data.sickAnimalAction ? `
        <div class="field"><span class="label">En cas de maladie:</span><div class="long-text">${data.sickAnimalAction}</div></div>
      ` : ''}
      ${f('Repas envisagés', data.mealsDescription)}
      ${f('Connaît le budget mensuel', data.knowsMonthlyBudget)}
      ${data.knowsMonthlyBudget === 'Oui' ? f('Estimation budget mensuel', data.monthlyBudgetEstimate) : ''}
      ${data.animalType === 'Lapin' ? `
        ${data.rabbitHabitat ? `<div class="field"><span class="label">Habitat du lapin:</span><div class="long-text">${data.rabbitHabitat}</div></div>` : ''}
      ` : ''}
      ${f('Lieu animal (travail/sortie)', data.animalLocationWork)}
      ${data.animalLocationWork === 'En enclos' ? f('Surface enclos (travail)', data.animalLocationWorkSurface ? data.animalLocationWorkSurface + ' m²' : '') : ''}
      ${f('Lieu animal (présent)', data.animalLocationHome)}
      ${data.animalLocationHome === 'En enclos' ? f('Surface enclos (maison)', data.animalLocationHomeSurface ? data.animalLocationHomeSurface + ' m²' : '') : ''}
      ${data.animalType === 'Lapin' ? f('Deuxième lapin envisagé', data.secondRabbit) : ''}
    </div>

    <!-- DIVERS -->
    <div class="section">
      <h2>📋 Divers</h2>
      ${f('Comment a connu l\'association', data.howHeardAbout)}
      ${data.howHeardAbout === 'Autre' ? f('Précision', data.howHeardAboutOther) : ''}
      ${data.remarks ? `
        <div class="field"><span class="label">Remarques / questions:</span><div class="long-text">${data.remarks}</div></div>
      ` : ''}
    </div>

  </div>
</body>
</html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Adoption Nine Lives <onboarding@resend.dev>',
      to: ['asso@ninelives.fr'],
      subject: `Demande d'adoption${data.animalName ? ` - ${data.animalName}` : ''} - ${data.firstName} ${data.lastName}`,
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
