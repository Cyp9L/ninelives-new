// Starts the site for the end-to-end tests, with a fake Trello instead of the real board.
//
// 1. A tiny fake Trello answers with the three cats below.
// 2. The site is built and started in production mode, pointed at that fake Trello,
//    with placeholder keys (no real email can be sent, no real captcha is needed).
//
// Playwright runs this automatically (see playwright.config.ts).
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const TRELLO_PORT = 4100;
const SITE_PORT = process.env.E2E_PORT || '3100';

export const cats = [
  {
    id: 'cat-amon',
    name: 'Amon',
    desc: '**Sexe :** Mâle\n**Localisation :** Paris 11e\n**Caractère :** 🐾 Très sociable et joueur\n\nAmon adore les câlins.',
    labels: [],
    attachments: [],
    dateLastActivity: '2026-10-01T10:00:00.000Z',
  },
  {
    id: 'cat-eclair',
    name: 'Éclair',
    desc: '**Sexe :** Femelle\n**Caractère :** Curieuse',
    labels: [{ id: 'l1', name: 'Chaton', color: 'green' }],
    attachments: [],
    dateLastActivity: '2026-10-02T10:00:00.000Z',
  },
  {
    id: 'cat-mamie',
    name: 'Mamie Lou',
    desc: '**Sexe :** Femelle\n**Caractère :** Calme et douce',
    labels: [{ id: 'l2', name: 'Senior', color: 'blue' }],
    attachments: [],
    dateLastActivity: '2026-10-03T10:00:00.000Z',
  },
];

const fakeTrello = createServer((req, res) => {
  if (req.method === 'GET' && req.url?.startsWith('/1/lists/e2e-list/cards')) {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(cats));
    return;
  }
  res.writeHead(404);
  res.end();
});

const env = {
  ...process.env,
  TRELLO_API_BASE: `http://127.0.0.1:${TRELLO_PORT}/1`,
  TRELLO_LIST_ADOPTABLES_ID: 'e2e-list',
  TRELLO_API_KEY: 'e2e-key',
  TRELLO_TOKEN: 'e2e-token',
  RESEND_API_KEY: 're_e2e_placeholder',
  TURNSTILE_SECRET_KEY: 'e2e-secret',
  // Cloudflare's public test key; the tests replace the captcha script anyway.
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: '1x00000000000000000000AA',
  NEXT_TELEMETRY_DISABLED: '1',
};

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { env, stdio: 'inherit' });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} failed (${code})`))));
  });
}

fakeTrello.listen(TRELLO_PORT, '127.0.0.1', async () => {
  try {
    if (!process.env.E2E_SKIP_BUILD) await run('npx', ['next', 'build']);
    const site = spawn('npx', ['next', 'start', '-p', SITE_PORT], { env, stdio: 'inherit' });
    const stop = () => {
      site.kill();
      fakeTrello.close();
      process.exit(0);
    };
    process.on('SIGINT', stop);
    process.on('SIGTERM', stop);
    site.on('exit', (code) => {
      fakeTrello.close();
      process.exit(code ?? 0);
    });
  } catch (error) {
    console.error(error);
    fakeTrello.close();
    process.exit(1);
  }
});
