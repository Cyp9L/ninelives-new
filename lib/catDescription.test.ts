import { describe, expect, it } from 'vitest';
import { extractField, stripMarkdown } from './catDescription';

describe('stripMarkdown', () => {
  it('removes bold and italic markers but keeps the words', () => {
    expect(stripMarkdown('**Sexe :** Mâle, *très* câlin')).toBe('Sexe : Mâle, très câlin');
  });

  it('keeps link text and drops the URL', () => {
    expect(stripMarkdown('Voir [son profil](https://example.com/amon)')).toBe('Voir son profil');
  });

  it('drops images entirely', () => {
    expect(stripMarkdown('Avant ![photo](https://example.com/a.jpg) après')).toBe('Avant après');
  });

  it('removes heading markers', () => {
    expect(stripMarkdown('## Son histoire')).toBe('Son histoire');
  });

  it('turns line breaks and repeated spaces into single spaces', () => {
    expect(stripMarkdown('Ligne 1\n\nLigne 2   et   suite\n')).toBe('Ligne 1 Ligne 2 et suite');
  });

  it('returns an empty string for an empty description', () => {
    expect(stripMarkdown('')).toBe('');
  });
});

describe('extractField', () => {
  // Shape of a real Trello description (see the live page of Amon)
  const desc = [
    '**Sexe :** Mâle',
    '**Date de naissance :** 01 janvier 2025',
    '**Localisation :** Paris 11e',
    '**Caractère :** 🐾 Très sociable',
  ].join('\n');

  it('reads a field from the Trello template', () => {
    expect(extractField(desc, 'Sexe')).toBe('Mâle');
    expect(extractField(desc, 'Localisation')).toBe('Paris 11e');
  });

  it('stops at the end of the line', () => {
    expect(extractField(desc, 'Date de naissance')).toBe('01 janvier 2025');
  });

  it('accepts the colon outside the bold markers', () => {
    expect(extractField('**Sexe** : Femelle', 'Sexe')).toBe('Femelle');
  });

  it('ignores the case of the field name', () => {
    expect(extractField('**SEXE :** Femelle', 'Sexe')).toBe('Femelle');
  });

  it('returns an empty string when the field is missing', () => {
    expect(extractField(desc, 'Poids')).toBe('');
  });
});
