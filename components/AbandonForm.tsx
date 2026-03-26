'use client';
import { useCallback, memo, startTransition, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import Captcha from '@/components/Captcha';

type SetField = (field: string, value: string) => void;

const show = (visible: boolean) => (visible ? undefined : { display: 'none' as const });

const AbandonContactSection = memo(function AbandonContactSection() {
  return (
    <>
      {/* CONTACT */}
      <h3 className="form-section-title">Vos coordonnées</h3>

      <div className="form-grid">
        <div>
          <label className="form-label" htmlFor="lastName">Nom de famille *</label>
          <input type="text" required className="form-input" name="lastName" id="lastName" />
        </div>
        <div>
          <label className="form-label" htmlFor="firstName">Prénom *</label>
          <input type="text" required className="form-input" name="firstName" id="firstName" />
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label" htmlFor="email">E-mail *</label>
          <input type="email" required className="form-input" name="email" id="email" />
        </div>
        <div>
          <label className="form-label" htmlFor="phone">Téléphone *</label>
          <input type="text" required className="form-input" name="phone" id="phone" />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="address">Adresse complète (incluant la ville) *</label>
        <input type="text" required className="form-input" name="address" id="address" />
      </div>

      <hr className="form-divider" />
    </>
  );
});

type AbandonAnimalBaseProps = {
  species: string;
  sex: string;
  onSetField: SetField;
};

const AbandonAnimalBase = memo(function AbandonAnimalBase({
  species,
  sex,
  onSetField,
}: AbandonAnimalBaseProps) {
  const radio = (name: string, value: string, field: string, required = true) => {
    let checkedValue = '';
    switch (field) {
      case 'species':
        checkedValue = species;
        break;
      case 'sex':
        checkedValue = sex;
        break;
      default:
        checkedValue = '';
    }

    return (
      <label className="form-radio">
        <input
          type="radio"
          required={required}
          name={name}
          value={value}
          checked={checkedValue === value}
          onChange={() => startTransition(() => { onSetField(field, value); })}
        />
        {value}
      </label>
    );
  };

  return (
    <>
      {/* ANIMAL */}
      <h3 className="form-section-title">L&apos;animal</h3>

      <div className="form-grid">
        <div>
          <label className="form-label">Espèce *</label>
          <div className="form-radio-group">
            {radio('species', 'Chat', 'species')}
            {radio('species', 'Chien', 'species')}
          </div>
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
          <label className="form-label" htmlFor="animalName">Son nom</label>
          <input type="text" className="form-input" name="name" id="animalName" />
        </div>
        <div>
          <label className="form-label" htmlFor="age">Son âge *</label>
          <input
            type="text"
            required
            className="form-input"
            name="age"
            id="age"
            placeholder="Date de naissance ou âge approximatif"
          />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="history">Quelle est son histoire ? *</label>
        <textarea required rows={4} className="form-textarea" name="history" id="history" />
      </div>

      <div>
        <label className="form-label" htmlFor="character">Quel est son caractère ? *</label>
        <textarea required rows={4} className="form-textarea" name="character" id="character" />
      </div>

      <div>
        <label className="form-label" htmlFor="compatibility">Ententes avec chats, chiens, enfants ? *</label>
        <textarea required rows={3} className="form-textarea" name="compatibility" id="compatibility" />
      </div>

      <div>
        <label className="form-label" htmlFor="abandonReason">Raison de l&apos;abandon et solutions déjà testées ? *</label>
        <textarea required rows={4} className="form-textarea" name="abandonReason" id="abandonReason" />
      </div>
    </>
  );
});

type AbandonCastratedBlockProps = {
  isMale: boolean;
  isCastrated: string;
  onSetField: SetField;
};

const AbandonCastratedBlock = memo(function AbandonCastratedBlock({
  isMale,
  isCastrated,
  onSetField,
}: AbandonCastratedBlockProps) {
  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio"
        required={required}
        name={name}
        value={value}
        checked={field === 'isCastrated' ? isCastrated === value : false}
        onChange={() => startTransition(() => { onSetField(field, value); })}
      />
      {value}
    </label>
  );

  return (
    <div style={show(isMale)}>
      <label className="form-label">Est-il castré ? {isMale && '*'}</label>
      <div className="form-radio-group">
        {radio('isCastrated', 'Oui', 'isCastrated', isMale)}
        {radio('isCastrated', 'Non', 'isCastrated', isMale)}
        {radio('isCastrated', 'Je ne sais pas', 'isCastrated', isMale)}
      </div>
    </div>
  );
});

