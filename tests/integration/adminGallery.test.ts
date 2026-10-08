import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const PASSWORD = 'correct-horse-battery';
const SHA = 'a'.repeat(40);

let github: string[];

/**
 * Loads a fresh copy of the route: the password and the failed-attempts counter
 * live at the top of the file, so each test starts from a clean state.
 */
async function loadRoute({ password = PASSWORD as string | undefined } = {}) {
  vi.resetModules();
  vi.stubEnv('ADMIN_PASSWORD', password);
  vi.stubEnv('GITHUB_REPO', 'Cyp9L/ninelives-new');
  vi.stubEnv('GITHUB_TOKEN', 'github-test-token');
  return import('@/app/api/admin/gallery/route');
}

function request(method: string, { password = PASSWORD, ip = '1.1.1.1', body }: { password?: string; ip?: string; body?: unknown } = {}) {
  return new NextRequest('http://localhost/api/admin/gallery', {
    method,
    headers: { 'x-admin-password': password, 'x-forwarded-for': ip, 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

beforeEach(() => {
  github = [];
  // Fake GitHub API: records every call and answers like GitHub would.
  vi.stubGlobal('fetch', vi.fn(async (url: string, init?: RequestInit) => {
    github.push(`${init?.method ?? 'GET'} ${url}`);
    if (url.endsWith('/git/ref/heads/main')) return Response.json({ object: { sha: SHA } });
    if (url.includes('/git/commits/')) return Response.json({ tree: { sha: SHA } });
    if (url.endsWith('/git/trees') || url.endsWith('/git/commits')) return Response.json({ sha: SHA });
    if (url.includes('/contents/') && (init?.method ?? 'GET') === 'GET') {
      return Response.json([
        { name: '1700000000000-old.jpg', sha: SHA },
        { name: '1800000000000-new.webp', sha: SHA },
        { name: '.gitkeep', sha: SHA },
      ]);
    }
    return Response.json({});
  }));
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('password check', () => {
  it('lets the right password in and lists the gallery photos, newest first, images only', async () => {
    const { GET } = await loadRoute();
    const res = await GET(request('GET'));
    expect(res.status).toBe(200);
    const { files } = await res.json();
    expect(files.map((f: { name: string }) => f.name)).toEqual(['1800000000000-new.webp', '1700000000000-old.jpg']);
  });

  it('refuses a wrong or missing password without calling GitHub', async () => {
    const { GET } = await loadRoute();
    expect((await GET(request('GET', { password: 'guess' }))).status).toBe(401);
    expect((await GET(request('GET', { password: '' }))).status).toBe(401);
    expect(github).toHaveLength(0);
  });

  it('refuses everyone when no admin password is configured, even with an empty password', async () => {
    const { GET } = await loadRoute({ password: undefined });
    expect((await GET(request('GET', { password: '' }))).status).toBe(401);
  });

  it('blocks an IP after 5 wrong passwords, even if it then finds the right one', async () => {
    const { GET } = await loadRoute();
    for (let i = 1; i <= 5; i++) {
      expect((await GET(request('GET', { password: `guess-${i}`, ip: '6.6.6.6' }))).status).toBe(401);
    }
    expect((await GET(request('GET', { password: 'guess-6', ip: '6.6.6.6' }))).status).toBe(429);
    expect((await GET(request('GET', { ip: '6.6.6.6' }))).status).toBe(429);
  });

  it('does not block other IPs', async () => {
    const { GET } = await loadRoute();
    for (let i = 1; i <= 6; i++) await GET(request('GET', { password: 'guess', ip: '6.6.6.6' }));
    expect((await GET(request('GET', { ip: '2.2.2.2' }))).status).toBe(200);
  });

  it('unblocks the IP after 15 minutes', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    try {
      const { GET } = await loadRoute();
      for (let i = 1; i <= 5; i++) await GET(request('GET', { password: 'guess', ip: '6.6.6.6' }));
      expect((await GET(request('GET', { ip: '6.6.6.6' }))).status).toBe(429);

      vi.advanceTimersByTime(15 * 60 * 1000 + 1);
      expect((await GET(request('GET', { ip: '6.6.6.6' }))).status).toBe(200);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('upload', () => {
  it('sends a photo with a normal name to the gallery folder on GitHub', async () => {
    const { POST } = await loadRoute();
    const res = await POST(request('POST', { body: { filename: '1800000000000-chat.jpg', content: 'aGVsbG8=' } }));
    expect(res.status).toBe(200);
    expect(github).toEqual([
      'PUT https://api.github.com/repos/Cyp9L/ninelives-new/contents/public/images/gallery/1800000000000-chat.jpg',
    ]);
  });

  // Security: with the password, the page must not be able to write anywhere else in the code.
  it.each([
    '../../app/page.tsx',
    'app/page.tsx',
    'evil.js',
    'a..jpg',
    '.hidden.jpg',
    'photo.jpg/../../x',
    '',
  ])('refuses the file name %j without calling GitHub', async (filename) => {
    const { POST } = await loadRoute();
    const res = await POST(request('POST', { body: { filename, content: 'aGVsbG8=' } }));
    expect(res.status).toBe(400);
    expect(github).toHaveLength(0);
  });

  it('refuses an empty file', async () => {
    const { POST } = await loadRoute();
    expect((await POST(request('POST', { body: { filename: 'chat.jpg', content: '' } }))).status).toBe(400);
  });

  it('refuses files over 10 MB', async () => {
    const { POST } = await loadRoute();
    const tooBig = 'A'.repeat(10 * 1024 * 1024 + 1);
    expect((await POST(request('POST', { body: { filename: 'chat.jpg', content: tooBig } }))).status).toBe(400);
    expect(github).toHaveLength(0);
  });

  it('refuses uploads without the password', async () => {
    const { POST } = await loadRoute();
    const res = await POST(request('POST', { password: 'guess', body: { filename: 'chat.jpg', content: 'aGVsbG8=' } }));
    expect(res.status).toBe(401);
    expect(github).toHaveLength(0);
  });
});

describe('delete', () => {
  it('deletes the selected photos in a single GitHub commit', async () => {
    const { DELETE } = await loadRoute();
    const res = await DELETE(request('DELETE', { body: { files: [{ filename: 'a.jpg', sha: SHA }, { filename: 'b.webp', sha: SHA }] } }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, deleted: 2 });
    expect(github.at(-1)).toBe('PATCH https://api.github.com/repos/Cyp9L/ninelives-new/git/ref/heads/main');
  });

  it.each([
    ['a file outside the gallery', { filename: '../../README.md', sha: SHA }],
    ['an invalid file id', { filename: 'a.jpg', sha: 'not-a-sha' }],
  ])('refuses %s without calling GitHub', async (_label, file) => {
    const { DELETE } = await loadRoute();
    const res = await DELETE(request('DELETE', { body: { files: [{ filename: 'ok.jpg', sha: SHA }, file] } }));
    expect(res.status).toBe(400);
    expect(github).toHaveLength(0);
  });

  it('refuses an empty selection', async () => {
    const { DELETE } = await loadRoute();
    expect((await DELETE(request('DELETE', { body: { files: [] } }))).status).toBe(400);
  });
});
