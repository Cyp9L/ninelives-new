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

    {/* Form section */}
      <section id="formulaire" className="section section-gray">
        <div className="container-mid">
          <h2 className="text-center">Formulaire de contact</h2>
          <div className="alert alert-warning mb-lg">
            <p>Si vous avez déjà envoyé un questionnaire de pré-adoption, nous reviendrons vers vous dans les meilleurs délais.</p>
            <p>Pour nous confier un animal, utilisez le formulaire de <Link href="/abandon" className="link-amber">demande de prise en charge</Link>.</p>
          </div>

          <div style={{ clear: 'both' }} />

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
                <input type="checkbox" required checked={formData.acceptsPrivacy}
                  onChange={(e) => setFormData({...formData, acceptsPrivacy: e.target.checked})} />
                <span>J&apos;accepte la <a href="/politique-de-confidentialite" target="_blank" rel="noopener" className="link-blue">politique de confidentialité</a> et je m&apos;engage à utiliser le formulaire adapté à ma demande. *</span>
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
          <p className="text-small text-muted text-center" style={{ marginTop: '1.5rem' }}>
            Vous pouvez aussi écrire directement à <a href="mailto:asso@ninelives.fr" className="link-purple">asso@ninelives.fr</a>
          </p>
        </div>
      </section>
    </main>
  );
}