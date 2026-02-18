'use client';
import { useState } from 'react';
import Captcha from '@/components/Captcha';

export default function AbandonForm() {
  const [formData, setFormData] = useState({
    lastName: '', firstName: '', email: '', phone: '', address: '',
    species: '', sex: '', name: '', age: '', history: '', character: '',
    compatibility: '', abandonReason: '',
    isCastrated: '', isSterilized: '', isIdentified: '', identificationNumber: '',
    isVaccinated: '', vaccineTypes: '', lastVaccineDate: '',
    isTestedFIV: '', fivTestDate: '', contactSinceTest: '',
    willingToPayHealth: '', healthStatus: '',
    acceptsPrivacy: false, honeypot: ''
  });

  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

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
        body: JSON.stringify({ ...formData, captchaToken })
      });
      if (res.ok) { setStatus('success'); window.scrollTo(0, 0); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

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
          Votre demande a été envoyée avec succès. Nous vous contacterons très prochainement.
        </div>
      )}

      <input type="text" name="website" value={formData.honeypot}
        onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
        className="honeypot" tabIndex={-1} />

      {/* CONTACT */}
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

      <div className="form-grid">
        <div>
          <label className="form-label">E-mail *</label>
          <input type="email" required className="form-input" value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="form-label">Téléphone *</label>
          <input type="text" required className="form-input" value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
      </div>

      <div>
        <label className="form-label">Adresse complète (incluant la ville) *</label>
        <input type="text" required className="form-input" value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})} />
      </div>

      <hr className="form-divider" />

      {/* ANIMAL */}
      <h3 className="form-section-title">L&apos;animal</h3>

      <div className="form-grid">
        <div>
          <label className="form-label">Espèce *</label>
          <select required className="form-select" value={formData.species}
            onChange={(e) => setFormData({...formData, species: e.target.value})}>
            <option value="">Sélectionnez</option>
            <option value="Chat">Chat</option>
            <option value="Chien">Chien</option>
            <option value="Lapin">Lapin</option>
          </select>
        </div>
        <div>
          <label className="form-label">Sexe *</label>
          <div className="form-radio-group" style={{ paddingTop: '0.5rem' }}>
            {radio('sex', 'Mâle', 'sex')}
            {radio('sex', 'Femelle', 'sex')}
            {radio('sex', 'Je ne sais pas', 'sex')}
          </div>
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label">Son nom</label>
          <input type="text" className="form-input" value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="form-label">Son âge *</label>
          <input type="text" required className="form-input" placeholder="Date de naissance ou âge approximatif"
            value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
        </div>
      </div>

      <div>
        <label className="form-label">Quelle est son histoire ? *</label>
        <textarea required rows={4} className="form-textarea" value={formData.history}
          onChange={(e) => setFormData({...formData, history: e.target.value})} />
      </div>

      <div>
        <label className="form-label">Quel est son caractère ? *</label>
        <textarea required rows={4} className="form-textarea" value={formData.character}
          onChange={(e) => setFormData({...formData, character: e.target.value})} />
      </div>

      <div>
        <label className="form-label">Ententes avec chats, chiens, enfants ? *</label>
        <textarea required rows={3} className="form-textarea" value={formData.compatibility}
          onChange={(e) => setFormData({...formData, compatibility: e.target.value})} />
      </div>

      <div>
        <label className="form-label">Raison de l&apos;abandon et solutions déjà testées ? *</label>
        <textarea required rows={4} className="form-textarea" value={formData.abandonReason}
          onChange={(e) => setFormData({...formData, abandonReason: e.target.value})} />
      </div>

      {isMale && (
        <div>
          <label className="form-label">Est-il castré ? *</label>
          <div className="form-radio-group">
            {radio('isCastrated', 'Oui', 'isCastrated')}
            {radio('isCastrated', 'Non', 'isCastrated')}
            {radio('isCastrated', 'Je ne sais pas', 'isCastrated')}
          </div>
        </div>
      )}

      {isFemale && (
        <div>
          <label className="form-label">Est-elle stérilisée ? *</label>
          <div className="form-radio-group">
            {radio('isSterilized', 'Oui', 'isSterilized')}
            {radio('isSterilized', 'Non', 'isSterilized')}
            {radio('isSterilized', 'Je ne sais pas', 'isSterilized')}
          </div>
        </div>
      )}

      <div>
        <label className="form-label">Est-il identifié ? *</label>
        <div className="form-radio-group">
          {radio('isIdentified', 'Oui', 'isIdentified')}
          {radio('isIdentified', 'Non', 'isIdentified')}
          {radio('isIdentified', 'Je ne sais pas', 'isIdentified')}
        </div>
      </div>

      {isIdentifiedYes && (
        <div>
          <label className="form-label">Numéro d&apos;identification et carte en votre possession ? *</label>
          <input type="text" required className="form-input" value={formData.identificationNumber}
            onChange={(e) => setFormData({...formData, identificationNumber: e.target.value})} />
        </div>
      )}

      {isIdentifiedUnknown && (
        <div className="alert alert-warning">
          <strong>Merci de l&apos;emmener chez <a href="https://sospets.fr/" target="_blank" rel="noopener noreferrer" className="link-amber">le vétérinaire le plus proche</a> afin de vérifier s&apos;il est identifié.</strong>
        </div>
      )}

      <div>
        <label className="form-label">Est-il vacciné ? *</label>
        <div className="form-radio-group">
          {radio('isVaccinated', 'Oui', 'isVaccinated')}
          {radio('isVaccinated', 'Non', 'isVaccinated')}
          {radio('isVaccinated', 'Je ne sais pas', 'isVaccinated')}
        </div>
      </div>

      {isVaccinatedYes && (
        <div className="form-grid">
          <div>
            <label className="form-label">Pour quelles maladies ? *</label>
            <input type="text" required className="form-input" value={formData.vaccineTypes}
              placeholder="Typhus, coryza, leucose, VHD…"
              onChange={(e) => setFormData({...formData, vaccineTypes: e.target.value})} />
          </div>
          <div>
            <label className="form-label">Date des derniers vaccins *</label>
            <input type="date" required className="form-input" value={formData.lastVaccineDate}
              onChange={(e) => setFormData({...formData, lastVaccineDate: e.target.value})} />
          </div>
        </div>
      )}

      {isCat && (
        <div>
          <label className="form-label">Testé FIV/FeLV (sida du chat / leucose) ? *</label>
          <div className="form-radio-group">
            {radio('isTestedFIV', 'Oui', 'isTestedFIV')}
            {radio('isTestedFIV', 'Non', 'isTestedFIV')}
            {radio('isTestedFIV', 'Je ne sais pas', 'isTestedFIV')}
          </div>
        </div>
      )}

      {isCat && isTestedFIVYes && (
        <div className="form-grid">
          <div>
            <label className="form-label">Date du test *</label>
            <input type="date" required className="form-input" value={formData.fivTestDate}
              onChange={(e) => setFormData({...formData, fivTestDate: e.target.value})} />
          </div>
          <div>
            <label className="form-label">Contact avec d&apos;autres chats depuis ? *</label>
            <input type="text" required className="form-input" value={formData.contactSinceTest}
              onChange={(e) => setFormData({...formData, contactSinceTest: e.target.value})} />
          </div>
        </div>
      )}

      <div>
        <label className="form-label">Prêt à mettre à jour les soins à vos frais ? *</label>
        <div className="form-radio-group">
          {radio('willingToPayHealth', 'Oui', 'willingToPayHealth')}
          {radio('willingToPayHealth', 'Non', 'willingToPayHealth')}
          {radio('willingToPayHealth', 'En partie', 'willingToPayHealth')}
        </div>
      </div>

      <div>
        <label className="form-label">État de santé, maladies ou blessures passées ? *</label>
        <textarea required rows={4} className="form-textarea" value={formData.healthStatus}
          onChange={(e) => setFormData({...formData, healthStatus: e.target.value})} />
      </div>

      <hr className="form-divider" />

      <div className="form-privacy">
        L&apos;association Nine Lives Paris traite les données recueillies afin de trouver une solution adaptée pour cet animal, et se réserve le droit de ne pas répondre en cas de formulaire incomplet.
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
          <strong>Erreur</strong> lors de l&apos;envoi. Veuillez réessayer ou nous contacter directement.
        </div>
      )}
    </form>
  );
}