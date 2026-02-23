import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Faire un don',
  description:
    'Soutenez Nine Lives Paris par un don. Chaque euro contribue aux soins vétérinaires, à la stérilisation et au sauvetage de chats abandonnés à Paris.',
};

export default function DonnerPage() {
  return (
    <main id="main-content">
      {/* Header */}
      <section className="hero" role="img" aria-label="Chaton dans une main" style={{ backgroundImage: 'url(/images/site/29052021-IMG_5287.webp)', backgroundPosition: 'center 68%' }}>
        <div className="container">
          <div className="hero-content">
          <h1>Faire un don</h1>
        </div>
        </div>
      </section>

      {/* Financial Donation */}
      <section className="section">
        <div className="container-mid">
          <div className="float-img-right" style={{ width: '45%', borderRadius: '8px', overflow: 'hidden' }}>
            <img src="/images/site/wiskey.jpg" alt="Wiskey, un de nos protégés" />
          </div>
          <p className="text-large mb-md">
            <strong>💝 Sauver des vies a un coût.</strong>
          </p>

          <p className="text-body">
            Même un chat vacciné, qui a toujours vécu en appartement et qui semble en bonne santé, peut cacher des calculs rénaux, une insuffisance hépatique, une leucémie…
          </p>
          <p className="text-body">
            Sans parler des animaux sortis de fourrière ou des chatons trouvés dans la rue. Les soins d&apos;urgence, vaccins, identification, stérilisation, alimentation et litière font vite monter la facture.
          </p>
          <p className="text-body">
            Nous avons la bonne volonté, l&apos;expérience, une super équipe de bénévoles et de familles d&apos;accueil. <strong>Ce qu&apos;il nous manque, ce sont les fonds.</strong>
          </p>

          <div className="mb-lg">
            <a href="https://www.helloasso.com/associations/nine-lives-paris/formulaires/1/"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-gradient btn-lg">
              Faire un don financier
            </a>
          </div>

          <div style={{ clear: 'both' }} />

          <div className="alert alert-info">
            <strong>Vos dons sont déductibles des impôts à hauteur de 66%.</strong>
            <br/>Votre don de 100€ ne vous coûte que 34€ !
          </div>
        </div>
      </section>

      {/* Material Donation */}
      <section className="section section-gray">
        <div className="container-mid">
          <div className="float-img-left" >
            <img src="/images/site/salomon.webp" alt="Salomon, un de nos protégés" />
          </div>

          <p className="text-large mb-md">
            <strong>🎁 Nous avons sans cesse besoin de matériel.</strong>
          </p>

          <p className="text-body">
            Caisses de transport, bacs à litière, antiparasitaires, nourriture, litière, jouets, griffoirs… Souvent, vous avez chez vous des choses qui pourraient nous être très utiles.
          </p>
          <p className="text-body">
            Il suffit de <a href="/contact" className="link-purple">nous contacter</a> et nous enverrons quelqu&apos;un pour récupérer vos dons.
          </p>
          <p className="text-body">
            Vous pouvez aussi offrir un cadeau depuis notre liste en ligne. <strong>Il n&apos;y a pas de petit don, toute aide contribue à sauver des vies.</strong>
          </p>

          <div className="mb-lg">
            <a href="https://www.kadolog.com/fr/list/un-cadeau-pour-les-proteges-de-lassociation"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-gradient btn-lg">
              Faire un don matériel
            </a>
          </div>

          <div style={{ clear: 'both' }} />
        </div>
      </section>
      {/* Merch */}
      <section className="section">
        <div className="container-mid">
          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            <div>
              <h2>Portez nos couleurs ! 🐱</h2>
              <p className="text-body">
                Affichez votre soutien à l&apos;association avec notre hoodie Nine Lives Paris. Confortable, stylé, et pour la bonne cause.
              </p>
              <p className="text-large mb-md">
                <strong>30€ TTC</strong> <span className="text-muted">+ frais de port</span>
              </p>
              <p className="text-body mb-lg">
                100% des bénéfices financent les soins vétérinaires de nos protégés.
              </p>
              <a href="https://www.helloasso.com/associations/nine-lives-paris" target="_blank" rel="noopener noreferrer" className="btn btn-gradient btn-lg">
                Commander sur HelloAsso
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <img src="/images/site/hoodie_front.webp" alt="Hoodie — face avant" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <img src="/images/site/hoodie_back.webp" alt="Hoodie — face arrière" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}