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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/adopter" className="text-blue-600 mb-4 inline-block">
        ← Retour aux adoptions
      </Link>

      <h1 className="text-4xl font-bold mb-6">{cat.name}</h1>
      
      <div className="prose max-w-none mb-8">
        <p className="text-lg">{cat.description}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-3">Adopter {cat.name}</h2>
        <p className="mb-4">Intéressé(e) par {cat.name} ? Contactez-nous.</p>
        <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-700">
          Nous contacter →
        </Link>
      </div>
    </div>
  );
}