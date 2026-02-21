import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const GALLERY_PATH = 'public/images/gallery';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-password') === ADMIN_PASSWORD;
}

// List images
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${GALLERY_PATH}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }, cache: 'no-store' }
  );

  if (!res.ok) return NextResponse.json({ files: [] });

  const files = await res.json();
  const images = Array.isArray(files)
    ? files
        .filter((f: any) => /\.(jpe?g|png|webp|avif)$/i.test(f.name))
        .map((f: any) => ({ name: f.name, sha: f.sha }))
    : [];

  return NextResponse.json({ files: images });
}

// Upload image
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  const { filename, content } = await req.json();

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${GALLERY_PATH}/${filename}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `gallery: add ${filename}`,
        content,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// Delete image
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  const { filename, sha } = await req.json();

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${GALLERY_PATH}/${filename}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `gallery: remove ${filename}`,
        sha,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}