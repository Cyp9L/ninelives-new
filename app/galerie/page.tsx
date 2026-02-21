import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import InfiniteGallery from '@/components/InfiniteGallery';
import type { Metadata } from 'next';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const dir = path.join(process.cwd(), 'public/images/gallery');
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
    : [];

  const firstImage = files.length > 0
    ? `/images/gallery/${files.sort().reverse()[0]}`
    : '/og-image.png';

  return {
    title: 'Galerie photos',
    description: 'Nos plus belles photos de chats et chatons recueillis par l\'association Nine Lives Paris.',
    openGraph: {
      title: 'Galerie photos | Nine Lives Paris',
      description: 'Nos plus belles photos de chats et chatons recueillis par Nine Lives Paris.',
      url: '/galerie',
      images: [{ url: firstImage, width: 1200, height: 630, alt: 'Galerie Nine Lives Paris' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Galerie photos | Nine Lives Paris',
      description: 'Nos plus belles photos de chats et chatons recueillis par Nine Lives Paris.',
      images: [firstImage],
    },
  };
}

export default function GaleriePage() {
  const dir = path.join(process.cwd(), 'public/images/gallery');
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
    : [];

  const images = files
    .map(file => {
      const buffer = fs.readFileSync(path.join(dir, file));
      const dimensions = sizeOf(new Uint8Array(buffer));
      return {
        file,
        width: dimensions.width || 800,
        height: dimensions.height || 600,
      };
    })
    .sort((a, b) => b.file.localeCompare(a.file));

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Galerie</h1>
          <p>Nos protégés en images 📸</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {images.length === 0 ? (
            <p className="text-center text-muted text-large">
              Pas encore de photos. Revenez bientôt ! 🐱
            </p>
          ) : (
            <InfiniteGallery images={images} />
          )}
        </div>
      </section>
    </main>
  );
}