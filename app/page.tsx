import Link from 'next/link';
import { getAllCats } from '@/lib/trello';

export default async function HomePage() {
  const { all } = await getAllCats();
  const featuredCats = all.slice(0, 3); // Show first 3 cats

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section 
        className="relative bg-cover bg-center py-20 px-4"
        style={{ backgroundImage: 'url(/salomon-bg.jpg)' }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Nine Lives Paris
          </h1>
          <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 drop-shadow">
            L'association Nine Lives Paris recueille les chats abandonnés, trouvés, errants, sortis de fourrière.
          </p>
          <p className="text-lg text-white leading-relaxed mb-12 drop-shadow">
            Nous les soignons, les vaccinons, les stérilisons et les identifions avant de leur rechercher une famille d'adoption qui correspondra à leurs besoins et saura les rendre heureux.
          </p>
          
          {/* YouTube Video */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg shadow-2xl"
                src="https://www.youtube.com/embed/rUAdt696qpI"
                title="Nine Lives Paris"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.facebook.com/NineLivesParis/" target="_blank" rel="noopener noreferrer" 
               className="text-white hover:text-blue-400 text-4xl transition drop-shadow">
              📘
            </a>
            <a href="https://www.instagram.com/ninelivesparis" target="_blank" rel="noopener noreferrer"
               className="text-white hover:text-pink-400 text-4xl transition drop-shadow">
              📷
            </a>
            <a href="https://www.youtube.com/channel/UCM5TNRKUzUebUnw4OwLfZKA" target="_blank" rel="noopener noreferrer"
               className="text-white hover:text-red-400 text-4xl transition drop-shadow">
              📺
            </a>
            <a href="mailto:asso@ninelives.fr"
               className="text-white hover:text-gray-300 text-4xl transition drop-shadow">
              ✉️
            </a>
          </div>

          <div className="bg-white bg-opacity-90 border-l-4 border-blue-600 p-6 rounded backdrop-blur">
            <p className="text-lg text-gray-800">
              Pour remplir cette mission, nous pouvons compter sur le soutien de nos familles d'accueil, qui ouvrent les portes de leurs foyers à ces animaux en attente d'adoption, qui leur offrent leur amour... même si ce n'est que pour quelques semaines.
            </p>
            <p className="mt-4">
              <Link href="/benevole" className="text-blue-600 font-bold hover:text-blue-700 underline">
                Rejoignez-nous !
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Adoption Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">À l'adoption</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredCats.map(cat => (
              <Link key={cat.id} href={`/adopter/${cat.slug}`} 
                    className="group border rounded-lg overflow-hidden hover:shadow-xl transition">
                <div className="aspect-square bg-gray-200 flex items-center justify-center text-6xl">
                  🐱
                </div>
                <div className="p-4">
                  <h3 className="text-2xl font-bold group-hover:text-blue-600 transition">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/adopter" 
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition">
              Voir tous nos chats à l'adoption →
            </Link>
          </div>
        </div>
      </section>

      {/* Facebook CTA */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Suivez nos actualités</h2>
          <a href="https://www.facebook.com/NineLivesParis/" 
             target="_blank" 
             rel="noopener noreferrer"
             className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition">
            Retrouvez-nous sur Facebook →
          </a>
        </div>
      </section>
    </div>
  );
}