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
        .map((f: any) => ({
          name: f.name,
          sha: f.sha,
          url: `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${GALLERY_PATH}/${encodeURIComponent(f.name)}`,
        }))
        .sort((a: any, b: any) => b.name.localeCompare(a.name))
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

// Batch delete — single commit via Git Data API
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  const { files } = await req.json(); // Array of { filename, sha }

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files specified' }, { status: 400 });
  }

  const ghHeaders = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  };

  // 1. Get latest commit SHA
  const refRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/ref/heads/main`,
    { headers: ghHeaders }
  );
  const refData = await refRes.json();
  const latestCommitSha = refData.object.sha;

  // 2. Get tree SHA
  const commitRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/commits/${latestCommitSha}`,
    { headers: ghHeaders }
  );
  const commitData = await commitRes.json();

  // 3. Create new tree with deletions (sha: null removes the file)
  const treeRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/trees`,
    {
      method: 'POST',
      headers: ghHeaders,
      body: JSON.stringify({
        base_tree: commitData.tree.sha,
        tree: files.map((f: any) => ({
          path: `${GALLERY_PATH}/${f.filename}`,
          mode: '100644',
          type: 'blob',
          sha: null,
        })),
      }),
    }
  );
  const treeData = await treeRes.json();

  if (!treeData.sha) {
    return NextResponse.json({ error: 'Failed to create tree' }, { status: 500 });
  }

  // 4. Create commit
  const newCommitRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/commits`,
    {
      method: 'POST',
      headers: ghHeaders,
      body: JSON.stringify({
        message: `gallery: remove ${files.length} image(s)`,
        tree: treeData.sha,
        parents: [latestCommitSha],
      }),
    }
  );
  const newCommitData = await newCommitRes.json();

  // 5. Update ref
  const updateRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/ref/heads/main`,
    {
      method: 'PATCH',
      headers: ghHeaders,
      body: JSON.stringify({ sha: newCommitData.sha }),
    }
  );

  if (!updateRes.ok) {
    return NextResponse.json({ error: 'Failed to update ref' }, { status: 500 });
  }

  return NextResponse.json({ success: true, deleted: files.length });
}