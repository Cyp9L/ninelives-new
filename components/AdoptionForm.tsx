'use client';
import { useState, useEffect } from 'react';


interface Cat {
  id: string;
  name: string;
  slug: string;
  images: string[];
}

export default function AdoptionForm({ cats, preselectedCat }: { cats: Cat[], preselectedCat?: string }) {
    const [formData, setFormData] = useState({
      // Animal
      animalName: preselectedCat || '',
    
    // Personal Info
    lastName: '',
    firstName: '',
    address: '',
    postalCode: '',
    city: '',
    mobilePhone: '',
    landlinePhone: '',
    email: '',
    age: '',
    
    // Housing
    surface: '',
    housingType: '',
    hasGardenEnclosed: false,
    hasBalcony: false,
    noBalcony: false,
    floor: '',
    isOwner: '',
    hasPermission: '',
    movingSoon: '',
    movingAddress: '',
    
    // Household
    employed: '',
    employedOther: '',
    numAdults: '',
    numChildren: '',
    childrenAges: '',
    someoneHomeDuringDay: '',
    hoursAbsence: '',
    hasAllergies: '',
    childrenCompatible: '',
    childrenCompatibleOther: '',
    coupleSeparation: '',
    
    // Animals
    hasAnimalNow: '',
    currentAnimalDetails: '',
    currentAnimalsSterilized: false,
    currentAnimalsVaccinated: false,
    currentAnimalsTested: false,
    hadAnimalBefore: '',
    previousAnimalDetails: '',
    hadToSeparate: '',
    separationReason: '',
    adoptedFromShelter: '',
    
    // Adoption Project
    animalType: 'Chat',
    adoptionDate: '',
    motivation: '',
    sterilizationOpinion: '',
    careAbsence: [] as string[],
    careAbsenceOther: '',
    longTermCommitment: '',
    everyoneAgrees: '',
    knowsAnimalNeeds: '',
    thoughtAboutDamages: '',
    knowsVetCosts: '',
    vetCostsEstimate: '',
    emergencyPaymentThreshold: '',
    sickAnimalAction: '',
    mealsDescription: '',
    knowsMonthlyBudget: '',
    monthlyBudgetEstimate: '',
    rabbitHabitat: '',
    animalLocationWork: '',
    animalLocationWorkSurface: '',
    animalLocationHome: '',
    animalLocationHomeSurface: '',
    secondRabbit: '',
    
    // Final
    howHeardAbout: '',
    howHeardAboutOther: '',
    remarks: '',
    acceptsPrivacy: false,
    
    honeypot: ''
  });
  // Pick up ?cat= from URL after hydration
  import { useState, useEffect } from 'react';  // ← update the import at the top of the file

  useEffect(() => {
    if (!preselectedCat && !formData.animalName) {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('cat');
      if (catParam) {
        setFormData(prev => ({ ...prev, animalName: catParam }));
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const [status, setStatus] = useState('');

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

  const selectedCat = cats.find(c => c.name === formData.animalName);
  
  // Conditional visibility helpers
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
  const isRabbit = formData.animalType === 'Lapin';
  const isCat = formData.animalType === 'Chat';
  const isDog = formData.animalType === 'Chien';
  const locationWorkEnclosure = formData.animalLocationWork === 'En enclos';
  const locationHomeEnclosure = formData.animalLocationHome === 'En enclos';
  const heardOther = formData.howHeardAbout === 'Autre';

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
          Votre demande d'adoption a été envoyée avec succès. Nous vous contacterons très prochainement.
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

      {/* ANIMAL NAME */}
      <div>
        <label style={labelStyle}>
          Si vous savez déjà lequel de nos animaux vous souhaitez rencontrer, vous pouvez noter ici son nom
        </label>
        <select
          value={formData.animalName}
          onChange={(e) => setFormData({...formData, animalName: e.target.value})}
          style={inputStyle}
        >
          <option value="">Sélectionnez un chat</option>
          {cats.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        
        {selectedCat && selectedCat.images[0] && (
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '4px' }}>
            <img src={selectedCat.images[0]} alt={selectedCat.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
            <span style={{ fontWeight: '500' }}>{selectedCat.name}</span>
          </div>
        )}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

      {/* PERSONAL INFO */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Vos coordonnées</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Nom de famille *</label>
          <input type="text" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Prénom *</label>
          <input type="text" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Adresse *</label>
        <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} style={inputStyle} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
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
          <label style={labelStyle}>Numéro de téléphone *</label>
          <input type="tel" required value={formData.mobilePhone} onChange={(e) => setFormData({...formData, mobilePhone: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Numéro de téléphone fixe</label>
          <input type="tel" value={formData.landlinePhone} onChange={(e) => setFormData({...formData, landlinePhone: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>E-mail *</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Âge *</label>
          <input type="number" required value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

      {/* HOUSING */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Votre logement</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Superficie *</label>
          <input type="number" required value={formData.surface} onChange={(e) => setFormData({...formData, surface: e.target.value})} style={inputStyle} />
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>en m²</div>
        </div>
        <div>
          <label style={labelStyle}>Type de logement *</label>
          <select required value={formData.housingType} onChange={(e) => setFormData({...formData, housingType: e.target.value})} style={inputStyle}>
            <option value="">Sélectionnez</option>
            <option value="Maison">Maison</option>
            <option value="Appartement">Appartement</option>
          </select>
        </div>
      </div>

      {isHouse && (
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={formData.hasGardenEnclosed} onChange={(e) => setFormData({...formData, hasGardenEnclosed: e.target.checked})} />
            Avec jardin clôturé
          </label>
        </div>
      )}

      {isApartment && (
        <>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.hasBalcony} onChange={(e) => setFormData({...formData, hasBalcony: e.target.checked})} />
              Avec balcon ou terrasse
            </label>
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.noBalcony} onChange={(e) => setFormData({...formData, noBalcony: e.target.checked})} />
              Sans balcon ou terrasse
            </label>
          </div>
          <div>
            <label style={labelStyle}>Quel étage ? *</label>
            <input type="number" required value={formData.floor} onChange={(e) => setFormData({...formData, floor: e.target.value})} style={inputStyle} />
          </div>
        </>
      )}

      <div>
        <label style={labelStyle}>Êtes-vous propriétaire ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="isOwner" value="Oui" checked={formData.isOwner === 'Oui'} onChange={(e) => setFormData({...formData, isOwner: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="isOwner" value="Non" checked={formData.isOwner === 'Non'} onChange={(e) => setFormData({...formData, isOwner: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      {isRenter && (
        <div>
          <label style={labelStyle}>Si vous êtes locataire, avez-vous la permission d'avoir un animal ? *</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="hasPermission" value="Oui" checked={formData.hasPermission === 'Oui'} onChange={(e) => setFormData({...formData, hasPermission: e.target.value})} />
              Oui
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="hasPermission" value="Non" checked={formData.hasPermission === 'Non'} onChange={(e) => setFormData({...formData, hasPermission: e.target.value})} />
              Non
            </label>
          </div>
        </div>
      )}

      <div>
        <label style={labelStyle}>Prévoyez-vous de déménager prochainement ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="movingSoon" value="Oui" checked={formData.movingSoon === 'Oui'} onChange={(e) => setFormData({...formData, movingSoon: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="movingSoon" value="Non" checked={formData.movingSoon === 'Non'} onChange={(e) => setFormData({...formData, movingSoon: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      {isMoving && (
        <div>
          <label style={labelStyle}>Adresse du projet *</label>
          <input type="text" required value={formData.movingAddress} onChange={(e) => setFormData({...formData, movingAddress: e.target.value})} style={inputStyle} />
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

      {/* HOUSEHOLD */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Votre foyer</h3>

      <div>
        <label style={labelStyle}>Êtes-vous actuellement salarié.e ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="employed" value="Oui" checked={formData.employed === 'Oui'} onChange={(e) => setFormData({...formData, employed: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="employed" value="Non" checked={formData.employed === 'Non'} onChange={(e) => setFormData({...formData, employed: e.target.value})} />
            Non
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="employed" value="Autre" checked={formData.employed === 'Autre'} onChange={(e) => setFormData({...formData, employed: e.target.value})} />
            Autre
          </label>
        </div>
      </div>

      {employedOther && (
        <div>
          <label style={labelStyle}>Précisez *</label>
          <input type="text" required value={formData.employedOther} onChange={(e) => setFormData({...formData, employedOther: e.target.value})} style={inputStyle} />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Nombre d'adultes à la maison *</label>
          <input type="number" required value={formData.numAdults} onChange={(e) => setFormData({...formData, numAdults: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Nombre d'enfants *</label>
          <input type="number" required value={formData.numChildren} onChange={(e) => setFormData({...formData, numChildren: e.target.value})} style={inputStyle} />
        </div>
      </div>

      {hasChildren && (
        <div>
          <label style={labelStyle}>Âges des enfants *</label>
          <input type="text" required value={formData.childrenAges} onChange={(e) => setFormData({...formData, childrenAges: e.target.value})} style={inputStyle} />
        </div>
      )}

      <div>
        <label style={labelStyle}>Y a-t-il quelqu'un à la maison en journée ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="someoneHomeDuringDay" value="Oui" checked={formData.someoneHomeDuringDay === 'Oui'} onChange={(e) => setFormData({...formData, someoneHomeDuringDay: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="someoneHomeDuringDay" value="Non" checked={formData.someoneHomeDuringDay === 'Non'} onChange={(e) => setFormData({...formData, someoneHomeDuringDay: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      {notHomeDay && (
        <div>
          <label style={labelStyle}>Si non, combien d'heures d'absence ? *</label>
          <input type="text" required value={formData.hoursAbsence} onChange={(e) => setFormData({...formData, hoursAbsence: e.target.value})} style={inputStyle} />
        </div>
      )}

      <div>
        <label style={labelStyle}>Est-ce qu'un occupant de la maison souffre d'allergies ou d'asthme ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="hasAllergies" value="Oui" checked={formData.hasAllergies === 'Oui'} onChange={(e) => setFormData({...formData, hasAllergies: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="hasAllergies" value="Non" checked={formData.hasAllergies === 'Non'} onChange={(e) => setFormData({...formData, hasAllergies: e.target.value})} />
            Non
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="hasAllergies" value="Je ne sais pas" checked={formData.hasAllergies === 'Je ne sais pas'} onChange={(e) => setFormData({...formData, hasAllergies: e.target.value})} />
            Je ne sais pas
          </label>
        </div>
      </div>

      {noChildren && (
        <div>
          <label style={labelStyle}>Si vous projetez d'avoir des enfants, cela vous semble-t-il compatible avec la présence d'un animal ? *</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="childrenCompatible" value="Oui" checked={formData.childrenCompatible === 'Oui'} onChange={(e) => setFormData({...formData, childrenCompatible: e.target.value})} />
              Oui
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="childrenCompatible" value="Non" checked={formData.childrenCompatible === 'Non'} onChange={(e) => setFormData({...formData, childrenCompatible: e.target.value})} />
              Non
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="childrenCompatible" value="Autre" checked={formData.childrenCompatible === 'Autre'} onChange={(e) => setFormData({...formData, childrenCompatible: e.target.value})} />
              Autre
            </label>
          </div>
        </div>
      )}

      {childrenProjectOther && (
        <div>
          <label style={labelStyle}>Précisez *</label>
          <input type="text" required value={formData.childrenCompatibleOther} onChange={(e) => setFormData({...formData, childrenCompatibleOther: e.target.value})} style={inputStyle} />
        </div>
      )}

      {isCouple && (
        <div>
          <label style={labelStyle}>En cas de séparation du couple, qui parmi vous gardera l'animal ? *</label>
          <input type="text" required value={formData.coupleSeparation} onChange={(e) => setFormData({...formData, coupleSeparation: e.target.value})} style={inputStyle} />
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

      {/* ANIMALS */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Vos animaux</h3>

      <div>
        <label style={labelStyle}>Avez-vous un animal à la maison ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="hasAnimalNow" value="Oui" checked={formData.hasAnimalNow === 'Oui'} onChange={(e) => setFormData({...formData, hasAnimalNow: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="hasAnimalNow" value="Non" checked={formData.hasAnimalNow === 'Non'} onChange={(e) => setFormData({...formData, hasAnimalNow: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      {hasCurrentAnimal && (
        <>
          <div>
            <label style={labelStyle}>Espèce, race, sexe et âge *</label>
            <input type="text" required value={formData.currentAnimalDetails} onChange={(e) => setFormData({...formData, currentAnimalDetails: e.target.value})} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Vos animaux sont-ils</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={formData.currentAnimalsSterilized} onChange={(e) => setFormData({...formData, currentAnimalsSterilized: e.target.checked})} />
                Stérilisés
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={formData.currentAnimalsVaccinated} onChange={(e) => setFormData({...formData, currentAnimalsVaccinated: e.target.checked})} />
                Vaccinés
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={formData.currentAnimalsTested} onChange={(e) => setFormData({...formData, currentAnimalsTested: e.target.checked})} />
                Testés FIV/FeLV (pour les chats)
              </label>
            </div>
          </div>
        </>
      )}

      <div>
        <label style={labelStyle}>Avez-vous déjà eu un animal à la maison ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="hadAnimalBefore" value="Oui" checked={formData.hadAnimalBefore === 'Oui'} onChange={(e) => setFormData({...formData, hadAnimalBefore: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="hadAnimalBefore" value="Non" checked={formData.hadAnimalBefore === 'Non'} onChange={(e) => setFormData({...formData, hadAnimalBefore: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      {hadPreviousAnimal && (
        <div>
          <label style={labelStyle}>Espèce, race, sexe et âge *</label>
          <input type="text" required value={formData.previousAnimalDetails} onChange={(e) => setFormData({...formData, previousAnimalDetails: e.target.value})} style={inputStyle} />
        </div>
      )}

      <div>
        <label style={labelStyle}>Avez-vous dû vous séparer d'un animal par le passé ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="hadToSeparate" value="Oui" checked={formData.hadToSeparate === 'Oui'} onChange={(e) => setFormData({...formData, hadToSeparate: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="hadToSeparate" value="Non" checked={formData.hadToSeparate === 'Non'} onChange={(e) => setFormData({...formData, hadToSeparate: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      {didSeparate && (
        <div>
          <label style={labelStyle}>Pour quelle raison ? *</label>
          <textarea required rows={4} value={formData.separationReason} onChange={(e) => setFormData({...formData, separationReason: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
        </div>
      )}

      {(hasCurrentAnimal || hadPreviousAnimal) && (
        <div>
          <label style={labelStyle}>Avez-vous déjà adopté un animal (par le biais d'un refuge ou d'une association) ? *</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="adoptedFromShelter" value="Oui" checked={formData.adoptedFromShelter === 'Oui'} onChange={(e) => setFormData({...formData, adoptedFromShelter: e.target.value})} />
              Oui
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="adoptedFromShelter" value="Non" checked={formData.adoptedFromShelter === 'Non'} onChange={(e) => setFormData({...formData, adoptedFromShelter: e.target.value})} />
              Non
            </label>
          </div>
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

      {/* ADOPTION PROJECT */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Votre projet d'adoption</h3>

      <div>
        <label style={labelStyle}>Vous souhaitez adopter un : *</label>
        <select required value={formData.animalType} onChange={(e) => setFormData({...formData, animalType: e.target.value})} style={inputStyle}>
          <option value="Chat">Chat</option>
          <option value="Lapin">Lapin</option>
          <option value="Chien">Chien</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>A partir de quelle date êtes-vous en capacité d'accueillir votre nouveau compagnon ? *</label>
        <input type="date" required value={formData.adoptionDate} onChange={(e) => setFormData({...formData, adoptionDate: e.target.value})} style={inputStyle} />
        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Pour rappel, nous ne faisons pas de 'réservation'</div>
      </div>

      <div>
        <label style={labelStyle}>Pour qui et pourquoi voulez-vous adopter un animal, quelles sont vos motivations ? *</label>
        <textarea required rows={6} value={formData.motivation} onChange={(e) => setFormData({...formData, motivation: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
      </div>

      <div>
        <label style={labelStyle}>Quelle est votre opinion sur la stérilisation ou la castration ? *</label>
        <textarea required rows={4} value={formData.sterilizationOpinion} onChange={(e) => setFormData({...formData, sterilizationOpinion: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
      </div>

      <div>
        <label style={labelStyle}>Lors d'une absence (vacances, hospitalisation, long jour de travail, ...), qui prendra soin de votre animal ? *</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['Famille', 'Voisin', 'Pension', 'Petsitter', 'Autre'].map(option => (
            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={formData.careAbsence.includes(option)} onChange={() => handleCheckboxArray('careAbsence', option)} />
              {option}
            </label>
          ))}
        </div>
      </div>

      {careAbsenceHasOther && (
        <div>
          <label style={labelStyle}>Précisez *</label>
          <input type="text" required value={formData.careAbsenceOther} onChange={(e) => setFormData({...formData, careAbsenceOther: e.target.value})} style={inputStyle} />
        </div>
      )}

      <div>
        <label style={labelStyle}>Un chat ou un chien peut vivre de 15 à 20 ans, un lapin 10 ans ou plus. Êtes-vous prêt à vous engager à vivre avec lui pour sa vie entière ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="longTermCommitment" value="Oui" checked={formData.longTermCommitment === 'Oui'} onChange={(e) => setFormData({...formData, longTermCommitment: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="longTermCommitment" value="Non" checked={formData.longTermCommitment === 'Non'} onChange={(e) => setFormData({...formData, longTermCommitment: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Tout le monde à la maison est-il averti et d'accord avec cette adoption ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="everyoneAgrees" value="Oui" checked={formData.everyoneAgrees === 'Oui'} onChange={(e) => setFormData({...formData, everyoneAgrees: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="everyoneAgrees" value="Non" checked={formData.everyoneAgrees === 'Non'} onChange={(e) => setFormData({...formData, everyoneAgrees: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      {isCat && (
        <div>
          <label style={labelStyle}>Connaissez-vous les chats, leurs exigences et leurs besoins ? *</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="knowsAnimalNeeds" value="Oui" checked={formData.knowsAnimalNeeds === 'Oui'} onChange={(e) => setFormData({...formData, knowsAnimalNeeds: e.target.value})} />
              Oui
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="knowsAnimalNeeds" value="Non" checked={formData.knowsAnimalNeeds === 'Non'} onChange={(e) => setFormData({...formData, knowsAnimalNeeds: e.target.value})} />
              Non
            </label>
          </div>
        </div>
      )}

      {isDog && (
        <div>
          <label style={labelStyle}>Connaissez-vous les chiens, leurs exigences et leurs besoins ? *</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="knowsAnimalNeeds" value="Oui" checked={formData.knowsAnimalNeeds === 'Oui'} onChange={(e) => setFormData({...formData, knowsAnimalNeeds: e.target.value})} />
              Oui
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="knowsAnimalNeeds" value="Non" checked={formData.knowsAnimalNeeds === 'Non'} onChange={(e) => setFormData({...formData, knowsAnimalNeeds: e.target.value})} />
              Non
            </label>
          </div>
        </div>
      )}

      {isRabbit && (
        <div>
          <label style={labelStyle}>Connaissez-vous les lapins, leurs exigences et leurs besoins ? *</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="knowsAnimalNeeds" value="Oui" checked={formData.knowsAnimalNeeds === 'Oui'} onChange={(e) => setFormData({...formData, knowsAnimalNeeds: e.target.value})} />
              Oui
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="knowsAnimalNeeds" value="Non" checked={formData.knowsAnimalNeeds === 'Non'} onChange={(e) => setFormData({...formData, knowsAnimalNeeds: e.target.value})} />
              Non
            </label>
          </div>
        </div>
      )}

      <div>
        <label style={labelStyle}>Avez-vous pensé aux dégâts et/ou nuisances qu'un animal peut causer ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="thoughtAboutDamages" value="Oui" checked={formData.thoughtAboutDamages === 'Oui'} onChange={(e) => setFormData({...formData, thoughtAboutDamages: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="thoughtAboutDamages" value="Non" checked={formData.thoughtAboutDamages === 'Non'} onChange={(e) => setFormData({...formData, thoughtAboutDamages: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Avez-vous une idée du montant des frais vétérinaires ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="knowsVetCosts" value="Oui" checked={formData.knowsVetCosts === 'Oui'} onChange={(e) => setFormData({...formData, knowsVetCosts: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="knowsVetCosts" value="Non" checked={formData.knowsVetCosts === 'Non'} onChange={(e) => setFormData({...formData, knowsVetCosts: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      {knowsVetCosts && (
        <div>
          <label style={labelStyle}>A combien estimez-vous les dépenses par an ? *</label>
          <input type="text" required value={formData.vetCostsEstimate} onChange={(e) => setFormData({...formData, vetCostsEstimate: e.target.value})} style={inputStyle} />
        </div>
      )}

      <div>
        <label style={labelStyle}>Si votre animal nécessite des soins onéreux, à partir de quel montant seriez-vous en difficulté pour payer en une seule fois ? *</label>
        <select required value={formData.emergencyPaymentThreshold} onChange={(e) => setFormData({...formData, emergencyPaymentThreshold: e.target.value})} style={inputStyle}>
          <option value="">Sélectionnez</option>
          <option value="150€">150€</option>
          <option value="300€">300€</option>
          <option value="500€">500€</option>
          <option value="750€">750€</option>
          <option value="1 000€">1 000€</option>
          <option value="1 500€">1 500€</option>
          <option value="2 000€">2 000€</option>
          <option value="3 000€">3 000€</option>
          <option value="4 000€">4 000€</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Si votre animal présente des signes de maladie (nez, yeux qui coulent, éternuements, fièvre), que faites-vous ? Et si cela arrive pendant le week-end ? *</label>
        <textarea required rows={4} value={formData.sickAnimalAction} onChange={(e) => setFormData({...formData, sickAnimalAction: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
      </div>

      <div>
        <label style={labelStyle}>Comment imaginez-vous ses repas ? *</label>
        <input type="text" required value={formData.mealsDescription} onChange={(e) => setFormData({...formData, mealsDescription: e.target.value})} style={inputStyle} placeholder="Nombre de repas quotidiens, type d'alimentation, marques, ..." />
      </div>

      <div>
        <label style={labelStyle}>Avez-vous une idée du budget nécessaire à son entretien mensuel (nourriture, litière, ...) ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="knowsMonthlyBudget" value="Oui" checked={formData.knowsMonthlyBudget === 'Oui'} onChange={(e) => setFormData({...formData, knowsMonthlyBudget: e.target.value})} />
            Oui
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="radio" required name="knowsMonthlyBudget" value="Non" checked={formData.knowsMonthlyBudget === 'Non'} onChange={(e) => setFormData({...formData, knowsMonthlyBudget: e.target.value})} />
            Non
          </label>
        </div>
      </div>

      {knowsBudget && (
        <div>
          <label style={labelStyle}>A combien estimez-vous les dépenses ? *</label>
          <input type="text" required value={formData.monthlyBudgetEstimate} onChange={(e) => setFormData({...formData, monthlyBudgetEstimate: e.target.value})} style={inputStyle} />
        </div>
      )}

      {isRabbit && (
        <div>
          <label style={labelStyle}>Comment imaginez-vous l'habitat de votre lapin ? *</label>
          <textarea required rows={4} value={formData.rabbitHabitat} onChange={(e) => setFormData({...formData, rabbitHabitat: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
        </div>
      )}

      <div>
        <label style={labelStyle}>Quand vous serez au travail ou de sortie, où laisserez-vous votre animal ? *</label>
        <select required value={formData.animalLocationWork} onChange={(e) => setFormData({...formData, animalLocationWork: e.target.value})} style={inputStyle}>
          <option value="">Sélectionnez</option>
          <option value="Dans une pièce">Dans une pièce</option>
          <option value="En cage">En cage</option>
          <option value="En enclos">En enclos</option>
          <option value="Dehors">Dehors</option>
          <option value="Libre dans le logement">Libre dans le logement</option>
          <option value="Sur la terrasse / le balcon">Sur la terrasse / le balcon</option>
        </select>
      </div>

      {locationWorkEnclosure && (
        <div>
          <label style={labelStyle}>De quelle surface ? *</label>
          <input type="number" required value={formData.animalLocationWorkSurface} onChange={(e) => setFormData({...formData, animalLocationWorkSurface: e.target.value})} style={inputStyle} />
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>en m²</div>
        </div>
      )}

      <div>
        <label style={labelStyle}>Quand vous serez présent, où laisserez-vous votre animal ? *</label>
        <select required value={formData.animalLocationHome} onChange={(e) => setFormData({...formData, animalLocationHome: e.target.value})} style={inputStyle}>
          <option value="">Sélectionnez</option>
          <option value="Dans une pièce">Dans une pièce</option>
          <option value="En cage">En cage</option>
          <option value="En enclos">En enclos</option>
          <option value="Dehors">Dehors</option>
          <option value="Libre dans le logement">Libre dans le logement</option>
          <option value="Sur la terrasse / le balcon">Sur la terrasse / le balcon</option>
        </select>
      </div>

      {locationHomeEnclosure && (
        <div>
          <label style={labelStyle}>De quelle surface ? *</label>
          <input type="number" required value={formData.animalLocationHomeSurface} onChange={(e) => setFormData({...formData, animalLocationHomeSurface: e.target.value})} style={inputStyle} />
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>en m²</div>
        </div>
      )}

      {isRabbit && (
        <div>
          <label style={labelStyle}>Si vous n'avez pas déjà un lapin, souhaitez-vous en adopter un deuxième pour tenir compagnie à celui-ci ? *</label>
          <select required value={formData.secondRabbit} onChange={(e) => setFormData({...formData, secondRabbit: e.target.value})} style={inputStyle}>
            <option value="">Sélectionnez</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
            <option value="Je ne sais pas encore">Je ne sais pas encore</option>
          </select>
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

      {/* FINAL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Comment avez-vous connu notre association ? *</label>
          <select required value={formData.howHeardAbout} onChange={(e) => setFormData({...formData, howHeardAbout: e.target.value})} style={inputStyle}>
            <option value="">Sélectionnez</option>
            <option value="Facebook">Facebook</option>
            <option value="Recherche Google">Recherche Google</option>
            <option value="Internet">Internet</option>
            <option value="Vétérinaire">Vétérinaire</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        {heardOther && (
          <div>
            <label style={labelStyle}>Précisez</label>
            <input type="text" value={formData.howHeardAboutOther} onChange={(e) => setFormData({...formData, howHeardAboutOther: e.target.value})} style={inputStyle} />
          </div>
        )}
      </div>

      <div>
        <label style={labelStyle}>Avez-vous des remarques / questions ?</label>
        <textarea rows={6} value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})} style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}} />
      </div>

      <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '4px', fontSize: '0.875rem', color: '#6b7280' }}>
        L'association Nine Lives Paris traite les données recueillies afin de gérer les demandes d'adoption.
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
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </button>

      {status === 'error' && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', textAlign: 'center' }}>
          <strong>Erreur</strong> lors de l'envoi. Veuillez réessayer ou nous contacter directement.
        </div>
      )}
    </form>
  );

}
