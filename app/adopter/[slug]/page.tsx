import { notFound } from 'next/navigation';
import { getAllCats, getCatBySlug } from '@/lib/trello';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import CatGallery from '@/components/CatGallery';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { all } = await getAllCats();
  return all.map((cat: any) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);

  if (!cat) return { title: 'Chat non trouvé | Nine Lives Paris' };

  return {
    title: `Adopter ${cat.name} | Nine Lives Paris`,
    description: cat.description?.substring(0, 160) || `Adoptez ${cat.name}, un chat à la recherche d'une famille aimante.`,
  };
}

export default async function AdopterChatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);

  if (!cat) notFound();

  const mainImage = cat.images?.[0] || '/images/default-cat.jpg';

  return (
    <main>
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
            {/* Gallery floats right */}
            <div className="cat-detail-gallery">
              <CatGallery images={cat.images} name={cat.name} />
            </div>

            {/* Text wraps around */}
            <h2 className="section-title">À propos de {cat.name}</h2>
            <div className="cat-description">
              <ReactMarkdown>
                {cat.description || `${cat.name} est à la recherche d'une famille aimante.`}
              </ReactMarkdown>
            </div>

            {/* Clear float before CTA */}
            <div style={{ clear: 'both' }} />
          </div>

          {/* CTA */}
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