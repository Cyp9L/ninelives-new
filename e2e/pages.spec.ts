import { expect, test } from '@playwright/test';
import { watchImages } from './helpers';

const pages = [
  '/',
  '/adopter',
  '/adopter/amon',
  '/benevole',
  '/abandon',
  '/abandon/solutions',
  '/actions',
  '/donner',
  '/partenaires',
  '/galerie',
  '/medias',
  '/contact',
  '/mentions',
  '/politique-de-confidentialite',
];

for (const path of pages) {
  test.describe(path, () => {
    test('loads with a title, a heading, no broken image and no JavaScript crash', async ({ page }) => {
      const crashes: string[] = [];
      page.on('pageerror', (error) => crashes.push(error.message));
      const expectNoBrokenImages = watchImages(page);

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(/Nine Lives Paris/);
      await expect(page.locator('h1').first()).toBeVisible();
      await expectNoBrokenImages();
      expect(crashes).toEqual([]);
    });

    test('does not scroll sideways', async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test('an unknown address shows the "page not found" page', async ({ page }) => {
  const response = await page.goto('/cette-page-n-existe-pas');
  expect(response?.status()).toBe(404);
});

test('an unknown cat shows the "page not found" page', async ({ page }) => {
  const response = await page.goto('/adopter/chat-inconnu');
  expect(response?.status()).toBe(404);
});

test.describe('redirects from the old website', () => {
  for (const [oldPath, newPath] of [
    ['/devenir-benevole', '/benevole'],
    ['/jai-trouve-un-animal-que-faire', '/abandon/solutions'],
    ['/nos-chatons', '/adopter'],
  ]) {
    test(`${oldPath} lands on ${newPath}`, async ({ page }) => {
      await page.goto(oldPath);
      await expect(page).toHaveURL(newPath);
    });
  }
});
