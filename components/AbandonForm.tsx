'use client';
import { useState } from 'react';

export default function AbandonForm() {
  const [formData, setFormData] = useState({
    // Contact
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    address: '',

    // Animal
    species: '',
    sex: '',
    name: '',
    age: '',
    history: '',
    character: '',
    compatibility: '',
    abandonReason: '',
    isCastrated: '',
    isSterilized: '',
    isIdentified: '',
    identificationNumber: '',
    isVaccinated: '',
    vaccineTypes: '',
    lastVaccineDate: '',
    isTestedFIV: '',
    fivTestDate: '',
    contactSinceTest: '',
    willingToPayHealth: '',
    healthStatus: '',

    // Final
    acceptsPrivacy: false,
    honeypot: ''
  });

  const [status, setStatus] = useState('');

  // Conditional visibility
  const isMale = formData.sex === 'Mâle';
  const isFemale = formData.sex === 'Femelle';
  const isCat = formData.species === 'Chat';
  const isIdentifiedYes = formData.isIdentified === 'Oui';
  const isIdentifiedUnknown = formData.isIdentified === 'Je ne sais pas';
  const isVaccinatedYes = formData.isVaccinated === 'Oui';
  const isTestedFIVYes = formData.isTestedFIV === 'Oui';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setStatus('sending');

    try {
      const res = await fetch('/api/abandon', {
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
    } catch {
      setStatus('error');
    }
  };

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
          <strong>✓ Merci !</strong><br />
          Votre demande a été envoyée avec succès. Nous vous contacterons très prochainement.
        </div>
      )}

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        style={{ display: 'none' }}
        tabIndex={-1}
      />

      {/* CONTACT INFO */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Vos coordonnées</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Votre nom de famille *</label>
          <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Votre prénom *</label>
          <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Votre adresse e-mail *</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Votre numéro de téléphone *</label>
          <input type="text" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Votre adresse complète (incluant la ville) *</label>
        <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} style={inputStyle} />
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

      {/* ANIMAL INFO */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>L&apos;animal</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Espèce *</label>
          <select required value={formData.species} onChange={(e) => setFormData({ ...formData, species: e.target.value })} style={inputStyle}>
            <option value="">Sélectionnez</option>
            <option value="Chat">Chat</option>
            <option value="Chien">Chien</option>
            <option value="Lapin">Lapin</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Sexe *</label>
          <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '0.5rem' }}>
            {['Mâle', 'Femelle', 'Je ne sais pas'].map(option => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" required name="sex" value={option} checked={formData.sex === option} onChange={(e) => setFormData({ ...formData, sex: e.target.value })} />
                {option}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Son nom</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Son âge *</label>
          <input type="text" required placeholder="Date de naissance ou âge approximatif" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Quelle est son histoire ? *</label>
        <textarea required rows={6} value={formData.history} onChange={(e) => setFormData({ ...formData, history: e.target.value })} style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }} />
      </div>

      <div>
        <label style={labelStyle}>Quel est son caractère ? *</label>
        <textarea required rows={6} value={formData.character} onChange={(e) => setFormData({ ...formData, character: e.target.value })} style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }} />
      </div>

      <div>
        <label style={labelStyle}>Quelles sont ses ententes avec les chats, les chiens, les enfants (si vous les connaissez) ? *</label>
        <textarea required rows={6} value={formData.compatibility} onChange={(e) => setFormData({ ...formData, compatibility: e.target.value })} style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }} />
      </div>

      <div>
        <label style={labelStyle}>Quelle est la raison de l&apos;abandon ? Et quelles autres solutions avez-vous déjà testées ? *</label>
        <textarea required rows={6} value={formData.abandonReason} onChange={(e) => setFormData({ ...formData, abandonReason: e.target.value })} style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }} />
      </div>

      {/* Castration / Sterilization - conditional on sex */}
      {isMale && (
        <div>
          <label style={labelStyle}>Est-il castré ? *</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Oui', 'Non', 'Je ne sais pas'].map(option => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" required name="isCastrated" value={option} checked={formData.isCastrated === option} onChange={(e) => setFormData({ ...formData, isCastrated: e.target.value })} />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

      {isFemale && (
        <div>
          <label style={labelStyle}>Est-elle stérilisée ? *</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Oui', 'Non', 'Je ne sais pas'].map(option => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" required name="isSterilized" value={option} checked={formData.isSterilized === option} onChange={(e) => setFormData({ ...formData, isSterilized: e.target.value })} />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Identification */}
      <div>
        <label style={labelStyle}>Est-il identifié ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Oui', 'Non', 'Je ne sais pas'].map(option => (
            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="isIdentified" value={option} checked={formData.isIdentified === option} onChange={(e) => setFormData({ ...formData, isIdentified: e.target.value })} />
              {option}
            </label>
          ))}
        </div>
      </div>

      {isIdentifiedYes && (
        <div>
          <label style={labelStyle}>Merci de nous donner son numéro d&apos;identification et de nous indiquer si vous avez en votre possession l&apos;intégralité de sa carte d&apos;identification *</label>
          <input type="text" required value={formData.identificationNumber} onChange={(e) => setFormData({ ...formData, identificationNumber: e.target.value })} style={inputStyle} />
        </div>
      )}

      {isIdentifiedUnknown && (
        <div style={{
          background: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '1.5rem',
          color: '#92400e'
        }}>
          <strong>Dans ce cas, merci de l&apos;emmener chez <a href="https://sospets.fr/" target="_blank" rel="noopener noreferrer" style={{ color: '#92400e', textDecoration: 'underline' }}>le vétérinaire le plus proche</a> afin de savoir s&apos;il est identifié, et de pouvoir le rendre à sa famille le cas échéant.</strong>
        </div>
      )}

      {/* Vaccination */}
      <div>
        <label style={labelStyle}>Est-il vacciné ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Oui', 'Non', 'Je ne sais pas'].map(option => (
            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="isVaccinated" value={option} checked={formData.isVaccinated === option} onChange={(e) => setFormData({ ...formData, isVaccinated: e.target.value })} />
              {option}
            </label>
          ))}
        </div>
      </div>

      {isVaccinatedYes && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Pour quelles maladies (typhus, coryza, leucose, VHD, ...) ? *</label>
            <input type="text" required value={formData.vaccineTypes} onChange={(e) => setFormData({ ...formData, vaccineTypes: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Quelle est la date de ses derniers vaccins ? *</label>
            <input type="date" required value={formData.lastVaccineDate} onChange={(e) => setFormData({ ...formData, lastVaccineDate: e.target.value })} style={inputStyle} />
          </div>
        </div>
      )}

      {/* FIV/FeLV - only for cats */}
      {isCat && (
        <div>
          <label style={labelStyle}>A-t-il été testé FIV/FeLV (dépistage des maladies sida du chat et leucose) ? *</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Oui', 'Non', 'Je ne sais pas'].map(option => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" required name="isTestedFIV" value={option} checked={formData.isTestedFIV === option} onChange={(e) => setFormData({ ...formData, isTestedFIV: e.target.value })} />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

      {isCat && isTestedFIVYes && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>A quelle date ? *</label>
            <input type="date" required value={formData.fivTestDate} onChange={(e) => setFormData({ ...formData, fivTestDate: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Est-il sorti, ou a-t-il été en contact avec d&apos;autres chats depuis ? *</label>
            <input type="text" required value={formData.contactSinceTest} onChange={(e) => setFormData({ ...formData, contactSinceTest: e.target.value })} style={inputStyle} />
          </div>
        </div>
      )}

      {/* Health payment willingness */}
      <div>
        <label style={labelStyle}>S&apos;il n&apos;est pas à jour sanitairement (tests, vaccins, stérilisation, identification), êtes-vous prêt à le faire à vos frais ? *</label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Oui', 'Non', 'En partie'].map(option => (
            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" required name="willingToPayHealth" value={option} checked={formData.willingToPayHealth === option} onChange={(e) => setFormData({ ...formData, willingToPayHealth: e.target.value })} />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Health status */}
      <div>
        <label style={labelStyle}>Quel est son état de santé ? A-t-il eu des maladies ou des blessures dans le passé ? *</label>
        <textarea required rows={6} value={formData.healthStatus} onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })} style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }} />
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

      {/* FINAL */}
      <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '4px', fontSize: '0.875rem', color: '#6b7280' }}>
        L&apos;association Nine Lives Paris traite les données recueillies afin de trouver une solution adaptée pour cet animal, et se réserve le droit de ne pas répondre en cas de formulaire incomplet.
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" required checked={formData.acceptsPrivacy} onChange={(e) => setFormData({ ...formData, acceptsPrivacy: e.target.checked })} style={{ marginTop: '0.25rem' }} />
          <span>J&apos;ai lu et j&apos;accepte <a href="/politique-de-confidentialite" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>la politique de confidentialité de ce site</a>. *</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary"
        style={{
          padding: '1rem 2rem',
          fontSize: '1.125rem',
          background: '#1f2937',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          opacity: status === 'sending' ? 0.6 : 1,
          alignSelf: 'center'
        }}
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      {status === 'error' && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', textAlign: 'center' }}>
          <strong>Erreur</strong> lors de l&apos;envoi. Veuillez réessayer ou nous contacter directement.
        </div>
      )}
    </form>
  );
}
