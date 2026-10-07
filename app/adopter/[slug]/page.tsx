import { notFound } from 'next/navigation';
import { getAllCats, getCatBySlug, type Cat } from '@/lib/trello';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import CatGallery from '@/components/CatGallery';
import HeroLcp from '@/components/HeroLcp';
import type { Metadata } from 'next';

export const revalidate = 900;
export const dynamicParams = true;

/** Strip markdown formatting for use in meta descriptions */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s?/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Extract a named field from the Trello description template */
function extractField(desc: string, fieldName: string): string {
  const pattern = new RegExp(`\\*\\*${fieldName}\\s*:?\\s*\\*\\*\\s*:?\\s*(.+?)(?:\\n|$)`, 'i');
  const match = desc.match(pattern);
  return match ? match[1].replace(/\*+/g, '').trim() : '';
}

export async function generateStaticParams() {
  const { all } = await getAllCats();
  return all.map((cat: Cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);

  if (!cat) return { title: 'Chat non trouvé' };

  const cleanDescription = cat.description
    ? stripMarkdown(cat.description).substring(0, 160)
    : `Adoptez ${cat.name}, un chat à la recherche d'une famille aimante.`;

  const catImage = cat.images?.[0];

  return {
    title: `Adopter ${cat.name}`,
    description: cleanDescription,
    openGraph: {
      siteName: 'Nine Lives Paris',
      title: `Adopter ${cat.name} | Nine Lives Paris`,
      description: cleanDescription,
      type: 'article',
      url: `/adopter/${slug}`,
      ...(catImage && {
        images: [
          {
            url: catImage,
            width: 1200,
            height: 630,
            alt: `Photo de ${cat.name}`,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `Adopter ${cat.name} | Nine Lives Paris`,
      description: cleanDescription,
      ...(catImage && { images: [catImage] }),
    },
  };
}

export default async function AdopterChatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);

  if (!cat) notFound();

  const mainImage = cat.images?.[0] || '/images/site/cat-not-found.jpg';

  const cleanDescription = cat.description
    ? stripMarkdown(cat.description).substring(0, 200)
    : `${cat.name} est à la recherche d'une famille aimante.`;

  const sex = extractField(cat.description, 'Sexe');
  const location = extractField(cat.description, 'Localisation');

  const absoluteImage = mainImage.startsWith('/')
    ? `https://ninelives.fr${mainImage}`
    : mainImage;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://ninelives.fr" },
        { "@type": "ListItem", position: 2, name: "Adopter", item: "https://ninelives.fr/adopter" },
        { "@type": "ListItem", position: 3, name: cat.name, item: `https://ninelives.fr/adopter/${slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      name: `Adopter ${cat.name} | Nine Lives Paris`,
      description: cleanDescription,
      url: `https://ninelives.fr/adopter/${slug}`,
      image: absoluteImage,
      dateModified: cat.dateAdded,
      publisher: {
        "@type": "Organization",
        name: "Nine Lives Paris",
        url: "https://ninelives.fr",
        logo: {
          "@type": "ImageObject",
          url: "https://ninelives.fr/images/site/logo-nine-lives-paris.svg",
        },
      },
      about: {
        "@type": "Thing",
        name: cat.name,
        description: cleanDescription,
        image: absoluteImage,
        ...(sex && { additionalProperty: { "@type": "PropertyValue", name: "Sexe", value: sex } }),
        ...(location && { locationCreated: { "@type": "Place", name: location } }),
      },
    },
  ];

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Hero */}
      <HeroLcp variant="cat" src={mainImage} alt={`Photo de ${cat.name}`}>
        <h1>{cat.name}</h1>
      </HeroLcp>

      {/* Description + Gallery */}
      <section className="section">
        <div className="container-narrow">
          <div className="cat-detail">
            <div className="cat-detail-gallery">
              <CatGallery images={cat.images} name={cat.name} />
            </div>

            <h2 className="section-title">À propos de {cat.name}</h2>
            <div className="cat-description">
              <ReactMarkdown>
                {cat.description || `${cat.name} est à la recherche d'une famille aimante.`}
              </ReactMarkdown>
            </div>

            <div style={{ clear: 'both' }} />
          </div>

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link
              href={`/adopter?cat=${encodeURIComponent(cat.name)}#formulaire`}
              className="btn btn-gradient btn-lg"
            >
              Je veux adopter {cat.name}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}