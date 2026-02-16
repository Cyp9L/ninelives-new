import { getAllCats } from '@/lib/trello';
import Link from 'next/link';

export const revalidate = 600; // Rebuild every 10 minutes

export default async function AdopterPage() {
  const { adultes, chatons } = await getAllCats();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Adopter un chat</h1>
      
      {/* Adultes Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Nos chats à l'adoption</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {adultes.map(cat => (
            <Link key={cat.id} href={`/adopter/${cat.slug}`} 
                  className="group border rounded-lg overflow-hidden hover:shadow-xl transition">
              {cat.images[0] ? (
                <div className="aspect-square bg-gray-200 relative">
                  <img src={cat.images[0]} alt={cat.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-square bg-gray-200 flex items-center justify-center text-6xl">
                  🐱
                </div>
              )}
              <div className="p-4">
                <h3 className="text-2xl font-bold group-hover:text-blue-600 transition">
                  {cat.name}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {adultes.length === 0 && (
          <p className="text-gray-600 text-center py-8">Aucun chat disponible pour le moment.</p>
        )}
      </section>
    </div>
  );
}