'use client';
import { useState, startTransition, useRef, useCallback, useEffect, memo } from 'react';
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

const HIDDEN_STYLE = { display: 'none' as const };
const show = (visible: boolean) => (visible ? undefined : HIDDEN_STYLE);

const idify = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // spaces to dashes
    .replace(/[^a-z0-9_-]/g, ''); // keep it simple for HTML ids

const makeRadioId = (name: string, value: string) =>
  `${idify(name)}-${idify(value)}`;

type BenevoleStep0Props = {
  volunteerType: string;
  setField: (field: string, value: string | boolean) => void;
};

const BenevoleStep0 = memo(function BenevoleStep0({ volunteerType, setField }: BenevoleStep0Props) {
  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio"
        required={required}
        name={name}
        value={value}
        id={makeRadioId(name, value)}
        checked={volunteerType === value}
        onChange={() =>
          startTransition(() => {
            setField(field, value);
          })
        }
      />
      {value}
    </label>
  );

  return (
    <>
      <div>
        <label className="form-label" htmlFor={makeRadioId('volunteerType', 'Bénévole')}>
          Vous souhaitez vous proposer en tant que : *
        </label>
        <div className="form-radio-group">
          {radio('volunteerType', 'Bénévole', 'volunteerType')}
          {radio('volunteerType', "Famille d'accueil", 'volunteerType')}
          {radio('volunteerType', 'Les deux', 'volunteerType')}
        </div>
      </div>
      <hr className="form-divider" />
      <h3 className="form-section-title">Vos coordonnées</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label className="form-label" htmlFor="lastName">
            Nom de famille *
          </label>
          <input id="lastName" type="text" name="lastName" required className="form-input" />
        </div>
        <div>
          <label className="form-label" htmlFor="firstName">
            Prénom *
          </label>
          <input id="firstName" type="text" name="firstName" required className="form-input" />
        </div>
        <div>
          <label className="form-label" htmlFor="age">
            Âge *
          </label>
          <input id="age" type="number" name="age" required className="form-input" />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="address">
          Adresse *
        </label>
        <input id="address" type="text" name="address" required className="form-input" />
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label" htmlFor="postalCode">
            Code postal *
          </label>
          <input
            id="postalCode"
            type="text"
            name="postalCode"
            required
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="city">
            Ville *
          </label>
          <input id="city" type="text" name="city" required className="form-input" />
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label" htmlFor="email">
            E-mail *
          </label>
          <input id="email" type="email" name="email" required className="form-input" />
        </div>
        <div>
          <label className="form-label" htmlFor="phone">
            Téléphone *
          </label>
          <input id="phone" type="tel" name="phone" required className="form-input" />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="contactSlots">
          Créneaux auxquels nous pouvons vous joindre
        </label>
        <input
          id="contactSlots"
          type="text"
          name="contactSlots"
          className="form-input"
        />
      </div>

      <hr className="form-divider" />

      <div className="alert alert-warning">
        <strong>Nous ne disposons pas de refuge</strong> — tous nos animaux sont en familles d&apos;accueil.
        Nous n&apos;avons donc pas besoin de bénévoles pour nourrir les animaux, nettoyer les litières ou un local.
      </div>
    </>
  );
});

type BenevoleStep1Props = {
  housingType: string;
  canDoQuarantine: string;
  hasChildren: string;
  hasAnimalsHome: string;
  balconySecured: string;
  animalsSterilized: boolean;
  animalsIdentified: boolean;
  animalsVaccinated: boolean;
  animalsTested: boolean;
  setField: (field: string, value: string | boolean) => void;
};

