import { getAllCats } from '@/lib/trello';
import Link from 'next/link';

export default async function AdopterPage() {
  const { adultes, chatons } = await getAllCats();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Adopter un chat</h1>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Nos Chatons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chatons.map(cat => (
            <Link key={cat.id} href={`/adopter/${cat.slug}`} className="border rounded-lg p-4 hover:shadow-lg transition">
              <h3 className="text-xl font-bold">{cat.name}</h3>
              <p className="text-gray-600 mt-2">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Nos Adultes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adultes.map(cat => (
            <Link key={cat.id} href={`/adopter/${cat.slug}`} className="border rounded-lg p-4 hover:shadow-lg transition">
              <h3 className="text-xl font-bold">{cat.name}</h3>
              <p className="text-gray-600 mt-2">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}