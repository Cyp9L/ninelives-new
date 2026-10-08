import { vi } from 'vitest';

/** An email as our code handed it to Resend. */
export interface SentEmail {
  from: string;
  to: string[];
  cc?: string[];
  reply_to?: string[];
  subject: string;
  html: string;
  attachments?: { filename: string; content: unknown }[];
}

interface Options {
  /** What Cloudflare answers when the captcha token is checked. */
  captchaOk?: boolean;
  /** Whether Resend accepts the email. */
  resendOk?: boolean;
  /** Trello cards returned for the "adoptables" list (used by the adoption form). */
  trelloCards?: unknown[];
}

/**
 * Replaces the internet with fakes for Cloudflare Turnstile, Resend and Trello,
 * and records every email our code tries to send. Any other address fails the test.
 */
export function fakeServices({ captchaOk = true, resendOk = true, trelloCards = [] }: Options = {}) {
  const emails: SentEmail[] = [];
  const captchaChecks: unknown[] = [];

  const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);

    if (url.startsWith('https://challenges.cloudflare.com/turnstile/')) {
      captchaChecks.push(JSON.parse(String(init?.body)));
      return Response.json({ success: captchaOk });
    }

    if (url.startsWith('https://api.resend.com/emails')) {
      if (!resendOk) {
        return Response.json({ name: 'application_error', message: 'Resend is down' }, { status: 500 });
      }
      emails.push(JSON.parse(String(init?.body)));
      return Response.json({ id: `email-${emails.length}` });
    }

    if (url.startsWith('https://api.trello.com/')) {
      return Response.json(trelloCards);
    }

    throw new Error(`Unexpected request in test: ${url}`);
  });

  vi.stubGlobal('fetch', fetchMock);
  return { emails, captchaChecks, fetchMock };
}

/** A JSON POST request, as the browser sends it from our forms. */
export function jsonPost(body: unknown, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/test', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}
