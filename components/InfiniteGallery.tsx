'use client';
import { useState, useEffect, useRef, useMemo } from 'react';

const BATCH = 20;

type GalleryImage = {
  file: string;
  width: number;
  height: number;
};

function useColumns() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 768) setCols(1);
      else if (window.innerWidth <= 1024) setCols(2);
      else setCols(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
}

function openLightbox(src: string, alt: string) {
  window.dispatchEvent(
    new CustomEvent('open-lightbox', { detail: { src, alt } })
  );
}

export default function InfiniteGallery({ images }: { images: GalleryImage[] }) {
  const [count, setCount] = useState(BATCH);
  const loaderRef = useRef<HTMLDivElement>(null);
  const cols = useColumns();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(c => Math.min(c + BATCH, images.length));
        }
      },
      { rootMargin: '600px' }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [images.length]);

  const visible = images.slice(0, count);

  const columns = useMemo(() => {
    const result: GalleryImage[][] = Array.from({ length: cols }, () => []);
    const heights = new Array(cols).fill(0);

    for (const img of visible) {
      const shortest = heights.indexOf(Math.min(...heights));
      result[shortest].push(img);
      heights[shortest] += img.height / img.width;
    }

    return result;
  }, [visible, cols]);

  return (
    <>
      <div className="masonry-grid" onContextMenu={(e) => e.preventDefault()}>
        {columns.map((col, i) => (
          <div key={i} className="masonry-column">
            {col.map((img) => (
              <div key={img.file} className="masonry-item">
                <img
                  src={`/images/gallery/${img.file}`}
                  alt="Chat recueilli par Nine Lives Paris"
                  loading="lazy"
                  width={img.width}
                  height={img.height}
                  onClick={() => openLightbox(
                    `/images/gallery/${img.file}`,
                    'Chat recueilli par Nine Lives Paris'
                  )}
                  style={{ cursor: 'zoom-in' }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {count < images.length && (
        <div ref={loaderRef} className="text-center text-muted" style={{ padding: '2rem 0' }}>
          Chargement…
        </div>
      )}
      <p className="text-small text-muted text-center" style={{ marginTop: '2rem' }}>
        © {new Date().getFullYear()} Nine Lives Paris — Toutes les photos sont la propriété de l&apos;association. Reproduction interdite.
      </p>
    </>
  );
}