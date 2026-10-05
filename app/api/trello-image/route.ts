import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

const MAX_WIDTH = 1200;
const QUALITY = 80;

// The Trello credentials are attached to the request, so only Trello hosts may be fetched.
const ALLOWED_HOSTS = new Set(['trello.com', 'api.trello.com']);

function isAllowedTrelloUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ALLOWED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url');
  const requestedWidth = parseInt(request.nextUrl.searchParams.get('w') || '0', 10);

  if (!imageUrl) {
    return new NextResponse('Missing URL', { status: 400 });
  }

  if (!isAllowedTrelloUrl(imageUrl)) {
    return new NextResponse('URL not allowed', { status: 400 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'Authorization': `OAuth oauth_consumer_key="${process.env.TRELLO_API_KEY}", oauth_token="${process.env.TRELLO_TOKEN}"`
      }
    });

    if (!response.ok) {
      return new NextResponse('Failed to fetch image', { status: response.status });
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());

    // Resize + convert to WebP
    const width = requestedWidth > 0 ? Math.min(requestedWidth, MAX_WIDTH) : MAX_WIDTH;

    const optimized = await sharp(imageBuffer)
      .resize(width, undefined, {
        withoutEnlargement: true,  // don't upscale small images
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toBuffer();

    return new NextResponse(new Uint8Array(optimized), {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, s-maxage=604800, max-age=604800, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse('Error fetching image', { status: 500 });
  }
}