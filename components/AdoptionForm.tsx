'use client';
import { useState, startTransition, useEffect, useRef, useCallback, memo } from 'react';
import Image from 'next/image';
import Captcha from '@/components/Captcha';

interface Cat {
  id: string;
  name: string;
  slug: string;
  images: string[];
}

const STEPS = [
  { label: "L'animal" },
  { label: 'Coordonnées' },
  { label: 'Logement' },
  { label: 'Foyer' },
  { label: 'Projet' },
  { label: 'Budget' },
];

type CatPickerGridProps = {
  cats: Cat[];
  selectedName: string;
  onSelectCat: (name: string) => void;
};

const CatPickerGrid = memo(function CatPickerGrid({
  cats,
  selectedName,
  onSelectCat,
}: CatPickerGridProps) {
  return (
    <div className="cat-picker">
      {cats.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelectCat(cat.name)}
          className={`cat-picker-btn ${selectedName === cat.name ? 'active' : ''}`}
        >
          <div className="cat-picker-img">
            {cat.images[0] ? (
              <Image
                src={cat.images[0]}
                alt={`Photo de ${cat.name}`}
                width={120}
                height={80}
                sizes="80px"
              />
            ) : (
              <div className="cat-picker-placeholder">🐱</div>
            )}
          </div>
          <div className="cat-picker-name">{cat.name}</div>
        </button>
      ))}
    </div>
  );
});

const HIDDEN_STYLE = { display: 'none' as const };
const show = (visible: boolean) => (visible ? undefined : HIDDEN_STYLE);

type AdoptionStep0Props = {
  cats: Cat[];
  animalName: string;
  animalType: string;
  onSelectCat: (name: string) => void;
  setField: (field: string, value: string | boolean) => void;
};

