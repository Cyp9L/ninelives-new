import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import InfiniteGallery from '@/components/InfiniteGallery';

export const revalidate = 300;

export const metadata = {
  title: 'Galerie photos | Nine Lives Paris',
  description: 'Nos plus belles photos de chats et chatons recueillis par l\'association Nine Lives Paris.',
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GaleriePage() {
  const dir = path.join(process.cwd(), 'public/images/gallery');
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
    : [];

  const imagesWithDimensions = files.map(file => {
    const filePath = path.join(dir, file);
    const buffer = fs.readFileSync(filePath);
    const dimensions = sizeOf(new Uint8Array(buffer));
    return {
      file,
      width: dimensions.width || 800,
      height: dimensions.height || 600,
    };
  });

  const images = shuffle(imagesWithDimensions);

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