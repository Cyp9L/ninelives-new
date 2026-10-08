import { describe, expect, it } from 'vitest';
import { hashString, seededShuffle } from './shuffle';

describe('hashString', () => {
  it('always gives the same number for the same text', () => {
    expect(hashString('gallery')).toBe(hashString('gallery'));
  });

  it('gives different numbers for different texts', () => {
    expect(hashString('a.webp')).not.toBe(hashString('b.webp'));
  });

  it('returns a positive whole number', () => {
    const h = hashString('a very long gallery file list'.repeat(50));
    expect(Number.isInteger(h)).toBe(true);
    expect(h).toBeGreaterThanOrEqual(0);
  });
});

describe('seededShuffle', () => {
  const files = Array.from({ length: 20 }, (_, i) => `photo-${i}.webp`);

  it('gives the same order for the same seed (so every visitor sees the same page)', () => {
    expect(seededShuffle(files, 42)).toEqual(seededShuffle(files, 42));
  });

  it('gives a different order for a different seed', () => {
    expect(seededShuffle(files, 42)).not.toEqual(seededShuffle(files, 43));
  });

  it('keeps every item exactly once', () => {
    expect([...seededShuffle(files, 7)].sort()).toEqual([...files].sort());
  });

  it('does not modify the original list', () => {
    const copy = [...files];
    seededShuffle(files, 7);
    expect(files).toEqual(copy);
  });

  it('still works with a seed of 0', () => {
    expect(seededShuffle(files, 0)).toHaveLength(files.length);
  });

  it('handles empty and one-item lists', () => {
    expect(seededShuffle([], 1)).toEqual([]);
    expect(seededShuffle(['seul.webp'], 1)).toEqual(['seul.webp']);
  });
});
