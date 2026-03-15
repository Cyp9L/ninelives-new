'use client';
import { useState } from 'react';

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
        <img
          src={images[activeIndex]}
          alt={`${name} - photo ${activeIndex + 1}`}
          onClick={() => openLightbox(
            images[activeIndex],
            `${name} - photo ${activeIndex + 1}`
          )}
          style={{ cursor: 'zoom-in' }}
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
              <img src={img} alt={`${name} - miniature ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}