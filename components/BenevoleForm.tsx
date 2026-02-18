'use client';
import { useState } from 'react';
import Captcha from '@/components/Captcha';

export default function BenevoleForm() {
  const [formData, setFormData] = useState({
    lastName: '', firstName: '', age: '', address: '', postalCode: '', city: '',
    email: '', phone: '', contactSlots: '',
    volunteerType: '',
    surface: '', housingType: '', numRooms: '', floor: '',
    balconySecured: '', balconySecuredHow: '', hasOutdoor: '', outdoorSecured: '',
    canDoQuarantine: '', wantPitieSalpetriereQuarantine: '', quarantineRoom: '',
    numPeopleHousehold: '', hasChildren: '', childrenAges: '', childrenUsedToAnimals: '',
    hasAnimalsHome: '', numDogs: '', numCats: '', numOthers: '',
    animalsDetails: '', animalsLocation: '',
    animalsSterilized: false, animalsIdentified: false,
    animalsVaccinated: false, animalsTested: false,
    hoursAlonePerDay: '',
    whyFoster: '', beenFosterBefore: '', fosterReferences: '',
    catExperience: '', catCarePractices: [] as string[], catCareOther: '',
    catHidingReaction: '', catLitterIssueReaction: '', catDealbreakers: '',
    numCatsCanFoster: '', catTypes: [] as string[],
    fosterDuration: [] as string[], fosterDurationOther: '',
    goingOnVacation: '', vacationDates: '', vacationCare: '',
    householdAgrees: '',
    feedingPlan: '', hasEquipment: '', hasAssociationVet: '',
    vetCastration: '', vetOvariectomy: '', vetVaccination: '', vetContact: '',
    canDoTransport: [] as string[], transportDistance: '',
    openToOtherMissions: '', otherMissions: '', questions: '',
    acceptsPrivacy: false, honeypot: ''
  });

  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const handleCheckboxArray = (field: keyof typeof formData, value: string) => {
    const current = formData[field] as string[];
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
      const res = await fetch('/api/benevole', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken })
      });
      if (res.ok) { setStatus('success'); window.scrollTo(0, 0); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  // Conditional visibility
  const isFoster = formData.volunteerType === "Famille d'accueil" || formData.volunteerType === 'Les deux';
  const isApartment = formData.housingType === 'En appartement';
  const hasBalcony = formData.balconySecured === 'Oui';
  const hasOutdoor = formData.hasOutdoor === 'Oui';
  const canQuarantine = formData.canDoQuarantine === 'Oui';
  const hasChildrenYes = formData.hasChildren === 'Oui';
  const hasAnimals = formData.hasAnimalsHome === 'Oui';
  const hadFosterExp = formData.beenFosterBefore === 'Oui';
  const vacationSoon = formData.goingOnVacation === 'Oui';
  const householdDisagrees = formData.householdAgrees === 'Non';
  const hasAssocVet = formData.hasAssociationVet === 'Oui';
  const canTransport = formData.canDoTransport.includes('Oui, en voiture') || formData.canDoTransport.includes('Oui, en transports en commun');
  const wantsOtherMissions = formData.openToOtherMissions === 'Oui';
  const hasCareOther = formData.catCarePractices.includes('Autre');

  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input type="radio" name={name} value={value} required={required}
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
          Votre candidature a été envoyée avec succès. Nous vous contacterons très prochainement.
        </div>
      )}

      <input type="text" name="website" value={formData.honeypot}
        onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
        className="honeypot" tabIndex={-1} />

      {/* Personal info - 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
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
        <div>
          <label className="form-label">Âge *</label>
          <input type="number" required className="form-input" value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})} />
        </div>
      </div>

      <div>
        <label className="form-label">Adresse *</label>
        <input type="text" required className="form-input" value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})} />
      </div>

      <div className="form-grid">
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
          <label className="form-label">E-mail *</label>
          <input type="email" required className="form-input" value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="form-label">Téléphone *</label>
          <input type="tel" required className="form-input" value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
      </div>

      <div>
        <label className="form-label">Créneaux auxquels nous pouvons vous joindre</label>
        <input type="text" className="form-input" value={formData.contactSlots}
          onChange={(e) => setFormData({...formData, contactSlots: e.target.value})} />
      </div>

      <div>
        <label className="form-label">Vous souhaitez vous proposer en tant que : *</label>
        <div className="form-radio-group">
          {radio('volunteerType', "Famille d'accueil", 'volunteerType')}
          {radio('volunteerType', 'Bénévole', 'volunteerType')}
          {radio('volunteerType', 'Les deux', 'volunteerType')}
        </div>
      </div>

      <div className="alert alert-warning">
        <strong>Nous ne disposons pas de refuge</strong> — tous nos animaux sont en familles d&apos;accueil. Nous n&apos;avons donc pas besoin de bénévoles pour nourrir les animaux, nettoyer les litières ou un local.
      </div>

      {isFoster && (
        <>
          <hr className="form-divider" />
          <h3 className="form-section-title">Votre logement</h3>

          <div className="form-grid">
            <div>
              <label className="form-label">Superficie ? *</label>
              <input type="number" required className="form-input" value={formData.surface}
                onChange={(e) => setFormData({...formData, surface: e.target.value})} />
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
              <input type="number" required className="form-input" value={formData.numRooms}
                onChange={(e) => setFormData({...formData, numRooms: e.target.value})} />
            </div>
            {isApartment && (
              <div>
                <label className="form-label">Étage *</label>
                <input type="text" required className="form-input" value={formData.floor}
                  onChange={(e) => setFormData({...formData, floor: e.target.value})} />
              </div>
            )}
          </div>

          {isApartment && (
            <>
              <div>
                <label className="form-label">Si vous avez un balcon, est-il sécurisé ?</label>
                <select className="form-select" value={formData.balconySecured}
                  onChange={(e) => setFormData({...formData, balconySecured: e.target.value})}>
                  <option value="">Sélectionnez</option>
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                </select>
              </div>
              {hasBalcony && (
                <div>
                  <label className="form-label">De quelle manière ? *</label>
                  <input type="text" required className="form-input" value={formData.balconySecuredHow}
                    onChange={(e) => setFormData({...formData, balconySecuredHow: e.target.value})} />
                </div>
              )}
            </>
          )}

          <div className="form-grid">
            <div>
              <label className="form-label">Votre logement possède-t-il un extérieur ? *</label>
              <select required className="form-select" value={formData.hasOutdoor}
                onChange={(e) => setFormData({...formData, hasOutdoor: e.target.value})}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            {hasOutdoor && (
              <div>
                <label className="form-label">Est-il sécurisé ? *</label>
                <select required className="form-select" value={formData.outdoorSecured}
                  onChange={(e) => setFormData({...formData, outdoorSecured: e.target.value})}>
                  <option value="">Sélectionnez</option>
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="form-label">Pouvez-vous effectuer des quarantaines ? *</label>
            <div className="form-radio-group">
              {radio('canDoQuarantine', 'Oui', 'canDoQuarantine')}
              {radio('canDoQuarantine', 'Non', 'canDoQuarantine')}
            </div>
            <div className="form-hint">Période de 15 jours où l&apos;animal est dans un espace restreint et facile à nettoyer</div>
          </div>

          {canQuarantine && (
            <>
              <div>
                <label className="form-label">Quarantaines pour les chats errants de la Pitié-Salpêtrière ?</label>
                <div className="form-radio-group">
                  {radio('wantPitieSalpetriereQuarantine', 'Oui', 'wantPitieSalpetriereQuarantine', false)}
                  {radio('wantPitieSalpetriereQuarantine', 'Non', 'wantPitieSalpetriereQuarantine', false)}
                  {radio('wantPitieSalpetriereQuarantine', 'Peu importe', 'wantPitieSalpetriereQuarantine', false)}
                </div>
              </div>
              <div>
                <label className="form-label">Dans quelle pièce ?</label>
                <input type="text" className="form-input" value={formData.quarantineRoom}
                  onChange={(e) => setFormData({...formData, quarantineRoom: e.target.value})}
                  placeholder="Superficie, avec fenêtre…" />
              </div>
            </>
          )}

          <hr className="form-divider" />
          <h3 className="form-section-title">Votre foyer</h3>

          <div className="form-grid">
            <div>
              <label className="form-label">Nombre de personnes dans le foyer *</label>
              <input type="number" required className="form-input" value={formData.numPeopleHousehold}
                onChange={(e) => setFormData({...formData, numPeopleHousehold: e.target.value})} />
            </div>
            <div>
              <label className="form-label">Avez-vous des enfants ? *</label>
              <select required className="form-select" value={formData.hasChildren}
                onChange={(e) => setFormData({...formData, hasChildren: e.target.value})}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>

          {hasChildrenYes && (
            <div className="form-grid">
              <div>
                <label className="form-label">Âges des enfants *</label>
                <input type="text" required className="form-input" value={formData.childrenAges}
                  onChange={(e) => setFormData({...formData, childrenAges: e.target.value})} />
              </div>
              <div>
                <label className="form-label">Habitués aux animaux ? *</label>
                <input type="text" required className="form-input" value={formData.childrenUsedToAnimals}
                  onChange={(e) => setFormData({...formData, childrenUsedToAnimals: e.target.value})} />
              </div>
            </div>
          )}

          <div>
            <label className="form-label">Avez-vous des animaux à domicile ? *</label>
            <select required className="form-select" value={formData.hasAnimalsHome}
              onChange={(e) => setFormData({...formData, hasAnimalsHome: e.target.value})}>
              <option value="">Sélectionnez</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>

          {hasAnimals && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Chiens *</label>
                  <input type="number" required className="form-input" value={formData.numDogs}
                    onChange={(e) => setFormData({...formData, numDogs: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Chats *</label>
                  <input type="number" required className="form-input" value={formData.numCats}
                    onChange={(e) => setFormData({...formData, numCats: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Autres *</label>
                  <input type="number" required className="form-input" value={formData.numOthers}
                    onChange={(e) => setFormData({...formData, numOthers: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="form-label">Type / race, habitués aux autres animaux ? *</label>
                <textarea required rows={3} className="form-textarea" value={formData.animalsDetails}
                  onChange={(e) => setFormData({...formData, animalsDetails: e.target.value})} />
              </div>

              <div>
                <label className="form-label">Où vivent-ils ? *</label>
                <input type="text" required className="form-input" value={formData.animalsLocation}
                  onChange={(e) => setFormData({...formData, animalsLocation: e.target.value})} />
              </div>

              <div>
                <label className="form-label">Vos animaux sont-ils…</label>
                <div className="form-checkbox-group">
                  {[
                    { key: 'animalsSterilized', label: 'Stérilisés' },
                    { key: 'animalsIdentified', label: 'Identifiés' },
                    { key: 'animalsVaccinated', label: 'Vaccinés et à jour' },
                    { key: 'animalsTested', label: 'Testés FIV/FeLV (chats)' },
                  ].map(({ key, label }) => (
                    <label key={key} className="form-checkbox">
                      <input type="checkbox" checked={formData[key as keyof typeof formData] as boolean}
                        onChange={(e) => setFormData({...formData, [key]: e.target.checked})} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="form-label">Combien d'heures par jour le chat va-t-il rester seul ? *</label>
            <input type="text" required className="form-input" value={formData.hoursAlonePerDay}
              onChange={(e) => setFormData({...formData, hoursAlonePerDay: e.target.value})} />
          </div>

          <hr className="form-divider" />
          <h3 className="form-section-title">Votre motivation</h3>

          <div>
            <label className="form-label">Pourquoi souhaitez-vous être famille d&apos;accueil ? *</label>
            <textarea required rows={4} className="form-textarea" value={formData.whyFoster}
              onChange={(e) => setFormData({...formData, whyFoster: e.target.value})} />
          </div>

          <div className="form-grid">
            <div>
              <label className="form-label">L&apos;avez-vous déjà été ? *</label>
              <select required className="form-select" value={formData.beenFosterBefore}
                onChange={(e) => setFormData({...formData, beenFosterBefore: e.target.value})}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            {hadFosterExp && (
              <div>
                <label className="form-label">Références de l&apos;association</label>
                <input type="text" className="form-input" value={formData.fosterReferences}
                  onChange={(e) => setFormData({...formData, fosterReferences: e.target.value})} />
              </div>
            )}
          </div>

          <hr className="form-divider" />
          <h3 className="form-section-title">Accueil de chats</h3>

          <div>
            <label className="form-label">Degré d&apos;expérience des chats *</label>
            <select required className="form-select" value={formData.catExperience}
              onChange={(e) => setFormData({...formData, catExperience: e.target.value})}>
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
                'Effectuer une injection', 'Autre'
              ].map(practice => (
                <label key={practice} className="form-checkbox">
                  <input type="checkbox" checked={formData.catCarePractices.includes(practice)}
                    onChange={() => handleCheckboxArray('catCarePractices', practice)} />
                  <span>{practice}</span>
                </label>
              ))}
            </div>
          </div>

          {hasCareOther && (
            <div>
              <label className="form-label">Précisez</label>
              <input type="text" className="form-input" value={formData.catCareOther}
                onChange={(e) => setFormData({...formData, catCareOther: e.target.value})} />
            </div>
          )}

          <div>
            <label className="form-label">Réaction face à un chat caché depuis plusieurs jours ? *</label>
            <textarea required rows={3} className="form-textarea" value={formData.catHidingReaction}
              onChange={(e) => setFormData({...formData, catHidingReaction: e.target.value})} />
          </div>

          <div>
            <label className="form-label">Réaction face à un chat qui fait hors litière ? *</label>
            <textarea required rows={3} className="form-textarea" value={formData.catLitterIssueReaction}
              onChange={(e) => setFormData({...formData, catLitterIssueReaction: e.target.value})} />
          </div>

          <div>
            <label className="form-label">Quelque chose de rédhibitoire pour l&apos;accueil d&apos;un chat ? *</label>
            <textarea required rows={3} className="form-textarea" value={formData.catDealbreakers}
              onChange={(e) => setFormData({...formData, catDealbreakers: e.target.value})} />
          </div>

          <div>
            <label className="form-label">Combien de chats pourriez-vous accueillir ? *</label>
            <input type="number" required className="form-input" value={formData.numCatsCanFoster}
              onChange={(e) => setFormData({...formData, numCatsCanFoster: e.target.value})} />
          </div>

          <div>
            <label className="form-label">Quel type de chat(s) ? *</label>
            <div className="form-checkbox-group">
              {[
                'Adulte', 'Chaton(s)', 'Mâle', 'Femelle', 'Peu importe',
                'Une maman et sa portée', 'Chat craintif (à socialiser)',
                'Chat ou chaton nécessitant des soins', 'Chat testé FIV+',
                'Chat testé FeLV+', 'Chat diabétique', 'Chat en fin de vie'
              ].map(type => (
                <label key={type} className="form-checkbox">
                  <input type="checkbox" checked={formData.catTypes.includes(type)}
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
                "Quelques semaines ou mois (jusqu'à adoption)"
              ].map(duration => (
                <label key={duration} className="form-checkbox">
                  <input type="checkbox" checked={formData.fosterDuration.includes(duration)}
                    onChange={() => handleCheckboxArray('fosterDuration', duration)} />
                  <span>{duration}</span>
                </label>
              ))}
            </div>
          </div>

          {formData.fosterDuration.includes('Pour une durée déterminée') && (
            <div>
              <label className="form-label">Précisez</label>
              <input type="text" className="form-input" value={formData.fosterDurationOther}
                onChange={(e) => setFormData({...formData, fosterDurationOther: e.target.value})} />
            </div>
          )}

          <div className="form-grid">
            <div>
              <label className="form-label">Partez-vous en vacances bientôt ? *</label>
              <div className="form-radio-group">
                {radio('goingOnVacation', 'Oui', 'goingOnVacation')}
                {radio('goingOnVacation', 'Non', 'goingOnVacation')}
              </div>
            </div>
            {vacationSoon && (
              <div>
                <label className="form-label">À quelles dates ? *</label>
                <input type="text" required className="form-input" value={formData.vacationDates}
                  onChange={(e) => setFormData({...formData, vacationDates: e.target.value})} />
              </div>
            )}
          </div>

          {vacationSoon && (
            <div>
              <label className="form-label">Qui s&apos;occupera de l&apos;animal ? *</label>
              <input type="text" required className="form-input" value={formData.vacationCare}
                onChange={(e) => setFormData({...formData, vacationCare: e.target.value})} />
            </div>
          )}

          <div>
            <label className="form-label">Tout le foyer est-il d&apos;accord ? *</label>
            <select required className="form-select" value={formData.householdAgrees}
              onChange={(e) => setFormData({...formData, householdAgrees: e.target.value})}>
              <option value="">Sélectionnez</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>

          {householdDisagrees && (
            <div className="alert alert-error">
              Merci d&apos;en rediscuter avec les membres de votre foyer et de revenir vers nous lorsqu&apos;ils seront tous d&apos;accord.
            </div>
          )}

          <hr className="form-divider" />

          <div className="form-privacy">
            Les frais vétérinaires sont couverts par l&apos;association. La nourriture est généralement prise en charge par la famille d&apos;accueil (sauf pathologie nécessitant une alimentation adaptée).
          </div>

          <div>
            <label className="form-label">Comment nourrirez-vous les animaux ? *</label>
            <input type="text" required className="form-input" value={formData.feedingPlan}
              onChange={(e) => setFormData({...formData, feedingPlan: e.target.value})}
              placeholder="Type d'alimentation, marques…" />
          </div>

          <div>
            <label className="form-label">Avez-vous du matériel (litière, caisse, laisses…) ? *</label>
            <input type="text" required className="form-input" value={formData.hasEquipment}
              onChange={(e) => setFormData({...formData, hasEquipment: e.target.value})} />
          </div>

          <div>
            <label className="form-label">Vétérinaire à tarifs associatifs ?</label>
            <select className="form-select" value={formData.hasAssociationVet}
              onChange={(e) => setFormData({...formData, hasAssociationVet: e.target.value})}>
              <option value="">Sélectionnez</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
              <option value="Je ne sais pas, mais je me renseigne">Je me renseigne</option>
            </select>
          </div>

          {hasAssocVet && (
            <>
              <div className="form-hint">Tarifs approximatifs :</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Castration</label>
                  <input type="text" className="form-input" value={formData.vetCastration}
                    onChange={(e) => setFormData({...formData, vetCastration: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Ovariectomie</label>
                  <input type="text" className="form-input" value={formData.vetOvariectomy}
                    onChange={(e) => setFormData({...formData, vetOvariectomy: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Vaccination</label>
                  <input type="text" className="form-input" value={formData.vetVaccination}
                    onChange={(e) => setFormData({...formData, vetVaccination: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="form-label">Coordonnées du vétérinaire</label>
                <input type="text" className="form-input" value={formData.vetContact}
                  onChange={(e) => setFormData({...formData, vetContact: e.target.value})} />
              </div>
            </>
          )}
        </>
      )}

      <hr className="form-divider" />
      <h3 className="form-section-title">Disponibilités</h3>

      <div>
        <label className="form-label">Possibilité d&apos;effectuer des transports ? *</label>
        <div className="form-checkbox-group">
          {['Oui, en voiture', 'Oui, en transports en commun', 'Non'].map(option => (
            <label key={option} className="form-checkbox">
              <input type="checkbox" checked={formData.canDoTransport.includes(option)}
                onChange={() => handleCheckboxArray('canDoTransport', option)} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {canTransport && (
        <div>
          <label className="form-label">Distance possible ? *</label>
          <textarea required rows={3} className="form-textarea" value={formData.transportDistance}
            onChange={(e) => setFormData({...formData, transportDistance: e.target.value})}
            placeholder="Distance en km, départements, remboursement…" />
        </div>
      )}

      <div>
        <label className="form-label">Disposé.e à d&apos;autres missions ? *</label>
        <select required className="form-select" value={formData.openToOtherMissions}
          onChange={(e) => setFormData({...formData, openToOtherMissions: e.target.value})}>
          <option value="">Sélectionnez</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>
      </div>

      {wantsOtherMissions && (
        <div>
          <label className="form-label">Lesquelles ?</label>
          <textarea rows={3} className="form-textarea" value={formData.otherMissions}
            onChange={(e) => setFormData({...formData, otherMissions: e.target.value})} />
        </div>
      )}

      <div>
        <label className="form-label">Questions ?</label>
        <textarea rows={4} className="form-textarea" value={formData.questions}
          onChange={(e) => setFormData({...formData, questions: e.target.value})} />
      </div>

      <hr className="form-divider" />

      <div className="form-privacy">
        L&apos;association Nine Lives Paris traite les données recueillies afin de proposer des missions adaptées à votre profil.
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
          {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
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