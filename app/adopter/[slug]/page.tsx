import { notFound } from 'next/navigation';
import { getAllCats, getCatBySlug } from '@/lib/trello';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import CatGallery from '@/components/CatGallery';
import type { Metadata } from 'next';

export const revalidate = 60;
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

export async function generateStaticParams() {
  const { all } = await getAllCats();
  return all.map((cat: any) => ({ slug: cat.slug }));
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
      title: `Adopter ${cat.name} | Nine Lives Paris`,
      description: cleanDescription,
      type: 'article',
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

  const mainImage = cat.images?.[0] || '/images/default-cat.jpg';

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://ninelives.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Adopter",
        item: "https://ninelives.fr/adopter",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cat.name,
        item: `https://ninelives.fr/adopter/${slug}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Hero */}
      <section
        className="cat-hero"
        style={{ background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${mainImage}) center/cover` }}
      >
        <h1>{cat.name}</h1>
      </section>

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