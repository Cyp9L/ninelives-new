import { afterEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import nextConfig from '@/next.config';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function fakeTrello(cards: unknown[] | Error) {
  vi.stubGlobal('fetch', vi.fn(async () => {
    if (cards instanceof Error) throw cards;
    return Response.json(cards);
  }));
}

const card = (name: string) => ({ id: name, name, desc: '', attachments: [], dateLastActivity: '2026-10-01' });

describe('sitemap.xml', () => {
  it('lists the public pages and one page per cat up for adoption', async () => {
    fakeTrello([card('Amon'), card('Éclair')]);
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls).toContain('https://ninelives.fr');
    expect(urls).toContain('https://ninelives.fr/adopter');
    expect(urls).toContain('https://ninelives.fr/contact');
    expect(urls).toContain('https://ninelives.fr/adopter/amon');
    expect(urls).toContain('https://ninelives.fr/adopter/eclair');
  });

  it('never lists the admin page', async () => {
    fakeTrello([]);
    expect((await sitemap()).some((entry) => entry.url.includes('/admin'))).toBe(false);
  });

  it('still lists the public pages when Trello is down', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    fakeTrello(new Error('network down'));
    const urls = (await sitemap()).map((entry) => entry.url);
    expect(urls).toContain('https://ninelives.fr/adopter');
    expect(urls.some((url) => url.startsWith('https://ninelives.fr/adopter/'))).toBe(false);
  });

  it('only lists pages that exist in the app folder', async () => {
    fakeTrello([]);
    for (const { url } of await sitemap()) {
      const route = url.replace('https://ninelives.fr', '') || '/';
      const pageFile = path.join(process.cwd(), 'app', route, 'page.tsx');
      expect(fs.existsSync(pageFile), `${route} has no app${route}/page.tsx`).toBe(true);
    }
  });
});

describe('robots.txt', () => {
  it('lets search engines in, keeps them out of the admin, and points to the sitemap', () => {
    const rules = robots();
    expect(rules.rules).toMatchObject({ userAgent: '*', allow: '/', disallow: '/admin/' });
    expect(rules.sitemap).toBe('https://ninelives.fr/sitemap.xml');
  });
});

describe('redirects from the old website', async () => {
  const redirects = (await nextConfig.redirects?.()) ?? [];

  it.each([
    ['/devenir-benevole', '/benevole'],
    ['/mentions-legales', '/mentions'],
    ['/jai-trouve-un-animal-que-faire', '/abandon/solutions'],
    ['/entry_form/formulaire-de-pre-adoption', '/adopter'],
    ['/nos-chatons', '/adopter'],
    ['/plan-du-site', '/'],
  ])('%s goes to %s', (source, destination) => {
    expect(redirects.find((r) => r.source === source)).toMatchObject({ destination, permanent: true });
  });

  it('are all permanent, so Google moves the old ranking to the new pages', () => {
    expect(redirects.every((r) => r.permanent)).toBe(true);
  });

  it('never redirect to a page that does not exist', () => {
    for (const { destination } of redirects) {
      const pageFile = path.join(process.cwd(), 'app', destination, 'page.tsx');
      expect(fs.existsSync(pageFile), `${destination} has no page`).toBe(true);
    }
  });

  it('never point to another redirect (no chains or loops)', () => {
    const sources = new Set(redirects.map((r) => r.source));
    for (const { source, destination } of redirects) {
      expect(sources.has(destination), `${source} -> ${destination} is itself redirected`).toBe(false);
    }
  });
});
