import { notFound } from 'next/navigation';
import { getAllCats, getCatBySlug } from '@/lib/trello';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { all } = await getAllCats();
  return all.map((cat: any) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);
  
  if (!cat) {
    return {
      title: 'Chat non trouvé | Nine Lives Paris',
    };
  }

  return {
    title: `Adopter ${cat.name} | Nine Lives Paris`,
    description: cat.description.substring(0, 160) || `Adoptez ${cat.name}, un chat à la recherche d'une famille aimante.`,
  };
}

export default async function AdopterChatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);
  
  if (!cat) {
    notFound();
  }

  const mainImage = cat.images && cat.images.length > 0 ? cat.images[0] : '/images/default-cat.jpg';

  return (
    <main>
      {/* Hero with cat image */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${mainImage}) center/cover`,
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '300', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {cat.name}
          </h1>
        </div>
      </section>

      {/* Photo gallery */}
      {cat.images && cat.images.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>
              Photos
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {cat.images.map((img: string, index: number) => (
                <div key={index} style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  aspectRatio: '1',
                  background: '#f3f4f6'
                }}>
                  <img 
                    src={img} 
                    alt={`${cat.name} - photo ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cat description */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#1f2937' }}>
            À propos de {cat.name}
          </h2>
          <div 
            style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.8', 
              color: '#4b5563' 
            }}
          >
            <ReactMarkdown>
              {cat.description || `${cat.name} est à la recherche d'une famille aimante.`}
            </ReactMarkdown>
          </div>
          {/* Adoption CTA */}
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link 
              href={`/adopter?cat=${encodeURIComponent(cat.name)}#formulaire`}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                fontSize: '1.25rem',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              Je veux adopter {cat.name}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
