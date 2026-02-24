import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { getAllCats } from '@/lib/trello';
import CatMarquee from '@/components/CatMarquee';

export default async function HomePage() {
  const { all } = await getAllCats();
  const featuredCats = all.slice(0, 3);

  // Read gallery images and pick a random subset
  const galleryDir = path.join(process.cwd(), 'public/images/gallery');
  const galleryImages = fs.readdirSync(galleryDir)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort(() => Math.random() - 0.5)
    .slice(0, 20)
    .map(file => `/images/gallery/${file}`);

  return (
    <main id="main-content">
      {/* Hero */}
<section className="hero" style={{ backgroundImage: 'url(/images/site/salomon-bg.jpg)', backgroundPosition: 'center 30%' }}>
  <div className="container">
    <div className="hero-content">
      <h1>Nine Lives Paris</h1>
      <p>Nous sauvons, soignons et trouvons des familles aimantes aux chats abandonnés de Paris.</p>
      <Link href="/adopter" className="btn btn-gradient btn-lg">
        Adopter un chat
      </Link>
      <p className="text-small" style={{ marginTop: '0.75rem', opacity: 0.85 }}>
        Adoption à Paris et petite couronne.
      </p>
    </div>
  </div>
</section>

      {/* About */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2>Notre mission</h2>
              <p className="text-large mb-md">
              Depuis 2018, l&apos;association Nine Lives Paris recueille les chats abandonnés, trouvés, errants, sortis de fourrière.
              </p>
              <p className="text-large">
                Nous les soignons et les préparons à une nouvelle vie avant de leur trouver une famille d&apos;adoption.
              </p>
            </div>
            <div>
              <h2>Rejoignez-nous</h2>
              <p className="text-large mb-lg">
                Nos familles d&apos;accueil ouvrent leurs foyers à ces animaux en attente d&apos;adoption, leur offrant amour et sécurité.
              </p>
              <Link href="/benevole" className="link-blue">
                Devenir famille d&apos;accueil →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cats */}
      <section className="section">
        <div className="container">
          <h2 className="text-center">À l&apos;adoption</h2>

          <div className="grid-3 mb-xl">
            {featuredCats.map(cat => (
              <Link key={cat.id} href={`/adopter/${cat.slug}`} data-no-lightbox className="cat-card">
                <div className="cat-image">
                  {cat.images[0] ? (
                    <img src={cat.images[0]} alt="" />
                  ) : (
                    <div className="cat-placeholder">🐱</div>
                  )}
                </div>
                <h3 className="cat-name">{cat.name}</h3>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/adopter" className="btn btn-lg btn-outline">
              Voir tous nos chats
            </Link>
          </div>
        </div>
      </section>

      {/* Adopted cats marquee */}
      <section className="section section-gray">
        <div className="container text-center">
          <h2>Ils ont trouvé une famille 🏠</h2>
          <p className="text-large mb-lg">
            Chaque année, des dizaines de chats trouvent un foyer grâce à nos bénévoles et familles d&apos;accueil.
          </p>
        </div>
        <CatMarquee images={galleryImages} />
      </section>

      {/* Social */}
      <section className="section">
        <div className="container text-center">
          <h2>Suivez-nous</h2>
          <div className="social-links">
            <a href="https://www.facebook.com/NineLivesParis/" target="_blank" rel="noopener">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="social-facebook">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/ninelivesparis" target="_blank" rel="noopener">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="social-instagram">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UCM5TNRKUzUebUnw4OwLfZKA" target="_blank" rel="noopener">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="social-youtube">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="mailto:asso@ninelives.fr">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="social-email">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}