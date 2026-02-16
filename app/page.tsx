import Link from 'next/link';
import { getAllCats } from '@/lib/trello';

export default async function HomePage() {
  const { all } = await getAllCats();
  const featuredCats = all.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <section 
        className="relative bg-cover bg-center py-32 px-4"
        style={{ backgroundImage: 'url(/salomon-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Nine Lives Paris
          </h1>
          <p className="text-xl md:text-2xl text-white leading-relaxed mb-6 font-medium">
            L'association Nine Lives Paris recueille les chats abandonnés, trouvés, errants, sortis de fourrière.
          </p>
          <p className="text-lg md:text-xl text-white leading-relaxed mb-12">
            Nous les soignons, les vaccinons, les stérilisons et les identifions avant de leur rechercher une famille d'adoption qui correspondra à leurs besoins et saura les rendre heureux.
          </p>
          
          {/* YouTube Video */}
          <div className="max-w-3xl mx-auto mb-12 shadow-2xl rounded-lg overflow-hidden">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/rUAdt696qpI"
                title="Nine Lives Paris"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-8 mb-12">
            <a href="https://www.facebook.com/NineLivesParis/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-white hover:text-blue-400 text-5xl transition transform hover:scale-110"
               aria-label="Facebook">
              📘
            </a>
            <a href="https://www.instagram.com/ninelivesparis" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-white hover:text-pink-400 text-5xl transition transform hover:scale-110"
               aria-label="Instagram">
              📷
            </a>
            <a href="https://www.youtube.com/channel/UCM5TNRKUzUebUnw4OwLfZKA" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-white hover:text-red-400 text-5xl transition transform hover:scale-110"
               aria-label="YouTube">
              📺
            </a>
            <a href="mailto:asso@ninelives.fr"
               className="text-white hover:text-gray-300 text-5xl transition transform hover:scale-110"
               aria-label="Email">
              ✉️
            </a>
          </div>

          {/* CTA Box */}
          <div className="bg-white/95 backdrop-blur-sm border-l-4 border-blue-600 p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              Pour remplir cette mission, nous pouvons compter sur le soutien de nos familles d'accueil, qui ouvrent les portes de leurs foyers à ces animaux en attente d'adoption, qui leur offrent leur amour... même si ce n'est que pour quelques semaines.
            </p>
            <Link href="/benevole" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition text-lg">
              Rejoignez-nous !
            </Link>
          </div>
        </div>
      </section>

      {/* Adoption Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">À l'adoption</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredCats.map(cat => (
              <Link key={cat.id} href={`/adopter/${cat.slug}`} 
                    className="group border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl hover:border-blue-400 transition-all bg-white">
                {cat.images[0] ? (
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img 
                      src={cat.images[0]} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
                    🐱
                  </div>
                )}
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/adopter" 
                  className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
              Voir tous nos chats à l'adoption →
            </Link>
          </div>
        </div>
      </section>

      {/* Facebook CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Suivez nos actualités</h2>
          <a href="https://www.facebook.com/NineLivesParis/" 
             target="_blank" 
             rel="noopener noreferrer"
             className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
            Retrouvez-nous sur Facebook →
          </a>
        </div>
      </section>
    </div>
  );
}