const BenevoleStep1 = memo(function BenevoleStep1({
  housingType,
  canDoQuarantine,
  hasChildren,
  hasAnimalsHome,
  balconySecured,
  animalsSterilized,
  animalsIdentified,
  animalsVaccinated,
  animalsTested,
  setField,
}: BenevoleStep1Props) {
  const isApartment = housingType === 'En appartement';
  const canQuarantine = canDoQuarantine === 'Oui';
  const hasChildrenYes = hasChildren === 'Oui';
  const hasAnimals = hasAnimalsHome === 'Oui';

  const radio = (name: string, value: string, field: string, required = true) => {
    let checkedValue: string;
    switch (field) {
      case 'housingType':
        checkedValue = housingType;
        break;
      case 'canDoQuarantine':
        checkedValue = canDoQuarantine;
        break;
      case 'hasChildren':
        checkedValue = hasChildren;
        break;
      case 'hasAnimalsHome':
        checkedValue = hasAnimalsHome;
        break;
      case 'balconySecured':
        checkedValue = balconySecured;
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
          id={makeRadioId(name, value)}
          checked={checkedValue === value}
          onChange={() =>
            startTransition(() => {
              setField(field, value);
            })
          }
        />
        {value}
      </label>
    );
  };

  return (
    <>
      <h3 className="form-section-title">Votre logement</h3>

      <div className="form-grid">
        <div>
          <label className="form-label" htmlFor="surface">
            Superficie ? *
          </label>
          <input id="surface" type="number" name="surface" required className="form-input" />
          <div className="form-hint">en m²</div>
        </div>
        <div>
          <label className="form-label" htmlFor={makeRadioId('housingType', 'En maison')}>
            Vous vivez : *
          </label>
          <div className="form-radio-group" style={{ marginTop: '0.5rem' }}>
            {radio('housingType', 'En maison', 'housingType')}
            {radio('housingType', 'En appartement', 'housingType')}
          </div>
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label" htmlFor="numRooms">
            Nombre de pièces *
          </label>
          <input id="numRooms" type="number" name="numRooms" required className="form-input" />
        </div>
        <div style={show(isApartment)}>
          <label className="form-label" htmlFor="floor">
            Étage {isApartment && '*'}
          </label>
          <input id="floor" type="number" name="floor" required={isApartment} className="form-input" />
        </div>
      </div>

      <div style={show(isApartment)}>
        <label className="form-label" htmlFor={makeRadioId('balconySecured', 'Oui')}>
          Avez-vous un balcon ?
        </label>
        <div className="form-radio-group">
          {radio('balconySecured', 'Oui', 'balconySecured')}
          {radio('balconySecured', 'Non', 'balconySecured')}
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor={makeRadioId('canDoQuarantine', 'Oui')}>
          Pouvez-vous effectuer des quarantaines ? *
        </label>
        <div className="form-radio-group">
          {radio('canDoQuarantine', 'Oui', 'canDoQuarantine')}
          {radio('canDoQuarantine', 'Non', 'canDoQuarantine')}
        </div>
        <div className="form-hint">Période de 15 jours où l&apos;animal est dans un espace restreint et facile à nettoyer</div>
      </div>

      <div style={show(canQuarantine)}>
        <div style={{ marginTop: '1rem' }}>
          <label className="form-label" htmlFor="quarantineRoom">
            Dans quelle pièce ?
          </label>
          <input
            id="quarantineRoom"
            type="text"
            name="quarantineRoom"
            className="form-input"
            placeholder="Superficie, avec fenêtre…"
          />
        </div>
      </div>

      <hr className="form-divider" />

      <h3 className="form-section-title">Votre foyer</h3>

      <div className="form-grid">
        <div>
          <label className="form-label" htmlFor="numPeopleHousehold">
            Nombre de personnes dans le foyer *
          </label>
          <input
            id="numPeopleHousehold"
            type="number"
            name="numPeopleHousehold"
            required
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label" htmlFor={makeRadioId('hasChildren', 'Oui')}>
            Avez-vous des enfants ? *
          </label>
          <div className="form-radio-group">
            {radio('hasChildren', 'Oui', 'hasChildren')}
            {radio('hasChildren', 'Non', 'hasChildren')}
          </div>
        </div>
      </div>

      <div className="form-grid" style={show(hasChildrenYes)}>
        <div>
          <label className="form-label" htmlFor="childrenAges">
            Âges des enfants {hasChildrenYes && '*'}
          </label>
          <input
            id="childrenAges"
            type="text"
            name="childrenAges"
            required={hasChildrenYes}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="childrenUsedToAnimals">
            Habitués aux animaux ? {hasChildrenYes && '*'}
          </label>
          <input
            id="childrenUsedToAnimals"
            type="text"
            name="childrenUsedToAnimals"
            required={hasChildrenYes}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor={makeRadioId('hasAnimalsHome', 'Oui')}>
          Avez-vous des animaux à domicile ? *
        </label>
        <div className="form-radio-group">
          {radio('hasAnimalsHome', 'Oui', 'hasAnimalsHome')}
          {radio('hasAnimalsHome', 'Non', 'hasAnimalsHome')}
        </div>
      </div>

      <div style={show(hasAnimals)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="form-label" htmlFor="numDogs">
              Chiens {hasAnimals && '*'}
            </label>
            <input id="numDogs" type="number" name="numDogs" required={hasAnimals} className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="numCats">
              Chats {hasAnimals && '*'}
            </label>
            <input id="numCats" type="number" name="numCats" required={hasAnimals} className="form-input" />
          </div>
          <div>
            <label className="form-label" htmlFor="numOthers">
              Autres {hasAnimals && '*'}
            </label>
            <input id="numOthers" type="number" name="numOthers" required={hasAnimals} className="form-input" />
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label className="form-label" htmlFor="animalsDetails">
            Type / race, habitués aux autres animaux ? {hasAnimals && '*'}
          </label>
          <textarea
            id="animalsDetails"
            name="animalsDetails"
            required={hasAnimals}
            rows={3}
            className="form-textarea"
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label className="form-label" htmlFor="animalsLocation">
            Où vivent-ils ? {hasAnimals && '*'}
          </label>
          <input id="animalsLocation" type="text" name="animalsLocation" required={hasAnimals} className="form-input" />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label className="form-label" htmlFor="step1-animalsSterilized">
            Vos animaux sont-ils…
          </label>
          <div className="form-checkbox-group">
            {[
              { key: 'animalsSterilized', label: 'Stérilisés' },
              { key: 'animalsIdentified', label: 'Identifiés' },
              { key: 'animalsVaccinated', label: 'Vaccinés et à jour' },
              { key: 'animalsTested', label: 'Testés FIV/FeLV (chats)' },
            ].map(({ key, label }) => (
              <label key={key} className="form-checkbox">
                <input
                  id={`step1-${key}`}
                  type="checkbox"
                  checked={
                    key === 'animalsSterilized'
                      ? animalsSterilized
                      : key === 'animalsIdentified'
                        ? animalsIdentified
                        : key === 'animalsVaccinated'
                          ? animalsVaccinated
                          : animalsTested
                  }
                  onChange={(e) =>
                    startTransition(() => {
                      setField(key, e.target.checked);
                    })
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="hoursAlonePerDay">
          Combien d&apos;heures par jour le chat va-t-il rester seul ? *
        </label>
        <input id="hoursAlonePerDay" type="text" name="hoursAlonePerDay" required className="form-input" />
      </div>
    </>
  );
});

type BenevoleStep2Props = {
  beenFosterBefore: string;
  catExperience: string;
  catCarePractices: string[];
  setField: (field: string, value: string | boolean) => void;
  toggleCheckboxArray: (field: string, value: string) => void;
};

const BenevoleStep2 = memo(function BenevoleStep2({
  beenFosterBefore,
  catExperience,
  catCarePractices,
  setField,
  toggleCheckboxArray,
}: BenevoleStep2Props) {
  const hadFosterExp = beenFosterBefore === 'Oui';
  const hasCareOther = catCarePractices.includes('Autre');

  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio"
        required={required}
        name={name}
        value={value}
        id={makeRadioId(name, value)}
        checked={beenFosterBefore === value}
        onChange={() =>
          startTransition(() => {
            setField(field, value);
          })
        }
      />
      {value}
    </label>
  );

  return (
    <>
      <h3 className="form-section-title">Votre motivation</h3>

      <div>
        <label className="form-label" htmlFor="whyFoster">
          Pourquoi souhaitez-vous être famille d&apos;accueil ? *
        </label>
        <textarea id="whyFoster" name="whyFoster" required rows={4} className="form-textarea" />
      </div>

      <div className="form-grid">
        <div>
          <label
            className="form-label"
            htmlFor={makeRadioId('beenFosterBefore', 'Oui')}
          >
            L&apos;avez-vous déjà été ? *
          </label>
          <div className="form-radio-group">
            {radio('beenFosterBefore', 'Oui', 'beenFosterBefore')}
            {radio('beenFosterBefore', 'Non', 'beenFosterBefore')}
          </div>
        </div>
        <div style={show(hadFosterExp)}>
          <label className="form-label" htmlFor="fosterReferences">
            Références de l&apos;association
          </label>
          <input id="fosterReferences" type="text" name="fosterReferences" className="form-input" />
        </div>
      </div>

      <hr className="form-divider" />
      <h3 className="form-section-title">Accueil de chats</h3>

      <div>
        <label className="form-label" htmlFor="catExperience">
          Degré d&apos;expérience des chats *
        </label>
        <select
          id="catExperience"
          name="catExperience"
          required
          className="form-select"
          value={catExperience}
          onChange={(e) =>
            startTransition(() => {
              setField('catExperience', e.target.value);
            })
          }
        >
          <option value="">Sélectionnez</option>
          {['Débutant', "J'ai (eu) un chat", "J'ai (eu) plusieurs chats", 'Je suis bilingue chat'].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="form-label"
          htmlFor={`step2-catCarePractices-${idify('Biberonner un nouveau-né')}`}
        >
          Soins déjà pratiqués sur un chat *
        </label>
        <div className="form-checkbox-group">
          {[
            'Biberonner un nouveau-né',
            'Couper les griffes',
            'Appliquer un antiparasitaire externe',
            'Administrer un médicament dans la gueule',
            'Administrer un médicament liquide à la seringue',
            'Appliquer un spray sur tout le corps (teigne…)',
            'Nettoyer une plaie',
            'Pratiquer des inhalations',
            'Nettoyer des yeux / nez malades',
            'Appliquer une pommade dans les oreilles',
            'Effectuer une injection',
            'Autre',
          ].map((practice) => (
            <label key={practice} className="form-checkbox">
              <input
                id={`step2-catCarePractices-${idify(practice)}`}
                type="checkbox"
                checked={catCarePractices.includes(practice)}
                onChange={() =>
                  startTransition(() => {
                    toggleCheckboxArray('catCarePractices', practice);
                  })
                }
              />
              <span>{practice}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={show(hasCareOther)}>
        <label className="form-label" htmlFor="catCareOther">
          Précisez
        </label>
        <input id="catCareOther" type="text" name="catCareOther" className="form-input" />
      </div>

      <div>
        <label className="form-label" htmlFor="catHidingReaction">
          Réaction face à un chat caché depuis plusieurs jours ? *
        </label>
        <textarea
          id="catHidingReaction"
          name="catHidingReaction"
          required
          rows={3}
          className="form-textarea"
        />
      </div>

      <div>
        <label className="form-label" htmlFor="catLitterIssueReaction">
          Réaction face à un chat qui fait hors litière ? *
        </label>
        <textarea
          id="catLitterIssueReaction"
          name="catLitterIssueReaction"
          required
          rows={3}
          className="form-textarea"
        />
      </div>

      <div>
        <label className="form-label" htmlFor="catDealbreakers">
          Y a t-il quelque chose qui serait rédhibitoire pour vous dans l’accueil d’un chat ? *
        </label>
        <textarea
          id="catDealbreakers"
          name="catDealbreakers"
          required
          rows={3}
          className="form-textarea"
        />
      </div>
    </>
  );
});

type BenevoleLastStepProps = {
  isFoster: boolean;
  catTypes: string[];
  fosterDuration: string[];
  goingOnVacation: string;
  householdAgrees: string;
  hasAssociationVet: string;
  canDoTransport: string[];
  openToOtherMissions: string;
  acceptsPrivacy: boolean;
  setField: (field: string, value: string | boolean) => void;
  toggleCheckboxArray: (field: string, value: string) => void;
  onCaptchaVerify: (token: string) => void;
};

const BenevoleLastStep = memo(function BenevoleLastStep({
  isFoster,
  catTypes,
  fosterDuration,
  goingOnVacation,
  householdAgrees,
  hasAssociationVet,
  canDoTransport,
  openToOtherMissions,
  acceptsPrivacy,
  setField,
  toggleCheckboxArray,
  onCaptchaVerify,
}: BenevoleLastStepProps) {
  const wantsOtherMissions = openToOtherMissions === 'Oui';
  const vacationSoon = goingOnVacation === 'Oui';
  const householdDisagrees = householdAgrees === 'Non';
  const hasAssocVet = hasAssociationVet === 'Oui';
  const hasDeterminedDuration = fosterDuration.includes('Pour une durée déterminée');
  const canTransport =
    canDoTransport.includes('Oui, en voiture') || canDoTransport.includes('Oui, en transports en commun');

  const radio = (name: string, value: string, field: string, required = true) => {
    let checkedValue: string;
    switch (field) {
      case 'goingOnVacation':
        checkedValue = goingOnVacation;
        break;
      case 'householdAgrees':
        checkedValue = householdAgrees;
        break;
      case 'hasAssociationVet':
        checkedValue = hasAssociationVet;
        break;
      case 'openToOtherMissions':
        checkedValue = openToOtherMissions;
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
          id={makeRadioId(name, value)}
          checked={checkedValue === value}
          onChange={() =>
            startTransition(() => {
              setField(field, value);
            })
          }
        />
        {value}
      </label>
    );
  };

  return (
    <>
      {isFoster && (
        <>
          <h3 className="form-section-title">Préférences d&apos;accueil</h3>

          <div>
            <label className="form-label" htmlFor="numCatsCanFoster">
              Combien de chats pourriez-vous accueillir ? *
            </label>
            <input id="numCatsCanFoster" type="number" name="numCatsCanFoster" required className="form-input" />
          </div>

          <div>
            <label
              className="form-label"
              htmlFor={`benevole-last-catTypes-${idify('Adulte')}`}
            >
              Quel type de chat(s) ? *
            </label>
            <div className="form-checkbox-group">
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
                'Chat en fin de vie',
              ].map((type) => (
                <label key={type} className="form-checkbox">
                  <input
                    id={`benevole-last-catTypes-${idify(type)}`}
                    type="checkbox"
                    checked={catTypes.includes(type)}
                    onChange={() =>
                      startTransition(() => {
                        toggleCheckboxArray('catTypes', type);
                      })
                    }
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              className="form-label"
              htmlFor={`benevole-last-fosterDuration-${idify('Quelques jours')}`}
            >
              Durée d&apos;accueil possible *
            </label>
            <div className="form-checkbox-group">
              {[
                'Après la quarantaine uniquement (mon animal n\'est pas à jour)',
                'Quelques jours',
                '2 à 3 semaines (quarantaine)',
                'Pour une durée déterminée',
                "Quelques semaines ou mois (jusqu'à adoption)",
              ].map((duration) => (
                <label key={duration} className="form-checkbox">
                  <input
                    id={`benevole-last-fosterDuration-${idify(duration)}`}
                    type="checkbox"
                    checked={fosterDuration.includes(duration)}
                    onChange={() =>
                      startTransition(() => {
                        toggleCheckboxArray('fosterDuration', duration);
                      })
                    }
                  />
                  <span>{duration}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={show(hasDeterminedDuration)}>
            <label className="form-label" htmlFor="fosterDurationOther">
              Précisez
            </label>
            <input id="fosterDurationOther" type="text" name="fosterDurationOther" className="form-input" />
          </div>

          <div className="form-grid">
            <div>
              <label
                className="form-label"
                htmlFor={makeRadioId('goingOnVacation', 'Oui')}
              >
                Partez-vous en vacances bientôt ? *
              </label>
              <div className="form-radio-group">
                {radio('goingOnVacation', 'Oui', 'goingOnVacation')}
                {radio('goingOnVacation', 'Non', 'goingOnVacation')}
              </div>
            </div>
            <div style={show(vacationSoon)}>
              <label className="form-label" htmlFor="vacationDates">
                À quelles dates ? {vacationSoon && '*'}
              </label>
              <input id="vacationDates" type="text" name="vacationDates" required={vacationSoon} className="form-input" />
            </div>
          </div>

          <div style={show(vacationSoon)}>
            <label className="form-label" htmlFor="vacationCare">
              Qui s&apos;occupera de l&apos;animal ? {vacationSoon && '*'}
            </label>
            <input id="vacationCare" type="text" name="vacationCare" required={vacationSoon} className="form-input" />
          </div>

          <div>
            <label
              className="form-label"
              htmlFor={makeRadioId('householdAgrees', 'Oui')}
            >
              Tout le foyer est-il d&apos;accord ? *
            </label>
            <div className="form-radio-group">
              {radio('householdAgrees', 'Oui', 'householdAgrees')}
              {radio('householdAgrees', 'Non', 'householdAgrees')}
            </div>
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
            <label className="form-label" htmlFor="feedingPlan">
              Comment nourrirez-vous les animaux ? *
            </label>
            <input id="feedingPlan" type="text" name="feedingPlan" required className="form-input" placeholder="Type d'alimentation, marques…" />
          </div>

          <div>
            <label className="form-label" htmlFor="hasEquipment">
              Avez-vous du matériel (litière, caisse, laisses…) ? *
            </label>
            <input id="hasEquipment" type="text" name="hasEquipment" required className="form-input" />
          </div>

          <div>
            <label
              className="form-label"
              htmlFor={makeRadioId('hasAssociationVet', 'Oui')}
            >
              Vétérinaire à tarifs associatifs ?
            </label>
            <div className="form-radio-group">
              {radio('hasAssociationVet', 'Oui', 'hasAssociationVet', false)}
              {radio('hasAssociationVet', 'Non', 'hasAssociationVet', false)}
              {radio('hasAssociationVet', 'Je ne sais pas', 'hasAssociationVet', false)}
            </div>
          </div>

          <div style={show(hasAssocVet)}>
            <div className="form-hint">Tarifs approximatifs :</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
              <div>
                <label className="form-label" htmlFor="vetCastration">
                  Castration
                </label>
                <input id="vetCastration" type="text" name="vetCastration" className="form-input" />
              </div>
              <div>
                <label className="form-label" htmlFor="vetOvariectomy">
                  Ovariectomie
                </label>
                <input id="vetOvariectomy" type="text" name="vetOvariectomy" className="form-input" />
              </div>
              <div>
                <label className="form-label" htmlFor="vetVaccination">
                  Vaccination
                </label>
                <input id="vetVaccination" type="text" name="vetVaccination" className="form-input" />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label className="form-label" htmlFor="vetContact">
                Coordonnées du vétérinaire
              </label>
              <input id="vetContact" type="text" name="vetContact" className="form-input" />
            </div>
          </div>

          <hr className="form-divider" />
        </>
      )}

      <h3 className="form-section-title">Disponibilités</h3>

      <div>
        <label
          className="form-label"
          htmlFor={`benevole-last-transport-${idify('Oui, en voiture')}`}
        >
          Possibilité d&apos;effectuer des transports ? *
        </label>
        <div className="form-checkbox-group">
          {['Oui, en voiture', 'Oui, en transports en commun', 'Non'].map((option) => (
            <label key={option} className="form-checkbox">
              <input
                id={`benevole-last-transport-${idify(option)}`}
                type="checkbox"
                checked={canDoTransport.includes(option)}
                onChange={() =>
                  startTransition(() => {
                    toggleCheckboxArray('canDoTransport', option);
                  })
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={show(canTransport)}>
        <label className="form-label" htmlFor="transportDistance">
          Distance possible ? {canTransport && '*'}
        </label>
        <textarea
          id="transportDistance"
          name="transportDistance"
          required={canTransport}
          rows={3}
          className="form-textarea"
          placeholder="Distance en km, départements, remboursement…"
        />
      </div>

      <div>
        <label
          className="form-label"
          htmlFor={makeRadioId('openToOtherMissions', 'Oui')}
        >
          Disposé·e à d&apos;autres missions ? *
        </label>
        <div className="form-radio-group">
          {radio('openToOtherMissions', 'Oui', 'openToOtherMissions')}
          {radio('openToOtherMissions', 'Non', 'openToOtherMissions')}
        </div>
      </div>

      <div style={show(wantsOtherMissions)}>
        <label className="form-label" htmlFor="otherMissions">
          Lesquelles ?
        </label>
        <textarea id="otherMissions" name="otherMissions" rows={3} className="form-textarea" />
      </div>

      <div>
        <label className="form-label" htmlFor="questions">
          Questions ?
        </label>
        <textarea id="questions" name="questions" rows={4} className="form-textarea" />
      </div>

      <hr className="form-divider" />

      <div className="form-privacy">L&apos;association Nine Lives Paris traite les données recueillies afin de proposer des missions adaptées à votre profil.</div>

      <label className="form-checkbox">
        <input
          type="checkbox"
          required
          checked={acceptsPrivacy}
          onChange={(e) =>
            startTransition(() => {
              setField('acceptsPrivacy', e.target.checked);
            })
          }
        />
        <span>
          J&apos;ai lu et j&apos;accepte{' '}
          <a href="/politique-de-confidentialite" target="_blank" rel="noopener" className="link-blue">
            la politique de confidentialité
          </a>
          . *
        </span>
      </label>

      <Captcha onVerify={onCaptchaVerify} />
    </>
  );
});

export default function BenevoleForm() {
  /* ---- State: ONLY fields that drive conditional visibility, arrays, or booleans ---- */
  const [formState, setFormState] = useState({
    volunteerType: '',
    housingType: '',
    balconySecured: '',
    hasOutdoor: '',
    outdoorSecured: '',
    canDoQuarantine: '',
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
  const [maxStep, setMaxStep] = useState(0);
  useEffect(() => {
    void Promise.resolve().then(() => {
      setMaxStep((prev) => Math.max(prev, currentStep));
    });
  }, [currentStep]);

  /* ---- Conditionals ---- */
  const isFoster = formState.volunteerType === "Famille d'accueil" || formState.volunteerType === 'Les deux';
  const vacationSoon = formState.goingOnVacation === 'Oui';
  const householdDisagrees = formState.householdAgrees === 'Non';
  const hasAssocVet = formState.hasAssociationVet === 'Oui';
  const canTransport =
    formState.canDoTransport.includes('Oui, en voiture') ||
    formState.canDoTransport.includes('Oui, en transports en commun');
  const wantsOtherMissions = formState.openToOtherMissions === 'Oui';
  const hasDeterminedDuration = formState.fosterDuration.includes('Pour une durée déterminée');

  const steps = isFoster ? FOSTER_STEPS : BENEVOLE_STEPS;
  const lastStep = steps.length - 1;

  /* ---- Helpers ---- */
  const show = (visible: boolean) => (visible ? undefined : { display: 'none' as const });
  const stepStyle = (i: number): React.CSSProperties => ({ display: currentStep === i ? 'block' : 'none' });
  const shouldMount = (index: number) => index <= maxStep;
  const updateField = useCallback((field: string, value: string | boolean) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleCheckboxArray = useCallback((field: string, value: string) => {
    setFormState((prev) => {
      const current = prev[field as keyof typeof prev];
      if (!Array.isArray(current)) return prev;
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  }, []);

  // Radio helper - wrap state update in startTransition
  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input type="radio" required={required} name={name} value={value}
        id={makeRadioId(name, value)}
        checked={formState[field as keyof typeof formState] === value}
        onChange={() => startTransition(() => {
          setFormState(prev => ({ ...prev, [field]: value }));
        })} />
      {value}
    </label>
  );

  /* ---- Navigation ---- */
  const validateStep = () => {
    const stepEl = stepRefs.current[currentStep];
    if (!stepEl) return true;

    // Only validate the first visible required-invalid element.
    const invalidElements = stepEl.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      ':required:invalid'
    );
    for (const el of invalidElements) {
      if (el.offsetParent === null) continue; // skip hidden
      el.reportValidity();
      return false;
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

    const rawPayload = { ...defaults, ...textData, ...formState, captchaToken };
    const { honeypot, ...dataToSend } = rawPayload;
    void honeypot;

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
                color: i < currentStep ? '#fff' : i === currentStep ? '#007273' : '#6b7280',
                fontWeight: 600, fontSize: '0.85rem',
                cursor: i < currentStep ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
              }}>
              {i + 1}
            </button>
            <div className="form-step-label" style={{
              fontSize: '0.7rem', marginTop: '0.4rem', textAlign: 'center',
              color: i <= currentStep ? '#007273' : '#6b7280',
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
        <BenevoleStep0 volunteerType={formState.volunteerType} setField={updateField} />
      </div>

      {/* ===== STEP 1 (FOSTER): CHEZ VOUS ===== */}
      {shouldMount(1) && isFoster && (
        <div ref={el => { stepRefs.current[1] = el; }} style={stepStyle(1)}>
          <BenevoleStep1
            housingType={formState.housingType}
            canDoQuarantine={formState.canDoQuarantine}
            hasChildren={formState.hasChildren}
            hasAnimalsHome={formState.hasAnimalsHome}
            balconySecured={formState.balconySecured}
            animalsSterilized={formState.animalsSterilized}
            animalsIdentified={formState.animalsIdentified}
            animalsVaccinated={formState.animalsVaccinated}
            animalsTested={formState.animalsTested}
            setField={updateField}
          />
        </div>
      )}

      {/* ===== STEP 2 (FOSTER): EXPÉRIENCE ===== */}
      {shouldMount(2) && isFoster && (
        <div ref={el => { stepRefs.current[2] = el; }} style={stepStyle(2)}>
          <BenevoleStep2
            beenFosterBefore={formState.beenFosterBefore}
            catExperience={formState.catExperience}
            catCarePractices={formState.catCarePractices}
            setField={updateField}
            toggleCheckboxArray={handleCheckboxArray}
          />
        </div>
      )}

      {/* ===== LAST STEP: PRATIQUE ===== */}
      {shouldMount(lastStep) && (
        <div ref={el => { stepRefs.current[lastStep] = el; }} style={stepStyle(lastStep)}>

          <BenevoleLastStep
            isFoster={isFoster}
            catTypes={formState.catTypes}
            fosterDuration={formState.fosterDuration}
            goingOnVacation={formState.goingOnVacation}
            householdAgrees={formState.householdAgrees}
            hasAssociationVet={formState.hasAssociationVet}
            canDoTransport={formState.canDoTransport}
            openToOtherMissions={formState.openToOtherMissions}
            acceptsPrivacy={formState.acceptsPrivacy}
            setField={updateField}
            toggleCheckboxArray={handleCheckboxArray}
            onCaptchaVerify={setCaptchaToken}
          />

          {false && (<>
            {/* Foster-specific: preferences + logistics */}
            {isFoster && (
              <>
                <h3 className="form-section-title">Préférences d&apos;accueil</h3>

                <div>
                  <label className="form-label" htmlFor="numCatsCanFoster">
                    Combien de chats pourriez-vous accueillir ? *
                  </label>
                  <input id="numCatsCanFoster" type="number" name="numCatsCanFoster" required className="form-input" />
                </div>

                <div>
                  <label
                    className="form-label"
                    htmlFor={`benevole-false-catTypes-${idify('Adulte')}`}
                  >
                    Quel type de chat(s) ? *
                  </label>
                  <div className="form-checkbox-group">
                    {[
                      'Adulte', 'Chaton(s)', 'Mâle', 'Femelle', 'Peu importe',
                      'Une maman et sa portée', 'Chat craintif (à socialiser)',
                      'Chat ou chaton nécessitant des soins', 'Chat testé FIV+',
                      'Chat testé FeLV+', 'Chat diabétique', 'Chat en fin de vie',
                    ].map(type => (
                      <label key={type} className="form-checkbox">
                        <input type="checkbox"
                          id={`benevole-false-catTypes-${idify(type)}`}
                          checked={formState.catTypes.includes(type)}
                          onChange={() => startTransition(() => { handleCheckboxArray('catTypes', type); })} />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    className="form-label"
                    htmlFor={`benevole-false-fosterDuration-${idify('Quelques jours')}`}
                  >
                    Durée d&apos;accueil possible *
                  </label>
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
                          id={`benevole-false-fosterDuration-${idify(duration)}`}
                          checked={formState.fosterDuration.includes(duration)}
                          onChange={() => startTransition(() => { handleCheckboxArray('fosterDuration', duration); })} />
                        <span>{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={show(hasDeterminedDuration)}>
                  <label className="form-label" htmlFor="fosterDurationOther">
                    Précisez
                  </label>
                  <input id="fosterDurationOther" type="text" name="fosterDurationOther" className="form-input" />
                </div>

                <div className="form-grid">
                  <div>
                    <label
                      className="form-label"
                      htmlFor={makeRadioId('goingOnVacation', 'Oui')}
                    >
                      Partez-vous en vacances bientôt ? *
                    </label>
                    <div className="form-radio-group">
                      {radio('goingOnVacation', 'Oui', 'goingOnVacation')}
                      {radio('goingOnVacation', 'Non', 'goingOnVacation')}
                    </div>
                  </div>
                  <div style={show(vacationSoon)}>
                    <label className="form-label" htmlFor="vacationDates">
                      À quelles dates ? {vacationSoon && '*'}
                    </label>
                    <input id="vacationDates" type="text" name="vacationDates" required={vacationSoon} className="form-input" />
                  </div>
                </div>

                <div style={show(vacationSoon)}>
                  <label className="form-label" htmlFor="vacationCare">
                    Qui s&apos;occupera de l&apos;animal ? {vacationSoon && '*'}
                  </label>
                  <input id="vacationCare" type="text" name="vacationCare" required={vacationSoon} className="form-input" />
                </div>

                <div>
                  <label
                    className="form-label"
                    htmlFor={makeRadioId('householdAgrees', 'Oui')}
                  >
                    Tout le foyer est-il d&apos;accord ? *
                  </label>
                  <div className="form-radio-group">
                    {radio('householdAgrees', 'Oui', 'householdAgrees')}
                    {radio('householdAgrees', 'Non', 'householdAgrees')}
                  </div>
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
                  <label className="form-label" htmlFor="feedingPlan">
                    Comment nourrirez-vous les animaux ? *
                  </label>
                  <input id="feedingPlan" type="text" name="feedingPlan" required className="form-input"
                    placeholder="Type d'alimentation, marques…" />
                </div>

                <div>
                  <label className="form-label" htmlFor="hasEquipment">
                    Avez-vous du matériel (litière, caisse, laisses…) ? *
                  </label>
                  <input id="hasEquipment" type="text" name="hasEquipment" required className="form-input" />
                </div>

                <div>
                  <label
                    className="form-label"
                    htmlFor={makeRadioId('hasAssociationVet', 'Oui')}
                  >
                    Vétérinaire à tarifs associatifs ?
                  </label>
                  <div className="form-radio-group">
                    {radio('hasAssociationVet', 'Oui', 'hasAssociationVet', false)}
                    {radio('hasAssociationVet', 'Non', 'hasAssociationVet', false)}
                    {radio('hasAssociationVet', 'Je ne sais pas', 'hasAssociationVet', false)}
                  </div>
                </div>

                <div style={show(hasAssocVet)}>
                  <div className="form-hint">Tarifs approximatifs :</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                    <div>
                      <label className="form-label" htmlFor="vetCastration">
                        Castration
                      </label>
                      <input id="vetCastration" type="text" name="vetCastration" className="form-input" />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="vetOvariectomy">
                        Ovariectomie
                      </label>
                      <input id="vetOvariectomy" type="text" name="vetOvariectomy" className="form-input" />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="vetVaccination">
                        Vaccination
                      </label>
                      <input id="vetVaccination" type="text" name="vetVaccination" className="form-input" />
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label className="form-label" htmlFor="vetContact">
                      Coordonnées du vétérinaire
                    </label>
                    <input id="vetContact" type="text" name="vetContact" className="form-input" />
                  </div>
                </div>

                <hr className="form-divider" />
              </>
            )}

            {/* Common: transport, missions, submit */}
            <h3 className="form-section-title">Disponibilités</h3>

            <div>
              <label
                className="form-label"
                htmlFor={`benevole-false-transport-${idify('Oui, en voiture')}`}
              >
                Possibilité d&apos;effectuer des transports ? *
              </label>
              <div className="form-checkbox-group">
                {['Oui, en voiture', 'Oui, en transports en commun', 'Non'].map(option => (
                  <label key={option} className="form-checkbox">
                    <input type="checkbox"
                      id={`benevole-false-transport-${idify(option)}`}
                      checked={formState.canDoTransport.includes(option)}
                      onChange={() => startTransition(() => { handleCheckboxArray('canDoTransport', option); })} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={show(canTransport)}>
              <label className="form-label" htmlFor="transportDistance">
                Distance possible ? {canTransport && '*'}
              </label>
              <textarea id="transportDistance" name="transportDistance" required={canTransport} rows={3} className="form-textarea"
                placeholder="Distance en km, départements, remboursement…" />
            </div>

            <div>
              <label
                className="form-label"
                htmlFor={makeRadioId('openToOtherMissions', 'Oui')}
              >
                Disposé·e à d&apos;autres missions ? *
              </label>
              <div className="form-radio-group">
                {radio('openToOtherMissions', 'Oui', 'openToOtherMissions')}
                {radio('openToOtherMissions', 'Non', 'openToOtherMissions')}
              </div>
            </div>

            <div style={show(wantsOtherMissions)}>
              <label className="form-label" htmlFor="otherMissions">
                Lesquelles ?
              </label>
              <textarea id="otherMissions" name="otherMissions" rows={3} className="form-textarea" />
            </div>

            <div>
              <label className="form-label" htmlFor="questions">
                Questions ?
              </label>
              <textarea id="questions" name="questions" rows={4} className="form-textarea" />
            </div>

            <hr className="form-divider" />

            <div className="form-privacy">
              L&apos;association Nine Lives Paris traite les données recueillies afin de proposer des missions adaptées à votre profil.
            </div>

            <label className="form-checkbox">
              <input type="checkbox" required
                checked={formState.acceptsPrivacy}
                onChange={(e) => startTransition(() => { updateField('acceptsPrivacy', e.target.checked); })} />
              <span>J&apos;ai lu et j&apos;accepte <a href="/politique-de-confidentialite" target="_blank" rel="noopener" className="link-blue">la politique de confidentialité</a>. *</span>
            </label>

            <Captcha onVerify={setCaptchaToken} />
          </>)}
        </div>
      )}

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