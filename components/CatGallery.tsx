'use client';
import { useState } from 'react';
import Image from 'next/image';

function openLightbox(src: string, alt: string) {
  window.dispatchEvent(
    new CustomEvent('open-lightbox', { detail: { src, alt } })
  );
}

export default function CatGallery({ images, name }: { images: string[], name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="gallery-main" onContextMenu={(e) => e.preventDefault()}>
        <Image
          src={images[activeIndex]}
          alt={`${name} - photo ${activeIndex + 1}`}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 600px"
          onClick={() => openLightbox(
            images[activeIndex],
            `${name} - photo ${activeIndex + 1}`
          )}
          style={{ cursor: 'zoom-in' }}
          priority
          unoptimized
        />
      </div>

      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`gallery-thumb ${index === activeIndex ? 'active' : ''}`}
            >
              <Image
                src={img}
                alt={`${name} - miniature ${index + 1}`}
                width={150}
                height={100}
                sizes="80px"
                loading="lazy"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}