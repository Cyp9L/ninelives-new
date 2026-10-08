import { expect, test } from '@playwright/test';

// The fake Trello (e2e/server.mjs) has 3 cats: Amon (adult), Éclair (kitten) and Mamie Lou (senior).

test('the homepage features the cats and links to the adoption page', async ({ page }) => {
  await page.goto('/');
  for (const name of ['Amon', 'Éclair', 'Mamie Lou']) {
    await expect(page.getByRole('link', { name })).toBeVisible();
  }
  await page.getByRole('link', { name: "Voir nos chats à l'adoption" }).click();
  await expect(page).toHaveURL('/adopter');
});

test('the adoption page shows the cats, with a filter per age', async ({ page }) => {
  await page.goto('/adopter');

  await expect(page.getByRole('button', { name: 'Tous (3)' })).toBeVisible();
  await page.getByRole('button', { name: 'Chatons (1)' }).click();
  await expect(page.getByRole('heading', { name: 'Éclair' })).toBeVisible();

  await page.getByRole('button', { name: 'Seniors (1)' }).click();
  await expect(page.getByRole('heading', { name: 'Mamie Lou' })).toBeVisible();
  await expect(page.getByText('Calme et douce')).toBeVisible();
});

test('the arrows go from one cat to the next', async ({ page }) => {
  await page.goto('/adopter');
  const current = page.locator('.showcase-info h2');
  await expect(current).toHaveText('Amon');
  await page.getByRole('button', { name: 'Chat suivant' }).click();
  await expect(current).toHaveText('Éclair');
  await page.getByRole('button', { name: 'Chat précédent' }).click();
  await expect(current).toHaveText('Amon');
});

test('a visitor can open a cat profile and start the adoption form for that cat', async ({ page }) => {
  await page.goto('/adopter');
  await page.getByRole('link', { name: 'Voir son profil' }).click();

  await expect(page).toHaveURL('/adopter/amon');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Amon');
  await expect(page.getByText('Amon adore les câlins.')).toBeVisible();

  await page.getByRole('link', { name: 'Je veux adopter Amon' }).click();
  await expect(page).toHaveURL('/adopter?cat=Amon#formulaire');
});

test('a cat whose name has an accent gets a clean address', async ({ page }) => {
  await page.goto('/adopter/eclair');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Éclair');
  await expect(page).toHaveTitle('Adopter Éclair | Nine Lives Paris');
});
