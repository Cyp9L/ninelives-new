import { notFound } from 'next/navigation';
import AdoptionForm from '@/components/AdoptionForm';

async function getCats() {
  const res = await fetch(
    `https://api.trello.com/1/boards/${process.env.TRELLO_BOARD_ID}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}&fields=name,desc,labels,attachments&attachments=cover`,
    { next: { revalidate: 60 } }
  );
  
  if (!res.ok) throw new Error('Failed to fetch cats');
  
  const cards = await res.json();
  
  return cards.map((card: any) => ({
    id: card.id,
    name: card.name,
    slug: card.name.toLowerCase().replace(/\s+/g, '-').replace(/[éè]/g, 'e').replace(/[àâ]/g, 'a'),
    description: card.desc,
    image: card.attachments?.[0]?.url || '/images/default-cat.jpg',
    labels: card.labels?.map((label: any) => label.name) || [],
  }));
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const cats = await getCats();
  return cats.map((cat: any) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cats = await getCats();
  const cat = cats.find((c : any) => c.slug === params.slug);
  
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

export default async function AdopterChatPage({ params }: { params: { slug: string } }) {
  const cats = await getCats();
  const cat = cats.find((c : any) => c.slug === params.slug);
  
  if (!cat) {
    notFound();
  }

  return (
    <main>
      {/* Hero with cat image */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${cat.image}) center/cover`,
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
          {cat.labels.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {cat.labels.map((label: string) => (
                <span
                  key={label}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
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
              <AdoptionForm catName={cat.name} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
