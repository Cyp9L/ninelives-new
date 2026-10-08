import { describe, expect, it } from 'vitest';
import { escapeHtml, isValidEmail } from './sanitize';

describe('escapeHtml', () => {
  it('leaves plain text unchanged', () => {
    expect(escapeHtml('Bonjour, je voudrais adopter Amon')).toBe('Bonjour, je voudrais adopter Amon');
  });

  it('neutralises a script tag', () => {
    expect(escapeHtml('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('escapes quotes so text cannot break out of an HTML attribute', () => {
    expect(escapeHtml(`" onmouseover='x'`)).toBe('&quot; onmouseover=&#039;x&#039;');
  });

  it('escapes & first, so existing entities are not left half-escaped', () => {
    expect(escapeHtml('Tom & Jerry &lt;3')).toBe('Tom &amp; Jerry &amp;lt;3');
  });

  it('keeps accents and line breaks', () => {
    expect(escapeHtml('Chaton trouvé\nà Paris')).toBe('Chaton trouvé\nà Paris');
  });

  it('turns missing values into an empty string instead of crashing', () => {
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml(null)).toBe('');
  });

  it('accepts numbers', () => {
    expect(escapeHtml(42)).toBe('42');
  });
});

describe('isValidEmail', () => {
  it('accepts a normal address', () => {
    expect(isValidEmail('ana@example.com')).toBe(true);
  });

  it('ignores spaces around the address', () => {
    expect(isValidEmail('  ana@example.com ')).toBe(true);
  });

  it('refuses text that is not an email', () => {
    expect(isValidEmail('ana')).toBe(false);
    expect(isValidEmail('ana@example')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  it('refuses two addresses (so the forms cannot copy several people)', () => {
    expect(isValidEmail('a@example.com b@example.com')).toBe(false);
    expect(isValidEmail('a@example.com,b@example.com')).toBe(false);
    expect(isValidEmail('a@example.com;b@example.com')).toBe(false);
  });

  it('refuses anything that is not text', () => {
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail(42)).toBe(false);
  });
});