const AdoptionStep0 = memo(function AdoptionStep0({
  cats,
  animalName,
  animalType,
  onSelectCat,
  setField,
}: AdoptionStep0Props) {
  const radio = (name: string, value: string, field: string, required = true) => (
    <label className="form-radio">
      <input
        type="radio"
        required={required}
        name={name}
        value={value}
        checked={animalType === value}
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
      <h3 className="form-section-title">L&apos;animal souhaité</h3>

      <div>
        <label className="form-label">
          Si vous savez déjà lequel de nos animaux vous souhaitez rencontrer, cliquez sur sa photo
        </label>
        <CatPickerGrid cats={cats} selectedName={animalName} onSelectCat={onSelectCat} />
        {animalName && (
          <div className="cat-picker-selected">
            <span>✓ {animalName} sélectionné(e)</span>
            <button type="button" onClick={() => setField('animalName', '')}>
              Annuler
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="form-label" htmlFor="animalType">
          Vous souhaitez adopter un : *
        </label>
        <div className="form-radio-group">
          {radio('animalType', 'Chat', 'animalType')}
          {radio('animalType', 'Chien', 'animalType')}
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="adoptionDate">
          À partir de quelle date pouvez-vous accueillir votre compagnon ? *
        </label>
        <input type="date" required className="form-input" name="adoptionDate" id="adoptionDate" />
        <div className="form-hint">Pour rappel, nous ne faisons pas de « réservation »</div>
      </div>
    </>
  );
});

const AdoptionStep1Contact = memo(function AdoptionStep1Contact() {
  return (
    <>
      <h3 className="form-section-title">Vos coordonnées</h3>

      <div className="form-grid">
        <div>
          <label className="form-label">Nom de famille *</label>
          <input type="text" required className="form-input" name="lastName" />
        </div>
        <div>
          <label className="form-label">Prénom *</label>
          <input type="text" required className="form-input" name="firstName" />
        </div>
      </div>

      <div>
        <label className="form-label">Adresse *</label>
        <input type="text" required className="form-input" name="address" />
      </div>

      <div className="form-grid-13">
        <div>
          <label className="form-label">Code postal *</label>
          <input type="text" required className="form-input" name="postalCode" />
        </div>
        <div>
          <label className="form-label">Ville *</label>
          <input type="text" required className="form-input" name="city" />
        </div>
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label">Téléphone *</label>
          <input type="tel" required className="form-input" name="mobilePhone" />
        </div>
        <div>
          <label className="form-label">Téléphone fixe</label>
          <input type="tel" className="form-input" name="landlinePhone" />
        </div>
      </div>

      <div className="form-grid-31">
        <div>
          <label className="form-label">E-mail *</label>
          <input type="email" required className="form-input" name="email" />
        </div>
        <div>
          <label className="form-label">Âge *</label>
          <input type="number" required className="form-input" name="age" />
        </div>
      </div>
    </>
  );
});

type AdoptionStep2HousingProps = {
  housingType: string;
  hasGardenEnclosed: boolean;
  hasBalcony: string;
  balconySecured: string;
  isOwner: string;
  hasPermission: string;
  movingSoon: string;
  setField: (field: string, value: string | boolean) => void;
};

const AdoptionStep2Housing = memo(function AdoptionStep2Housing({
  housingType,
  hasGardenEnclosed,
  hasBalcony,
  balconySecured,
  isOwner,
  hasPermission,
  movingSoon,
  setField,
}: AdoptionStep2HousingProps) {
  const isApartment = housingType === 'Appartement';
  const hasBalconyYes = hasBalcony === 'Oui';
  const balconyIsSecured = balconySecured === 'Oui';
  const isRenter = isOwner === 'Non';
  const isMoving = movingSoon === 'Oui';
  const isHouse = housingType === 'Maison';

  const radio = (name: string, value: string, field: string, required = true) => {
    let checkedValue: string;
    switch (field) {
      case 'housingType':
        checkedValue = housingType;
        break;
      case 'hasBalcony':
        checkedValue = hasBalcony;
        break;
      case 'balconySecured':
        checkedValue = balconySecured;
        break;
      case 'isOwner':
        checkedValue = isOwner;
        break;
      case 'hasPermission':
        checkedValue = hasPermission;
        break;
      case 'movingSoon':
        checkedValue = movingSoon;
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
          <label className="form-label">Superficie *</label>
          <input type="number" required className="form-input" name="surface" />
          <div className="form-hint">en m²</div>
        </div>
        <div>
          <label className="form-label">Type de logement *</label>
          <div className="form-radio-group">
            {radio('housingType', 'Maison', 'housingType')}
            {radio('housingType', 'Appartement', 'housingType')}
          </div>
        </div>
      </div>

      <div style={show(isHouse)}>
        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={hasGardenEnclosed}
            onChange={(e) =>
              startTransition(() => {
                setField('hasGardenEnclosed', e.target.checked);
              })
            }
          />
          <span>Avec jardin clôturé</span>
        </label>
      </div>

      <div style={show(isApartment)}>
        <label className="form-label">Quel étage ? {isApartment && '*'}</label>
        <input type="number" required={isApartment} className="form-input" name="floor" />
      </div>

      <div style={show(isApartment)}>
        <label className="form-label" htmlFor="hasBalcony">
          Avez-vous un balcon ?
        </label>
        <div className="form-radio-group">
          {radio('hasBalcony', 'Oui', 'hasBalcony', isApartment)}
          {radio('hasBalcony', 'Non', 'hasBalcony', isApartment)}
        </div>
      </div>

      <div style={show(isApartment && hasBalconyYes)}>
        <label className="form-label" htmlFor="balconySecured">
          Est-il sécurisé ? *
        </label>
        <div className="form-radio-group">
          {radio('balconySecured', 'Oui', 'balconySecured', isApartment && hasBalconyYes)}
          {radio('balconySecured', 'Non', 'balconySecured', isApartment && hasBalconyYes)}
        </div>
      </div>

      <div style={show(isApartment && hasBalconyYes && balconyIsSecured)}>
        <label className="form-label" htmlFor="balconySecuredHow">
          De quelle manière ? *
        </label>
        <input
          type="text"
          name="balconySecuredHow"
          id="balconySecuredHow"
          required={isApartment && hasBalconyYes && balconyIsSecured}
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Êtes-vous propriétaire ? *</label>
        <div className="form-radio-group">
          {radio('isOwner', 'Oui', 'isOwner')}
          {radio('isOwner', 'Non', 'isOwner')}
        </div>
      </div>

      <div style={show(isRenter)}>
        <label className="form-label">
          Avez-vous la permission d&apos;avoir un animal ? {isRenter && '*'}
        </label>
        <div className="form-radio-group">
          {radio('hasPermission', 'Oui', 'hasPermission', isRenter)}
          {radio('hasPermission', 'Non', 'hasPermission', isRenter)}
        </div>
      </div>

      <div>
        <label className="form-label">Prévoyez-vous de déménager prochainement ? *</label>
        <div className="form-radio-group">
          {radio('movingSoon', 'Oui', 'movingSoon')}
          {radio('movingSoon', 'Non', 'movingSoon')}
        </div>
      </div>

      <div style={show(isMoving)}>
        <label className="form-label">Adresse du projet {isMoving && '*'}</label>
        <input type="text" required={isMoving} className="form-input" name="movingAddress" />
      </div>
    </>
  );
});

type AdoptionAnimalInputsProps = {
  animals: string[];
  setAnimals: React.Dispatch<React.SetStateAction<string[]>>;
  isVisible: boolean;
};

const AnimalInputs = memo(function AnimalInputs({ animals, setAnimals, isVisible }: AdoptionAnimalInputsProps) {
  return (
    <>
      {animals.map((animal, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            required={isVisible}
            className="form-input"
            placeholder={`Animal ${i + 1} — ex : chat européen, femelle, 3 ans`}
            value={animal}
            onChange={(e) => {
              const u = [...animals];
              u[i] = e.target.value;
              setAnimals(u);
            }}
          />
          {animals.length > 1 && (
            <button
              type="button"
              className="btn btn-outline"
              style={{ padding: '0.5rem 0.75rem', flexShrink: 0 }}
              aria-label="Supprimer l&apos;animal"
              onClick={() => setAnimals(animals.filter((_, j) => j !== i))}
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline"
        style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
        onClick={() => setAnimals([...animals, ''])}
      >
        + Ajouter un animal
      </button>
    </>
  );
});

type AdoptionStep3FoyerProps = {
  employed: string;
  numAdults: string;
  numChildren: string;
  someoneHomeDuringDay: string;
  hasAllergies: string;
  childrenCompatible: string;
  hasAnimalNow: string;
  currentAnimalsSterilized: boolean;
  currentAnimalsVaccinated: boolean;
  currentAnimalsTested: boolean;
  hadAnimalBefore: string;
  hadToSeparate: string;
  adoptedFromShelter: string;
  currentAnimals: string[];
  previousAnimals: string[];
  setCurrentAnimals: React.Dispatch<React.SetStateAction<string[]>>;
  setPreviousAnimals: React.Dispatch<React.SetStateAction<string[]>>;
  setField: (field: string, value: string | boolean) => void;
};

const AdoptionStep3Foyer = memo(function AdoptionStep3Foyer({
  employed,
  numAdults,
  numChildren,
  someoneHomeDuringDay,
  hasAllergies,
  childrenCompatible,
  hasAnimalNow,
  currentAnimalsSterilized,
  currentAnimalsVaccinated,
  currentAnimalsTested,
  hadAnimalBefore,
  hadToSeparate,
  adoptedFromShelter,
  currentAnimals,
  previousAnimals,
  setCurrentAnimals,
  setPreviousAnimals,
  setField,
}: AdoptionStep3FoyerProps) {
  const employedOther = employed === 'Autre';
  const hasChildren = parseInt(numChildren) > 0;
  const noChildren = numChildren === '0';
  const isCouple = parseInt(numAdults) > 1;
  const notHomeDay = someoneHomeDuringDay === 'Non';
  const childrenProjectOther = childrenCompatible === 'Autre';
  const hasCurrentAnimal = hasAnimalNow === 'Oui';
  const hadPreviousAnimal = hadAnimalBefore === 'Oui';
  const didSeparate = hadToSeparate === 'Oui';
  const hasCurrentOrPrevious = hasCurrentAnimal || hadPreviousAnimal;

  const radio = (name: string, value: string, field: string, required = true) => {
    let checkedValue: string;
    switch (field) {
      case 'employed':
        checkedValue = employed;
        break;
      case 'someoneHomeDuringDay':
        checkedValue = someoneHomeDuringDay;
        break;
      case 'hasAllergies':
        checkedValue = hasAllergies;
        break;
      case 'childrenCompatible':
        checkedValue = childrenCompatible;
        break;
      case 'hasAnimalNow':
        checkedValue = hasAnimalNow;
        break;
      case 'hadAnimalBefore':
        checkedValue = hadAnimalBefore;
        break;
      case 'hadToSeparate':
        checkedValue = hadToSeparate;
        break;
      case 'adoptedFromShelter':
        checkedValue = adoptedFromShelter;
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
      <h3 className="form-section-title">Votre foyer</h3>

      <div>
        <label className="form-label">Êtes-vous actuellement salarié·e ? *</label>
        <div className="form-radio-group">
          {radio('employed', 'Oui', 'employed')}
          {radio('employed', 'Non', 'employed')}
          {radio('employed', 'Autre', 'employed')}
        </div>
      </div>

      <div style={show(employedOther)}>
        <label className="form-label">Précisez {employedOther && '*'}</label>
        <input type="text" required={employedOther} className="form-input" name="employedOther" />
      </div>

      <div className="form-grid">
        <div>
          <label className="form-label">Nombre d&apos;adultes *</label>
          <input
            type="number"
            required
            className="form-input"
            name="numAdults"
            value={numAdults}
            onChange={(e) =>
              startTransition(() => {
                setField('numAdults', e.target.value);
              })
            }
          />
        </div>
        <div>
          <label className="form-label">Nombre d&apos;enfants *</label>
          <input
            type="number"
            required
            className="form-input"
            name="numChildren"
            value={numChildren}
            onChange={(e) =>
              startTransition(() => {
                setField('numChildren', e.target.value);
              })
            }
          />
        </div>
      </div>

      <div style={show(hasChildren)}>
        <label className="form-label">Âges des enfants {hasChildren && '*'}</label>
        <input type="text" required={hasChildren} className="form-input" name="childrenAges" />
      </div>

      <div>
        <label className="form-label">Y a-t-il quelqu&apos;un à la maison en journée ? *</label>
        <div className="form-radio-group">
          {radio('someoneHomeDuringDay', 'Oui', 'someoneHomeDuringDay')}
          {radio('someoneHomeDuringDay', 'Non', 'someoneHomeDuringDay')}
        </div>
      </div>

      <div style={show(notHomeDay)}>
        <label className="form-label">Combien d&apos;heures d&apos;absence ? {notHomeDay && '*'}</label>
        <input type="text" required={notHomeDay} className="form-input" name="hoursAbsence" />
      </div>

      <div>
        <label className="form-label">Un occupant souffre-t-il d&apos;allergies ou d&apos;asthme ? *</label>
        <div className="form-radio-group">
          {radio('hasAllergies', 'Oui', 'hasAllergies')}
          {radio('hasAllergies', 'Non', 'hasAllergies')}
          {radio('hasAllergies', 'Je ne sais pas', 'hasAllergies')}
        </div>
      </div>

      <div style={show(noChildren)}>
        <label className="form-label">
          Si vous projetez d&apos;avoir des enfants, cela vous semble-t-il compatible avec un animal ? {noChildren && '*'}
        </label>
        <div className="form-radio-group">
          {radio('childrenCompatible', 'Oui', 'childrenCompatible', noChildren)}
          {radio('childrenCompatible', 'Non', 'childrenCompatible', noChildren)}
          {radio('childrenCompatible', 'Autre', 'childrenCompatible', noChildren)}
        </div>
      </div>

      <div style={show(noChildren && childrenProjectOther)}>
        <label className="form-label">Précisez {noChildren && childrenProjectOther && '*'}</label>
        <input
          type="text"
          required={noChildren && childrenProjectOther}
          className="form-input"
          name="childrenCompatibleOther"
        />
      </div>

      <div style={show(isCouple)}>
        <label className="form-label">
          En cas de séparation, qui gardera l&apos;animal ? {isCouple && '*'}
        </label>
        <input type="text" required={isCouple} className="form-input" name="coupleSeparation" />
      </div>

      <hr className="form-divider" />

      <h3 className="form-section-title">Vos animaux</h3>

      <div>
        <label className="form-label">Avez-vous un animal à la maison ? *</label>
        <div className="form-radio-group">
          {radio('hasAnimalNow', 'Oui', 'hasAnimalNow')}
          {radio('hasAnimalNow', 'Non', 'hasAnimalNow')}
        </div>
      </div>

      <div style={show(hasCurrentAnimal)}>
        <div>
          <label className="form-label">
            Espèce, race, sexe et âge {hasCurrentAnimal && '*'}
          </label>
          <AnimalInputs animals={currentAnimals} setAnimals={setCurrentAnimals} isVisible={hasCurrentAnimal} />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label className="form-label">Vos animaux sont-ils</label>
          <div className="form-checkbox-group">
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={currentAnimalsSterilized}
                onChange={(e) =>
                  startTransition(() => {
                    setField('currentAnimalsSterilized', e.target.checked);
                  })
                }
              />
              <span>Stérilisés</span>
            </label>
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={currentAnimalsVaccinated}
                onChange={(e) =>
                  startTransition(() => {
                    setField('currentAnimalsVaccinated', e.target.checked);
                  })
                }
              />
              <span>Vaccinés</span>
            </label>
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={currentAnimalsTested}
                onChange={(e) =>
                  startTransition(() => {
                    setField('currentAnimalsTested', e.target.checked);
                  })
                }
              />
              <span>Testés FIV/FeLV (pour les chats)</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="form-label">Avez-vous déjà eu un animal ? *</label>
        <div className="form-radio-group">
          {radio('hadAnimalBefore', 'Oui', 'hadAnimalBefore')}
          {radio('hadAnimalBefore', 'Non', 'hadAnimalBefore')}
        </div>
      </div>

      <div style={show(hadPreviousAnimal)}>
        <label className="form-label">
          Espèce, race, sexe et âge {hadPreviousAnimal && '*'}
        </label>
        <AnimalInputs animals={previousAnimals} setAnimals={setPreviousAnimals} isVisible={hadPreviousAnimal} />
      </div>

      <div>
        <label className="form-label">Avez-vous dû vous séparer d&apos;un animal par le passé ? *</label>
        <div className="form-radio-group">
          {radio('hadToSeparate', 'Oui', 'hadToSeparate')}
          {radio('hadToSeparate', 'Non', 'hadToSeparate')}
        </div>
      </div>

      <div style={show(didSeparate)}>
        <label className="form-label">
          Pour quelle raison ? {didSeparate && '*'}
        </label>
        <textarea required={didSeparate} rows={3} className="form-textarea" name="separationReason" />
      </div>

      <div style={show(hasCurrentOrPrevious)}>
        <label className="form-label">
          Avez-vous déjà adopté via un refuge ou une association ? {hasCurrentOrPrevious && '*'}
        </label>
        <div className="form-radio-group">
          {radio('adoptedFromShelter', 'Oui', 'adoptedFromShelter', hasCurrentOrPrevious)}
          {radio('adoptedFromShelter', 'Non', 'adoptedFromShelter', hasCurrentOrPrevious)}
        </div>
      </div>
    </>
  );
});

type AdoptionStep4ProjectProps = {
  animalType: string;
  longTermCommitment: string;
  everyoneAgrees: string;
  knowsAnimalNeeds: string;
  thoughtAboutDamages: string;
  careAbsence: string[];
  toggleCareAbsence: (value: string) => void;
  setField: (field: string, value: string | boolean) => void;
};

const AdoptionStep4Project = memo(function AdoptionStep4Project({
  animalType,
  longTermCommitment,
  everyoneAgrees,
  knowsAnimalNeeds,
  thoughtAboutDamages,
  careAbsence,
  toggleCareAbsence,
  setField,
}: AdoptionStep4ProjectProps) {
  const careAbsenceHasOther = careAbsence.includes('Autre');
  const isCat = animalType === 'Chat';

  const radio = (name: string, value: string, field: string, required = true) => {
    let checkedValue: string;
    switch (field) {
      case 'longTermCommitment':
        checkedValue = longTermCommitment;
        break;
      case 'everyoneAgrees':
        checkedValue = everyoneAgrees;
        break;
      case 'knowsAnimalNeeds':
        checkedValue = knowsAnimalNeeds;
        break;
      case 'thoughtAboutDamages':
        checkedValue = thoughtAboutDamages;
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
      <h3 className="form-section-title">Votre projet d&apos;adoption</h3>

      <div>
        <label className="form-label">
          Pour qui et pourquoi voulez-vous adopter, quelles sont vos motivations ? *
        </label>
        <textarea required rows={5} className="form-textarea" name="motivation" />
      </div>

      <div>
        <label className="form-label">Quelle est votre opinion sur la stérilisation / castration ? *</label>
        <textarea required rows={3} className="form-textarea" name="sterilizationOpinion" />
      </div>

      <div>
        <label className="form-label">Lors d&apos;une absence, qui prendra soin de votre animal ? *</label>
        <div className="form-checkbox-group">
          {['Famille', 'Voisin', 'Pension', 'Petsitter', 'Autre'].map((option) => (
            <label key={option} className="form-checkbox">
              <input
                type="checkbox"
                checked={careAbsence.includes(option)}
                onChange={() =>
                  startTransition(() => {
                    toggleCareAbsence(option);
                  })
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={show(careAbsenceHasOther)}>
        <label className="form-label">Précisez {careAbsenceHasOther && '*'}</label>
        <input type="text" required={careAbsenceHasOther} className="form-input" name="careAbsenceOther" />
      </div>

      <div>
        <label className="form-label">Êtes-vous prêt à vous engager pour la vie entière de l&apos;animal ? *</label>
        <div className="form-radio-group">
          {radio('longTermCommitment', 'Oui', 'longTermCommitment')}
          {radio('longTermCommitment', 'Non', 'longTermCommitment')}
        </div>
      </div>

      <div>
        <label className="form-label">Tout le monde à la maison est-il d&apos;accord ? *</label>
        <div className="form-radio-group">
          {radio('everyoneAgrees', 'Oui', 'everyoneAgrees')}
          {radio('everyoneAgrees', 'Non', 'everyoneAgrees')}
        </div>
      </div>

      <div>
        <label className="form-label">
          Connaissez-vous les {isCat ? 'chats' : 'chiens'}, leurs exigences et leurs besoins ? *
        </label>
        <div className="form-radio-group">
          {radio('knowsAnimalNeeds', 'Oui', 'knowsAnimalNeeds')}
          {radio('knowsAnimalNeeds', 'Non', 'knowsAnimalNeeds')}
        </div>
      </div>

      <div>
        <label className="form-label">Avez-vous pensé aux dégâts/nuisances qu&apos;un animal peut causer ? *</label>
        <div className="form-radio-group">
          {radio('thoughtAboutDamages', 'Oui', 'thoughtAboutDamages')}
          {radio('thoughtAboutDamages', 'Non', 'thoughtAboutDamages')}
        </div>
      </div>
    </>
  );
});

type AdoptionStep5BudgetProps = {
  knowsVetCosts: string;
  emergencyPaymentThreshold: string;
  knowsMonthlyBudget: string;
  animalLocationWork: string;
  animalLocationHome: string;
  howHeardAbout: string;
  acceptsPrivacy: boolean;
  setField: (field: string, value: string | boolean) => void;
  onCaptchaVerify: (token: string) => void;
};

const AdoptionStep5Budget = memo(function AdoptionStep5Budget({
  knowsVetCosts,
  emergencyPaymentThreshold,
  knowsMonthlyBudget,
  animalLocationWork,
  animalLocationHome,
  howHeardAbout,
  acceptsPrivacy,
  setField,
  onCaptchaVerify,
}: AdoptionStep5BudgetProps) {
  const heardOther = howHeardAbout === 'Autre';
  const knowsBudget = knowsMonthlyBudget === 'Oui';
  const locationWorkEnclosure = animalLocationWork === 'En enclos';
  const locationHomeEnclosure = animalLocationHome === 'En enclos';

  const radio = (name: string, value: string, field: string, required = true) => {
    let checkedValue: string;
    switch (field) {
      case 'knowsVetCosts':
        checkedValue = knowsVetCosts;
        break;
      case 'knowsMonthlyBudget':
        checkedValue = knowsMonthlyBudget;
        break;
      case 'howHeardAbout':
        checkedValue = howHeardAbout;
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
      <h3 className="form-section-title">Budget & soins</h3>

      <div>
        <label className="form-label">Avez-vous une idée du montant des frais vétérinaires ? *</label>
        <div className="form-radio-group">
          {radio('knowsVetCosts', 'Oui', 'knowsVetCosts')}
          {radio('knowsVetCosts', 'Non', 'knowsVetCosts')}
        </div>
      </div>

      <div style={show(knowsVetCosts === 'Oui')}>
        <label className="form-label">Estimation des dépenses par an ? {knowsVetCosts === 'Oui' && '*'}</label>
        <input type="text" required={knowsVetCosts === 'Oui'} className="form-input" name="vetCostsEstimate" />
      </div>

      <div>
        <label className="form-label">À partir de quel montant seriez-vous en difficulté pour payer en une fois ? *</label>
        <select
          required
          className="form-select"
          value={emergencyPaymentThreshold}
          onChange={(e) =>
            startTransition(() => {
              setField('emergencyPaymentThreshold', e.target.value);
            })
          }
        >
          <option value="">Sélectionnez</option>
          {['150€', '300€', '500€', '750€', '1 000€', '1 500€', '2 000€', '3 000€', '4 000€'].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="form-label">Si votre animal présente des signes de maladie, que faites-vous ? Et le week-end ? *</label>
        <textarea required rows={3} className="form-textarea" name="sickAnimalAction" />
      </div>

      <div>
        <label className="form-label">Comment imaginez-vous ses repas ? *</label>
        <input
          type="text"
          required
          className="form-input"
          name="mealsDescription"
          placeholder="Nombre de repas, type d'alimentation, marques..."
        />
      </div>

      <div>
        <label className="form-label">Avez-vous une idée du budget mensuel (nourriture, litière…) ? *</label>
        <div className="form-radio-group">
          {radio('knowsMonthlyBudget', 'Oui', 'knowsMonthlyBudget')}
          {radio('knowsMonthlyBudget', 'Non', 'knowsMonthlyBudget')}
        </div>
      </div>

      <div style={show(knowsBudget)}>
        <label className="form-label">Estimation des dépenses mensuelles ? {knowsBudget && '*'}</label>
        <input type="text" required={knowsBudget} className="form-input" name="monthlyBudgetEstimate" />
      </div>

      <div>
        <label className="form-label">Au travail ou de sortie, où sera votre animal ? *</label>
        <select
          required
          className="form-select"
          value={animalLocationWork}
          onChange={(e) =>
            startTransition(() => {
              setField('animalLocationWork', e.target.value);
            })
          }
        >
          <option value="">Sélectionnez</option>
          {['Dans une pièce', 'En cage', 'En enclos', 'Dehors', 'Libre dans le logement', 'Sur la terrasse / le balcon'].map(
            (v) => (
              <option key={v} value={v}>
                {v}
              </option>
            )
          )}
        </select>
      </div>

      <div style={show(locationWorkEnclosure)}>
        <label className="form-label">Surface de l&apos;enclos ? {locationWorkEnclosure && '*'}</label>
        <input
          type="number"
          required={locationWorkEnclosure}
          className="form-input"
          name="animalLocationWorkSurface"
        />
        <div className="form-hint">en m²</div>
      </div>

      <div>
        <label className="form-label">Quand vous êtes présent, où sera votre animal ? *</label>
        <select
          required
          className="form-select"
          value={animalLocationHome}
          onChange={(e) =>
            startTransition(() => {
              setField('animalLocationHome', e.target.value);
            })
          }
        >
          <option value="">Sélectionnez</option>
          {['Dans une pièce', 'En cage', 'En enclos', 'Dehors', 'Libre dans le logement', 'Sur la terrasse / le balcon'].map(
            (v) => (
              <option key={v} value={v}>
                {v}
              </option>
            )
          )}
        </select>
      </div>

      <div style={show(locationHomeEnclosure)}>
        <label className="form-label">Surface de l&apos;enclos ? {locationHomeEnclosure && '*'}</label>
        <input
          type="number"
          required={locationHomeEnclosure}
          className="form-input"
          name="animalLocationHomeSurface"
        />
        <div className="form-hint">en m²</div>
      </div>

      <hr className="form-divider" />

      <h3 className="form-section-title">Pour finir</h3>

      <div className="form-grid">
        <div>
          <label className="form-label">Comment avez-vous connu l&apos;association ? *</label>
          <select
            required
            className="form-select"
            value={howHeardAbout}
            onChange={(e) =>
              startTransition(() => {
                setField('howHeardAbout', e.target.value);
              })
            }
          >
            <option value="">Sélectionnez</option>
            {['Réseaux sociaux', 'Recherche Google', 'Internet', 'Vétérinaire', 'Autre'].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div style={show(heardOther)}>
          <label className="form-label">Précisez</label>
          <input type="text" className="form-input" name="howHeardAboutOther" />
        </div>
      </div>

      <div>
        <label className="form-label">Remarques / questions</label>
        <textarea rows={4} className="form-textarea" name="remarks" />
      </div>

      <div className="form-privacy">
        L&apos;association Nine Lives Paris traite les données recueillies afin de gérer les demandes d&apos;adoption.
      </div>

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
          <a
            href="/politique-de-confidentialite"
            target="_blank"
            rel="noopener"
            className="link-blue"
          >
            la politique de confidentialité
          </a>{' '}
          . *
        </span>
      </label>

      <Captcha onVerify={onCaptchaVerify} />
    </>
  );
});

export default function AdoptionForm({ cats, preselectedCat }: { cats: Cat[], preselectedCat?: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>(Array(STEPS.length).fill(null));
  const formTopRef = useRef<HTMLDivElement>(null);

  const [maxStep, setMaxStep] = useState(0);

  useEffect(() => {
    setMaxStep(prev => Math.max(prev, currentStep));
  }, [currentStep]);

  /* ─── Controlled state: ONLY fields driving conditional visibility + booleans + arrays ─── */
  const [formState, setFormState] = useState({
    // Animal (picker + select drive UI)
    animalName: preselectedCat || '',
    animalType: 'Chat',
    // Housing (drive show/hide blocks)
    housingType: '',
    hasGardenEnclosed: false,
    hasBalcony: '',
    balconySecured: '',
    isOwner: '',
    hasPermission: '',
    movingSoon: '',
    // Household (drive show/hide blocks)
    employed: '',
    numAdults: '',       // drives isCouple
    numChildren: '',     // drives hasChildren / noChildren
    someoneHomeDuringDay: '',
    hasAllergies: '',
    childrenCompatible: '',
    // Animals
    hasAnimalNow: '',
    currentAnimalsSterilized: false,
    currentAnimalsVaccinated: false,
    currentAnimalsTested: false,
    hadAnimalBefore: '',
    hadToSeparate: '',
    adoptedFromShelter: '',
    // Adoption project
    careAbsence: [] as string[],
    longTermCommitment: '',
    everyoneAgrees: '',
    knowsAnimalNeeds: '',
    thoughtAboutDamages: '',
    // Budget & location
    knowsVetCosts: '',
    emergencyPaymentThreshold: '',
    knowsMonthlyBudget: '',
    animalLocationWork: '',
    animalLocationHome: '',
    howHeardAbout: '',
    // Privacy + honeypot
    acceptsPrivacy: false,
    honeypot: '',
  });

  const [currentAnimals, setCurrentAnimals] = useState<string[]>(['']);
  const [previousAnimals, setPreviousAnimals] = useState<string[]>(['']);
  const [status, setStatus] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const selectCat = useCallback((catName: string) => {
    setFormState((prev) => ({ ...prev, animalName: catName }));
  }, []);

  const setField = useCallback((field: string, value: string | boolean) => {
    setFormState((prev) => ({ ...prev, [field]: value } as any));
  }, []);

  useEffect(() => {
    if (!preselectedCat && !formState.animalName) {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('cat');
      if (catParam) setFormState(prev => ({ ...prev, animalName: catParam }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleCareAbsence = useCallback((value: string) => {
    setFormState((prev) => {
      const current = prev.careAbsence;
      return {
        ...prev,
        careAbsence: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  }, []);

  /* ─── Submit: collect uncontrolled text values via FormData, merge with state ─── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;          // validate last step before sending
    if (formState.honeypot) return;
    setStatus('sending');
    try {
      const fd = new FormData(e.currentTarget as HTMLFormElement);
      const textData: Record<string, string> = {};
      fd.forEach((value, key) => {
        if (key === 'website') return;    // skip honeypot HTML name
        if (typeof value === 'string') textData[key] = value;
      });

      // Defaults guarantee every text field is present even if empty
      const defaults: Record<string, string> = {
        lastName: '', firstName: '', address: '', postalCode: '', city: '',
        mobilePhone: '', landlinePhone: '', email: '', age: '',
        surface: '', floor: '', balconySecuredHow: '', movingAddress: '',
        employedOther: '', childrenAges: '', hoursAbsence: '',
        childrenCompatibleOther: '', coupleSeparation: '',
        separationReason: '', adoptionDate: '', motivation: '',
        sterilizationOpinion: '', careAbsenceOther: '',
        vetCostsEstimate: '', sickAnimalAction: '', mealsDescription: '',
        monthlyBudgetEstimate: '', animalLocationWorkSurface: '',
        animalLocationHomeSurface: '', howHeardAboutOther: '', remarks: '',
      };

      const dataToSend = {
        ...defaults,
        ...textData,
        ...formState,                     // state values override any FormData duplicates
        currentAnimalDetails: currentAnimals.filter(a => a.trim()).join('\n'),
        previousAnimalDetails: previousAnimals.filter(a => a.trim()).join('\n'),
        captchaToken,
      };

      const res = await fetch('/api/adoption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      if (res.ok) { setStatus('success'); window.scrollTo(0, 0); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  // --- Step navigation ---

  const scrollToFormTop = () => {
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateStep = useCallback(() => {
    const stepEl = stepRefs.current[currentStep];
    if (!stepEl) return true;

    // Only validate the first visible required-invalid element.
    const invalidElements = stepEl.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      ':required:invalid'
    );
    for (const el of invalidElements) {
      if (el.offsetParent === null) continue;
      el.reportValidity();
      return false;
    }

    return true;
  }, [currentStep]);

  const goNext = () => {
    if (validateStep()) {
      setCurrentStep(s => Math.min(s + 1, STEPS.length - 1));
      scrollToFormTop();
    }
  };

  const goPrev = () => {
    setCurrentStep(s => Math.max(s - 1, 0));
    scrollToFormTop();
  };

  const goToStep = (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
      scrollToFormTop();
    }
  };

  const stepStyle = (index: number) => currentStep === index ? undefined : { display: 'none' as const };
  const shouldMount = (index: number) => index <= maxStep;
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div ref={formTopRef}>
      {status === 'success' ? (
        <div className="alert alert-success">
          <strong>✓ Merci !</strong><br />
          Votre demande d&apos;adoption a été envoyée avec succès. Vous allez recevoir une copie par mail. Nous vous contacterons très prochainement.
        </div>
      ) : (
        <>
          {/* ========== PROGRESS BAR ========== */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', position: 'relative' }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                flex: 1, position: 'relative',
              }}>
                {i > 0 && (
                  <div style={{
                    position: 'absolute', top: '15px', right: '50%', width: '100%', height: '2px',
                    background: i <= currentStep ? '#009EA1' : '#d1d5db', zIndex: 0,
                  }} />
                )}
                <div
                  onClick={() => goToStep(i)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: i < currentStep ? '#009EA1' : i === currentStep ? '#007273' : '#e5e7eb',
                    color: i <= currentStep ? 'white' : '#6b7280',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', fontWeight: 600, zIndex: 1, transition: 'all 0.2s ease',
                    cursor: i < currentStep ? 'pointer' : 'default',
                  }}
                >
                  {i < currentStep ? '✓' : i + 1}
                </div>
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

          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Étape {currentStep + 1} sur {STEPS.length}
          </p>

          <form onSubmit={handleSubmit} noValidate className="form-flow">
            <input type="text" name="website" value={formState.honeypot}
              onChange={(e) => setFormState(prev => ({ ...prev, honeypot: e.target.value }))}
              className="honeypot" tabIndex={-1} />

            {/* ========== STEP 0: L'ANIMAL ========== */}
            <div ref={el => { stepRefs.current[0] = el; }} style={stepStyle(0)}>
              <AdoptionStep0
                cats={cats}
                animalName={formState.animalName}
                animalType={formState.animalType}
                onSelectCat={selectCat}
                setField={setField}
              />
            </div>

            {/* ========== STEP 1: COORDONNÉES ========== */}
            {shouldMount(1) && (
            <div ref={el => { stepRefs.current[1] = el; }} style={stepStyle(1)}>
              <AdoptionStep1Contact />
            </div>
            )}

            {/* ========== STEP 2: LOGEMENT ========== */}
            {shouldMount(2) && (
            <div ref={el => { stepRefs.current[2] = el; }} style={stepStyle(2)}>
              <AdoptionStep2Housing
                housingType={formState.housingType}
                hasGardenEnclosed={formState.hasGardenEnclosed}
                hasBalcony={formState.hasBalcony}
                balconySecured={formState.balconySecured}
                isOwner={formState.isOwner}
                hasPermission={formState.hasPermission}
                movingSoon={formState.movingSoon}
                setField={setField}
              />
            </div>
            )}

            {/* ========== STEP 3: FOYER ========== */}
            {shouldMount(3) && (
            <div ref={el => { stepRefs.current[3] = el; }} style={stepStyle(3)}>
              <AdoptionStep3Foyer
                employed={formState.employed}
                numAdults={formState.numAdults}
                numChildren={formState.numChildren}
                someoneHomeDuringDay={formState.someoneHomeDuringDay}
                hasAllergies={formState.hasAllergies}
                childrenCompatible={formState.childrenCompatible}
                hasAnimalNow={formState.hasAnimalNow}
                currentAnimalsSterilized={formState.currentAnimalsSterilized}
                currentAnimalsVaccinated={formState.currentAnimalsVaccinated}
                currentAnimalsTested={formState.currentAnimalsTested}
                hadAnimalBefore={formState.hadAnimalBefore}
                hadToSeparate={formState.hadToSeparate}
                adoptedFromShelter={formState.adoptedFromShelter}
                currentAnimals={currentAnimals}
                previousAnimals={previousAnimals}
                setCurrentAnimals={setCurrentAnimals}
                setPreviousAnimals={setPreviousAnimals}
                setField={setField}
              />
            </div>
            )}

            {/* ========== STEP 4: PROJET D'ADOPTION ========== */}
            {shouldMount(4) && (
            <div ref={el => { stepRefs.current[4] = el; }} style={stepStyle(4)}>
              <AdoptionStep4Project
                animalType={formState.animalType}
                longTermCommitment={formState.longTermCommitment}
                everyoneAgrees={formState.everyoneAgrees}
                knowsAnimalNeeds={formState.knowsAnimalNeeds}
                thoughtAboutDamages={formState.thoughtAboutDamages}
                careAbsence={formState.careAbsence}
                toggleCareAbsence={toggleCareAbsence}
                setField={setField}
              />
            </div>
            )}

            {/* ========== STEP 5: BUDGET & FIN ========== */}
            {shouldMount(5) && (
            <div ref={el => { stepRefs.current[5] = el; }} style={stepStyle(5)}>
              <AdoptionStep5Budget
                knowsVetCosts={formState.knowsVetCosts}
                emergencyPaymentThreshold={formState.emergencyPaymentThreshold}
                knowsMonthlyBudget={formState.knowsMonthlyBudget}
                animalLocationWork={formState.animalLocationWork}
                animalLocationHome={formState.animalLocationHome}
                howHeardAbout={formState.howHeardAbout}
                acceptsPrivacy={formState.acceptsPrivacy}
                setField={setField}
                onCaptchaVerify={setCaptchaToken}
              />
            </div>
            )}

            {/* ========== NAVIGATION ========== */}
            <div style={{
              display: 'flex',
              justifyContent: currentStep === 0 ? 'flex-end' : 'space-between',
              alignItems: 'center',
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb',
            }}>
              {currentStep > 0 && (
                <button type="button" onClick={goPrev} className="btn btn-outline">
                  ← Précédent
                </button>
              )}

              {isLastStep ? (
                <button type="submit" disabled={status === 'sending' || !captchaToken}
                  className="btn btn-gradient btn-lg">
                  {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              ) : (
                <button type="button" onClick={goNext} className="btn btn-gradient">
                  Suivant →
                </button>
              )}
            </div>

            {status === 'error' && (
              <div className="alert alert-error" style={{ marginTop: '1rem' }}>
                <strong>Erreur</strong> lors de l&apos;envoi. Veuillez réessayer ou nous contacter directement.
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}