'use client';
import { useState } from 'react';

export default function BenevoleForm() {
  const [formData, setFormData] = useState({
    // Personal Info
    lastName: '',
    firstName: '',
    age: '',
    address: '',
    postalCode: '',
    city: '',
    email: '',
    phone: '',
    contactSlots: '',
    
    // Volunteer Type
    volunteerType: '',
    
    // Housing (Foster Family)
    surface: '',
    housingType: '',
    numRooms: '',
    floor: '',
    balconySecured: '',
    balconySecuredHow: '',
    hasOutdoor: '',
    outdoorSecured: '',
    rabbitSecured: '',
    willSecureForRabbit: '',
    canDoQuarantine: '',
    wantPitieSalpetriereQuarantine: '',
    quarantineRoom: '',
    numPeopleHousehold: '',
    hasChildren: '',
    childrenAges: '',
    childrenUsedToAnimals: '',
    hasAnimalsHome: '',
    numDogs: '',
    numCats: '',
    numRabbits: '',
    numOthers: '',
    animalsDetails: '',
    animalsLocation: '',
    animalsSterilized: false,
    animalsIdentified: false,
    animalsVaccinated: false,
    animalsTested: false,
    hoursAlonePerDay: '',
    
    // Foster Motivation
    whyFoster: '',
    beenFosterBefore: '',
    fosterReferences: '',
    
    // Dog Specific
    dogWalked: '',
    dogWalkFrequency: '',
    dogLocationAbsent: '',
    dogBehavioralIssuesReaction: '',
    dogResourceGuarding: '',
    dogPullingLeash: '',
    dogHouseTraining: '',
    dogApproachWhileEating: '',
    dogDominance: '',
    dogDealbreakers: '',
    
    // Rabbit Specific
    rabbitHabitat: '',
    rabbitTerritory: [] as string[],
    rabbitTerritorySize: '',
    numRabbitsCanFoster: '',
    rabbitDealbreakers: '',
    
    // Cat Specific
    catExperience: '',
    catCarePractices: [] as string[],
    catCareOther: '',
    catHidingReaction: '',
    catLitterIssueReaction: '',
    catDealbreakers: '',
    numCatsCanFoster: '',
    catTypes: [] as string[],
    fosterDuration: [] as string[],
    fosterDurationOther: '',
    goingOnVacation: '',
    vacationDates: '',
    vacationCare: '',
    householdAgrees: '',
    
    // General Foster
    feedingPlan: '',
    hasEquipment: '',
    hasAssociationVet: '',
    vetCastration: '',
    vetOvariectomy: '',
    vetVaccination: '',
    vetContact: '',
    canDoTransport: [] as string[],
    transportDistance: '',
    
    // Other Volunteer
    openToOtherMissions: '',
    otherMissions: '',
    questions: '',
    
    acceptsPrivacy: false,
    honeypot: ''
  });
  
  const [status, setStatus] = useState('');

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
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        window.scrollTo(0, 0);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  // Conditional visibility
  const isFoster = formData.volunteerType === 'Famille d\'accueil' || formData.volunteerType === 'Les deux';
  const isVolunteer = formData.volunteerType === 'Bénévole' || formData.volunteerType === 'Les deux';
  const isApartment = formData.housingType === 'En appartement';
  const hasBalcony = formData.balconySecured === 'Oui';
  const hasOutdoor = formData.hasOutdoor === 'Oui';
  const needsRabbitSecuring = formData.rabbitSecured === 'Non';
  const canQuarantine = formData.canDoQuarantine === 'Oui';
  const hasarantine === 'Oui';
  const hasChildrenYes = formData.hasChildren === 'Oui';
  const hasAnimals = formData.hasAnimalsHome === 'Oui';
  const hadFosterExp = formData.beenFosterBefore === 'Oui';
  const vacationSoon = formData.goingOnVacation === 'Oui';
  const householdDisagrees = formData.householdAgrees === 'Non';
  const hasAssocVet = formData.hasAssociationVet === 'Oui';
  const canTransport = formData.canDoTransport.includes('Oui, en voiture') || formData.canDoTransport.includes('Oui, en transports en commun');
  const wantsOtherMissions = formData.openToOtherMissions === 'Oui';
  const hasCareOther = formData.catCarePractices.includes('Autre');

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '500' as const,
    marginBottom: '0.5rem',
    color: '#374151'
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {status === 'success' && (
        <div style={{ padding: '1.5rem', background: '#d1fae5', color: '#065f46', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' }}>
          <strong>✓ Merci !</strong><br/>
          Votre candidature a été envoyée avec succès. Nous vous contacterons très prochainement.
        </div>
      )}

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={formData.honeypot}
        onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
        style={{ display: 'none' }}
        tabIndex={-1}
      />

      {/* PERSONAL INFO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Nom de famille *</label>
          <input type="text" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Prénom *</label>
          <input type="text" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Âge *</label>
          <input type="number" required value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Adresse *</label>
        <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} style={inputStyle} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Code postal *</label>
          <input type="text" required value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Ville *</label>
          <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Adresse e-mail *</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Numéro de téléphone *</label>
          <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Merci de nous indiquer les créneaux auxquels nous pouvons vous joindre</label>
        <input type="text" value={formData.contactSlots} onChange={(e) => setFormData({...formData, contactSlots: e.target.value})} style={inputStyle} />
      </div>

      {/* VOLUNTEER TYPE */}
      <div>
        <label style={labelStyle}>Vous souhaitez vous proposer en tant que : *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="volunteerType" value="Famille d'accueil" checked={formData.volunteerType === 'Famille d\'accueil'} onChange={(e) => setFormData({...formData, volunteerType: e.target.value})} />
            Famille d'accueil
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="volunteerType" value="Bénévole" checked={formData.volunteerType === 'Bénévole'} onChange={(e) => setFormData({...formData, volunteerType: e.target.value})} />
            Bénévole
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="volunteerType" value="Les deux" checked={formData.volunteerType === 'Les deux'} onChange={(e) => setFormData({...formData, volunteerType: e.target.value})} />
            Les deux
          </label>
        </div>
      </div>

      <div style={{ padding: '1rem', background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '4px', fontSize: '0.95rem' }}>
        <strong>Comme indiqué sur ce site, nous ne disposons pas de refuge</strong>, tous.95rem' }}>
        <strong>Comme indiqué sur ce site, nous ne disposons pas de refuge</strong>, tous nos animaux sont en familles d'accueil. Les familles d'accueil prennent soin des animaux dont elles ont la garde, nous n'avons donc pas besoin d'autres bénévoles pour nourrir les animaux, nettoyer les litières ou un local, câliner des chats, ...
      </div>

      {/* HOUSING SECTION - Only if Foster */}
      {isFoster && (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Votre logement</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Quelle est la superficie de votre logement ? *</label>
              <input type="number" required value={formData.surface} onChange={(e) => setFormData({...formData, surface: e.target.value})} style={inputStyle} />
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>en m²</div>
            </div>
            <div>
              <label style={labelStyle}>Vous vivez : *</label>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" required name="housingType" value="En maison" checked={formData.housingType === 'En maison'} onChange={(e) => setFormData({...formData, housingType: e.target.value})} />
                  En maison
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" required name="housingType" value="En appartement" checked={formData.housingType === 'En appartement'} onChange={(e) => setFormData({...formData, housingType: e.target.value})} />
                  En appartement
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Nombre de pièces *</label>
              <input type="number" required value={formData.numRooms} onChange={(e) => setFormData({...formData, numRooms: e.target.value})} style={inputStyle} />
            </div>
            {isApartment && (
              <div>
                <label style={labelStyle}>Etage *</label>
                <input type="text" required value={formData.floor} onChange={(e) => setFormData({...formData, floor: e.target.value})} style={inputStyle} />
              </div>
            )}
          </div>

          {isApartment && (
            <>
              <div>
                <label style={labelStyle}>Si vous avez un balcon, est-il sécurisé ?</label>
                <select value={formData.balconySecured} onChange={(e) => setFormData({...formData, balconySecured: e.target.value})} style={inputStyle}>
                  <option value="">Sélectionnez</option>
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                </select>
              </div>

              {hasBalcony && (
                <div>
                  <label style={labelStyle}>De quelle manière ? *</label>
                  <input type="text" required value={formData.balconySecuredHow} onChange={(e) => setFormData({...formData, balconySecuredHow: e.target.value})} style={inputStyle} />
                </div>
              )}
            </>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Votre logement possède-t-il un extérieur ? *</label>
              <select required value={formData.hasOutdoor} onChange={(e) => setFormData({...formData, hasOutdoor: e.target.value})} style={inputStyle}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            {hasOutdoor && (
              <div>
                <label style={labelStyle}>Est-il sécurisé ? *</label>
                <select required value={formData.outdoorSecured} onChange={(e) => setFormData({...formData, outdoorSecured: e.target.value})} style={inputStyle}>
                  <option value="">Sélectionnez</option>
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                </select>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Votre logement est-il déjà sécurisé pour un lapin ? *</label>
              <select required value={formData.rabbitSecured} onChange={(e) => setFormData({...formData, rabbitSecured: e.target.value})} style={inputStyle}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            {needsRabbitSecuring && (
              <div>
                <label style={labelStyle}>Êtes-vous prêt.e à le sécuriser préalablement à tout accueil ? *</label>
                <select required value={formData.willSecureForRabbit} onChange={(e) => setFormData({...formData, willSecureForRabbit: e.target.value})} style={inputStyle}>
                  <option value="">Sélectionnez</option>
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                </select>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>(installations électriques, meubles, déco, ...)</div>
              </div>
            )}
          </div>

          <div>
            <label style={labelStyle}>Pouvez-vous effectuer des quarantaines ? *</label>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" required name="canDoQuarantine" value="Oui" checked={formData.canDoQuarantine === 'Oui'} onChange={(e) => setFormData({...formData, canDoQuarantine: e.target.value})} />
                Oui
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" required name="canDoQuarantine" value="Non" checked={formData.canDoQuarantine === 'Non'} onChange={(e) => setFormData({...formData, canDoQuarantine: e.target.value})} />
                Non
              </label>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Une quarantaine est une période de 15 jours pour les chats durant laquelle l'animal est contenu dans un espace restreint et facile à nettoyer
            </div>
          </div>

          {canQuarantine && (
            <>
              <div>
                <label style={labelStyle}>Souhaitez-vous effectuer des quarantaines pour les chats errants de l'hôpital de la Pitié-Salpêtrière ?</label>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" name="wantPitieSalpetriereQuarantine" value="Oui" checked={formData.wantPitieSalpetriereQuarantine === 'Oui'} onChange={(e) => setFormData({...formData, wantPitieSalpetriereQuarantine: e.target.value})} />
                    Oui
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" name="wantPitieSalpetriereQuarantine" value="Non" checked={formData.wantPitieSalpetriereQuarantine === 'Non'} onChange={(e) => setFormData({...formData, wantPitieSalpetriereQuarantine: e.target.value})} />
                    Non
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" name="wantPitieSalpetriereQuarantine" value="Peu importe" checked={formData.wantPitieSalpetriereQuarantine === 'Peu importe'} onChange={(e) => setFormData({...formData, wantPitieSalpetriereQuarantine: e.target.value})} />
                    Peu importe
                  </label>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Si vous pouvez effectuer des quarantaines, dans quelle pièce ?</label>
                <input type="text" value={formData.quarantineRoom} onChange={(e) => setFormData({...formData, quarantineRoom: e.target.value})} style={inputStyle} placeholder="superficie approximative, avec fenêtre, ..." />
              </div>
            </>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Votre foyer</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Quel est le nombre de personnes dans votre foyer ? *</label>
              <input type="number" required value={formData.numPeopleHousehold} onChange={(e) => setFormData({...formData, numPeopleHousehold: e.target.value})} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Avez-vous des enfants ? *</label>
              <select required value={formData.hasChildren} onChange={(e) => setFormData({...formData, hasChildren: e.target.value})} style={inputStyle}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>

          {hasChildrenYes && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Quel âge ont-ils ? *</label>
                <input type="text" required value={formData.childrenAges} onChange={(e) => setFormData({...formData, childrenAges: e.target.value})} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Ont-ils l'habitude des animaux ? *</label>
                <input type="text" required value={formData.childrenUsedToAnimals} onChange={(e) => setFormData({...formData, childrenUsedToAnimals: e.target.value})} style={inputStyle} />
              </div>
            </div>
          )}

          <div>
            <label style={labelStyle}>Avez-vous des animaux à votre domicile ? *</label>
            <select required value={formData.hasAnimalsHome} onChange={(e) => setFormData({...icile ? *</label>
            <select required value={formData.hasAnimalsHome} onChange={(e) => setFormData({...formData, hasAnimalsHome: e.target.value})} style={inputStyle}>
              <option value="">Sélectionnez</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>

          {hasAnimals && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Chiens ? *</label>
                  <input type="number" required value={formData.numDogs} onChange={(e) => setFormData({...formData, numDogs: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Chats ? *</label>
                  <input type="number" required value={formData.numCats} onChange={(e) => setFormData({...formData, numCats: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Lapins ? *</label>
                  <input type="number" required value={formData.numRabbits} onChange={(e) => setFormData({...formData, numRabbits: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Autres ? *</label>
                  <input type="number" required value={formData.numOthers} onChange={(e) => setFormData({...formData, numOthers: e.target.value})} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Merci de préciser de quel type / race, et s'ils sont habitués aux autres animaux *</label>
                <textarea required rows={4} value={formData.animalsDetails} onChange={(e) => setFormData({...formData, animalsDetails: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
              </div>

              <div>
                <label style={labelStyle}>Où vivent-ils ? *</label>
                <input type="text" required value={formData.animalsLocation} onChange={(e) => setFormData({...formData, animalsLocation: e.target.value})} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Vos animaux sont-ils... *</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" checked={formData.animalsSterilized} onChange={(e) => setFormData({...formData, animalsSterilized: e.target.checked})} />
                    stérilisés ?
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" checked={formData.animalsIdentified} onChange={(e) => setFormData({...formData, animalsIdentified: e.target.checked})} />
                    identifiés ?
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" checked={formData.animalsVaccinated} onChange={(e) => setFormData({...formData, animalsVaccinated: e.target.checked})} />
                    vaccinés et à jour de leur rappel ?
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" checked={formData.animalsTested} onChange={(e) => setFormData({...formData, animalsTested: e.target.checked})} />
                    testés FIV/FeLV (pour les chats) ?
                  </label>
                </div>
              </div>
            </>
          )}

          <div>
            <label style={labelStyle}>Combien d'heures par jour le chat (ou le chien, le cas échéant) va-t-il rester seul ? *</label>
            <input type="text" required value={formData.hoursAlonePerDay} onChange={(e) => setFormData({...formData, hoursAlonePerDay: e.target.value})} style={inputStyle} />
          </div>

          {/* FOSTER MOTIVATION */}
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Votre motivation</h3>

          <div>
            <label style={labelStyle}>Pour quelle raison souhaitez-vous être famille d'accueil ? *</label>
            <textarea required rows={6} value={formData.whyFoster} onChange={(e) => setFormData({...formData, whyFoster: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>L'avez-vous déjà été auparavant ? *</label>
              <select required value={formData.beenFosterBefore} onChange={(e) => setFormData({...formData, beenFosterBefore: e.target.value})} style={inputStyle}>
                <option value="">Sélectionnez</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            {hadFosterExp && (
              <div>
                <label style={labelStyle}>Références de l'association</label>
                <input type="text" value={formData.fosterReferences} onChange={(e) => setFormData({...formData, fosterReferences: e.target.value})} style={inputStyle} />
              </div>
            )}
          </div>

          {/* CAT SPECIFIC SECTION */}
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Accueil de chats</h3>

          <div>
            <label style={labelStyle}>Quel est votre degré d'expérience des chats ? *</label>
            <select required value={formData.catExperience} onChange={(e) => setFormData({...formData, catExperience: e.target.value})} style={inputStyle}>
              <option value="">Sélectionnez</option>
              <option value="Débutant">Débutant</option>
              <option value="J'ai (eu) un chat">J'ai (eu) un chat</option>
              <option value="J'ai (eu) plusieurs chats">J'ai (eu) plusieurs chats</option>
              <option value="Je suis bilingue chat">Je suis bilingue chat</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Avez-vous déjà été amené.e à pratiquer ces soins sur un chat : *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Biberonner un nouveau-né',
                'Couper les griffes',
                'Appliquer un antiparasitaire externe',
                'Administrer un médicament dans la gueule',
                'Administrer un médicament liquide à l\'aide d\'une seringue',
                'Appliquer un spray sur tout le corps (pour la teigne par exemple)',
                'Nettoyer une plaie',
                'Pratiquer des inhalations',
                'Nettoyer des yeux malades ou un nez bouché',
                'Appliquer une pommade dans les oreilles',
                'Effectuer une injection',
                'Autre'
              ].map(practice => (
                <label key={practice} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={formData.catCarePractices.includes(practice)} onChange={() => handleCheckboxArray('catCarePractices', practice)} />
                  {practice}
                </label>
              ))}
            </div>
          </div>

          {hasCareOther && (
            <div>
              <label style={labelStyle}>Précisez</label>
              <input type="text" value={formData.catCareOther} onChange={(e) => setFormData({...formData, catCareOther: e.target.value})} style={inputStyle} />
            </div>
          )}

          <div>
            <label style={labelStyle}>Quelle serait votre réaction face à un chat caché depuis plusieurs jours ? *</label>
            <textarea required rows={4} value={formData.catHidingReaction} onChange={(e) => setFormData({...formData, catHidingReaction: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
          </div>

          <div>
            <label style={labelStyle}>Quelle serait votre réaction face à un chat qui fait en-dehors de sa litière ? *</label>
            <textarea required rows={4} value={formData.catLitterIssueReaction} onChange={(e) => setFormData({...formData, catLitterIssueReaction: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
          </div>

          <div>
            <label style={labelStyle}>Y a t-il quelque chose qui serait rédhibitoire pour vous dans l'accueil d'un chat ? *</label>
            <textarea required rows={4} value={formData.catDealbreakers} onChange={(e) => setFormData({...formData, catDealbreakers: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
          </div>

          <div>
            <label style={labelStyle}>Combien de chats pourriez-vous accueillir chez vous ? *</label>
            <input type="number" required value={formData.numCatsCanFoster} onChange={(e) => setFormData({...formData, numCatsCanFoster: e.target.value})} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Quel type de chat(s) ? *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Adulte',
                'Chaton(s)',
                'Mâle',
                'Femelle',
                'Peu importe',
                'Une maman et sa portée',
                'Chat craintif (à socialiser)',
                'Chat ou chaton nécessitant des soins',
                'Chat testé FIV+',
                'Chat testé FeLV+',
                'Chat diabétique',
                'Chat en fin de vie'
              ].map(type => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={formData.catTypes.includes(type)} onChange={() => handleCheckboxArray('catTypes', type)} />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Combien de temps pouvez-vous accueillir un animal ? *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Je ne: '0.5rem' }}>
              {[
                'Je ne peux accueillir d\'animal qu\'après la période de quarantaine, mon propre animal n\'étant pas encore à jour au niveau vaccination',
                'Quelques jours',
                '2 à 3 semaines (pour une quarantaine)',
                'Pour une durée déterminée',
                'Quelques semaines ou quelques mois (jusqu\'à adoption)'
              ].map(duration => (
                <label key={duration} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" checked={formData.fosterDuration.includes(duration)} onChange={() => handleCheckboxArray('fosterDuration', duration)} />
                  {duration}
                </label>
              ))}
            </div>
          </div>

          {formData.fosterDuration.includes('Pour une durée déterminée') && (
            <div>
              <label style={labelStyle}>Précisez</label>
              <input type="text" value={formData.fosterDurationOther} onChange={(e) => setFormData({...formData, fosterDurationOther: e.target.value})} style={inputStyle} />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Partez-vous en vacances bientôt ? *</label>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" required name="goingOnVacation" value="Oui" checked={formData.goingOnVacation === 'Oui'} onChange={(e) => setFormData({...formData, goingOnVacation: e.target.value})} />
                  Oui
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="radio" required name="goingOnVacation" value="Non" checked={formData.goingOnVacation === 'Non'} onChange={(e) => setFormData({...formData, goingOnVacation: e.target.value})} />
                  Non
                </label>
              </div>
            </div>
            {vacationSoon && (
              <div>
                <label style={labelStyle}>Si oui, à quelles dates ? *</label>
                <input type="text" required value={formData.vacationDates} onChange={(e) => setFormData({...formData, vacationDates: e.target.value})} style={inputStyle} />
              </div>
            )}
          </div>

          {vacationSoon && (
            <div>
              <label style={labelStyle}>Qui va s'occuper de lui ? *</label>
              <input type="text" required value={formData.vacationCare} onChange={(e) => setFormData({...formData, vacationCare: e.target.value})} style={inputStyle} />
            </div>
          )}

          <div>
            <label style={labelStyle}>L'ensemble de votre foyer est-il d'accord pour cet accueil ? *</label>
            <select required value={formData.householdAgrees} onChange={(e) => setFormData({...formData, householdAgrees: e.target.value})} style={inputStyle}>
              <option value="">Sélectionnez</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>

          {householdDisagrees && (
            <div style={{ padding: '1rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '4px', color: '#991b1b' }}>
              Dans ce cas, merci de bien vouloir en rediscuter avec les membres de votre foyer et de revenir vers nous lorsqu'ils seront tous d'accord
            </div>
          )}

          {/* GENERAL FOSTER INFO */}
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

          <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '4px', fontSize: '0.95rem' }}>
            Les frais vétérinaires sont couverts par l'association ; la nourriture est généralement prise en charge par la famille d'accueil (sauf pour les animaux ayant une pathologie nécessitant une nourriture adaptée, comme le diabète, l'insuffisance rénale, etc.).
          </div>

          <div>
            <label style={labelStyle}>Comment nourrirez-vous les animaux que vous aurez en accueil ? *</label>
            <input type="text" required value={formData.feedingPlan} onChange={(e) => setFormData({...formData, feedingPlan: e.target.value})} style={inputStyle} placeholder="Quel type d'alimentation ? Quelles marques ?" />
          </div>

          <div>
            <label style={labelStyle}>Avez-vous déjà du matériel (litière, caisse de transport, laisses, ...) ? *</label>
            <input type="text" required value={formData.hasEquipment} onChange={(e) => setFormData({...formData, hasEquipment: e.target.value})} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Avez-vous un vétérinaire pratiquant des tarifs associatifs ?</label>
            <select value={formData.hasAssociationVet} onChange={(e) => setFormData({...formData, hasAssociationVet: e.target.value})} style={inputStyle}>
              <option value="">Sélectionnez</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
              <option value="Je ne sais pas, mais je me renseigne">Je ne sais pas, mais je me renseigne</option>
            </select>
          </div>

          {hasAssocVet && (
            <>
              <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>Avez-vous une idée des tarifs qu'il applique pour les actes suivants ?</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Castration</label>
                  <input type="text" value={formData.vetCastration} onChange={(e) => setFormData({...formData, vetCastration: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Ovariectomie</label>
                  <input type="text" value={formData.vetOvariectomy} onChange={(e) => setFormData({...formData, vetOvariectomy: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Vaccination</label>
                  <input type="text" value={formData.vetVaccination} onChange={(e) => setFormData({...formData, vetVaccination: e.target.value})} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Coordonnées du vétérinaire</label>
                <input type="text" value={formData.vetContact} onChange={(e) => setFormData({...formData, vetContact: e.target.value})} style={inputStyle} />
              </div>
            </>
          )}
        </>
      )}

      {/* TRANSPORT & OTHER MISSIONS (for all volunteers) */}
      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Disponibilités</h3>

      <div>
        <label style={labelStyle}>Auriez-vous la possibilité d'effectuer des transports ? *</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['Oui, en voiture', 'Oui, en transports en commun', 'Non'].map(option => (
            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={formData.canDoTransport.includes(option)} onChange={() => handleCheckboxArray('canDoTransport', option)} />
              {option}
            </label>
          ))}
        </div>
      </div>

      {canTransport && (
        <div>
          <label style={labelStyle}>Quelle distance pourriez-vous parcourir ? *</label>
          <textarea required rows={4} value={formData.transportDistance} onChange={(e) => setFormData({...formData, transportDistance: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} placeholder="Distance en km ou heures, départements concernés, besoin de remboursement..." />
        </div>
      )}

      <div>
        <label style={labelStyle}>Seriez-vous disposé.e à effectuer d'autres missions de bénévolat au sein de l'association ? *</label>
        <select required value={formData.openToOtherMissions} onChange={(e) => setFormData({...formData, openToOtherMissions: e.target.value})} style={inputStyle}>
          <option value="">Sélectionnez</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>
      </div>

      {<option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>
      </div>

      {wantsOtherMissions && (
        <div>
          <label style={labelStyle}>Lesquelles ?</label>
          <textarea rows={4} value={formData.otherMissions} onChange={(e) => setFormData({...formData, otherMissions: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
        </div>
      )}

      <div>
        <label style={labelStyle}>Avez-vous des questions ?</label>
        <textarea rows={6} value={formData.questions} onChange={(e) => setFormData({...formData, questions: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '4px', fontSize: '0.875rem', color: '#6b7280' }}>
        L'association Nine Lives Paris traite les données recueillies afin de proposer aux familles d'accueil et bénévoles des missions qui correspondent à leur profil.
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" required checked={formData.acceptsPrivacy} onChange={(e) => setFormData({...formData, acceptsPrivacy: e.target.checked})} style={{ marginTop: '0.25rem' }} />
          <span>J'ai lu et j'accepte <a href="/politique-de-confidentialite" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>la politique de confidentialité de ce site</a>. *</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary"
        style={{ fontSize: '1.125rem', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.6 : 1 }}
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
      </button>

      {status === 'error' && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', textAlign: 'center' }}>
          <strong>Erreur</strong> lors de l'envoi. Veuillez réessayer ou nous contacter directement.
        </div>
      )}
    </form>
  );
}
