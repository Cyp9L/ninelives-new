'use client';
import { useState } from 'react';
import Link from 'next/link';
import Captcha from '@/components/Captcha';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', subject: '',
    message: '', donationNote: '', respectsVolunteers: false,
    acceptsPrivacy: false, honeypot: ''
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
        setFormData({ firstName: '', lastName: '', email: '', subject: '',
          message: '', donationNote: '', respectsVolunteers: false,
          acceptsPrivacy: false, honeypot: '' });
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <main id="main-content">
      {/* Header */}
      <section className="hero" role="img" aria-label="Chat écaille de tortue" style={{ backgroundImage: 'url(/images/site/Masha8.webp' }}>
        <div className="container">
          <div className="hero-content">
          <h1>Contactez-nous</h1>
          <p>
            Vous avez une question ? Vous souhaitez plus de renseignements ?
            Laissez-nous vos coordonnées et nous reviendrons vers vous sous peu.
          </p>
        </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="section">
        <div className="container-mid">
          <div className="grid-3">
            <div className="card card-centered">
              <div className="card-icon">✉️</div>
              <h2 className="section-title">Écrivez-nous</h2>
              <p className="text-body">
                Pour toute question concernant l&apos;association, son fonctionnement ou une proposition de partenariat.
              </p>
              <a href="mailto:asso@ninelives.fr" className="link-purple highlight-text">
                asso@ninelives.fr
              </a>
            </div>

            <div className="card card-centered">
              <div className="card-icon">📞</div>
              <h2 className="section-title">Appelez-nous</h2>
              <p className="text-body">
                Le plus sûr est de nous écrire. En raison d&apos;un trop grand nombre d&apos;appels, nous ne diffusons plus nos numéros de téléphone.
              </p>
            </div>

            <div className="card card-centered">
              <div className="card-icon">🤝</div>
              <h2 className="section-title">Rencontrez-nous</h2>
              <p className="text-body">
                Nous ne possédons pas de lieu d&apos;accueil. Suivez notre actualité pour les occasions de nous rencontrer.
              </p>
              <a href="https://www.facebook.com/NineLivesParis" target="_blank" rel="noopener noreferrer"
                className="link-purple highlight-text">
                Page Facebook →
              </a>
            </div>
            <div className="card card-centered">
              <div className="card-icon"></div>
              <div className="img"><img src="/images/gallery/1771693095692-Patch.jpg" alt="Chaton patte levée" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section id="formulaire" className="section section-gray">
        <div className="container-narrow">
          <h2 className="text-center">Formulaire de contact</h2>

          <div className="alert alert-warning mb-lg">
            <p>Si vous avez déjà envoyé un questionnaire de pré-adoption, nous reviendrons vers vous dans les meilleurs délais.</p>
            <p>Si vous souhaitez nous confier un animal, <strong>n&apos;utilisez pas ce formulaire</strong> — rendez-vous sur <Link href="/abandon" className="link-amber">cette page</Link>.</p>
            <p>Nous sommes tous bénévoles, nous traitons les messages dès que possible.</p>
          </div>

          <div className="form-container">
            {status === 'success' && (
              <div className="alert alert-success mb-lg">
                <strong>✓ Merci !</strong><br/>
                Votre message a été envoyé. Vous allez en recevoir une copie. Nous vous répondrons dès que possible.
              </div>
            )}

            <form onSubmit={handleSubmit} className="form-flow">
              <input type="text" name="website" value={formData.honeypot}
                onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
                className="honeypot" tabIndex={-1} />

              <div className="form-grid">
                <div>
                  <label className="form-label">Prénom *</label>
                  <input type="text" required className="form-input" value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Nom de famille *</label>
                  <input type="text" required className="form-input" value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="form-label">E-mail *</label>
                <input type="email" required className="form-input" value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div>
                <label className="form-label">Comment pouvons-nous vous aider ? *</label>
                <select required className="form-select" value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}>
                  <option value="">Sélectionnez un sujet</option>
                  {['Question générale', 'Renseignement adoption', 'Proposition de partenariat',
                    'Proposition de don', 'Devenir bénévole', 'Autre'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Commentaires / Questions *</label>
                <textarea required rows={5} className="form-textarea" value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="N'hésitez pas à poser une question ou simplement laisser un commentaire." />
              </div>

              {formData.subject === 'Proposition de don' && (
                <div>
                  <label className="form-label">Où devrons-nous retirer le don ?</label>
                  <input type="text" className="form-input" value={formData.donationNote}
                    onChange={(e) => setFormData({...formData, donationNote: e.target.value})} />
                </div>
              )}

              <label className="form-checkbox">
                <input type="checkbox" required checked={formData.respectsVolunteers}
                  onChange={(e) => setFormData({...formData, respectsVolunteers: e.target.checked})} />
                <span>Je respecte le temps des bénévoles et j&apos;ai conscience que si je n&apos;utilise pas le formulaire approprié, je n&apos;obtiendrai aucune réponse. *</span>
              </label>

              <div className="form-privacy">
                L&apos;association Nine Lives Paris traite les données recueillies pour répondre à votre demande. Reportez-vous à notre politique de confidentialité pour en savoir plus.
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
                  {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </div>

              {status === 'error' && (
                <div className="alert alert-error">
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