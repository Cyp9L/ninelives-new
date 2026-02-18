'use client';
import { useState, useEffect } from 'react';
import Captcha from '@/components/Captcha';

interface Cat {
  id: string;
  name: string;
  slug: string;
  images: string[];
}

export default function AdoptionForm({ cats, preselectedCat }: { cats: Cat[], preselectedCat?: string }) {
  const [formData, setFormData] = useState({
    animalName: preselectedCat || '',
    lastName: '', firstName: '', address: '', postalCode: '', city: '',
    mobilePhone: '', landlinePhone: '', email: '', age: '',
    surface: '', housingType: '', hasGardenEnclosed: false,
    floor: '',
    isOwner: '', hasPermission: '', movingSoon: '', movingAddress: '',
    employed: '', employedOther: '', numAdults: '', numChildren: '',
    childrenAges: '', someoneHomeDuringDay: '', hoursAbsence: '',
    hasAllergies: '', childrenCompatible: '', childrenCompatibleOther: '',
    coupleSeparation: '',
    hasAnimalNow: '', currentAnimalDetails: '',
    currentAnimalsSterilized: false, currentAnimalsVaccinated: false,
    currentAnimalsTested: false, hadAnimalBefore: '', previousAnimalDetails: '',
    hadToSeparate: '', separationReason: '', adoptedFromShelter: '',
    animalType: 'Chat', adoptionDate: '', motivation: '',
    sterilizationOpinion: '', careAbsence: [] as string[], careAbsenceOther: '',
    longTermCommitment: '', everyoneAgrees: '', knowsAnimalNeeds: '',
    thoughtAboutDamages: '', knowsVetCosts: '', vetCostsEstimate: '',
    emergencyPaymentThreshold: '', sickAnimalAction: '', mealsDescription: '',
    knowsMonthlyBudget: '', monthlyBudgetEstimate: '',
    animalLocationWork: '', animalLocationWorkSurface: '',
    animalLocationHome: '', animalLocationHomeSurface: '',
    howHeardAbout: '', howHeardAboutOther: '', remarks: '',
    acceptsPrivacy: false, honeypot: ''
  });

  useEffect(() => {
    if (!preselectedCat && !formData.animalName) {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('cat');
      if (catParam) setFormData(prev => ({ ...prev, animalName: catParam }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const handleCheckboxArray = (field: 'careAbsence', value: string) => {
    const current = formData[field];
    if (current.includes(value)) {
      setFormData({...formData, [field]: current.filter(v => v !== value)});
    } else {
      setFormData({...formData, [field]: [...current, value]});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/adoption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken })
      });
      if (res.ok) { setStatus('success'); window.scrollTo(0, 0); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  // Conditional visibility
  const isApartment = formData.housingType === 'Appartement';
  const isHouse = formData.housingType === 'Maison';
  const isRenter = formData.isOwner === 'Non';
  const isMoving = formData.movingSoon === 'Oui';
  const hasChildren = parseInt(formData.numChildren) > 0;
  const noChildren = formData.numChildren === '0';
  const isCouple = parseInt(formData.numAdults) > 1;
  const notHomeDay = formData.someoneHomeDuringDay === 'Non';
  const employedOther = formData.employed === 'Autre';
  const childrenProjectOther = formData.childrenCompatible === 'Autre';
  const hasCurrentAnimal = formData.hasAnimalNow === 'Oui';
  const hadPreviousAnimal = formData.hadAnimalBefore === 'Oui';
  const didSeparate = formData.hadToSeparate === 'Oui';
  const careAbsenceHasOther = formData.careAbsence.includes('Autre');
  const knowsVetCosts = formData.knowsVetCosts === 'Oui';
  const knowsBudget = formData.knowsMonthlyBudget === 'Oui';
  const isCat = formData.animalType === 'Chat';
  const isDog = formData.animalType === 'Chien';
  const locationWorkEnclosure = formData.animalLocationWork === 'En enclos';
  const locationHomeEnclosure = formData.animalLocationHome === 'En enclos';
  const heardOther = formData.howHeardAbout === 'Autre';

  // Helper for radio groups
  const radio = (name: string, value: string, field: string) => (
    <label className="form-radio">
      <input type="radio" required name={name} value={value}
        checked={formData[field as keyof typeof formData] === value}
        onChange={(e) => setFormData({...formData, [field]: e.target.value})} />
      {value}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="form-flow">
      {status === 'success' && (
        <div className="alert alert-success">
          <strong>✓ Merci !</strong><br/>
          Votre demande d&apos;adoption a été envoyée avec succès. Nous vous contacterons très prochainement.
        </div>
      )}

      <input type="text" name="website" value={formData.honeypot}
        onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
        className="honeypot" tabIndex={-1} />

      {/* ANIMAL NAME - Visual cat picker */}
      <div>
        <label className="form-label">
          Si vous savez déjà lequel de nos animaux vous souhaitez rencontrer, cliquez sur sa photo
        </label>
        <div className="cat-picker">
          {cats.map(cat => (
            <button key={cat.id} type="button"
              onClick={() => setFormData({...formData, animalName: cat.name})}
              className={`cat-picker-btn ${formData.animalName === cat.name ? 'active' : ''}`}
            >
              <div className="cat-picker-img" data-no-lightbox>
                {cat.images[0] ? (
                  <img src={cat.images[0]} alt={cat.name} />
                ) : (
                  <div className="cat-picker-placeholder">🐱</div>
                )}
              </div>
              <div className="cat-picker-name">{cat.name}</div>
            </button>
          ))}
        </div>
        {formData.animalName && (
          <div className="cat-picker-selected">
            <span>✓ {formData.animalName} sélectionné(e)</span>
            <button type="button" onClick={() => setFormData({...formData, animalName: ''})}>
              Annuler
            </button>
          </div>
        )}
      </div>

      {/* PERSONAL INFO */}
      <h3 className="form-section-title">Vos coordonnées</h3>

      <div className="form-grid">
        <div>
          <label className="form-label">Nom de famille *</label>
          <input type="text" required className="form-input" value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
        </div>
        <div>
          <label className="form-label">Prénom *</label>
          <input type="text" required className="form-input" value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
        </div>
      </div>

      <div>
        <label className="form-label">Adresse *</label>
        <input type="text" required className="form-input" value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})} />
      </div>

      <div className="form-grid-13">
        <div>
          <label className="form-label">Code postal *</label>
          <input type="text" required className="form-input" value={formData.postalCode}
            onChange={(e) => setFormData({...formData, postalCode: e.target.value})} />
        </div>
        <div>
          <label className="form-label">Ville *</label>
          <input type="text" required className="form-input" value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})} />
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label">Téléphone *</label>
          <input type="tel" required className="form-input" value={formData.mobilePhone}
            onChange={(e) => setFormData({...formData, mobilePhone: e.target.value})} />
        </div>
        <div>
          <label className="form-label">Téléphone fixe</label>
          <input type="tel" className="form-input" value={formData.landlinePhone}
            onChange={(e) => setFormData({...formData, landlinePhone: e.target.value})} />
        </div>
      </div>

      <div className="form-grid-31">
        <div>
          <label className="form-label">E-mail *</label>
          <input type="email" required className="form-input" value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="form-label">Âge *</label>
          <input type="number" required className="form-input" value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})} />
        </div>
      </div>

      <hr className="form-divider" />

      {/* HOUSING */}
      <h3 className="form-section-title">Votre logement</h3>

      <div className="form-grid">
        <div>
          <label className="form-label">Superficie *</label>
          <input type="number" required className="form-input" value={formData.surface}
            onChange={(e) => setFormData({...formData, surface: e.target.value})} />
          <div className="form-hint">en m²</div>
        </div>
        <div>
          <label className="form-label">Type de logement *</label>
          <select required className="form-select" value={formData.housingType}
            onChange={(e) => setFormData({...formData, housingType: e.target.value})}>
            <option value="">Sélectionnez</option>
            <option value="Maison">Maison</option>
            <option value="Appartement">Appartement</option>
          </select>
        </div>
      </div>

      {isHouse && (
        <label className="form-checkbox">
          <input type="checkbox" checked={formData.hasGardenEnclosed}
            onChange={(e) => setFormData({...formData, hasGardenEnclosed: e.target.checked})} />
          <span>Avec jardin clôturé</span>
        </label>
      )}

      {isApartment && (
        <div>
          <label className="form-label">Quel étage ? *</label>
          <input type="number" required className="form-input" value={formData.floor}
            onChange={(e) => setFormData({...formData, floor: e.target.value})} />
        </div>
      )}

      <div>
        <label className="form-label">Êtes-vous propriétaire ? *</label>
        <div className="form-radio-group">
          {radio('isOwner', 'Oui', 'isOwner')}
          {radio('isOwner', 'Non', 'isOwner')}
        </div>
      </div>

      {isRenter && (
        <div>
          <label className="form-label">Avez-vous la permission d&apos;avoir un animal ? *</label>
          <div className="form-radio-group">
            {radio('hasPermission', 'Oui', 'hasPermission')}
            {radio('hasPermission', 'Non', 'hasPermission')}
          </div>
        </div>
      )}

      <div>
        <label className="form-label">Prévoyez-vous de déménager prochainement ? *</label>
        <div className="form-radio-group">
          {radio('movingSoon', 'Oui', 'movingSoon')}
          {radio('movingSoon', 'Non', 'movingSoon')}
        </div>
      </div>

      {isMoving && (
        <div>
          <label className="form-label">Adresse du projet *</label>
          <input type="text" required className="form-input" value={formData.movingAddress}
            onChange={(e) => setFormData({...formData, movingAddress: e.target.value})} />
        </div>
      )}

      <hr className="form-divider" />

      {/* HOUSEHOLD */}
      <h3 className="form-section-title">Votre foyer</h3>

      <div>
        <label className="form-label">Êtes-vous actuellement salarié.e ? *</label>
        <div className="form-radio-group">
          {radio('employed', 'Oui', 'employed')}
          {radio('employed', 'Non', 'employed')}
          {radio('employed', 'Autre', 'employed')}
        </div>
      </div>

      {employedOther && (
        <div>
          <label className="form-label">Précisez *</label>
          <input type="text" required className="form-input" value={formData.employedOther}
            onChange={(e) => setFormData({...formData, employedOther: e.target.value})} />
        </div>
      )}

      <div className="form-grid">
        <div>
          <label className="form-label">Nombre d&apos;adultes *</label>
          <input type="number" required className="form-input" value={formData.numAdults}
            onChange={(e) => setFormData({...formData, numAdults: e.target.value})} />
        </div>
        <div>
          <label className="form-label">Nombre d&apos;enfants *</label>
          <input type="number" required className="form-input" value={formData.numChildren}
            onChange={(e) => setFormData({...formData, numChildren: e.target.value})} />
        </div>
      </div>

      {hasChildren && (
        <div>
          <label className="form-label">Âges des enfants *</label>
          <input type="text" required className="form-input" value={formData.childrenAges}
            onChange={(e) => setFormData({...formData, childrenAges: e.target.value})} />
        </div>
      )}

      <div>
        <label className="form-label">Y a-t-il quelqu&apos;un à la maison en journée ? *</label>
        <div className="form-radio-group">
          {radio('someoneHomeDuringDay', 'Oui', 'someoneHomeDuringDay')}
          {radio('someoneHomeDuringDay', 'Non', 'someoneHomeDuringDay')}
        </div>
      </div>

      {notHomeDay && (
        <div>
          <label className="form-label">Combien d&apos;heures d&apos;absence ? *</label>
          <input type="text" required className="form-input" value={formData.hoursAbsence}
            onChange={(e) => setFormData({...formData, hoursAbsence: e.target.value})} />
        </div>
      )}

      <div>
        <label className="form-label">Un occupant souffre-t-il d&apos;allergies ou d&apos;asthme ? *</label>
        <div className="form-radio-group">
          {radio('hasAllergies', 'Oui', 'hasAllergies')}
          {radio('hasAllergies', 'Non', 'hasAllergies')}
          {radio('hasAllergies', 'Je ne sais pas', 'hasAllergies')}
        </div>
      </div>

      {noChildren && (
        <div>
          <label className="form-label">Si vous projetez d&apos;avoir des enfants, cela vous semble-t-il compatible avec un animal ? *</label>
          <div className="form-radio-group">
            {radio('childrenCompatible', 'Oui', 'childrenCompatible')}
            {radio('childrenCompatible', 'Non', 'childrenCompatible')}
            {radio('childrenCompatible', 'Autre', 'childrenCompatible')}
          </div>
        </div>
      )}

      {childrenProjectOther && (
        <div>
          <label className="form-label">Précisez *</label>
          <input type="text" required className="form-input" value={formData.childrenCompatibleOther}
            onChange={(e) => setFormData({...formData, childrenCompatibleOther: e.target.value})} />
        </div>
      )}

      {isCouple && (
        <div>
          <label className="form-label">En cas de séparation, qui gardera l&apos;animal ? *</label>
          <input type="text" required className="form-input" value={formData.coupleSeparation}
            onChange={(e) => setFormData({...formData, coupleSeparation: e.target.value})} />
        </div>
      )}

      <hr className="form-divider" />

      {/* ANIMALS */}
      <h3 className="form-section-title">Vos animaux</h3>

      <div>
        <label className="form-label">Avez-vous un animal à la maison ? *</label>
        <div className="form-radio-group">
          {radio('hasAnimalNow', 'Oui', 'hasAnimalNow')}
          {radio('hasAnimalNow', 'Non', 'hasAnimalNow')}
        </div>
      </div>

      {hasCurrentAnimal && (
        <>
          <div>
            <label className="form-label">Espèce, race, sexe et âge *</label>
            <input type="text" required className="form-input" value={formData.currentAnimalDetails}
              onChange={(e) => setFormData({...formData, currentAnimalDetails: e.target.value})} />
          </div>
          <div>
            <label className="form-label">Vos animaux sont-ils</label>
            <div className="form-checkbox-group">
              <label className="form-checkbox">
                <input type="checkbox" checked={formData.currentAnimalsSterilized}
                  onChange={(e) => setFormData({...formData, currentAnimalsSterilized: e.target.checked})} />
                <span>Stérilisés</span>
              </label>
              <label className="form-checkbox">
                <input type="checkbox" checked={formData.currentAnimalsVaccinated}
                  onChange={(e) => setFormData({...formData, currentAnimalsVaccinated: e.target.checked})} />
                <span>Vaccinés</span>
              </label>
              <label className="form-checkbox">
                <input type="checkbox" checked={formData.currentAnimalsTested}
                  onChange={(e) => setFormData({...formData, currentAnimalsTested: e.target.checked})} />
                <span>Testés FIV/FeLV (pour les chats)</span>
              </label>
            </div>
          </div>
        </>
      )}

      <div>
        <label className="form-label">Avez-vous déjà eu un animal ? *</label>
        <div className="form-radio-group">
          {radio('hadAnimalBefore', 'Oui', 'hadAnimalBefore')}
          {radio('hadAnimalBefore', 'Non', 'hadAnimalBefore')}
        </div>
      </div>

      {hadPreviousAnimal && (
        <div>
          <label className="form-label">Espèce, race, sexe et âge *</label>
          <input type="text" required className="form-input" value={formData.previousAnimalDetails}
            onChange={(e) => setFormData({...formData, previousAnimalDetails: e.target.value})} />
        </div>
      )}

      <div>
        <label className="form-label">Avez-vous dû vous séparer d&apos;un animal par le passé ? *</label>
        <div className="form-radio-group">
          {radio('hadToSeparate', 'Oui', 'hadToSeparate')}
          {radio('hadToSeparate', 'Non', 'hadToSeparate')}
        </div>
      </div>

      {didSeparate && (
        <div>
          <label className="form-label">Pour quelle raison ? *</label>
          <textarea required rows={3} className="form-textarea" value={formData.separationReason}
            onChange={(e) => setFormData({...formData, separationReason: e.target.value})} />
        </div>
      )}

      {(hasCurrentAnimal || hadPreviousAnimal) && (
        <div>
          <label className="form-label">Avez-vous déjà adopté via un refuge ou une association ? *</label>
          <div className="form-radio-group">
            {radio('adoptedFromShelter', 'Oui', 'adoptedFromShelter')}
            {radio('adoptedFromShelter', 'Non', 'adoptedFromShelter')}
          </div>
        </div>
      )}

      <hr className="form-divider" />

      {/* ADOPTION PROJECT */}
      <h3 className="form-section-title">Votre projet d&apos;adoption</h3>

      <div>
        <label className="form-label">Vous souhaitez adopter un : *</label>
        <select required className="form-select" value={formData.animalType}
          onChange={(e) => setFormData({...formData, animalType: e.target.value})}>
          <option value="Chat">Chat</option>
          <option value="Chien">Chien</option>
        </select>
      </div>

      <div>
        <label className="form-label">À partir de quelle date pouvez-vous accueillir votre compagnon ? *</label>
        <input type="date" required className="form-input" value={formData.adoptionDate}
          onChange={(e) => setFormData({...formData, adoptionDate: e.target.value})} />
        <div className="form-hint">Pour rappel, nous ne faisons pas de « réservation »</div>
      </div>

      <div>
        <label className="form-label">Pour qui et pourquoi voulez-vous adopter, quelles sont vos motivations ? *</label>
        <textarea required rows={5} className="form-textarea" value={formData.motivation}
          onChange={(e) => setFormData({...formData, motivation: e.target.value})} />
      </div>

      <div>
        <label className="form-label">Quelle est votre opinion sur la stérilisation / castration ? *</label>
        <textarea required rows={3} className="form-textarea" value={formData.sterilizationOpinion}
          onChange={(e) => setFormData({...formData, sterilizationOpinion: e.target.value})} />
      </div>

      <div>
        <label className="form-label">Lors d&apos;une absence, qui prendra soin de votre animal ? *</label>
        <div className="form-checkbox-group">
          {['Famille', 'Voisin', 'Pension', 'Petsitter', 'Autre'].map(option => (
            <label key={option} className="form-checkbox">
              <input type="checkbox" checked={formData.careAbsence.includes(option)}
                onChange={() => handleCheckboxArray('careAbsence', option)} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {careAbsenceHasOther && (
        <div>
          <label className="form-label">Précisez *</label>
          <input type="text" required className="form-input" value={formData.careAbsenceOther}
            onChange={(e) => setFormData({...formData, careAbsenceOther: e.target.value})} />
        </div>
      )}

      <div>
        <label className="form-label">Êtes-vous prêt à vous engager pour la vie entière de l&apos;animal ? *</label>
        <div className="form-radio-group">
          {radio('longTermCommitment', 'Oui', 'longTermCommitment')}
          {radio('longTermCommitment', 'Non', 'longTermCommitment')}
        </div>
      </div>

      <div>
        <label className="form-label">Tout le monde à la maison est-il d&apos;accord ? *</label>
        <div className="form-radio-group">
          {radio('everyoneAgrees', 'Oui', 'everyoneAgrees')}
          {radio('everyoneAgrees', 'Non', 'everyoneAgrees')}
        </div>
      </div>

      <div>
        <label className="form-label">
          Connaissez-vous les {isCat ? 'chats' : 'chiens'}, leurs exigences et leurs besoins ? *
        </label>
        <div className="form-radio-group">
          {radio('knowsAnimalNeeds', 'Oui', 'knowsAnimalNeeds')}
          {radio('knowsAnimalNeeds', 'Non', 'knowsAnimalNeeds')}
        </div>
      </div>

      <div>
        <label className="form-label">Avez-vous pensé aux dégâts/nuisances qu&apos;un animal peut causer ? *</label>
        <div className="form-radio-group">
          {radio('thoughtAboutDamages', 'Oui', 'thoughtAboutDamages')}
          {radio('thoughtAboutDamages', 'Non', 'thoughtAboutDamages')}
        </div>
      </div>

      <div>
        <label className="form-label">Avez-vous une idée du montant des frais vétérinaires ? *</label>
        <div className="form-radio-group">
          {radio('knowsVetCosts', 'Oui', 'knowsVetCosts')}
          {radio('knowsVetCosts', 'Non', 'knowsVetCosts')}
        </div>
      </div>

      {knowsVetCosts && (
        <div>
          <label className="form-label">Estimation des dépenses par an ? *</label>
          <input type="text" required className="form-input" value={formData.vetCostsEstimate}
            onChange={(e) => setFormData({...formData, vetCostsEstimate: e.target.value})} />
        </div>
      )}

      <div>
        <label className="form-label">À partir de quel montant seriez-vous en difficulté pour payer en une fois ? *</label>
        <select required className="form-select" value={formData.emergencyPaymentThreshold}
          onChange={(e) => setFormData({...formData, emergencyPaymentThreshold: e.target.value})}>
          <option value="">Sélectionnez</option>
          {['150€','300€','500€','750€','1 000€','1 500€','2 000€','3 000€','4 000€'].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="form-label">Si votre animal présente des signes de maladie, que faites-vous ? Et le week-end ? *</label>
        <textarea required rows={3} className="form-textarea" value={formData.sickAnimalAction}
          onChange={(e) => setFormData({...formData, sickAnimalAction: e.target.value})} />
      </div>

      <div>
        <label className="form-label">Comment imaginez-vous ses repas ? *</label>
        <input type="text" required className="form-input" value={formData.mealsDescription}
          onChange={(e) => setFormData({...formData, mealsDescription: e.target.value})}
          placeholder="Nombre de repas, type d'alimentation, marques..." />
      </div>

      <div>
        <label className="form-label">Avez-vous une idée du budget mensuel (nourriture, litière…) ? *</label>
        <div className="form-radio-group">
          {radio('knowsMonthlyBudget', 'Oui', 'knowsMonthlyBudget')}
          {radio('knowsMonthlyBudget', 'Non', 'knowsMonthlyBudget')}
        </div>
      </div>

      {knowsBudget && (
        <div>
          <label className="form-label">Estimation des dépenses mensuelles ? *</label>
          <input type="text" required className="form-input" value={formData.monthlyBudgetEstimate}
            onChange={(e) => setFormData({...formData, monthlyBudgetEstimate: e.target.value})} />
        </div>
      )}

      <div>
        <label className="form-label">Au travail ou de sortie, où sera votre animal ? *</label>
        <select required className="form-select" value={formData.animalLocationWork}
          onChange={(e) => setFormData({...formData, animalLocationWork: e.target.value})}>
          <option value="">Sélectionnez</option>
          {['Dans une pièce','En cage','En enclos','Dehors','Libre dans le logement','Sur la terrasse / le balcon'].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {locationWorkEnclosure && (
        <div>
          <label className="form-label">Surface de l&apos;enclos ? *</label>
          <input type="number" required className="form-input" value={formData.animalLocationWorkSurface}
            onChange={(e) => setFormData({...formData, animalLocationWorkSurface: e.target.value})} />
          <div className="form-hint">en m²</div>
        </div>
      )}

      <div>
        <label className="form-label">Quand vous êtes présent, où sera votre animal ? *</label>
        <select required className="form-select" value={formData.animalLocationHome}
          onChange={(e) => setFormData({...formData, animalLocationHome: e.target.value})}>
          <option value="">Sélectionnez</option>
          {['Dans une pièce','En cage','En enclos','Dehors','Libre dans le logement','Sur la terrasse / le balcon'].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {locationHomeEnclosure && (
        <div>
          <label className="form-label">Surface de l&apos;enclos ? *</label>
          <input type="number" required className="form-input" value={formData.animalLocationHomeSurface}
            onChange={(e) => setFormData({...formData, animalLocationHomeSurface: e.target.value})} />
          <div className="form-hint">en m²</div>
        </div>
      )}

      <hr className="form-divider" />

      {/* FINAL */}
      <div className="form-grid">
        <div>
          <label className="form-label">Comment avez-vous connu l&apos;association ? *</label>
          <select required className="form-select" value={formData.howHeardAbout}
            onChange={(e) => setFormData({...formData, howHeardAbout: e.target.value})}>
            <option value="">Sélectionnez</option>
            {['Facebook','Recherche Google','Internet','Vétérinaire','Autre'].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        {heardOther && (
          <div>
            <label className="form-label">Précisez</label>
            <input type="text" className="form-input" value={formData.howHeardAboutOther}
              onChange={(e) => setFormData({...formData, howHeardAboutOther: e.target.value})} />
          </div>
        )}
      </div>

      <div>
        <label className="form-label">Remarques / questions</label>
        <textarea rows={4} className="form-textarea" value={formData.remarks}
          onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
      </div>

      <div className="form-privacy">
        L&apos;association Nine Lives Paris traite les données recueillies afin de gérer les demandes d&apos;adoption.
      </div>

      <label className="form-checkbox">
        <input type="checkbox" required checked={formData.acceptsPrivacy}
          onChange={(e) => setFormData({...formData, acceptsPrivacy: e.target.checked})} />
        <span>J&apos;ai lu et j&apos;accepte <a href="/politique-de-confidentialite" target="_blank" rel="noopener" className="link-blue">la politique de confidentialité</a>. *</span>
      </label>

      <Captcha onVerify={setCaptchaToken} />

      <div className="form-submit">
        <button type="submit" disabled={status === 'sending' || !captchaToken}
          className="btn btn-gradient btn-lg">
          {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
        </button>
      </div>

      {status === 'error' && (
        <div className="alert alert-error">
          <strong>Erreur</strong> lors de l&apos;envoi. Veuillez réessayer ou nous contacter directement.
        </div>
      )}
    </form>
  );
}