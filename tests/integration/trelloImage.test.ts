import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import sharp from 'sharp';
import { GET } from '@/app/api/trello-image/route';

let photo: Buffer;

beforeAll(async () => {
  // A real 2000x1000 JPEG, so the route has something to resize.
  photo = await sharp({ create: { width: 2000, height: 1000, channels: 3, background: '#e0b080' } })
    .jpeg()
    .toBuffer();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function fakeTrello(status = 200) {
  const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => new Response(new Uint8Array(photo), { status }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function get(imageUrl: string | null, width?: number) {
  const params = new URLSearchParams();
  if (imageUrl !== null) params.set('url', imageUrl);
  if (width) params.set('w', String(width));
  return GET(new NextRequest(`http://localhost/api/trello-image?${params}`));
}

describe('GET /api/trello-image', () => {
  it('fetches a Trello photo with our credentials and returns it as WebP, at most 1200 px wide', async () => {
    vi.stubEnv('TRELLO_API_KEY', 'key-123');
    vi.stubEnv('TRELLO_TOKEN', 'token-456');
    const fetchMock = fakeTrello();

    const res = await get('https://trello.com/1/cards/c/attachments/a/download/photo.jpeg');

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('image/webp');
    expect(res.headers.get('cache-control')).toContain('s-maxage=604800');
    const meta = await sharp(Buffer.from(await res.arrayBuffer())).metadata();
    expect(meta.format).toBe('webp');
    expect(meta.width).toBe(1200);

    const headers = fetchMock.mock.calls[0][1]?.headers as Record<string, string>;
    expect(headers.Authorization).toContain('oauth_consumer_key="key-123"');
    expect(headers.Authorization).toContain('oauth_token="token-456"');
  });

  it('resizes to the requested width', async () => {
    fakeTrello();
    const res = await get('https://api.trello.com/1/cards/c/attachments/a/download/photo.jpeg', 300);
    const meta = await sharp(Buffer.from(await res.arrayBuffer())).metadata();
    expect(meta.width).toBe(300);
  });

  it('never goes above 1200 px, even if asked', async () => {
    fakeTrello();
    const res = await get('https://trello.com/photo.jpeg', 5000);
    const meta = await sharp(Buffer.from(await res.arrayBuffer())).metadata();
    expect(meta.width).toBe(1200);
  });

  // Security: the Trello credentials are sent with the request, so only Trello may be fetched.
  it.each([
    ['another website', 'https://evil.example.com/steal'],
    ['plain http', 'http://trello.com/photo.jpeg'],
    ['a lookalike domain', 'https://trello.com.evil.example/photo.jpeg'],
    ['a subdomain we do not use', 'https://evil.trello.com/photo.jpeg'],
    ['trello.com hidden in the query', 'https://evil.example/?trello.com'],
    ['a local address', 'http://127.0.0.1:3000/'],
    ['garbage', 'not a url'],
  ])('refuses %s without contacting it', async (_label, url) => {
    const fetchMock = fakeTrello();
    const res = await get(url);
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('answers 400 when the url parameter is missing', async () => {
    const fetchMock = fakeTrello();
    expect((await get(null)).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('passes on the error when Trello refuses', async () => {
    fakeTrello(404);
    expect((await get('https://trello.com/missing.jpeg')).status).toBe(404);
  });

  it('answers 500 when the file is not an image', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('this is not an image')));
    expect((await get('https://trello.com/broken.jpeg')).status).toBe(500);
  });
});
