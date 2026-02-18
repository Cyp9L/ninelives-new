'use client';
import { useState } from 'react';

export default function CatGallery({ images, name }: { images: string[], name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="gallery-main">
        <img src={images[activeIndex]} alt={`${name} - photo ${activeIndex + 1}`} />
      </div>

      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`gallery-thumb ${index === activeIndex ? 'active' : ''}`}
              data-no-lightbox
            >
              <img src={img} alt={`${name} - miniature ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}