'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Captcha from '@/components/Captcha';

interface Cat {
  id: string;
  name: string;
  slug: string;
  images: string[];
}

const STEPS = [
  { label: "L'animal" },
  { label: 'Coordonnées' },
  { label: 'Logement' },
  { label: 'Foyer' },
  { label: 'Projet' },
  { label: 'Budget' },
];

export default function AdoptionForm({ cats, preselectedCat }: { cats: Cat[], preselectedCat?: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>(Array(STEPS.length).fill(null));
  const formTopRef = useRef<HTMLDivElement>(null);

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

  const [currentAnimals, setCurrentAnimals] = useState<string[]>(['']);
  const [previousAnimals, setPreviousAnimals] = useState<string[]>(['']);
  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  useEffect(() => {
    if (!preselectedCat && !formData.animalName) {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('cat');
      if (catParam) setFormData(prev => ({ ...prev, animalName: catParam }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCheckboxArray = (field: 'careAbsence', value: string) => {
    const current = formData[field];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setStatus('sending');
    try {
      const dataToSend = {
        ...formData,
        currentAnimalDetails: currentAnimals.filter(a => a.trim()).join('\n'),
        previousAnimalDetails: previousAnimals.filter(a => a.trim()).join('\n'),
        captchaToken,
      };
      const res = await fetch('/api/adoption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      if (res.ok) { setStatus('success'); window.scrollTo(0, 0); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  // --- Step navigation ---

  const scrollToFormTop = () => {
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateStep = useCallback(() => {
    const stepEl = stepRefs.current[currentStep];
    if (!stepEl) return true;

    const elements = stepEl.querySelectorAll('input, select, textarea');
    for (const el of elements) {
      const htmlEl = el as HTMLInputElement;
      if (htmlEl.offsetParent === null) continue;
      if (htmlEl.name === 'website') continue;
      if (!htmlEl.checkValidity()) {
        htmlEl.reportValidity();
        return false;
      }
    }
    return true;
  }, [currentStep]);

  const goNext = () => {
    if (validateStep()) {
      setCurrentStep(s => Math.min(s + 1, STEPS.length - 1));
      scrollToFormTop();
    }
  };

  const goPrev = () => {
    setCurrentStep(s => Math.max(s - 1, 0));
    scrollToFormTop();
  };

  const goToStep = (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
      scrollToFormTop();
    }
  };

  // --- Conditional visibility ---

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
  const locationWorkEnclosure = formData.animalLocationWork === 'En enclos';
  const locationHomeEnclosure = formData.animalLocationHome === 'En enclos';
  const heardOther = formData.howHeardAbout === 'Autre';
  const hasCurrentOrPrevious = hasCurrentAnimal || hadPreviousAnimal;

  const show = (visible: boolean) => (visible ? undefined : { display: 'none' as const });
  const stepStyle = (index: number) => currentStep === index ? undefined : { display: 'none' as const };
  const isLastStep = currentStep === STEPS.length - 1;

  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input type="radio" required={required} name={name} value={value}
        checked={formData[field as keyof typeof formData] === value}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} />
      {value}
    </label>
  );

  const animalInputs = (
    animals: string[],
    setAnimals: React.Dispatch<React.SetStateAction<string[]>>,
    isVisible: boolean
  ) => (
    <>
      {animals.map((animal, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input type="text" required={isVisible} className="form-input"
            placeholder={`Animal ${i + 1} — ex : chat européen, femelle, 3 ans`}
            value={animal}
            onChange={(e) => { const u = [...animals]; u[i] = e.target.value; setAnimals(u); }} />
          {animals.length > 1 && (
            <button type="button" className="btn btn-outline"
              style={{ padding: '0.5rem 0.75rem', flexShrink: 0 }}
              onClick={() => setAnimals(animals.filter((_, j) => j !== i))}>✕</button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-outline"
        style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
        onClick={() => setAnimals([...animals, ''])}>+ Ajouter un animal</button>
    </>
  );

  return (
    <div ref={formTopRef}>
      {status === 'success' ? (
        <div className="alert alert-success">
          <strong>✓ Merci !</strong><br />
          Votre demande d&apos;adoption a été envoyée avec succès. Vous allez recevoir une copie par mail. Nous vous contacterons très prochainement.
        </div>
      ) : (
        <>
          {/* ========== PROGRESS BAR ========== */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', position: 'relative' }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                flex: 1, position: 'relative',
              }}>
                {i > 0 && (
                  <div style={{
                    position: 'absolute', top: '15px', right: '50%', width: '100%', height: '2px',
                    background: i <= currentStep ? '#009EA1' : '#d1d5db', zIndex: 0,
                  }} />
                )}
                <div
                  onClick={() => goToStep(i)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: i < currentStep ? '#009EA1' : i === currentStep ? '#007273' : '#e5e7eb',
                    color: i <= currentStep ? 'white' : '#9ca3af',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', fontWeight: 600, zIndex: 1, transition: 'all 0.2s ease',
                    cursor: i < currentStep ? 'pointer' : 'default',
                  }}
                >
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <div className="form-step-label" style={{
                  fontSize: '0.7rem', marginTop: '0.4rem', textAlign: 'center',
                  color: i <= currentStep ? '#007273' : '#9ca3af',
                  fontWeight: i === currentStep ? 600 : 400,
                }}>
                  {step.label}
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Étape {currentStep + 1} sur {STEPS.length}
          </p>

          <form onSubmit={handleSubmit} className="form-flow">
            <input type="text" name="website" value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="honeypot" tabIndex={-1} />

            {/* ========== STEP 0: L'ANIMAL ========== */}
            <div ref={el => { stepRefs.current[0] = el; }} style={stepStyle(0)}>
              <h3 className="form-section-title">L&apos;animal souhaité</h3>

              <div>
                <label className="form-label">
                  Si vous savez déjà lequel de nos animaux vous souhaitez rencontrer, cliquez sur sa photo
                </label>
                <div className="cat-picker">
                  {cats.map(cat => (
                    <button key={cat.id} type="button"
                      onClick={() => setFormData({ ...formData, animalName: cat.name })}
                      className={`cat-picker-btn ${formData.animalName === cat.name ? 'active' : ''}`}>
                      <div className="cat-picker-img">
                        {cat.images[0] ? (
                          <Image src={cat.images[0]} alt={cat.name} width={120} height={80} sizes="80px" />
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
                    <button type="button" onClick={() => setFormData({ ...formData, animalName: '' })}>Annuler</button>
                  </div>
                )}
              </div>

              <div>
                <label className="form-label">Vous souhaitez adopter un : *</label>
                <select required className="form-select" value={formData.animalType}
                  onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}>
                  <option value="Chat">Chat</option>
                  <option value="Chien">Chien</option>
                </select>
              </div>

              <div>
                <label className="form-label">À partir de quelle date pouvez-vous accueillir votre compagnon ? *</label>
                <input type="date" required className="form-input" value={formData.adoptionDate}
                  onChange={(e) => setFormData({ ...formData, adoptionDate: e.target.value })} />
                <div className="form-hint">Pour rappel, nous ne faisons pas de « réservation »</div>
              </div>
            </div>

            {/* ========== STEP 1: COORDONNÉES ========== */}
            <div ref={el => { stepRefs.current[1] = el; }} style={stepStyle(1)}>
              <h3 className="form-section-title">Vos coordonnées</h3>

              <div className="form-grid">
                <div>
                  <label className="form-label">Nom de famille *</label>
                  <input type="text" required className="form-input" value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Prénom *</label>
                  <input type="text" required className="form-input" value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="form-label">Adresse *</label>
                <input type="text" required className="form-input" value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </div>

              <div className="form-grid-13">
                <div>
                  <label className="form-label">Code postal *</label>
                  <input type="text" required className="form-input" value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Ville *</label>
                  <input type="text" required className="form-input" value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label className="form-label">Téléphone *</label>
                  <input type="tel" required className="form-input" value={formData.mobilePhone}
                    onChange={(e) => setFormData({ ...formData, mobilePhone: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Téléphone fixe</label>
                  <input type="tel" className="form-input" value={formData.landlinePhone}
                    onChange={(e) => setFormData({ ...formData, landlinePhone: e.target.value })} />
                </div>
              </div>

              <div className="form-grid-31">
                <div>
                  <label className="form-label">E-mail *</label>
                  <input type="email" required className="form-input" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Âge *</label>
                  <input type="number" required className="form-input" value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                </div>
              </div>
            </div>

            {/* ========== STEP 2: LOGEMENT ========== */}
            <div ref={el => { stepRefs.current[2] = el; }} style={stepStyle(2)}>
              <h3 className="form-section-title">Votre logement</h3>

              <div className="form-grid">
                <div>
                  <label className="form-label">Superficie *</label>
                  <input type="number" required className="form-input" value={formData.surface}
                    onChange={(e) => setFormData({ ...formData, surface: e.target.value })} />
                  <div className="form-hint">en m²</div>
                </div>
                <div>
                  <label className="form-label">Type de logement *</label>
                  <select required className="form-select" value={formData.housingType}
                    onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}>
                    <option value="">Sélectionnez</option>
                    <option value="Maison">Maison</option>
                    <option value="Appartement">Appartement</option>
                  </select>
                </div>
              </div>

              <div style={show(isHouse)}>
                <label className="form-checkbox">
                  <input type="checkbox" checked={formData.hasGardenEnclosed}
                    onChange={(e) => setFormData({ ...formData, hasGardenEnclosed: e.target.checked })} />
                  <span>Avec jardin clôturé</span>
                </label>
              </div>

              <div style={show(isApartment)}>
                <label className="form-label">Quel étage ? {isApartment && '*'}</label>
                <input type="number" required={isApartment} className="form-input" value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })} />
              </div>

              <div>
                <label className="form-label">Êtes-vous propriétaire ? *</label>
                <div className="form-radio-group">
                  {radio('isOwner', 'Oui', 'isOwner')}
                  {radio('isOwner', 'Non', 'isOwner')}
                </div>
              </div>

              <div style={show(isRenter)}>
                <label className="form-label">Avez-vous la permission d&apos;avoir un animal ? {isRenter && '*'}</label>
                <div className="form-radio-group">
                  {radio('hasPermission', 'Oui', 'hasPermission', isRenter)}
                  {radio('hasPermission', 'Non', 'hasPermission', isRenter)}
                </div>
              </div>

              <div>
                <label className="form-label">Prévoyez-vous de déménager prochainement ? *</label>
                <div className="form-radio-group">
                  {radio('movingSoon', 'Oui', 'movingSoon')}
                  {radio('movingSoon', 'Non', 'movingSoon')}
                </div>
              </div>

              <div style={show(isMoving)}>
                <label className="form-label">Adresse du projet {isMoving && '*'}</label>
                <input type="text" required={isMoving} className="form-input" value={formData.movingAddress}
                  onChange={(e) => setFormData({ ...formData, movingAddress: e.target.value })} />
              </div>
            </div>

            {/* ========== STEP 3: FOYER ========== */}
            <div ref={el => { stepRefs.current[3] = el; }} style={stepStyle(3)}>
              <h3 className="form-section-title">Votre foyer</h3>

              <div>
                <label className="form-label">Êtes-vous actuellement salarié.e ? *</label>
                <div className="form-radio-group">
                  {radio('employed', 'Oui', 'employed')}
                  {radio('employed', 'Non', 'employed')}
                  {radio('employed', 'Autre', 'employed')}
                </div>
              </div>

              <div style={show(employedOther)}>
                <label className="form-label">Précisez {employedOther && '*'}</label>
                <input type="text" required={employedOther} className="form-input" value={formData.employedOther}
                  onChange={(e) => setFormData({ ...formData, employedOther: e.target.value })} />
              </div>

              <div className="form-grid">
                <div>
                  <label className="form-label">Nombre d&apos;adultes *</label>
                  <input type="number" required className="form-input" value={formData.numAdults}
                    onChange={(e) => setFormData({ ...formData, numAdults: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Nombre d&apos;enfants *</label>
                  <input type="number" required className="form-input" value={formData.numChildren}
                    onChange={(e) => setFormData({ ...formData, numChildren: e.target.value })} />
                </div>
              </div>

              <div style={show(hasChildren)}>
                <label className="form-label">Âges des enfants {hasChildren && '*'}</label>
                <input type="text" required={hasChildren} className="form-input" value={formData.childrenAges}
                  onChange={(e) => setFormData({ ...formData, childrenAges: e.target.value })} />
              </div>

              <div>
                <label className="form-label">Y a-t-il quelqu&apos;un à la maison en journée ? *</label>
                <div className="form-radio-group">
                  {radio('someoneHomeDuringDay', 'Oui', 'someoneHomeDuringDay')}
                  {radio('someoneHomeDuringDay', 'Non', 'someoneHomeDuringDay')}
                </div>
              </div>

              <div style={show(notHomeDay)}>
                <label className="form-label">Combien d&apos;heures d&apos;absence ? {notHomeDay && '*'}</label>
                <input type="text" required={notHomeDay} className="form-input" value={formData.hoursAbsence}
                  onChange={(e) => setFormData({ ...formData, hoursAbsence: e.target.value })} />
              </div>

              <div>
                <label className="form-label">Un occupant souffre-t-il d&apos;allergies ou d&apos;asthme ? *</label>
                <div className="form-radio-group">
                  {radio('hasAllergies', 'Oui', 'hasAllergies')}
                  {radio('hasAllergies', 'Non', 'hasAllergies')}
                  {radio('hasAllergies', 'Je ne sais pas', 'hasAllergies')}
                </div>
              </div>

              <div style={show(noChildren)}>
                <label className="form-label">Si vous projetez d&apos;avoir des enfants, cela vous semble-t-il compatible avec un animal ? {noChildren && '*'}</label>
                <div className="form-radio-group">
                  {radio('childrenCompatible', 'Oui', 'childrenCompatible', noChildren)}
                  {radio('childrenCompatible', 'Non', 'childrenCompatible', noChildren)}
                  {radio('childrenCompatible', 'Autre', 'childrenCompatible', noChildren)}
                </div>
              </div>

              <div style={show(noChildren && childrenProjectOther)}>
                <label className="form-label">Précisez {noChildren && childrenProjectOther && '*'}</label>
                <input type="text" required={noChildren && childrenProjectOther} className="form-input" value={formData.childrenCompatibleOther}
                  onChange={(e) => setFormData({ ...formData, childrenCompatibleOther: e.target.value })} />
              </div>

              <div style={show(isCouple)}>
                <label className="form-label">En cas de séparation, qui gardera l&apos;animal ? {isCouple && '*'}</label>
                <input type="text" required={isCouple} className="form-input" value={formData.coupleSeparation}
                  onChange={(e) => setFormData({ ...formData, coupleSeparation: e.target.value })} />
              </div>
              <hr className="form-divider" />

                {/* ANIMAUX (same step) */}
                <h3 className="form-section-title">Vos animaux</h3>

              <div>
                <label className="form-label">Avez-vous un animal à la maison ? *</label>
                <div className="form-radio-group">
                  {radio('hasAnimalNow', 'Oui', 'hasAnimalNow')}
                  {radio('hasAnimalNow', 'Non', 'hasAnimalNow')}
                </div>
              </div>

              <div style={show(hasCurrentAnimal)}>
                <div>
                  <label className="form-label">Espèce, race, sexe et âge {hasCurrentAnimal && '*'}</label>
                  {animalInputs(currentAnimals, setCurrentAnimals, hasCurrentAnimal)}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label className="form-label">Vos animaux sont-ils</label>
                  <div className="form-checkbox-group">
                    <label className="form-checkbox">
                      <input type="checkbox" checked={formData.currentAnimalsSterilized}
                        onChange={(e) => setFormData({ ...formData, currentAnimalsSterilized: e.target.checked })} />
                      <span>Stérilisés</span>
                    </label>
                    <label className="form-checkbox">
                      <input type="checkbox" checked={formData.currentAnimalsVaccinated}
                        onChange={(e) => setFormData({ ...formData, currentAnimalsVaccinated: e.target.checked })} />
                      <span>Vaccinés</span>
                    </label>
                    <label className="form-checkbox">
                      <input type="checkbox" checked={formData.currentAnimalsTested}
                        onChange={(e) => setFormData({ ...formData, currentAnimalsTested: e.target.checked })} />
                      <span>Testés FIV/FeLV (pour les chats)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label">Avez-vous déjà eu un animal ? *</label>
                <div className="form-radio-group">
                  {radio('hadAnimalBefore', 'Oui', 'hadAnimalBefore')}
                  {radio('hadAnimalBefore', 'Non', 'hadAnimalBefore')}
                </div>
              </div>

              <div style={show(hadPreviousAnimal)}>
                <label className="form-label">Espèce, race, sexe et âge {hadPreviousAnimal && '*'}</label>
                {animalInputs(previousAnimals, setPreviousAnimals, hadPreviousAnimal)}
              </div>

              <div>
                <label className="form-label">Avez-vous dû vous séparer d&apos;un animal par le passé ? *</label>
                <div className="form-radio-group">
                  {radio('hadToSeparate', 'Oui', 'hadToSeparate')}
                  {radio('hadToSeparate', 'Non', 'hadToSeparate')}
                </div>
              </div>

              <div style={show(didSeparate)}>
                <label className="form-label">Pour quelle raison ? {didSeparate && '*'}</label>
                <textarea required={didSeparate} rows={3} className="form-textarea" value={formData.separationReason}
                  onChange={(e) => setFormData({ ...formData, separationReason: e.target.value })} />
              </div>

              <div style={show(hasCurrentOrPrevious)}>
                <label className="form-label">Avez-vous déjà adopté via un refuge ou une association ? {hasCurrentOrPrevious && '*'}</label>
                <div className="form-radio-group">
                  {radio('adoptedFromShelter', 'Oui', 'adoptedFromShelter', hasCurrentOrPrevious)}
                  {radio('adoptedFromShelter', 'Non', 'adoptedFromShelter', hasCurrentOrPrevious)}
                </div>
              </div>
            </div>

            {/* ========== STEP 4: PROJET D'ADOPTION ========== */}
            <div ref={el => { stepRefs.current[4] = el; }} style={stepStyle(4)}>
              <h3 className="form-section-title">Votre projet d&apos;adoption</h3>

              <div>
                <label className="form-label">Pour qui et pourquoi voulez-vous adopter, quelles sont vos motivations ? *</label>
                <textarea required rows={5} className="form-textarea" value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} />
              </div>

              <div>
                <label className="form-label">Quelle est votre opinion sur la stérilisation / castration ? *</label>
                <textarea required rows={3} className="form-textarea" value={formData.sterilizationOpinion}
                  onChange={(e) => setFormData({ ...formData, sterilizationOpinion: e.target.value })} />
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

              <div style={show(careAbsenceHasOther)}>
                <label className="form-label">Précisez {careAbsenceHasOther && '*'}</label>
                <input type="text" required={careAbsenceHasOther} className="form-input" value={formData.careAbsenceOther}
                  onChange={(e) => setFormData({ ...formData, careAbsenceOther: e.target.value })} />
              </div>

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

              </div>

            {/* ========== STEP 5: BUDGET & FIN ========== */}
            <div ref={el => { stepRefs.current[5] = el; }} style={stepStyle(5)}>
              <h3 className="form-section-title">Budget & soins</h3>

              <div>
                <label className="form-label">Avez-vous une idée du montant des frais vétérinaires ? *</label>
                <div className="form-radio-group">
                  {radio('knowsVetCosts', 'Oui', 'knowsVetCosts')}
                  {radio('knowsVetCosts', 'Non', 'knowsVetCosts')}
                </div>
              </div>

              <div style={show(knowsVetCosts)}>
                <label className="form-label">Estimation des dépenses par an ? {knowsVetCosts && '*'}</label>
                <input type="text" required={knowsVetCosts} className="form-input" value={formData.vetCostsEstimate}
                  onChange={(e) => setFormData({ ...formData, vetCostsEstimate: e.target.value })} />
              </div>

              <div>
                <label className="form-label">À partir de quel montant seriez-vous en difficulté pour payer en une fois ? *</label>
                <select required className="form-select" value={formData.emergencyPaymentThreshold}
                  onChange={(e) => setFormData({ ...formData, emergencyPaymentThreshold: e.target.value })}>
                  <option value="">Sélectionnez</option>
                  {['150€', '300€', '500€', '750€', '1 000€', '1 500€', '2 000€', '3 000€', '4 000€'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Si votre animal présente des signes de maladie, que faites-vous ? Et le week-end ? *</label>
                <textarea required rows={3} className="form-textarea" value={formData.sickAnimalAction}
                  onChange={(e) => setFormData({ ...formData, sickAnimalAction: e.target.value })} />
              </div>

              <div>
                <label className="form-label">Comment imaginez-vous ses repas ? *</label>
                <input type="text" required className="form-input" value={formData.mealsDescription}
                  onChange={(e) => setFormData({ ...formData, mealsDescription: e.target.value })}
                  placeholder="Nombre de repas, type d'alimentation, marques..." />
              </div>

              <div>
                <label className="form-label">Avez-vous une idée du budget mensuel (nourriture, litière…) ? *</label>
                <div className="form-radio-group">
                  {radio('knowsMonthlyBudget', 'Oui', 'knowsMonthlyBudget')}
                  {radio('knowsMonthlyBudget', 'Non', 'knowsMonthlyBudget')}
                </div>
              </div>

              <div style={show(knowsBudget)}>
                <label className="form-label">Estimation des dépenses mensuelles ? {knowsBudget && '*'}</label>
                <input type="text" required={knowsBudget} className="form-input" value={formData.monthlyBudgetEstimate}
                  onChange={(e) => setFormData({ ...formData, monthlyBudgetEstimate: e.target.value })} />
              </div>

              <div>
                <label className="form-label">Au travail ou de sortie, où sera votre animal ? *</label>
                <select required className="form-select" value={formData.animalLocationWork}
                  onChange={(e) => setFormData({ ...formData, animalLocationWork: e.target.value })}>
                  <option value="">Sélectionnez</option>
                  {['Dans une pièce', 'En cage', 'En enclos', 'Dehors', 'Libre dans le logement', 'Sur la terrasse / le balcon'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div style={show(locationWorkEnclosure)}>
                <label className="form-label">Surface de l&apos;enclos ? {locationWorkEnclosure && '*'}</label>
                <input type="number" required={locationWorkEnclosure} className="form-input" value={formData.animalLocationWorkSurface}
                  onChange={(e) => setFormData({ ...formData, animalLocationWorkSurface: e.target.value })} />
                <div className="form-hint">en m²</div>
              </div>

              <div>
                <label className="form-label">Quand vous êtes présent, où sera votre animal ? *</label>
                <select required className="form-select" value={formData.animalLocationHome}
                  onChange={(e) => setFormData({ ...formData, animalLocationHome: e.target.value })}>
                  <option value="">Sélectionnez</option>
                  {['Dans une pièce', 'En cage', 'En enclos', 'Dehors', 'Libre dans le logement', 'Sur la terrasse / le balcon'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div style={show(locationHomeEnclosure)}>
                <label className="form-label">Surface de l&apos;enclos ? {locationHomeEnclosure && '*'}</label>
                <input type="number" required={locationHomeEnclosure} className="form-input" value={formData.animalLocationHomeSurface}
                  onChange={(e) => setFormData({ ...formData, animalLocationHomeSurface: e.target.value })} />
                <div className="form-hint">en m²</div>
              </div>

              <hr className="form-divider" />
              <h3 className="form-section-title">Pour finir</h3>

              <div className="form-grid">
                <div>
                  <label className="form-label">Comment avez-vous connu l&apos;association ? *</label>
                  <select required className="form-select" value={formData.howHeardAbout}
                    onChange={(e) => setFormData({ ...formData, howHeardAbout: e.target.value })}>
                    <option value="">Sélectionnez</option>
                    {['Réseaux sociaux', 'Recherche Google', 'Internet', 'Vétérinaire', 'Autre'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div style={show(heardOther)}>
                  <label className="form-label">Précisez</label>
                  <input type="text" className="form-input" value={formData.howHeardAboutOther}
                    onChange={(e) => setFormData({ ...formData, howHeardAboutOther: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="form-label">Remarques / questions</label>
                <textarea rows={4} className="form-textarea" value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
              </div>

              <div className="form-privacy">
                L&apos;association Nine Lives Paris traite les données recueillies afin de gérer les demandes d&apos;adoption.
              </div>

              <label className="form-checkbox">
                <input type="checkbox" required checked={formData.acceptsPrivacy}
                  onChange={(e) => setFormData({ ...formData, acceptsPrivacy: e.target.checked })} />
                <span>J&apos;ai lu et j&apos;accepte <a href="/politique-de-confidentialite" target="_blank" rel="noopener" className="link-blue">la politique de confidentialité</a>. *</span>
              </label>

              <Captcha onVerify={setCaptchaToken} />
            </div>

            {/* ========== NAVIGATION ========== */}
            <div style={{
              display: 'flex',
              justifyContent: currentStep === 0 ? 'flex-end' : 'space-between',
              alignItems: 'center',
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb',
            }}>
              {currentStep > 0 && (
                <button type="button" onClick={goPrev} className="btn btn-outline">
                  ← Précédent
                </button>
              )}

              {isLastStep ? (
                <button type="submit" disabled={status === 'sending' || !captchaToken}
                  className="btn btn-gradient btn-lg">
                  {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              ) : (
                <button type="button" onClick={goNext} className="btn btn-gradient">
                  Suivant →
                </button>
              )}
            </div>

            {status === 'error' && (
              <div className="alert alert-error" style={{ marginTop: '1rem' }}>
                <strong>Erreur</strong> lors de l&apos;envoi. Veuillez réessayer ou nous contacter directement.
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}