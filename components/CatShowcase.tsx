'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Cat {
  id: string;
  slug: string;
  name: string;
  images: string[];
  category: string;
  caractere: string;
}

const categories = [
  { key: 'all', label: 'Tous' },
  { key: 'chaton', label: 'Chatons' },
  { key: 'adulte', label: 'Adultes' },
  { key: 'senior', label: 'Seniors' },
];

export default function CatShowcase({ cats }: { cats: Cat[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const filteredCats = useMemo(() => {
    if (activeCategory === 'all') return cats;
    return cats.filter(cat => cat.category === activeCategory);
  }, [cats, activeCategory]);

  const counts = useMemo(() => ({
    all: cats.length,
    chaton: cats.filter(c => c.category === 'chaton').length,
    adulte: cats.filter(c => c.category === 'adulte').length,
    senior: cats.filter(c => c.category === 'senior').length,
  }), [cats]);

  // Reset index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbsRef.current) {
      const activeThumb = thumbsRef.current.children[activeIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex]);

  // No cats at all
  if (cats.length === 0) {
    return (
        <div className="alert alert-info" style={{ textAlign: 'center' }}>
          <p>😿 Aucun chat à l&apos;adoption pour le moment.</p>
          <p>
            Suivez-nous sur{' '}
            <a href="https://www.instagram.com/ninelivesparis/" target="_blank" rel="noopener noreferrer" className="link-purple">
              Instagram
            </a>
            {' '}pour être informé des prochaines arrivées !
          </p>
        </div>
      );
  }

  const activeCat = filteredCats[activeIndex];

  const prev = () =>
    setActiveIndex((activeIndex - 1 + filteredCats.length) % filteredCats.length);
  const next = () =>
    setActiveIndex((activeIndex + 1) % filteredCats.length);

  return (
    <div className="cat-showcase">
      {/* Filter tabs */}
      <div className="showcase-tabs">
        {categories.map(cat => (
          counts[cat.key as keyof typeof counts] > 0 && (
            <button
              key={cat.key}
              className={`showcase-tab ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label} ({counts[cat.key as keyof typeof counts]})
            </button>
          )
        ))}
      </div>

      {/* Empty state for filtered category */}
      {filteredCats.length === 0 && (
        <div className="alert alert-info" style={{ textAlign: 'center' }}>
          <p>😿 Aucun chat dans cette catégorie pour le moment.</p>
          <p>
            Suivez-nous sur{' '}
            <a href="https://www.instagram.com/ninelivesparis/" target="_blank" rel="noopener noreferrer" className="link-purple">
              Instagram
            </a>
            {' '}pour être informé des prochaines arrivées !
          </p>
        </div>
      )}

      {/* Main image + arrows */}
      {activeCat && (
        <>
          <div className="showcase-main">
            {filteredCats.length > 1 && (
              <button className="showcase-arrow showcase-arrow-left" onClick={prev} aria-label="Chat précédent">
                ‹
              </button>
            )}
            <Link href={`/adopter/${activeCat.slug}`} className="showcase-image" data-no-lightbox>
              <img src={activeCat.images[0]} alt={activeCat.name} />
            </Link>
            {filteredCats.length > 1 && (
              <button className="showcase-arrow showcase-arrow-right" onClick={next} aria-label="Chat suivant">
                ›
              </button>
            )}
          </div>

          {/* Info */}
          <div className="showcase-info">
            <h2>{activeCat.name}</h2>
            {activeCat.caractere && <p className="showcase-caractere">{activeCat.caractere}</p>}
            <Link href={`/adopter/${activeCat.slug}`} className="btn btn-gradient">
              Voir son profil →
            </Link>
          </div>
        </>
      )}

      {/* Thumbnails */}
      {filteredCats.length > 1 && (
        <div className="showcase-thumbs" ref={thumbsRef}>
          {filteredCats.map((cat, index) => (
            <button
              key={cat.id}
              className={`showcase-thumb ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              data-no-lightbox
            >
              <img src={cat.images[0]} alt={cat.name} />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}