import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { extractCaractere, getAllCats, getCatBySlug, getCategory, slugify } from './trello';

describe('getCategory', () => {
  it('is "adulte" when the card has no labels', () => {
    expect(getCategory(undefined)).toBe('adulte');
    expect(getCategory([])).toBe('adulte');
  });

  it('detects kittens and seniors from the label name, whatever the case', () => {
    expect(getCategory([{ name: 'Chaton' }])).toBe('chaton');
    expect(getCategory([{ name: 'SENIOR 12 ans' }])).toBe('senior');
  });

  it('is "adulte" for any other label', () => {
    expect(getCategory([{ name: 'Urgent' }, { name: 'FIV+' }])).toBe('adulte');
  });

  it('uses the first matching label', () => {
    expect(getCategory([{ name: 'Senior' }, { name: 'Chaton' }])).toBe('senior');
  });
});

describe('extractCaractere', () => {
  it('reads "**Caractère :** ..." (format used on the live cards)', () => {
    expect(extractCaractere('**Sexe :** Mâle\n**Caractère :** 🐾 Très câlin')).toBe('🐾 Très câlin');
  });

  it('reads "**Caractère : ...**" with everything in bold', () => {
    expect(extractCaractere('**Caractère : joueur et curieux**')).toBe('joueur et curieux');
  });

  it('reads "Caractère : ..." without bold', () => {
    expect(extractCaractere('Caractère : timide au début\nAutre ligne')).toBe('timide au début');
  });

  it('returns an empty string when there is no Caractère line', () => {
    expect(extractCaractere('**Sexe :** Femelle')).toBe('');
  });
});

describe('slugify', () => {
  it('lowercases and replaces spaces with dashes', () => {
    expect(slugify('Petit Pirate')).toBe('petit-pirate');
  });

  it('removes French accents', () => {
    expect(slugify('Éclair Doré')).toBe('eclair-dore');
    expect(slugify('Ça Va')).toBe('ca-va');
  });

  it('drops punctuation', () => {
    expect(slugify('Patte-Blanche!')).toBe('patte-blanche');
  });

  // Known bugs, not fixed yet: fixing them changes the URL of the cats concerned.
  it.todo('handles ë and œ ("Noël" gives "nol", "Œdipe" gives "dipe" today)');
  it.todo('never leaves double or trailing dashes ("Zoé & Léo" gives "zoe--leo", "Patte Blanche !" gives "patte-blanche-")');
});

// --- getAllCats, with Trello replaced by a fake ---

function card(overrides: Record<string, unknown> = {}) {
  return {
    id: 'card-1',
    name: 'Amon',
    desc: '**Caractère :** Très sociable',
    labels: [],
    attachments: [],
    dateLastActivity: '2026-10-01T10:00:00.000Z',
    ...overrides,
  };
}

function fakeTrello(cards: unknown[], ok = true) {
  const fetchMock = vi.fn<(url: string) => Promise<Response>>(async () => new Response(JSON.stringify(cards), { status: ok ? 200 : 500 }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('getAllCats', () => {
  beforeEach(() => {
    vi.stubEnv('TRELLO_LIST_ADOPTABLES_ID', 'list-123');
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('asks Trello for the cards of the "adoptables" list', async () => {
    const fetchMock = fakeTrello([]);
    await getAllCats();
    expect(String(fetchMock.mock.calls[0][0])).toContain('/lists/list-123/cards');
  });

  it('turns a Trello card into a cat', async () => {
    fakeTrello([card({ name: 'Éclair', labels: [{ id: 'l', name: 'Chaton', color: 'green' }] })]);
    const { all } = await getAllCats();
    expect(all).toHaveLength(1);
    expect(all[0]).toMatchObject({
      id: 'card-1',
      slug: 'eclair',
      name: 'Éclair',
      category: 'chaton',
      caractere: 'Très sociable',
      dateAdded: '2026-10-01T10:00:00.000Z',
    });
  });

  it('sorts cats into kittens, adults and seniors', async () => {
    fakeTrello([
      card({ id: 'a', labels: [{ name: 'Chaton' }] }),
      card({ id: 'b' }),
      card({ id: 'c', labels: [{ name: 'Senior' }] }),
      card({ id: 'd' }),
    ]);
    const { chatons, adultes, seniors, all } = await getAllCats();
    expect(chatons.map((c) => c.id)).toEqual(['a']);
    expect(adultes.map((c) => c.id)).toEqual(['b', 'd']);
    expect(seniors.map((c) => c.id)).toEqual(['c']);
    expect(all).toHaveLength(4);
  });

  it('serves photos through our image route, cover photo first, without duplicating it', async () => {
    fakeTrello([
      card({
        idAttachmentCover: 'att-2',
        attachments: [
          { id: 'att-1', url: 'https://trello.com/1.jpg', mimeType: 'image/jpeg' },
          { id: 'att-2', url: 'https://trello.com/2.jpg', mimeType: 'image/jpeg' },
          { id: 'att-3', url: 'https://trello.com/doc.pdf', mimeType: 'application/pdf' },
        ],
      }),
    ]);
    const { all } = await getAllCats();
    const proxied = (url: string) => `/api/trello-image?url=${encodeURIComponent(url)}`;
    expect(all[0].images).toEqual([proxied('https://trello.com/2.jpg'), proxied('https://trello.com/1.jpg')]);
  });

  it('uses a placeholder photo when the card has no image', async () => {
    fakeTrello([card({ attachments: [] })]);
    const { all } = await getAllCats();
    expect(all[0].images).toEqual(['/images/site/cat-not-found.jpg']);
  });

  it('copes with a card without description', async () => {
    fakeTrello([card({ desc: '' })]);
    const { all } = await getAllCats();
    expect(all[0].description).toBe('');
    expect(all[0].caractere).toBe('');
  });

  it('returns empty lists instead of crashing when Trello answers with an error', async () => {
    fakeTrello([], false);
    expect(await getAllCats()).toEqual({ adultes: [], chatons: [], seniors: [], all: [] });
  });

  it('returns empty lists instead of crashing when Trello cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network down'); }));
    expect(await getAllCats()).toEqual({ adultes: [], chatons: [], seniors: [], all: [] });
  });
});

describe('getCatBySlug', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('finds a cat by the slug in its URL', async () => {
    fakeTrello([card({ id: 'x', name: 'Petit Pirate' })]);
    expect((await getCatBySlug('petit-pirate'))?.id).toBe('x');
  });

  it('returns undefined for an unknown cat', async () => {
    fakeTrello([card()]);
    expect(await getCatBySlug('inconnu')).toBeUndefined();
  });
});
