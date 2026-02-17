import { notFound } from 'next/navigation';
import AdoptionForm from '@/components/AdoptionForm';
import { getAllCats, getCatBySlug } from '@/lib/trello';

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
  const { all: cats } = await getAllCats();
  
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

      {/* Cat details and form */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            {/* Left: Description */}
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#1f2937' }}>
                À propos de {cat.name}
              </h2>
              <div style={{ 
                fontSize: '1.125rem', 
                lineHeight: '1.8', 
                color: '#4b5563',
                whiteSpace: 'pre-wrap'
              }}>
                {cat.description || `${cat.name} est à la recherche d'une famille aimante.`}
              </div>
            </div>

            {/* Right: Adoption form */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1f2937' }}>
                Adopter {cat.name}
              </h3>
              <AdoptionForm cats={cats} preselectedCat={cat.name} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
