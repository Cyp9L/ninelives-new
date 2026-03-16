'use client';
import { useState, useRef, useCallback } from 'react';
import Captcha from '@/components/Captcha';

const FOSTER_STEPS = [
  { label: 'Vous' },
  { label: 'Chez vous' },
  { label: 'Expérience' },
  { label: 'Pratique' },
];

const BENEVOLE_STEPS = [
  { label: 'Vous' },
  { label: 'Pratique' },
];

export default function BenevoleForm() {
  /* ---- State: ONLY fields that drive conditional visibility, arrays, or booleans ---- */
  const [formState, setFormState] = useState({
    volunteerType: '',
    housingType: '',
    balconySecured: '',
    hasOutdoor: '',
    outdoorSecured: '',
    canDoQuarantine: '',
    wantPitieSalpetriereQuarantine: '',
    hasChildren: '',
    hasAnimalsHome: '',
    animalsSterilized: false,
    animalsIdentified: false,
    animalsVaccinated: false,
    animalsTested: false,
    beenFosterBefore: '',
    catExperience: '',
    catCarePractices: [] as string[],
    catTypes: [] as string[],
    fosterDuration: [] as string[],
    goingOnVacation: '',
    householdAgrees: '',
    hasAssociationVet: '',
    canDoTransport: [] as string[],
    openToOtherMissions: '',
    acceptsPrivacy: false,
    honeypot: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  /* ---- Conditionals ---- */
  const isFoster = formState.volunteerType === "Famille d'accueil" || formState.volunteerType === 'Les deux';
  const isApartment = formState.housingType === 'En appartement';
  const hasBalcony = formState.balconySecured === 'Oui';
  const hasOutdoorYes = formState.hasOutdoor === 'Oui';
  const canQuarantine = formState.canDoQuarantine === 'Oui';
  const hasChildrenYes = formState.hasChildren === 'Oui';
  const hasAnimals = formState.hasAnimalsHome === 'Oui';
  const hadFosterExp = formState.beenFosterBefore === 'Oui';
  const vacationSoon = formState.goingOnVacation === 'Oui';
  const householdDisagrees = formState.householdAgrees === 'Non';
  const hasAssocVet = formState.hasAssociationVet === 'Oui';
  const canTransport =
    formState.canDoTransport.includes('Oui, en voiture') ||
    formState.canDoTransport.includes('Oui, en transports en commun');
  const wantsOtherMissions = formState.openToOtherMissions === 'Oui';
  const hasCareOther = formState.catCarePractices.includes('Autre');
  const hasDeterminedDuration = formState.fosterDuration.includes('Pour une durée déterminée');

  const steps = isFoster ? FOSTER_STEPS : BENEVOLE_STEPS;
  const lastStep = steps.length - 1;

  /* ---- Helpers ---- */
  const show = (visible: boolean) => (visible ? undefined : { display: 'none' as const });
  const stepStyle = (i: number): React.CSSProperties => ({ display: currentStep === i ? 'block' : 'none' });

  const updateField = useCallback((field: string, value: string | boolean) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleCheckboxArray = useCallback((field: string, value: string) => {
    setFormState(prev => {
      const current = (prev as any)[field] as string[];
      return {
        ...prev,
        [field]: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
      };
    });
  }, []);

  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio" name={name} value={value} required={required}
        checked={(formState as any)[field] === value}
        onChange={() => updateField(field, value)}
      />
      {value}
    </label>
  );

  /* ---- Navigation ---- */
  const validateStep = () => {
    const stepEl = stepRefs.current[currentStep];
    if (!stepEl) return true;
    const inputs = stepEl.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input[required], select[required], textarea[required]'
    );
    for (const el of inputs) {
      if (el.offsetParent === null) continue; // skip hidden
      if (!el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }
    return true;
  };

  const scrollToForm = () => {
    window.scrollTo({ top: (formRef.current?.offsetTop ?? 0) - 20, behavior: 'smooth' });
  };

  const goNext = () => {
    if (validateStep() && currentStep < lastStep) {
      setCurrentStep(currentStep + 1);
      scrollToForm();
    }
  };
  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToForm();
    }
  };

  /* ---- Submit ---- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.honeypot) return;
    if (!validateStep()) return;

    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const textData: Record<string, string> = {};
    fd.forEach((value, key) => {
      if (typeof value === 'string' && key !== 'website') textData[key] = value;
    });

    // Defaults for fields that may not exist in DOM (foster steps hidden for bénévole)
    const defaults: Record<string, string> = {
      surface: '', numRooms: '', floor: '', balconySecuredHow: '', quarantineRoom: '',
      numPeopleHousehold: '', childrenAges: '', childrenUsedToAnimals: '',
      numDogs: '', numCats: '', numOthers: '', animalsDetails: '', animalsLocation: '',
      hoursAlonePerDay: '', whyFoster: '', fosterReferences: '',
      catCareOther: '', catHidingReaction: '', catLitterIssueReaction: '', catDealbreakers: '',
      numCatsCanFoster: '', fosterDurationOther: '',
      vacationDates: '', vacationCare: '',
      feedingPlan: '', hasEquipment: '',
      vetCastration: '', vetOvariectomy: '', vetVaccination: '', vetContact: '',
      transportDistance: '', otherMissions: '', questions: '',
    };

    const dataToSend = { ...defaults, ...textData, ...formState, captchaToken };
    delete (dataToSend as any).honeypot;

    setStatus('sending');
    try {
      const res = await fetch('/api/benevole', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (res.ok) { setStatus('success'); window.scrollTo(0, 0); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="alert alert-success">
        <strong>✓ Merci !</strong><br />
        Votre candidature a été envoyée avec succès. Vous allez recevoir une copie par mail.
        Nous vous contacterons très prochainement.
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form-flow" noValidate>
      <input type="text" name="website" className="honeypot" tabIndex={-1}
        onChange={(e) => updateField('honeypot', e.target.value)} />

      {/* ---- Progress bar ---- */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        {steps.map((step, i) => (
          <div key={`${step.label}-${i}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '3rem' }}>
            <button type="button"
              onClick={() => i < currentStep && setCurrentStep(i)}
              disabled={i >= currentStep}
              style={{
                width: '2rem', height: '2rem', borderRadius: '50%',
                border: i <= currentStep ? '2px solid #007273' : '2px solid #d1d5db',
                background: i < currentStep ? '#007273' : i === currentStep ? '#fff' : '#f3f4f6',
                color: i < currentStep ? '#fff' : i === currentStep ? '#007273' : '#9ca3af',
                fontWeight: 600, fontSize: '0.85rem',
                cursor: i < currentStep ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
              }}>
              {i + 1}
            </button>
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
      <p className="text-center text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        Étape {currentStep + 1} sur {steps.length}
      </p>

      {/* ===== STEP 0: VOUS ===== */}
      <div ref={el => { stepRefs.current[0] = el; }} style={stepStyle(0)}>
        <h3 className="form-section-title">Vos coordonnées</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="form-label">Nom de famille *</label>
            <input type="text" name="lastName" required className="form-input" />
          </div>
          <div>
            <label className="form-label">Prénom *</label>
            <input type="text" name="firstName" required className="form-input" />
          </div>
          <div>
            <label className="form-label">Âge *</label>
            <input type="number" name="age" required className="form-input" />
          </div>
        </div>

        <div>
          <label className="form-label">Adresse *</label>
          <input type="text" name="address" required className="form-input" />
        </div>

        <div className="form-grid">
          <div>
            <label className="form-label">Code postal *</label>
            <input type="text" name="postalCode" required className="form-input" />
          </div>
          <div>
            <label className="form-label">Ville *</label>
            <input type="text" name="city" required className="form-input" />
          </div>
        </div>

        <div className="form-grid">
          <div>
            <label className="form-label">E-mail *</label>
            <input type="email" name="email" required className="form-input" />
          </div>
          <div>
            <label className="form-label">Téléphone *</label>
            <input type="tel" name="phone" required className="form-input" />
          </div>
        </div>

        <div>
          <label className="form-label">Créneaux auxquels nous pouvons vous joindre</label>
          <input type="text" name="contactSlots" className="form-input" />
        </div>

        <hr className="form-divider" />

        <div>
          <label className="form-label">Vous souhaitez vous proposer en tant que : *</label>
          <div className="form-radio-group">
            {radio('volunteerType', "Famille d'accueil", 'volunteerType')}
            {radio('volunteerType', 'Bénévole', 'volunteerType')}
            {radio('volunteerType', 'Les deux', 'volunteerType')}
          </div>
        </div>

        <div className="alert alert-warning">
          <strong>Nous ne disposons pas de refuge</strong> — tous nos animaux sont en familles d&apos;accueil.
          Nous n&apos;avons donc pas besoin de bénévoles pour nourrir les animaux, nettoyer les litières ou un local.
        </div>
      </div>

      {/* ===== STEP 1 (FOSTER): CHEZ VOUS ===== */}
      {isFoster && (
        <div ref={el => { stepRefs.current[1] = el; }} style={stepStyle(1)}>
          <h3 className="form-section-title">Votre logement</h3>

          <div className="form-grid">
            <div>
              <label className="form-label">Superficie ? *</label>
              <input type="number" name="surface" required className="form-input" />
              <div className="form-hint">en m²</div>
            </div>
            <div>
              <label className="form-label">Vous vivez : *</label>
              <div className="form-radio-group" style={{ marginTop: '0.5rem' }}>
                {radio('housingType', 'En maison', 'housingType')}
                {radio('housingType', 'En appartement', 'housingType')}
              </div>
            </div>
          </div>

          <div className="form-grid">
            <div>
              <label className="form-label">Nombre de pièces *</label>
              <input type="number" name="numRooms" required className="form-input" />
            </div>
            <div style={show(isApartment)}>
              <label className="form-label">Étage {isApartment && '*'}</label>
              <input type="text" name="floor" required={isApartment} className="form-input" />
            </div>
          </div>

          <div style={show(isApartment)}>
            <label className="form-label">Si vous avez un balcon, est-il sécurisé ?</label>
            <select name="balconySecured" className="form-select"
              value={formState.balconySecured}
              onChange={(e) => updateField('balconySecured', e.target.value)}>
              <option value="">Sélectionnez</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>

          <div style={show(isApartment && hasBalcony)}>
            <label className="form-label">De quelle manière ? {isApartment && hasBalcony && '*'}</label>
            <input type="text" name="balconySecuredHow" required={isApartment && hasBalcony} className="form-input" />
          </div>

          <div className="form-grid">
            <div>
              <label className="form-label">Votre logement possède-t-il un extérieur ? *</label>
              <select name="hasOutdoor" required className="form-select"
                value={formState.hasOutdoor}
                onChange={(e) => updateField('hasOutdoor', e.target.value)}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            <div style={show(hasOutdoorYes)}>
              <label className="form-label">Est-il sécurisé ? {hasOutdoorYes && '*'}</label>
              <select name="outdoorSecured" required={hasOutdoorYes} className="form-select"
                value={formState.outdoorSecured}
                onChange={(e) => updateField('outdoorSecured', e.target.value)}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Pouvez-vous effectuer des quarantaines ? *</label>
            <div className="form-radio-group">
              {radio('canDoQuarantine', 'Oui', 'canDoQuarantine')}
              {radio('canDoQuarantine', 'Non', 'canDoQuarantine')}
            </div>
            <div className="form-hint">Période de 15 jours où l&apos;animal est dans un espace restreint et facile à nettoyer</div>
          </div>

          <div style={show(canQuarantine)}>
            <div>
              <label className="form-label">Quarantaines pour les chats errants de la Pitié-Salpêtrière ?</label>
              <div className="form-radio-group">
                {radio('wantPitieSalpetriereQuarantine', 'Oui', 'wantPitieSalpetriereQuarantine', false)}
                {radio('wantPitieSalpetriereQuarantine', 'Non', 'wantPitieSalpetriereQuarantine', false)}
                {radio('wantPitieSalpetriereQuarantine', 'Peu importe', 'wantPitieSalpetriereQuarantine', false)}
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label className="form-label">Dans quelle pièce ?</label>
              <input type="text" name="quarantineRoom" className="form-input" placeholder="Superficie, avec fenêtre…" />
            </div>
          </div>

          <hr className="form-divider" />
          <h3 className="form-section-title">Votre foyer</h3>

          <div className="form-grid">
            <div>
              <label className="form-label">Nombre de personnes dans le foyer *</label>
              <input type="number" name="numPeopleHousehold" required className="form-input" />
            </div>
            <div>
              <label className="form-label">Avez-vous des enfants ? *</label>
              <select name="hasChildren" required className="form-select"
                value={formState.hasChildren}
                onChange={(e) => updateField('hasChildren', e.target.value)}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>

          <div className="form-grid" style={show(hasChildrenYes)}>
            <div>
              <label className="form-label">Âges des enfants {hasChildrenYes && '*'}</label>
              <input type="text" name="childrenAges" required={hasChildrenYes} className="form-input" />
            </div>
            <div>
              <label className="form-label">Habitués aux animaux ? {hasChildrenYes && '*'}</label>
              <input type="text" name="childrenUsedToAnimals" required={hasChildrenYes} className="form-input" />
            </div>
          </div>

          <div>
            <label className="form-label">Avez-vous des animaux à domicile ? *</label>
            <select name="hasAnimalsHome" required className="form-select"
              value={formState.hasAnimalsHome}
              onChange={(e) => updateField('hasAnimalsHome', e.target.value)}>
              <option value="">Sélectionnez</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>

          <div style={show(hasAnimals)}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Chiens {hasAnimals && '*'}</label>
                <input type="number" name="numDogs" required={hasAnimals} className="form-input" />
              </div>
              <div>
                <label className="form-label">Chats {hasAnimals && '*'}</label>
                <input type="number" name="numCats" required={hasAnimals} className="form-input" />
              </div>
              <div>
                <label className="form-label">Autres {hasAnimals && '*'}</label>
                <input type="number" name="numOthers" required={hasAnimals} className="form-input" />
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label className="form-label">Type / race, habitués aux autres animaux ? {hasAnimals && '*'}</label>
              <textarea name="animalsDetails" required={hasAnimals} rows={3} className="form-textarea" />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label className="form-label">Où vivent-ils ? {hasAnimals && '*'}</label>
              <input type="text" name="animalsLocation" required={hasAnimals} className="form-input" />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label className="form-label">Vos animaux sont-ils…</label>
              <div className="form-checkbox-group">
                {[
                  { key: 'animalsSterilized', label: 'Stérilisés' },
                  { key: 'animalsIdentified', label: 'Identifiés' },
                  { key: 'animalsVaccinated', label: 'Vaccinés et à jour' },
                  { key: 'animalsTested', label: 'Testés FIV/FeLV (chats)' },
                ].map(({ key, label }) => (
                  <label key={key} className="form-checkbox">
                    <input type="checkbox"
                      checked={(formState as any)[key] as boolean}
                      onChange={(e) => updateField(key, e.target.checked)} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="form-label">Combien d&apos;heures par jour le chat va-t-il rester seul ? *</label>
            <input type="text" name="hoursAlonePerDay" required className="form-input" />
          </div>
        </div>
      )}

      {/* ===== STEP 2 (FOSTER): EXPÉRIENCE ===== */}
      {isFoster && (
        <div ref={el => { stepRefs.current[2] = el; }} style={stepStyle(2)}>
          <h3 className="form-section-title">Votre motivation</h3>

          <div>
            <label className="form-label">Pourquoi souhaitez-vous être famille d&apos;accueil ? *</label>
            <textarea name="whyFoster" required rows={4} className="form-textarea" />
          </div>

          <div className="form-grid">
            <div>
              <label className="form-label">L&apos;avez-vous déjà été ? *</label>
              <select name="beenFosterBefore" required className="form-select"
                value={formState.beenFosterBefore}
                onChange={(e) => updateField('beenFosterBefore', e.target.value)}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            <div style={show(hadFosterExp)}>
              <label className="form-label">Références de l&apos;association</label>
              <input type="text" name="fosterReferences" className="form-input" />
            </div>
          </div>

          <hr className="form-divider" />
          <h3 className="form-section-title">Accueil de chats</h3>

          <div>
            <label className="form-label">Degré d&apos;expérience des chats *</label>
            <select name="catExperience" required className="form-select"
              value={formState.catExperience}
              onChange={(e) => updateField('catExperience', e.target.value)}>
              <option value="">Sélectionnez</option>
              {['Débutant', "J'ai (eu) un chat", "J'ai (eu) plusieurs chats", 'Je suis bilingue chat'].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Soins déjà pratiqués sur un chat *</label>
            <div className="form-checkbox-group">
              {[
                'Biberonner un nouveau-né', 'Couper les griffes',
                'Appliquer un antiparasitaire externe',
                'Administrer un médicament dans la gueule',
                'Administrer un médicament liquide à la seringue',
                'Appliquer un spray sur tout le corps (teigne…)',
                'Nettoyer une plaie', 'Pratiquer des inhalations',
                'Nettoyer des yeux / nez malades',
                'Appliquer une pommade dans les oreilles',
                'Effectuer une injection', 'Autre',
              ].map(practice => (
                <label key={practice} className="form-checkbox">
                  <input type="checkbox"
                    checked={formState.catCarePractices.includes(practice)}
                    onChange={() => handleCheckboxArray('catCarePractices', practice)} />
                  <span>{practice}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={show(hasCareOther)}>
            <label className="form-label">Précisez</label>
            <input type="text" name="catCareOther" className="form-input" />
          </div>

          <div>
            <label className="form-label">Réaction face à un chat caché depuis plusieurs jours ? *</label>
            <textarea name="catHidingReaction" required rows={3} className="form-textarea" />
          </div>

          <div>
            <label className="form-label">Réaction face à un chat qui fait hors litière ? *</label>
            <textarea name="catLitterIssueReaction" required rows={3} className="form-textarea" />
          </div>

          <div>
            <label className="form-label">Quelque chose de rédhibitoire pour l&apos;accueil d&apos;un chat ? *</label>
            <textarea name="catDealbreakers" required rows={3} className="form-textarea" />
          </div>
        </div>
      )}

      {/* ===== LAST STEP: PRATIQUE ===== */}
      <div ref={el => { stepRefs.current[lastStep] = el; }} style={stepStyle(lastStep)}>

        {/* Foster-specific: preferences + logistics */}
        {isFoster && (
          <>
            <h3 className="form-section-title">Préférences d&apos;accueil</h3>

            <div>
              <label className="form-label">Combien de chats pourriez-vous accueillir ? *</label>
              <input type="number" name="numCatsCanFoster" required className="form-input" />
            </div>

            <div>
              <label className="form-label">Quel type de chat(s) ? *</label>
              <div className="form-checkbox-group">
                {[
                  'Adulte', 'Chaton(s)', 'Mâle', 'Femelle', 'Peu importe',
                  'Une maman et sa portée', 'Chat craintif (à socialiser)',
                  'Chat ou chaton nécessitant des soins', 'Chat testé FIV+',
                  'Chat testé FeLV+', 'Chat diabétique', 'Chat en fin de vie',
                ].map(type => (
                  <label key={type} className="form-checkbox">
                    <input type="checkbox"
                      checked={formState.catTypes.includes(type)}
                      onChange={() => handleCheckboxArray('catTypes', type)} />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Durée d&apos;accueil possible *</label>
              <div className="form-checkbox-group">
                {[
                  "Après la quarantaine uniquement (mon animal n'est pas à jour)",
                  'Quelques jours',
                  '2 à 3 semaines (quarantaine)',
                  'Pour une durée déterminée',
                  "Quelques semaines ou mois (jusqu'à adoption)",
                ].map(duration => (
                  <label key={duration} className="form-checkbox">
                    <input type="checkbox"
                      checked={formState.fosterDuration.includes(duration)}
                      onChange={() => handleCheckboxArray('fosterDuration', duration)} />
                    <span>{duration}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={show(hasDeterminedDuration)}>
              <label className="form-label">Précisez</label>
              <input type="text" name="fosterDurationOther" className="form-input" />
            </div>

            <div className="form-grid">
              <div>
                <label className="form-label">Partez-vous en vacances bientôt ? *</label>
                <div className="form-radio-group">
                  {radio('goingOnVacation', 'Oui', 'goingOnVacation')}
                  {radio('goingOnVacation', 'Non', 'goingOnVacation')}
                </div>
              </div>
              <div style={show(vacationSoon)}>
                <label className="form-label">À quelles dates ? {vacationSoon && '*'}</label>
                <input type="text" name="vacationDates" required={vacationSoon} className="form-input" />
              </div>
            </div>

            <div style={show(vacationSoon)}>
              <label className="form-label">Qui s&apos;occupera de l&apos;animal ? {vacationSoon && '*'}</label>
              <input type="text" name="vacationCare" required={vacationSoon} className="form-input" />
            </div>

            <div>
              <label className="form-label">Tout le foyer est-il d&apos;accord ? *</label>
              <select name="householdAgrees" required className="form-select"
                value={formState.householdAgrees}
                onChange={(e) => updateField('householdAgrees', e.target.value)}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>

            <div style={show(householdDisagrees)}>
              <div className="alert alert-error">
                Merci d&apos;en rediscuter avec les membres de votre foyer et de revenir vers nous lorsqu&apos;ils seront tous d&apos;accord.
              </div>
            </div>

            <hr className="form-divider" />

            <div className="form-privacy">
              Les frais vétérinaires sont couverts par l&apos;association. La nourriture est généralement prise en charge
              par la famille d&apos;accueil (sauf pathologie nécessitant une alimentation adaptée).
            </div>

            <div>
              <label className="form-label">Comment nourrirez-vous les animaux ? *</label>
              <input type="text" name="feedingPlan" required className="form-input"
                placeholder="Type d'alimentation, marques…" />
            </div>

            <div>
              <label className="form-label">Avez-vous du matériel (litière, caisse, laisses…) ? *</label>
              <input type="text" name="hasEquipment" required className="form-input" />
            </div>

            <div>
              <label className="form-label">Vétérinaire à tarifs associatifs ?</label>
              <select name="hasAssociationVet" className="form-select"
                value={formState.hasAssociationVet}
                onChange={(e) => updateField('hasAssociationVet', e.target.value)}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
                <option value="Je ne sais pas, mais je me renseigne">Je me renseigne</option>
              </select>
            </div>

            <div style={show(hasAssocVet)}>
              <div className="form-hint">Tarifs approximatifs :</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                <div>
                  <label className="form-label">Castration</label>
                  <input type="text" name="vetCastration" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Ovariectomie</label>
                  <input type="text" name="vetOvariectomy" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Vaccination</label>
                  <input type="text" name="vetVaccination" className="form-input" />
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <label className="form-label">Coordonnées du vétérinaire</label>
                <input type="text" name="vetContact" className="form-input" />
              </div>
            </div>

            <hr className="form-divider" />
          </>
        )}

        {/* Common: transport, missions, submit */}
        <h3 className="form-section-title">Disponibilités</h3>

        <div>
          <label className="form-label">Possibilité d&apos;effectuer des transports ? *</label>
          <div className="form-checkbox-group">
            {['Oui, en voiture', 'Oui, en transports en commun', 'Non'].map(option => (
              <label key={option} className="form-checkbox">
                <input type="checkbox"
                  checked={formState.canDoTransport.includes(option)}
                  onChange={() => handleCheckboxArray('canDoTransport', option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={show(canTransport)}>
          <label className="form-label">Distance possible ? {canTransport && '*'}</label>
          <textarea name="transportDistance" required={canTransport} rows={3} className="form-textarea"
            placeholder="Distance en km, départements, remboursement…" />
        </div>

        <div>
          <label className="form-label">Disposé.e à d&apos;autres missions ? *</label>
          <select name="openToOtherMissions" required className="form-select"
            value={formState.openToOtherMissions}
            onChange={(e) => updateField('openToOtherMissions', e.target.value)}>
            <option value="">Sélectionnez</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>
        </div>

        <div style={show(wantsOtherMissions)}>
          <label className="form-label">Lesquelles ?</label>
          <textarea name="otherMissions" rows={3} className="form-textarea" />
        </div>

        <div>
          <label className="form-label">Questions ?</label>
          <textarea name="questions" rows={4} className="form-textarea" />
        </div>

        <hr className="form-divider" />

        <div className="form-privacy">
          L&apos;association Nine Lives Paris traite les données recueillies afin de proposer des missions adaptées à votre profil.
        </div>

        <label className="form-checkbox">
          <input type="checkbox" required
            checked={formState.acceptsPrivacy}
            onChange={(e) => updateField('acceptsPrivacy', e.target.checked)} />
          <span>J&apos;ai lu et j&apos;accepte <a href="/politique-de-confidentialite" target="_blank" rel="noopener" className="link-blue">la politique de confidentialité</a>. *</span>
        </label>

        <Captcha onVerify={setCaptchaToken} />
      </div>

      {/* ---- Navigation ---- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', gap: '1rem' }}>
        {currentStep > 0 ? (
          <button type="button" onClick={goPrev} className="btn btn-outline">← Précédent</button>
        ) : <div />}

        {currentStep < lastStep ? (
          <button type="button" onClick={goNext} className="btn btn-gradient">Suivant →</button>
        ) : (
          <button type="submit" disabled={status === 'sending' || !captchaToken}
            className="btn btn-gradient btn-lg">
            {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
          </button>
        )}
      </div>

      {status === 'error' && (
        <div className="alert alert-error" style={{ marginTop: '1rem' }}>
          <strong>Erreur</strong> lors de l&apos;envoi. Veuillez réessayer ou nous contacter directement.
        </div>
      )}
    </form>
  );
}