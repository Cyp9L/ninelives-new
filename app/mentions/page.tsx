export const metadata = {
  title: 'Mentions légales | Nine Lives Paris',
};

export default function MentionsLegalesPage() {
  const h2Style = {
    fontSize: '1.5rem',
    fontWeight: '600' as const,
    color: '#1f2937',
    marginBottom: '1rem',
    marginTop: '2.5rem',
  };

  const pStyle = {
    fontSize: '1.05rem',
    lineHeight: '1.8',
    color: '#4b5563',
    marginBottom: '1rem',
  };

  return (
    <main>
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '300' }}>Mentions légales</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>

          <h2 style={h2Style}>Éditeur du site</h2>
          <p style={pStyle}>
            Association Nine Lives Paris<br />
            Association loi 1901 — RNA W751248523<br />
            Siège social : 133 rue du Faubourg du Temple, 75010 Paris<br />
            E-mail : <a href="mailto:asso@ninelives.fr" style={{ color: '#667eea', textDecoration: 'underline' }}>asso@ninelives.fr</a>
          </p>

          <h2 style={h2Style}>Directeur de la publication</h2>
          <p style={pStyle}>
            Le président de l&apos;association Nine Lives Paris.
          </p>

          <h2 style={h2Style}>Hébergement</h2>
          <p style={pStyle}>
            Vercel Inc.<br />
            440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>vercel.com</a>
          </p>

          <h2 style={h2Style}>Propriété intellectuelle</h2>
          <p style={pStyle}>
            L&apos;ensemble du contenu de ce site (textes, images, logos) est la propriété de l&apos;association Nine Lives Paris ou de ses auteurs respectifs, et est protégé par le droit de la propriété intellectuelle. Toute reproduction, même partielle, est soumise à autorisation préalable.
          </p>

          <h2 style={h2Style}>Données personnelles</h2>
          <p style={pStyle}>
            Pour toute information relative à la collecte et au traitement de vos données personnelles, consultez notre <a href="/politique-de-confidentialite" style={{ color: '#667eea', textDecoration: 'underline' }}>politique de confidentialité</a>.
          </p>

          <h2 style={h2Style}>Crédits</h2>
          <p style={pStyle}>
            Photos : bénévoles et familles d&apos;accueil de l&apos;association Nine Lives Paris.
          </p>

        </div>
      </section>
    </main>
  );
}
