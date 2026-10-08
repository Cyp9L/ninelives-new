import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

/** Every .ts/.tsx file of the site (pages, components, helpers). */
function sourceFiles(dir: string): string[] {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(rel);
    return /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [rel] : [];
  });
}

const files = ['app', 'components', 'lib'].flatMap(sourceFiles);

describe('images written in the code', () => {
  // Paths like "/images/site/hero.webp" or "/images/gallery/photo.webp" typed directly in a page.
  const references = files.flatMap((file) => {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    return [...text.matchAll(/["'`](\/images\/[^"'`$\s]+\.(?:webp|jpe?g|png|svg|avif|gif))["'`]/g)]
      .map((match) => ({ file, image: match[1] }));
  });

  it('finds some image paths to check', () => {
    expect(references.length).toBeGreaterThan(10);
  });

  // This is the check that would have caught the 4 broken .jpg photos after the WebP conversion.
  it.each(references)('$image (used in $file) exists in public/', ({ image }) => {
    expect(fs.existsSync(path.join(root, 'public', image))).toBe(true);
  });
});

describe('page titles', () => {
  // The layout already adds " | Nine Lives Paris" to every page title (title.template in app/layout.tsx).
  const titles = files.flatMap((file) => {
    if (file === path.join('app', 'layout.tsx')) return [];
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    const metadata = text.match(/export const metadata[\s\S]*?\n};/)?.[0] ?? '';
    const title = metadata.match(/^\s{2}title:\s*(['"`])(.*?)\1/m)?.[2];
    return title ? [{ file, title }] : [];
  });

  it('finds the page titles to check', () => {
    expect(titles.length).toBeGreaterThan(5);
  });

  const duplicated = titles.filter(({ title }) => title.includes('Nine Lives Paris'));

  // Known bug, fixed on Manon's title branch (not merged yet). When it is merged,
  // this test starts failing: change "it.fails" to "it" so it guards against new duplicates.
  it.fails('do not repeat "Nine Lives Paris", which the layout already adds', () => {
    expect(duplicated).toEqual([]);
  });
});
