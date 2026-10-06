import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAllCats, type Cat } from '@/lib/trello';
import { escapeHtml, isValidEmail } from '@/lib/sanitize';

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

  // Look up cat for image
  let catImageHtml = '';
  const safeAnimalName = data.animalName ? escapeHtml(data.animalName) : '';
  if (data.animalName) {
    try {
      const { all: cats } = await getAllCats();
      const cat = cats.find((c: Cat) => c.name === data.animalName);
      if (cat && cat.images[0] && cat.images[0] !== '/images/site/cat-not-found.jpg') {
        const requestUrl = new URL(request.url);
        const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
        const absoluteImageUrl = `${baseUrl}${cat.images[0]}`;
        catImageHtml = `
          <div style="text-align:center; margin: 15px 0;">
            <img src="${absoluteImageUrl}" alt="${safeAnimalName}" style="max-width:150px; border-radius:8px;" />
          </div>`;
      }
    } catch (e) {
      console.error('Could not fetch cat image:', e);
    }
  }

  // Helper: only render a field row if value is defined and non-empty
  const f = (label: string, value: unknown): string => {
    if (value === undefined || value === null || value === '') return '';
    return `<div class="field"><span class="label">${label}:</span> <span class="value">${value}</span></div>`;
  };

  // Helper: render boolean as ✓ / ✗
  const bool = (label: string, value: unknown): string => {
    if (value === undefined || value === null) return '';
    return `<div class="field"><span class="label">${label}:</span> <span class="value">${value ? '✓ Oui' : '✗ Non'}</span></div>`;
  };

  // Helper: render array as comma-separated
  const arr = (label: string, value: unknown): string => {
    if (!value || !Array.isArray(value) || value.length === 0) return '';
    return `<div class="field"><span class="label">${label}:</span> <span class="value">${value.join(', ')}</span></div>`;
  };

  const catName = safeAnimalName || 'Non spécifié';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
