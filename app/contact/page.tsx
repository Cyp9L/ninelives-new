'use client';
import { useState } from 'react';
import Link from 'next/link';
import Captcha from '@/components/Captcha';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    donationNote: '',
    respectsVolunteers: false,
    acceptsPrivacy: false,
    honeypot: ''
  });
  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken })
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          firstName: '', lastName: '', email: '', subject: '',
          message: '', donationNote: '', respectsVolunteers: false,
          acceptsPrivacy: false, honeypot: ''
        });
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
    <main>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1rem' }}>
            Contactez-nous
          </h1>
          <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Vous avez une question ? Vous souhaitez plus de renseignements ?
            Laissez-nous vos coordonnées et nous reviendrons vers vous sous peu.
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {/* Email */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✉️</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Écrivez-nous
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                Contactez-nous par e-mail pour toute question concernant l&apos;association, son fonctionnement, ou pour une proposition de partenariat.
              </p>
              <a
                href="mailto:asso@ninelives.fr"
                style={{
                  color: '#667eea',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  textDecoration: 'none'
                }}
              >
                asso@ninelives.fr
              </a>
            </div>

            {/* Phone */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Appelez-nous
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
                Le moyen le plus sûr d&apos;obtenir une réponse est de nous contacter par écrit. En raison d&apos;un trop grand nombre d&apos;appels ne relevant pas de l&apos;urgence, nous avons été contraintes de ne plus diffuser nos numéros de téléphone.
              </p>
            </div>

            {/* Meet */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤝</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Rencontrez-nous
              </h2>
              <p style={{ color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                Nous ne possédons pas de lieu d&apos;accueil. Restez à l&apos;affût des occasions pour nous rencontrer en suivant notre actualité.
              </p>
              <a
                href="https://www.facebook.com/NineLivesParis"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#667eea',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  textDecoration: 'none'
                }}
              >
                Page Facebook →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section id="formulaire" className="section section-gray">
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '1rem', textAlign: 'center' }}>
            Formulaire de contact
          </h2>

          {/* Notices */}
          <div style={{
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            lineHeight: '1.7',
            color: '#92400e'
          }}>
            <p style={{ marginBottom: '0.75rem' }}>
              Si vous avez déjà envoyé un questionnaire de pré-adoption, nous reviendrons vers vous dans les meilleurs délais.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              Si vous souhaitez nous confier un animal, merci de ne pas utiliser ce formulaire — vous ne recevrez aucune réponse. Rendez-vous sur <Link href="/abandon" style={{ color: '#92400e', textDecoration: 'underline', fontWeight: '600' }}>cette page</Link>.
            </p>
            <p>
              Veuillez prendre en compte le fait que nous sommes tous bénévoles, nous traitons les messages dès que nous avons du temps libre.
            </p>
          </div>

          {/* Form */}
          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

            {status === 'success' && (
              <div style={{ padding: '1.5rem', background: '#d1fae5', color: '#065f46', borderRadius: '8px', textAlign: 'center', marginBottom: '2rem' }}>
                <strong>✓ Merci !</strong><br />
                Votre message a été envoyé. Nous vous répondrons dès que possible.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                style={{ display: 'none' }}
                tabIndex={-1}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Prénom *</label>
                  <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nom de famille *</label>
                  <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>E-mail *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Comment pouvons-nous vous aider ? *</label>
                <select required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} style={inputStyle}>
                  <option value="">Sélectionnez un sujet</option>
                  <option value="Question générale">Question générale</option>
                  <option value="Renseignement adoption">Renseignement adoption</option>
                  <option value="Proposition de partenariat">Proposition de partenariat</option>
                  <option value="Proposition de don">Proposition de don</option>
                  <option value="Devenir bénévole">Devenir bénévole</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Commentaires / Questions *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }}
                  placeholder="N'hésitez pas à poser une question ou à simplement laisser un commentaire."
                />
              </div>

              {formData.subject === 'Proposition de don' && (
                <div>
                  <label style={labelStyle}>Si vous souhaitez nous proposer un don, merci de préciser où nous devrons le retirer</label>
                  <input type="text" value={formData.donationNote} onChange={(e) => setFormData({ ...formData, donationNote: e.target.value })} style={inputStyle} />
                </div>
              )}

              <div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" required checked={formData.respectsVolunteers} onChange={(e) => setFormData({ ...formData, respectsVolunteers: e.target.checked })} style={{ marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.95rem', color: '#4b5563' }}>
                    Je respecte le temps des bénévoles et j&apos;ai bien pris conscience du fait que, si je n&apos;utilise pas le formulaire approprié, je n&apos;obtiendrai aucune réponse. *
                  </span>
                </label>
              </div>

              <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '4px', fontSize: '0.875rem', color: '#6b7280' }}>
                L&apos;association Nine Lives Paris traite les données recueillies pour répondre au mieux à votre demande. Pour en savoir plus sur la gestion de vos données personnelles et pour exercer vos droits, reportez-vous à notre politique de confidentialité.
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" required checked={formData.acceptsPrivacy} onChange={(e) => setFormData({ ...formData, acceptsPrivacy: e.target.checked })} style={{ marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.95rem' }}>
                    J&apos;ai lu et j&apos;accepte <a href="/politique-de-confidentialite" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>la politique de confidentialité de ce site</a>. *
                  </span>
                </label>
              </div>

               <Captcha onVerify={setCaptchaToken} />

              <button
                type="submit"
                disabled={status === 'sending' || !captchaToken}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.6 : 1,
                  alignSelf: 'center',
                  fontWeight: '500'
                }}
              >
                {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {status === 'error' && (
                <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', textAlign: 'center' }}>
                  <strong>Erreur</strong> lors de l&apos;envoi. Veuillez réessayer ou écrire directement à asso@ninelives.fr.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
