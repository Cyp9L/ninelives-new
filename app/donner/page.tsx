export const metadata = {
  title: 'Faire un don | Nine Lives Paris',
  description: 'Soutenez notre association en faisant un don financier ou matériel pour sauver des vies.',
};

export default function DonnerPage() {
  return (
    <main>
      {/* Header */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
        <div className="container">
          <h1>Faire un don</h1>
        </div>
      </section>

      {/* Financial Donation */}
      <section className="section">
        <div className="container-mid">
          <div className="float-img-right" style={{ width: '45%', borderRadius: '8px', overflow: 'hidden' }}>
            <img src="/images/wiskey.jpg" alt="Wiskey, un de nos protégés" />
          </div>

          <div className="card-icon" style={{ fontSize: '4rem' }}>💝</div>

          <p className="text-large mb-md">
            <strong>Sauver des vies a un coût.</strong>
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

          <p className="text-small text-muted">
            Vos dons sont déductibles des impôts à hauteur de 66%.
            <br/><strong>Votre don de 100€ ne vous coûte que 34€ !</strong>
          </p>

          <div style={{ clear: 'both' }} />
        </div>
      </section>

      {/* Material Donation */}
      <section className="section section-gray">
        <div className="container-mid">
          <div className="float-img-left" style={{ width: '45%', borderRadius: '8px', overflow: 'hidden' }}>
            <img src="/images/salomon.webp" alt="Salomon, un de nos protégés" />
          </div>

          <div className="card-icon" style={{ fontSize: '4rem' }}>🎁</div>

          <p className="text-large mb-md">
            <strong>Nous avons sans cesse besoin de matériel.</strong>
          </p>

          <p className="text-body">
            Caisses de transport, bacs à litière, cages à lapins, antiparasitaires, nourriture, litière, jouets, griffoirs… Souvent, vous avez chez vous des choses qui pourraient nous être très utiles.
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
    </main>
  );
}