<style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: #007273; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header .cat-name { font-size: 20px; margin-top: 8px; font-weight: 300; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 6px; border-left: 4px solid #009EA1; }
    .section h2 { margin-top: 0; color: #007273; font-size: 18px; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; color: #4b5563; }
    .value { color: #1f2937; }
    .long-text { white-space: pre-wrap; background: #f9fafb; padding: 10px; border-radius: 4px; margin-top: 5px; }
    a { color: #007273; text-decoration: none; }
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
      ${f('Nom', escapeHtml(data.lastName))}
      ${f('Prénom', escapeHtml(data.firstName))}
      ${f('Âge', data.age ? `${escapeHtml(data.age)} ans` : '')}
      ${f('Email', data.email ? `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>` : '')}
      ${f('Téléphone mobile', data.mobilePhone ? `<a href="tel:${escapeHtml(data.mobilePhone)}">${escapeHtml(data.mobilePhone)}</a>` : '')}
      ${f('Téléphone fixe', data.landlinePhone ? `<a href="tel:${escapeHtml(data.landlinePhone)}">${escapeHtml(data.landlinePhone)}</a>` : '')}
      ${f('Adresse', [data.address, data.postalCode, data.city].filter(Boolean).map(escapeHtml).join(', '))}
    </div>

    <!-- ANIMAL SOUHAITÉ -->
    <div class="section">
      <h2>🐈 Animal souhaité</h2>
      ${f('Chat souhaité', safeAnimalName)}
      ${f('Type d\'animal', escapeHtml(data.animalType))}
      ${f('Date d\'adoption souhaitée', escapeHtml(data.adoptionDate))}
    </div>

    <!-- LOGEMENT -->
    <div class="section">
      <h2>🏠 Logement</h2>
      ${f('Type de logement', escapeHtml(data.housingType))}
      ${f('Superficie', data.surface ? `${escapeHtml(data.surface)} m²` : '')}
      ${data.housingType === 'Maison' ? bool('Jardin clôturé', data.hasGardenEnclosed) : ''}
      ${data.housingType === 'Appartement' ? `
        ${f('Étage', escapeHtml(data.floor))}
        ${f('Balcon', escapeHtml(data.hasBalcony))}
        ${data.hasBalcony === 'Oui' ? f('Balcon sécurisé', escapeHtml(data.balconySecured)) : ''}
        ${data.balconySecured === 'Oui' ? f('Sécurisation du balcon', escapeHtml(data.balconySecuredHow)) : ''}
      ` : ''}
      ${f('Propriétaire', escapeHtml(data.isOwner))}
      ${data.isOwner === 'Non' ? f('Permission avoir un animal', escapeHtml(data.hasPermission)) : ''}
      ${f('Déménagement prévu', escapeHtml(data.movingSoon))}
      ${data.movingSoon === 'Oui' ? f('Adresse du projet', escapeHtml(data.movingAddress)) : ''}
    </div>

    <!-- FOYER -->
    <div class="section">
      <h2>👨‍👩‍👧‍👦 Foyer</h2>
      ${f('Emploi', escapeHtml(data.employed))}
      ${data.employed === 'Autre' ? f('Précision emploi', escapeHtml(data.employedOther)) : ''}
      ${f('Nombre d\'adultes', escapeHtml(data.numAdults))}
      ${f('Nombre d\'enfants', escapeHtml(data.numChildren))}
      ${parseInt(data.numChildren) > 0 ? f('Âges des enfants', escapeHtml(data.childrenAges)) : ''}
      ${f('Quelqu\'un à la maison en journée', escapeHtml(data.someoneHomeDuringDay))}
      ${data.someoneHomeDuringDay === 'Non' ? f('Heures d\'absence', escapeHtml(data.hoursAbsence)) : ''}
      ${f('Allergies ou asthme', escapeHtml(data.hasAllergies))}
      ${data.numChildren === '0' ? `
        ${f('Projet enfants compatible', escapeHtml(data.childrenCompatible))}
        ${data.childrenCompatible === 'Autre' ? f('Précision', escapeHtml(data.childrenCompatibleOther)) : ''}
      ` : ''}
      ${parseInt(data.numAdults) > 1 ? f('En cas de séparation, qui garde l\'animal', escapeHtml(data.coupleSeparation)) : ''}
    </div>

    <!-- ANIMAUX -->
    <div class="section">
      <h2>🐾 Animaux</h2>
      ${f('Animal à la maison actuellement', escapeHtml(data.hasAnimalNow))}
      ${data.hasAnimalNow === 'Oui' ? `
        ${f('Détails (espèce, race, sexe, âge)', escapeHtml(data.currentAnimalDetails))}
        ${bool('Stérilisés', data.currentAnimalsSterilized)}
        ${bool('Vaccinés', data.currentAnimalsVaccinated)}
        ${bool('Testés FIV/FeLV', data.currentAnimalsTested)}
      ` : ''}
      ${f('A déjà eu un animal', escapeHtml(data.hadAnimalBefore))}
      ${data.hadAnimalBefore === 'Oui' ? f('Détails', escapeHtml(data.previousAnimalDetails)) : ''}
      ${f('A dû se séparer d\'un animal', escapeHtml(data.hadToSeparate))}
      ${data.hadToSeparate === 'Oui' ? f('Raison', escapeHtml(data.separationReason)) : ''}
      ${(data.hasAnimalNow === 'Oui' || data.hadAnimalBefore === 'Oui') ? f('Déjà adopté en refuge/association', escapeHtml(data.adoptedFromShelter)) : ''}
    </div>

    <!-- PROJET D'ADOPTION -->
    <div class="section">
      <h2>💭 Projet d'adoption</h2>
      ${data.motivation ? `
        <div class="field"><span class="label">Motivations:</span><div class="long-text">${escapeHtml(data.motivation)}</div></div>
      ` : ''}
      ${data.sterilizationOpinion ? `
        <div class="field"><span class="label">Opinion sur la stérilisation:</span><div class="long-text">${escapeHtml(data.sterilizationOpinion)}</div></div>
      ` : ''}
      ${arr(
        'Garde en cas d\'absence',
        Array.isArray(data.careAbsence) ? data.careAbsence.map((v: string) => escapeHtml(v)) : []
      )}
      ${data.careAbsence?.includes('Autre') ? f('Précision garde', escapeHtml(data.careAbsenceOther)) : ''}
      ${f('Engagement longue durée', escapeHtml(data.longTermCommitment))}
      ${f('Tout le monde d\'accord', escapeHtml(data.everyoneAgrees))}
      ${f('Connaît les besoins de l\'animal', escapeHtml(data.knowsAnimalNeeds))}
      ${f('A pensé aux dégâts/nuisances', escapeHtml(data.thoughtAboutDamages))}
    </div>

    <!-- BUDGET & SOINS -->
    <div class="section">
      <h2>💰 Budget & Soins</h2>
      ${f('Connaît les frais vétérinaires', escapeHtml(data.knowsVetCosts))}
      ${data.knowsVetCosts === 'Oui' ? f('Estimation frais véto/an', escapeHtml(data.vetCostsEstimate)) : ''}
      ${f('Seuil de difficulté en urgence', escapeHtml(data.emergencyPaymentThreshold))}
      ${data.sickAnimalAction ? `
        <div class="field"><span class="label">En cas de maladie:</span><div class="long-text">${escapeHtml(data.sickAnimalAction)}</div></div>
      ` : ''}
      ${f('Repas envisagés', escapeHtml(data.mealsDescription))}
      ${f('Connaît le budget mensuel', escapeHtml(data.knowsMonthlyBudget))}
      ${data.knowsMonthlyBudget === 'Oui' ? f('Estimation budget mensuel', escapeHtml(data.monthlyBudgetEstimate)) : ''}
      ${f('Lieu animal (travail/sortie)', escapeHtml(data.animalLocationWork))}
      ${data.animalLocationWork === 'En enclos' ? f('Surface enclos (travail)', data.animalLocationWorkSurface ? `${escapeHtml(data.animalLocationWorkSurface)} m²` : '') : ''}
      ${f('Lieu animal (présent)', escapeHtml(data.animalLocationHome))}
      ${data.animalLocationHome === 'En enclos' ? f('Surface enclos (maison)', data.animalLocationHomeSurface ? `${escapeHtml(data.animalLocationHomeSurface)} m²` : '') : ''}
    </div>

    <!-- DIVERS -->
    <div class="section">
      <h2>📋 Divers</h2>
      ${f('Comment a connu l\'association', escapeHtml(data.howHeardAbout))}
      ${data.howHeardAbout === 'Autre' ? f('Précision', escapeHtml(data.howHeardAboutOther)) : ''}
      ${data.remarks ? `
        <div class="field"><span class="label">Remarques / questions:</span><div class="long-text">${escapeHtml(data.remarks)}</div></div>
      ` : ''}
    </div>

  </div>
</body>
</html>
  `;

  try {
    const validEmail = isValidEmail(data.email) ? data.email : undefined;
    const { data: emailData, error } = await resend.emails.send({
      from: 'Adoption Nine Lives <adoption@ninelives.fr>',
      to: ['adoption@ninelives.fr'],
      ...(validEmail ? { cc: [validEmail], reply_to: [validEmail] } : {}),
      subject: `Demande d'adoption${data.animalName ? ` - ${data.animalName}` : ''} - ${data.firstName} ${data.lastName}`,
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


