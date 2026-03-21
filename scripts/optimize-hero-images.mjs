/**
 * Recompress hero images used by HeroLcp (same paths as in app/).
 * Run: node scripts/optimize-hero-images.mjs
 * Requires: sharp (devDependency)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const HEROES = [
  'public/images/site/salomon-bg.webp',
  'public/images/site/actions-hero.webp',
  'public/images/site/Masha8.webp',
  'public/images/site/29052021-IMG_5287.webp',
  'public/images/site/moustache-cafe.webp',
  'public/images/site/DSC01832.webp',
  'public/images/site/26032021-IMG_4304.webp',
  'public/images/site/29012021-IMG_3094.webp',
];

const MAX_WIDTH = 1920;
/** WebP: balance size vs banding on soft photos */
const WEBP_QUALITY = 78;
/** JPEG: mozjpeg for heroes */
const JPEG_QUALITY = 82;

async function optimize(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) {
    console.warn('skip (missing):', relativePath);
    return;
  }

  const before = fs.statSync(full).size;
  let pipeline = sharp(full).rotate();

  const meta = await pipeline.metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const ext = path.extname(relativePath).toLowerCase();
  let buf;
  if (ext === '.webp') {
    buf = await pipeline.webp({ quality: WEBP_QUALITY, effort: 5 }).toBuffer();
  } else if (ext === '.jpg' || ext === '.jpeg') {
    buf = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  } else {
    console.warn('skip (unknown ext):', relativePath);
    return;
  }

  if (buf.length >= before) {
    console.log(
      relativePath,
      `${(before / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB (unchanged, would grow; skip write)`
    );
    return;
  }

  fs.writeFileSync(full, buf);
  console.log(
    relativePath,
    `${(before / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB (${Math.round((1 - buf.length / before) * 100)}% smaller)`
  );
}

for (const rel of HEROES) {
  await optimize(rel);
}
console.log('Done.');
