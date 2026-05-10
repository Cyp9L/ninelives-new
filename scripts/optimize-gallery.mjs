import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const GALLERY_DIR = path.join(process.cwd(), 'public/images/gallery');
const MAX_WIDTH = 1280;
const QUALITY = 80;

async function optimizeGallery() {
  if (files.length === 0) {
    console.log('Found 0 images to optimize. All clean! ✅');
    return;
  }
  const files = fs.readdirSync(GALLERY_DIR)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Found ${files.length} images to optimize...\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(GALLERY_DIR, file);
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(GALLERY_DIR, outputName);

    const beforeSize = fs.statSync(inputPath).size;
    totalBefore += beforeSize;

    await sharp(inputPath)
      .resize(MAX_WIDTH, undefined, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const afterSize = fs.statSync(outputPath).size;
    totalAfter += afterSize;

    // Delete original
    fs.unlinkSync(inputPath);

    const saved = ((1 - afterSize / beforeSize) * 100).toFixed(0);
    console.log(`✅ ${file} → ${outputName}  (${(beforeSize / 1024).toFixed(0)}KB → ${(afterSize / 1024).toFixed(0)}KB, -${saved}%)`);
  }

  console.log(`\n🎉 Done! ${files.length} images optimized.`);
  console.log(`   Before: ${(totalBefore / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   After:  ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   Saved:  ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%`);
}

optimizeGallery().catch(console.error);