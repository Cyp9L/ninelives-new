import { getCatBySlug, getAllCats } from '@/lib/trello';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { all } = await getAllCats();
  return all.map(cat => ({
    slug: cat.slug
  }));
}

export default async function CatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);

  if (!cat) {
    notFound();
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link href="/adopter" className="link-blue" style={{ display: 'inline-block', marginBottom: '2rem' }}>
          ← Retour aux adoptions
        </Link>

        <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '2rem' }}>
          {cat.name}
        </h1>
        
        {/* Images */}
        {cat.images.length > 0 && (
          <div className="grid-2" style={{ marginBottom: '3rem', gap: '1rem' }}>
            {cat.images.map((img, i) => (
              <div key={i} style={{ aspectRatio: '1', background: '#f3f4f6', overflow: 'hidden', borderRadius: '4px' }}>
                <img
                  src={img}
                  alt={`${cat.name} photo ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div style={{ marginBottom: '3rem', fontSize: '1.125rem', lineHeight: '1.8' }}>
          <div dangerouslySetInnerHTML={{
            __html: cat.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
          }} />
        </div>

        {/* CTA */}
        <div style={{ 
          background: '#f0f9ff', 
          border: '1px solid #bfdbfe', 
          borderRadius: '8px', 
          padding: '2rem' 
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '300', marginBottom: '1rem' }}>
            Adopter {cat.name}
          </h2>
          <p className="text-large" style={{ marginBottom: '1.5rem' }}>
            Intéressé(e) par {cat.name} ? Contactez-nous pour en savoir plus.
          </p>
          <Link href={`/adopter#formulaire?cat=${encodeURIComponent(cat.name)}`} className="btn btn-primary">
            Nous contacter →
          </Link>
        </div>
      </div>
    </main>
  );
}