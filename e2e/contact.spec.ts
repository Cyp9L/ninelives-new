import { expect, test } from '@playwright/test';
import { fakeCaptcha } from './helpers';

test.beforeEach(async ({ page }) => {
  await fakeCaptcha(page);
});

test('a visitor can send a message, and the form sends the right data', async ({ page }) => {
  let sent: Record<string, unknown> | undefined;
  // Answer for the server, so no real email goes out: here we test the page, not the API.
  await page.route('**/api/contact', async (route) => {
    sent = route.request().postDataJSON();
    await route.fulfill({ json: { success: true } });
  });

  await page.goto('/contact');
  await page.getByLabel('Comment pouvons-nous vous aider ?').selectOption('Question générale');
  await page.getByLabel('Prénom').fill('Ana');
  await page.getByLabel('Nom de famille').fill('Dupont');
  await page.getByLabel('E-mail').fill('ana@example.com');
  await page.getByLabel('Commentaires / Questions').fill('Amon est-il encore disponible ?');
  await page.getByLabel(/J'accepte la politique de confidentialité/).check();
  await page.getByRole('button', { name: 'Envoyer le message' }).click();

  await expect(page.getByText('Votre message a été envoyé.')).toBeVisible();
  expect(sent).toMatchObject({
    subject: 'Question générale',
    firstName: 'Ana',
    lastName: 'Dupont',
    email: 'ana@example.com',
    message: 'Amon est-il encore disponible ?',
    acceptsPrivacy: true,
    honeypot: '',
    captchaToken: 'e2e-captcha-token',
  });
});

test('the visitor sees an error message when sending fails', async ({ page }) => {
  await page.route('**/api/contact', (route) => route.fulfill({ status: 500, json: { error: 'Failed to send email' } }));

  await page.goto('/contact');
  await page.getByLabel('Comment pouvons-nous vous aider ?').selectOption('Question générale');
  await page.getByLabel('Prénom').fill('Ana');
  await page.getByLabel('Nom de famille').fill('Dupont');
  await page.getByLabel('E-mail').fill('ana@example.com');
  await page.getByLabel('Commentaires / Questions').fill('Bonjour');
  await page.getByLabel(/J'accepte la politique de confidentialité/).check();
  await page.getByRole('button', { name: 'Envoyer le message' }).click();

  await expect(page.getByText(/lors de l'envoi/)).toBeVisible();
});

test('the send button stays disabled until the captcha is solved', async ({ page }) => {
  await page.unroute('https://challenges.cloudflare.com/turnstile/**');
  // A captcha that never answers
  await page.route('https://challenges.cloudflare.com/turnstile/**', (route) =>
    route.fulfill({ contentType: 'application/javascript', body: 'window.turnstile = { render: () => "w", remove: () => {} }; window.onTurnstileLoad && window.onTurnstileLoad();' })
  );
  await page.goto('/contact');
  await page.getByLabel('Comment pouvons-nous vous aider ?').selectOption('Question générale');
  await expect(page.getByRole('button', { name: 'Envoyer le message' })).toBeDisabled();
});

test('a request to give up an animal is sent to the dedicated form instead', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Comment pouvons-nous vous aider ?').selectOption('Prise en charge / Abandon');

  await expect(page.getByText('Ce type de demande a un formulaire dédié')).toBeVisible();
  await expect(page.getByLabel('Prénom')).toHaveCount(0);
  await page.getByRole('link', { name: /formulaire de prise en charge/ }).click();
  await expect(page).toHaveURL('/abandon');
});

test('"Autre" first asks whether the request is about giving up an animal', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Comment pouvons-nous vous aider ?').selectOption('Autre');

  await expect(page.getByText('Votre demande concerne-t-elle un animal à confier ?')).toBeVisible();
  await page.getByRole('button', { name: "Non, c'est autre chose" }).click();
  await expect(page.getByLabel('Prénom')).toBeVisible();
  await expect(page.getByText(/ne concerne pas/)).toBeVisible();
});