type AbandonSterilizedBlockProps = {
  isFemale: boolean;
  isSterilized: string;
  onSetField: SetField;
};

const AbandonSterilizedBlock = memo(function AbandonSterilizedBlock({
  isFemale,
  isSterilized,
  onSetField,
}: AbandonSterilizedBlockProps) {
  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio"
        required={required}
        name={name}
        value={value}
        checked={field === 'isSterilized' ? isSterilized === value : false}
        onChange={() => startTransition(() => { onSetField(field, value); })}
      />
      {value}
    </label>
  );

  return (
    <div style={show(isFemale)}>
      <label className="form-label">Est-elle stérilisée ? {isFemale && '*'}</label>
      <div className="form-radio-group">
        {radio('isSterilized', 'Oui', 'isSterilized', isFemale)}
        {radio('isSterilized', 'Non', 'isSterilized', isFemale)}
        {radio('isSterilized', 'Je ne sais pas', 'isSterilized', isFemale)}
      </div>
    </div>
  );
});

type AbandonIdentificationBlockProps = {
  isIdentified: string;
  onSetField: SetField;
};

const AbandonIdentificationBlock = memo(function AbandonIdentificationBlock({
  isIdentified,
  onSetField,
}: AbandonIdentificationBlockProps) {
  const isIdentifiedYes = isIdentified === 'Oui';
  const isIdentifiedUnknown = isIdentified === 'Je ne sais pas';

  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio"
        required={required}
        name={name}
        value={value}
        checked={isIdentified === value}
        onChange={() => startTransition(() => { onSetField(field, value); })}
      />
      {value}
    </label>
  );

  return (
    <>
      <div>
        <label className="form-label">Est-il identifié ? *</label>
        <div className="form-radio-group">
          {radio('isIdentified', 'Oui', 'isIdentified')}
          {radio('isIdentified', 'Non', 'isIdentified')}
          {radio('isIdentified', 'Je ne sais pas', 'isIdentified')}
        </div>
      </div>

      <div style={show(isIdentifiedYes)}>
        <label className="form-label" htmlFor="identificationNumber">
          Numéro d&apos;identification et carte en votre possession ? {isIdentifiedYes && '*'}
        </label>
        <input
          type="text"
          required={isIdentifiedYes}
          className="form-input"
          name="identificationNumber"
          id="identificationNumber"
        />
      </div>

      <div style={show(isIdentifiedUnknown)}>
        <div className="alert alert-warning">
          <strong>Merci de l&apos;emmener chez{' '}
            <a href="https://sospets.fr/" target="_blank" rel="noopener noreferrer" className="link-amber">
              le vétérinaire le plus proche
            </a>{' '}
            afin de vérifier s&apos;il est identifié.
          </strong>
        </div>
      </div>
    </>
  );
});

type AbandonVaccinationBlockProps = {
  isVaccinated: string;
  onSetField: SetField;
};

const AbandonVaccinationBlock = memo(function AbandonVaccinationBlock({
  isVaccinated,
  onSetField,
}: AbandonVaccinationBlockProps) {
  const isVaccinatedYes = isVaccinated === 'Oui';

  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio"
        required={required}
        name={name}
        value={value}
        checked={isVaccinated === value}
        onChange={() => startTransition(() => { onSetField(field, value); })}
      />
      {value}
    </label>
  );

  return (
    <>
      <div>
        <label className="form-label">Est-il vacciné ? *</label>
        <div className="form-radio-group">
          {radio('isVaccinated', 'Oui', 'isVaccinated')}
          {radio('isVaccinated', 'Non', 'isVaccinated')}
          {radio('isVaccinated', 'Je ne sais pas', 'isVaccinated')}
        </div>
      </div>

      <div style={show(isVaccinatedYes)}>
        <div className="form-grid">
          <div>
            <label className="form-label" htmlFor="vaccineTypes">
              Pour quelles maladies ? {isVaccinatedYes && '*'}
            </label>
            <input
              type="text"
              required={isVaccinatedYes}
              className="form-input"
              name="vaccineTypes"
              id="vaccineTypes"
              placeholder="Typhus, coryza, leucose, VHD…"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="lastVaccineDate">
              Date des derniers vaccins {isVaccinatedYes && '*'}
            </label>
            <input
              type="date"
              required={isVaccinatedYes}
              className="form-input"
              name="lastVaccineDate"
              id="lastVaccineDate"
            />
          </div>
        </div>
      </div>
    </>
  );
});

