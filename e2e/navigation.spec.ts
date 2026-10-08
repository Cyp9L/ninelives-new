import { expect, test } from '@playwright/test';

test.describe('on a phone', () => {
  test.skip(({ isMobile }) => !isMobile, 'phone menu only');

  test('the menu opens, leads to a page, and closes', async ({ page }) => {
    await page.goto('/');
    const menu = page.locator('.nav-mobile');
    await expect(menu).toBeHidden();

    await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
    await expect(menu).toBeVisible();

    await menu.getByRole('link', { name: "J'ai besoin d'aide" }).click();
    await expect(page).toHaveURL('/abandon/solutions');
    await expect(menu).toBeHidden();
  });

  test('"L\'association" opens its sub-menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
    const menu = page.locator('.nav-mobile');
    await menu.getByRole('button', { name: /L'association/ }).click();
    await menu.getByRole('link', { name: 'Partenaires' }).click();
    await expect(page).toHaveURL('/partenaires');
  });
});

test.describe('on a computer', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop menu only');

  test('the main links are visible without opening anything', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('.nav-desktop');
    for (const name of ['Je veux adopter', 'Je veux aider', "J'ai besoin d'aide", 'Contact', '♥ Faire un don']) {
      await expect(nav.getByRole('link', { name })).toBeVisible();
    }
  });

  test('"L\'association" opens a dropdown that closes with Escape', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('.nav-desktop').getByRole('button', { name: /L'association/ });
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.nav-dropdown-menu').getByRole('link', { name: 'Galerie' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

test('the "skip to content" link is the first thing reached with the keyboard', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard navigation');
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
});
