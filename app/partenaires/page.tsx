import Link from 'next/link';

export const metadata = {
  title: 'Nos Partenaires | Nine Lives Paris',
  description: 'Découvrez nos partenaires qui contribuent au bien-être de nos animaux.',
};

export default function PartenairesPage() {
  return (
    <main id="main-content">
      {/* Header */}
      <section className="hero" style={{ backgroundImage: 'url(/images/site/moustache-cafe.jpg)' }}>
        <div className="container">
          <div className="hero-content">
            <h1>Nos partenaires</h1>
            <p>
              Nous avons noué des partenariats avec plusieurs entreprises, afin d&apos;améliorer le bien-être de nos animaux durant toute leur vie.
            </p>
          </div>
        </div>
      </section>

      {/* L'Arche des Associations */}
      <section className="section">
        <div className="container-mid">
          <div className="float-img-left">
            <img src="/images/site/arche-associations.jpg" alt="L'Arche des Associations" />
          </div>

          <h2>
            <a href="https://www.arche-association.fr/" target="_blank" rel="noopener noreferrer" className="link-purple">
              L&apos;Arche des Associations
            </a>
          </h2>

          <p className="text-body">
            L&apos;Arche est une fédération de 42 associations qui œuvrent pour le bien-être animal : protection, médiation animale, défense du droit des animaux et connaissance de l&apos;animal.
          </p>
          <p className="text-body">
            Collectes, salons, aide financière et matérielle… Nous avons la chance d&apos;en faire partie, et nous pouvons compter sur son soutien pour accueillir au mieux tous nos protégés.
          </p>

          <div style={{ clear: 'both' }} />
        </div>
      </section>

      {/* Educhateur */}
      <section className="section section-gray">
        <div className="container-mid">
          <div className="float-img-right">
            <img src="/images/site/educhateur.png" alt="Educhateur - coaching félin" />
          </div>

          <h2>
            <a href="https://educhateur.fr/" target="_blank" rel="noopener noreferrer" className="link-purple">
              Educhateur
            </a>
          </h2>

          <p className="text-body">
            Vous souhaitez mettre toutes les chances de votre côté pour réussir votre adoption ? Un problème avec Minou ?
          </p>
          <p className="text-body">
            Educhateur propose des séances de coaching félin (accueillir son premier chat, cohabitation, déménagement…) et des consultations pour les problèmes de comportement sans cause médicale.
          </p>

          <div style={{ clear: 'both' }} />
        </div>
      </section>

      {/* Miaustore */}
      <section className="section">
        <div className="container-mid">
          <div className="float-img-left">
            <img src="/images/site/miaustore.png" alt="Fontaine Miaustore" />
          </div>

          <h2>
            <a href="https://miaustore.com/fr?ref=424085" target="_blank" rel="noopener noreferrer" className="link-purple">
              Miaustore
            </a>
          </h2>

          <p className="text-body">
            Boutique en ligne de fontaines à eau pour chats, en céramique, sans filtre, garanties 1 an (2 à 10 ans pour la pompe) et totalement personnalisables.
          </p>
          <p className="text-body">
            <strong>En passant commande via <a href="https://miaustore.com/fr?ref=424085" target="_blank" rel="noopener noreferrer" className="link-purple">ce lien</a>, 5% de votre achat sera reversé à notre association !</strong>
          </p>

          <div style={{ clear: 'both' }} />
        </div>
      </section>

      {/* Protection pour chats */}
      <section className="section section-gray">
        <div className="container-mid">
          <div className="float-img-right">
            <img src="/images/site/protection-chats.jpg" alt="Protection pour chats - filets" />
          </div>

          <h2>
            <a href="https://protection-pour-chats.fr/" target="_blank" rel="noopener noreferrer" className="link-purple">
              Protection pour chats
            </a>
          </h2>

          <p className="text-body">
            Société française proposant des filets de protection sur mesure pour toutes les configurations : fenêtres, baies coulissantes, velux, balcons, terrasses…
          </p>
          <p className="text-body">
            Grâce à eux, votre chat sera protégé des dangers extérieurs.
          </p>

          <div style={{ clear: 'both' }} />
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-mid">
          <div className="section-with-aside">
            <div className="text-center">
              <p className="text-large mb-lg">
                Vous souhaitez développer un partenariat avec nous ? Nous sommes toujours ravies de faire de nouvelles rencontres !
              </p>
              <Link href="/contact" className="btn btn-gradient btn-lg">
                Contactez-nous
              </Link>
            </div>
            <img src="/images/site/wiskey04.webp" alt="Chat endormi" />
          </div>
        </div>
      </section>
    </main>
  );
}