type AbandonFivTestBlockProps = {
  species: string;
  isTestedFIV: string;
  onSetField: SetField;
};

const AbandonFivTestBlock = memo(function AbandonFivTestBlock({
  species,
  isTestedFIV,
  onSetField,
}: AbandonFivTestBlockProps) {
  const isCat = species === 'Chat';
  const isTestedFIVYes = isTestedFIV === 'Oui';

  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio"
        required={required}
        name={name}
        value={value}
        checked={isTestedFIV === value}
        onChange={() => startTransition(() => { onSetField(field, value); })}
      />
      {value}
    </label>
  );

  return (
    <>
      <div style={show(isCat)}>
        <label className="form-label">
          Testé FIV/FeLV (sida du chat / leucose) ? {isCat && '*'}
        </label>
        <div className="form-radio-group">
          {radio('isTestedFIV', 'Oui', 'isTestedFIV', isCat)}
          {radio('isTestedFIV', 'Non', 'isTestedFIV', isCat)}
          {radio('isTestedFIV', 'Je ne sais pas', 'isTestedFIV', isCat)}
        </div>
      </div>

      <div style={show(isCat && isTestedFIVYes)}>
        <div className="form-grid">
          <div>
            <label className="form-label" htmlFor="fivTestDate">
              Date du test {isCat && isTestedFIVYes && '*'}
            </label>
            <input
              type="date"
              required={isCat && isTestedFIVYes}
              className="form-input"
              name="fivTestDate"
              id="fivTestDate"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="contactSinceTest">
              Contact avec d&apos;autres chats depuis ? {isCat && isTestedFIVYes && '*'}
            </label>
            <input
              type="text"
              required={isCat && isTestedFIVYes}
              className="form-input"
              name="contactSinceTest"
              id="contactSinceTest"
            />
          </div>
        </div>
      </div>
    </>
  );
});

type AbandonHealthBlockProps = {
  willingToPayHealth: string;
  onSetField: SetField;
};

const AbandonHealthBlock = memo(function AbandonHealthBlock({
  willingToPayHealth,
  onSetField,
}: AbandonHealthBlockProps) {
  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio"
        required={required}
        name={name}
        value={value}
        checked={willingToPayHealth === value}
        onChange={() => startTransition(() => { onSetField(field, value); })}
      />
      {value}
    </label>
  );

  return (
    <>
      <div>
        <label className="form-label">Prêt à mettre à jour les soins à vos frais ? *</label>
        <div className="form-radio-group">
          {radio('willingToPayHealth', 'Oui', 'willingToPayHealth')}
          {radio('willingToPayHealth', 'Non', 'willingToPayHealth')}
          {radio('willingToPayHealth', 'En partie', 'willingToPayHealth')}
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="healthStatus">
          État de santé, maladies ou blessures passées ? *
        </label>
        <textarea required rows={4} className="form-textarea" name="healthStatus" id="healthStatus" />
      </div>
    </>
  );
});

type PrivacyConsentProps = {
  acceptsPrivacy: boolean;
  onAcceptsPrivacyChange: (checked: boolean) => void;
};

const PrivacyConsent = memo(function PrivacyConsent({
  acceptsPrivacy,
  onAcceptsPrivacyChange,
}: PrivacyConsentProps) {
  return (
    <>
      <hr className="form-divider" />

      <div className="form-privacy">
        L&apos;association Nine Lives Paris traite les données recueillies afin de trouver une solution adaptée
        pour cet animal, et se réserve le droit de ne pas répondre en cas de formulaire incomplet.
      </div>

      <label className="form-checkbox">
        <input
          type="checkbox"
          required
          checked={acceptsPrivacy}
          onChange={(e) => onAcceptsPrivacyChange(e.target.checked)}
        />
        <span>J&apos;ai lu et j&apos;accepte{' '}
          <a href="/politique-de-confidentialite" target="_blank" rel="noopener" className="link-blue">
            la politique de confidentialité
          </a>. *
        </span>
      </label>
    </>
  );
});

const CaptchaBlock = memo(function CaptchaBlock({ onVerify }: { onVerify: (token: string) => void }) {
  return <Captcha onVerify={onVerify} />;
});

