import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GALLERY_PATH = 'public/images/gallery';

export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get('file');
  if (!filename) return new NextResponse('Missing file', { status: 400 });

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${GALLERY_PATH}/${encodeURIComponent(filename)}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.raw+json',
      },
    }
  );

  if (!res.ok) return new NextResponse('Not found', { status: 404 });

  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}