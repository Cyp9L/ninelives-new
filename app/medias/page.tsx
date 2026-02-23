import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nos apparitions médias',
  description:
    'Retrouvez les apparitions de Nine Lives Paris dans la presse et les médias : Matou Chat, Wamiz, MiaouMag, J\'aime trop chat et plus.',
};

type MediaItem = {
  image: string;
  alt: string;
  caption: string;
  sub: string;
  link?: string;
  /** If true, the whole card links externally and lightbox is disabled */
  externalCard?: boolean;
};

const mediaItems: MediaItem[] = [
    {
    image: '/images/medias/matouchat32-cover.webp',
    alt: 'Couverture Matou Chat n° 32',
    caption: 'Matou Chat n° 32',
    sub: 'Octobre-novembre 2019',
  },
  {
    image: '/images/medias/matouchat32-article.webp',
    alt: 'Article Matou Chat n° 32',
    caption: 'Matou Chat n° 32',
    sub: 'Octobre-novembre 2019',
  },
  {
    image: '/images/medias/wamiz.webp',
    alt: 'Article Wamiz sur Nine Lives Paris',
    caption: 'Wamiz',
    sub: 'L\'histoire de Mango',
    link: 'https://web.archive.org/web/20231128232101/https://wamiz.com/chats/actu/donne-chat-contre-bons-soins-triste-histoire-mango-reflechir-monde-18386.html',
  },
  {
    image: '/images/site/leparisien.webp',
    alt: 'Le Parisien — 18/09/2022',
    caption: 'Le Parisien',
    sub: '18/09/2022',
    link: 'https://www.leparisien.fr/paris-75/paris-a-lhopital-de-la-pitie-salpetriere-on-soigne-aussi-les-chats-errants-18-09-2022-ENLW4MSQEVFJPPF7RY2UJ7LTAE.php',
    externalCard: true,
  },
  {
    image: '/images/site/lepoint.webp',
    alt: 'Le Point — 11/12/2022',
    caption: 'Le Point',
    sub: '11/12/2022',
    link: 'https://www.lepoint.fr/societe/les-chats-vont-ils-envahir-la-planete-11-12-2022-2501309_23.php',
    externalCard: true,
  },
];

const legacyMediaItems: MediaItem[] = [
  {
    image: '/images/medias/matouchat31.webp',
    alt: 'Couverture Matou Chat n° 31',
    caption: 'Matou Chat n° 31',
    sub: 'Août-septembre 2019',
  },
  {
    image: '/images/medias/miaoumag.webp',
    alt: 'Article MiaouMag avril 2019',
    caption: 'MiaouMag',
    sub: 'Avril 2019',
  },
  {
    image: '/images/medias/jaimetropchat.webp',
    alt: 'Article J\'aime trop chat',
    caption: 'Blog J\'aime trop chat',
    sub: 'Association de protection féline',
    link: 'https://www.jaimetropchat.fr/association-de-protection-feline-adopt-for-life-abandon-chat/',
    externalCard: true,
  },
];

function MediaCard({ item }: { item: MediaItem }) {
  const imageBlock = (
    <div style={{ borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
      <Image
        src={item.image}
        alt={item.alt}
        width={400}
        height={360}
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
    </div>
  );

  // External card: whole thing is a link, no lightbox
  if (item.externalCard && item.link) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <div className="card card-centered" data-no-lightbox>
          {imageBlock}
          <h3>{item.caption}</h3>
          <p className="text-small">{item.sub}</p>
          <p className="text-small" style={{ marginTop: '0.5rem' }}>
            <span className="link-purple">Lire l&apos;article →</span>
          </p>
        </div>
      </a>
    );
  }

  // Default: lightbox enabled, optional separate link
  return (
    <div className="card card-centered">
      {imageBlock}
      <h3>{item.caption}</h3>
      <p className="text-small">{item.sub}</p>
      {item.link && (
        <p className="text-small" style={{ marginTop: '0.5rem' }}>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="link-purple">
            Lire l&apos;article →
          </a>
        </p>
      )}
    </div>
  );
}

export default function MediasPage() {
  return (
    <main id="main-content">
      {/* Header */}
      {/* Header */}
      <section className="page-header">
        <h1>Nos apparitions dans les médias</h1>
        <p>Nine Lives Paris dans la presse et sur le web</p>
      </section>

      {/* Nine Lives Paris section */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {mediaItems.map((item) => (
              <MediaCard key={item.image} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Legacy section */}
      <section className="section section-gray">
        <div className="container">
          <p className="text-center text-muted mb-lg">
            Sous notre ancien nom <strong>Adopt&apos; for life</strong>
          </p>
          <div className="grid-3">
            {legacyMediaItems.map((item) => (
              <MediaCard key={item.image} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );

}