export default function AbandonForm() {
  /* ─── Controlled state: ONLY fields driving conditional visibility + radios/checkboxes ─── */
  const [formState, setFormState] = useState({
    species: '',
    sex: '',
    isCastrated: '',
    isSterilized: '',
    isIdentified: '',
    isVaccinated: '',
    isTestedFIV: '',
    willingToPayHealth: '',
    acceptsPrivacy: false,
    honeypot: '',
  });

  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Conditionals for memoized blocks
  const isMale = formState.sex === 'Mâle';
  const isFemale = formState.sex === 'Femelle';

  const processImages = async (): Promise<{ filename: string; data: string }[]> => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) return [];

    const selected = Array.from(files).slice(0, 3);
    const images: { filename: string; data: string }[] = [];

    for (const file of selected) {
      if (file.size > 5 * 1024 * 1024) continue;
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg',
      });
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result !== 'string') {
            reject(new Error('Invalid file reader result'));
            return;
          }
          const [, data = ''] = result.split(',');
          resolve(data);
        };
        reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
        reader.readAsDataURL(compressed);
      });
      images.push({ filename: file.name, data: base64 });
    }

    return images;
  };

  /* ─── Submit: collect uncontrolled text via FormData, merge with controlled state ─── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.honeypot) return;
    setStatus('sending');
    try {
      const fd = new FormData(e.currentTarget as HTMLFormElement);
      const textData: Record<string, string> = {};
      fd.forEach((value, key) => {
        if (key === 'website') return;
        if (typeof value === 'string') textData[key] = value;
      });

      const defaults: Record<string, string> = {
        lastName: '', firstName: '', email: '', phone: '', address: '',
        name: '', age: '', history: '', character: '',
        compatibility: '', abandonReason: '',
        identificationNumber: '',
        vaccineTypes: '', lastVaccineDate: '',
        fivTestDate: '', contactSinceTest: '',
        healthStatus: '',
      };

      const images = await processImages();

      const dataToSend = {
        ...defaults,
        ...textData,
        ...formState,
        captchaToken,
        images,
      };

      const res = await fetch('/api/abandon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      if (res.ok) { setStatus('success'); window.scrollTo(0, 0); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const updateField = useCallback((field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);

  const onCaptchaVerify = useCallback((token: string) => setCaptchaToken(token), []);
  const onAcceptsPrivacyChange = useCallback((checked: boolean) => {
    setFormState(prev => ({ ...prev, acceptsPrivacy: checked }));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form-flow">
      {status === 'success' && (
        <div className="alert alert-success">
          <strong>✓ Merci !</strong><br/>
          Votre message a été envoyé. Vous allez en recevoir une copie. Nous vous répondrons dès que possible.
        </div>
      )}

      <input type="text" name="website" value={formState.honeypot}
        onChange={(e) => setFormState(prev => ({ ...prev, honeypot: e.target.value }))}
        className="honeypot" tabIndex={-1} />

      <AbandonContactSection />

      <AbandonAnimalBase
        species={formState.species}
        sex={formState.sex}
        onSetField={updateField}
      />

      <AbandonCastratedBlock
        isMale={isMale}
        isCastrated={formState.isCastrated}
        onSetField={updateField}
      />

      <AbandonSterilizedBlock
        isFemale={isFemale}
        isSterilized={formState.isSterilized}
        onSetField={updateField}
      />

      <AbandonIdentificationBlock
        isIdentified={formState.isIdentified}
        onSetField={updateField}
      />

      <AbandonVaccinationBlock
        isVaccinated={formState.isVaccinated}
        onSetField={updateField}
      />

      <AbandonFivTestBlock
        species={formState.species}
        isTestedFIV={formState.isTestedFIV}
        onSetField={updateField}
      />

      <div>
        <label className="form-label" htmlFor="animalPhotos">Photos de l&apos;animal (3 max, 5 Mo chacune)</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,.jpg,.jpeg,.png,.webp,.heic"
          multiple
          className="form-input"
          id="animalPhotos"
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;
            if (files.length > 3) {
              alert('Maximum 3 photos');
              e.target.value = '';
              return;
            }
            const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
            for (const file of Array.from(files)) {
              if (!allowed.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|heic)$/i)) {
                alert('Format non accepté : ' + file.name + '\nFormats acceptés : JPEG, PNG, WebP, HEIC');
                e.target.value = '';
                return;
              }
            }
          }}
        />
        <div className="form-help-text">Formats acceptés : JPEG, PNG, WebP, HEIC</div>
      </div>

      <AbandonHealthBlock
        willingToPayHealth={formState.willingToPayHealth}
        onSetField={updateField}
      />

      <PrivacyConsent
        acceptsPrivacy={formState.acceptsPrivacy}
        onAcceptsPrivacyChange={onAcceptsPrivacyChange}
      />

      <CaptchaBlock onVerify={onCaptchaVerify} />

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