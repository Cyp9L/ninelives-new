import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const GALLERY_PATH = 'public/images/gallery';

// A plain image file name: no folders, no "..", only an image extension.
const SAFE_FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,150}\.(jpe?g|png|webp|avif)$/i;
const GIT_SHA = /^[0-9a-f]{40}$/;

// Brute-force protection: after MAX_FAILED_ATTEMPTS wrong passwords from one IP,
// that IP is blocked for LOCKOUT_MS. Kept in memory, so it is per server instance
// and resets on redeploy: it slows guessing down a lot, but is not a hard guarantee.
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const failedAttempts = new Map<string, { count: number; firstFailureAt: number }>();

interface GitHubContentFile {
  name: string;
  sha: string;
}

interface DeleteFileRef {
  filename: string;
  sha: string;
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

function isSafeFilename(value: unknown): value is string {
  return typeof value === 'string' && SAFE_FILENAME.test(value) && !value.includes('..');
}

function getClientIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

// Hash both sides so the comparison takes the same time whatever the input length.
function passwordMatches(candidate: string, expected: string) {
  const a = createHash('sha256').update(candidate).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Returns an error response if the request is not allowed, or null if it is. */
function checkAuth(req: NextRequest): NextResponse | null {
  // Refuse everything if no password is configured, rather than accepting an empty one.
  if (!ADMIN_PASSWORD) return unauthorized();

  const ip = getClientIp(req);
  const now = Date.now();
  const record = failedAttempts.get(ip);
  if (record && now - record.firstFailureAt > LOCKOUT_MS) failedAttempts.delete(ip);

  const current = failedAttempts.get(ip);
  if (current && current.count >= MAX_FAILED_ATTEMPTS) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
  }

  if (passwordMatches(req.headers.get('x-admin-password') ?? '', ADMIN_PASSWORD)) {
    failedAttempts.delete(ip);
    return null;
  }

  failedAttempts.set(ip, {
    count: (current?.count ?? 0) + 1,
    firstFailureAt: current?.firstFailureAt ?? now,
  });
  return unauthorized();
}

// List images
export async function GET(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${GALLERY_PATH}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }, cache: 'no-store' }
  );

  if (!res.ok) return NextResponse.json({ files: [] });

  const files: unknown = await res.json();
  const images = Array.isArray(files)
    ? (files as GitHubContentFile[])
        .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f.name))
        .map((f) => ({
          name: f.name,
          sha: f.sha,
          url: `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${GALLERY_PATH}/${encodeURIComponent(f.name)}`,
        }))
        .sort((a, b) => b.name.localeCompare(a.name))
    : [];

  return NextResponse.json({ files: images });
}

// Upload image
export async function POST(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const { filename, content } = await req.json();

  if (!isSafeFilename(filename)) return badRequest('Invalid filename');
  const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB base64 ≈ ~7.5 MB decoded
  if (typeof content !== 'string' || content.length === 0) return badRequest('Missing content');
  if (content.length > MAX_UPLOAD_BYTES) return badRequest('File too large (max 10 MB)');

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

// Batch delete
export async function DELETE(req: NextRequest) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const { files } = (await req.json()) as { files: DeleteFileRef[] };

  if (!Array.isArray(files) || files.length === 0) {
    return badRequest('No files specified');
  }

  if (!files.every((f) => isSafeFilename(f?.filename) && typeof f.sha === 'string' && GIT_SHA.test(f.sha))) {
    return badRequest('Invalid file reference');
  }

  const ghHeaders = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  };

  // Try Git Data API for single commit
  try {
    // 1. Get latest commit SHA
    const refRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/git/ref/heads/main`,
      { headers: ghHeaders }
    );
    if (!refRes.ok) throw new Error(`ref: ${await refRes.text()}`);
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    // 2. Get tree SHA
    const commitRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/git/commits/${latestCommitSha}`,
      { headers: ghHeaders }
    );
    if (!commitRes.ok) throw new Error(`commit: ${await commitRes.text()}`);
    const commitData = await commitRes.json();

    // 3. Create new tree with deletions
    const treeRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/git/trees`,
      {
        method: 'POST',
        headers: ghHeaders,
        body: JSON.stringify({
          base_tree: commitData.tree.sha,
          tree: files.map((f: DeleteFileRef) => ({
            path: `${GALLERY_PATH}/${f.filename}`,
            mode: '100644',
            type: 'blob',
            sha: null,
          })),
        }),
      }
    );
    if (!treeRes.ok) throw new Error(`tree: ${await treeRes.text()}`);
    const treeData = await treeRes.json();

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
    if (!newCommitRes.ok) throw new Error(`new commit: ${await newCommitRes.text()}`);
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
    if (!updateRes.ok) throw new Error(`update ref: ${await updateRes.text()}`);

    return NextResponse.json({ success: true, deleted: files.length });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Batch delete failed, falling back to sequential:', message);

    // Fallback: sequential deletes via Contents API
    let deleted = 0;
    for (const f of files) {
      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${GALLERY_PATH}/${f.filename}`,
        {
          method: 'DELETE',
          headers: ghHeaders,
          body: JSON.stringify({
            message: `gallery: remove ${f.filename}`,
            sha: f.sha,
          }),
        }
      );
      if (res.ok) deleted++;
    }

    if (deleted === 0) {
      return NextResponse.json({ error: `Batch failed: ${message}. Sequential also failed.` }, { status: 500 });
    }

    return NextResponse.json({ success: true, deleted, method: 'sequential' });
  }
}