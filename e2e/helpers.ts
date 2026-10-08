import { expect, type Page } from '@playwright/test';

/**
 * Replaces Cloudflare's captcha script with a fake one that passes at once,
 * so the forms can be submitted in tests without reaching Cloudflare.
 */
export async function fakeCaptcha(page: Page) {
  await page.route('https://challenges.cloudflare.com/turnstile/**', (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: `
        window.turnstile = {
          render: (container, options) => { setTimeout(() => options.callback('e2e-captcha-token'), 0); return 'widget-1'; },
          remove: () => {},
        };
        window.onTurnstileLoad && window.onTurnstileLoad();
      `,
    })
  );
}

/**
 * Records every image the browser requests on this page. Call before page.goto(),
 * then call the returned function: it scrolls through the page (so lazy images load)
 * and fails if any requested image did not load, or loaded but cannot be displayed.
 */
export function watchImages(page: Page) {
  const failed: string[] = [];
  page.on('response', (response) => {
    if (response.request().resourceType() === 'image' && response.status() >= 400) {
      failed.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on('requestfailed', (request) => {
    if (request.resourceType() === 'image') failed.push(`failed ${request.url()}`);
  });

  return async function expectNoBrokenImages() {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    const undisplayable = await page.evaluate(() =>
      [...document.images]
        .filter((img) => img.currentSrc && img.complete && img.naturalWidth === 0)
        .map((img) => `undisplayable ${img.currentSrc}`)
    );
    expect([...failed, ...undisplayable], 'broken images').toEqual([]);
  };
}
