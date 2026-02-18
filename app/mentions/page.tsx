import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales du site ninelives.fr — Association Nine Lives Paris, loi 1901, RNA W751248523.',
};
export default function MentionsLegalesPage() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Mentions légales</h1>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <h2>Éditeur du site</h2>
          <p className="text-body">
            Association Nine Lives Paris<br />
            Association loi 1901 — RNA W751248523<br />
            Siège social : 133 rue du Faubourg du Temple, 75010 Paris<br />
            E-mail : <a href="mailto:asso@ninelives.fr" className="link-purple">asso@ninelives.fr</a>
          </p>

          <h2>Directeur de la publication</h2>
          <p className="text-body">
            Le président de l&apos;association Nine Lives Paris.
          </p>

          <h2>Hébergement</h2>
          <p className="text-body">
            Vercel Inc.<br />
            440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="link-purple">vercel.com</a>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p className="text-body">
            L&apos;ensemble du contenu de ce site est la propriété de l&apos;association Nine Lives Paris ou de ses auteurs respectifs, et est protégé par le droit de la propriété intellectuelle. Toute reproduction, même partielle, est soumise à autorisation préalable.
          </p>

          <h2>Données personnelles</h2>
          <p className="text-body">
            Consultez notre <a href="/politique-de-confidentialite" className="link-purple">politique de confidentialité</a>.
          </p>

          <h2>Crédits</h2>
          <p className="text-body">
            Photos : bénévoles et familles d&apos;accueil de l&apos;association Nine Lives Paris.
          </p>
        </div>
      </section>
    </main>
  );
}