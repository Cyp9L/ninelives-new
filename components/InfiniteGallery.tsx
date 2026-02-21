'use client';
import { useState, useEffect, useRef } from 'react';

const BATCH = 20;

type GalleryImage = {
  file: string;
  width: number;
  height: number;
};

export default function InfiniteGallery({ images }: { images: GalleryImage[] }) {
  const [count, setCount] = useState(BATCH);
  const loaderRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div
            className="masonry-grid"
            onContextMenu={(e) => e.preventDefault()}
          >
        {visible.map((img) => (
          <div key={img.file} className="masonry-item">
            <img
              src={`/_next/image?url=${encodeURIComponent(`/images/gallery/${img.file}`)}&w=640&q=75`}
              alt="Chat recueilli par Nine Lives Paris"
              loading="lazy"
              width={img.width}
              height={img.height}
            />
          </div>
        ))}
      </div>
      {count < images.length && (
        <div ref={loaderRef} className="text-center text-muted" style={{ padding: '2rem 0' }}>
          Chargement…
        </div>
      )}
    </>
  );
}