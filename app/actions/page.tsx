import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos actions',
  description:
    'Sauvetage, familles d\'accueil, campagne de stérilisation à la Pitié-Salpêtrière et interventions en milieu scolaire. Découvrez les actions de Nine Lives Paris.',
};

export default function ActionsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, rgba(0,148,126,0.9), rgba(0,148,126,0.7))' }}>
        <div className="container">
          <h1>NOS ACTIONS</h1>
          <p>
            Nine Lives Paris est une association Loi 1901 à but non lucratif. Nous ne disposons pas d&apos;un refuge — 
            tous nos chats vivent en familles d&apos;accueil jusqu&apos;à leur adoption.
          </p>
          <a href="https://www.helloasso.com/associations/nine-lives-paris/formulaires/1"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Soutenez-nous
          </a>
        </div>
      </section>

      {/* 4 Actions */}
      <section className="section section-gray">
        <div className="container">
          <div className="grid-cards">
            {[
              { icon: '🐾', title: 'Recueillir', text: 'Nous recueillons des animaux abandonnés, non désirés, délaissés, trouvés, provenant de fourrières…' },
              { icon: '🏠', title: 'Placer', text: 'Nous les plaçons en famille d\'accueil le temps qu\'ils soient à jour sanitairement et prêts à être adoptés.' },
              { icon: '💉', title: 'Soigner', text: 'Nous les identifions, vaccinons, stérilisons et sociabilisons quand nécessaire.' },
              { icon: '❤️', title: 'Adopter', text: 'Nous leur cherchons une famille d\'adoption adaptée, en prêtant attention à leur futur environnement.' }
            ].map((action, i) => (
              <div key={i} className="card card-centered">
                <div className="card-icon">{action.icon}</div>
                <h3>{action.title}</h3>
                <p>{action.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campagne de stérilisation */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-xl">Notre campagne de stérilisation</h2>

          <div className="grid-2">
            <div>
              <p className="text-body">
                Nous avons signé en mars 2022 une convention de partenariat avec l&apos;ONG{' '}
                <a href="http://one-voice.fr" target="_blank" rel="noopener" className="link-purple">One Voice</a>
                {' '}et l&apos;hôpital de la Pitié-Salpêtrière à Paris.
              </p>
              <p className="text-body">
                Cette convention prévoit l&apos;installation d&apos;un{' '}
                <a href="https://www.chatipi.fr/" target="_blank" rel="noopener" className="link-purple">chatipi</a>
                {' '}sur le terrain de l&apos;hôpital — un petit chalet en bois muni de chatières destiné à abriter les chats errants. Notre mission : identifier et stériliser tous ces chats, pour endiguer la surpopulation et les maladies.
              </p>
              <p className="text-body">
                One Voice finance le chalet et les actes vétérinaires sur les chats relâchés. Nous nous chargeons de l&apos;aménagement, l&apos;entretien et le trappage.
              </p>
              <p className="text-body">
                À ce jour, une dizaine de chats attrapés — la plupart adoptés ou en attente. Quelques-uns, trop sauvages, ont été relâchés après identification et stérilisation. Il en reste autant à stériliser. Vous pouvez vous proposer en tant que{' '}
                <a href="/benevole" className="link-purple">famille d&apos;accueil de quarantaine</a>
                {' '}(c&apos;est plus sympa que ça en a l&apos;air !)
              </p>
              <p className="text-body">
                Suivez les aventures du chatipi sur{' '}
                <a href="https://www.instagram.com/ninelivesparis/" target="_blank" rel="noopener" className="link-purple">Instagram</a> !
              </p>
            </div>

            <div>
              <h3 className="section-title text-center">Notre Chatipi dans la presse</h3>
              <div className="card mb-md">
                <strong>Le Parisien</strong> — 18/09/2022<br/>
                <a href="https://www.leparisien.fr/paris-75/paris-a-lhopital-de-la-pitie-salpetriere-on-soigne-aussi-les-chats-errants-18-09-2022-ENLW4MSQEVFJPPF7RY2UJ7LTAE.php"
                  target="_blank" rel="noopener" className="link-purple text-small">
                  Lire l&apos;article →
                </a>
              </div>
              <div className="card">
                <strong>Le Point</strong> — 11/12/2022<br/>
                <a href="https://www.lepoint.fr/societe/les-chats-vont-ils-envahir-la-planete-11-12-2022-2501309_23.php"
                  target="_blank" rel="noopener" className="link-purple text-small">
                  Lire l&apos;article →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interventions scolaires */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="text-center">Interventions en milieu scolaire</h2>

          <div className="text-center mb-lg">
            <a href="https://education.l214.com/" target="_blank" rel="noopener">
              <img src="/images/l214-education-logo.png" data-no-lightbox alt="L214 Education" style={{ maxWidth: '200px', margin: '0 auto' }} />
            </a>
            <p className="text-small">avec le soutien de</p>
          </div>

          <p className="text-large text-center mb-xl" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
            La protection animale et le respect de toute vie s&apos;apprennent dès le plus jeune âge. Nous participons à éduquer les enfants au bien-être animal et à la prévention des abandons.
          </p>

          <div className="card">
            <h3 className="section-title">Nos interventions récentes</h3>
            {[
              'École élémentaire Buffault — primaire et maternelle — 16/02/2022',
              'École élémentaire Saint-Jacques — CE1 — 08/06/2021',
              'École élémentaire Colonel Moll — CE2-CM1 — 20 et 28/05/2021',
              'École élémentaire d\'application Picpus — CM1 — 06/05/2021',
              'École Charles Péguy — CP et CE2 — 06/03/2020'
            ].map((intervention, i, arr) => (
              <div key={i} className="text-body" style={{ padding: '0.75rem 0', borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                📚 {intervention}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sauvetages */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-xl">Certains de nos sauvetages…</h2>

          <div className="grid-2">
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <img src="/images/jango.webp" alt="Sauvetage de Jango" />
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <img src="/images/papaye.webp" alt="Sauvetage de Papaye" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
