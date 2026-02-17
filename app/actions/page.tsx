export const metadata = {
  title: 'Nos Actions | Nine Lives Paris',
  description: 'Découvrez nos actions : sauvetages, campagne de stérilisation, interventions en milieu scolaire.',
};

export default function ActionsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(0,148,126,0.9) 0%, rgba(0,148,126,0.7) 100%), url(/images/hero-bg.jpg) center/cover',
        color: 'white',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1.5rem' }}>
            NOS ACTIONS
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            Nine Lives Paris est une association Loi 1901 à but non lucratif. Nous ne sommes pas un refuge, 
            nous ne disposons pas d'un lieu d'accueil pour nos chats, ils vivent donc tous en familles d'accueil jusqu'à leur adoption.
          </p>
          <a href="https://www.helloasso.com/associations/nine-lives-paris/formulaires/1" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{ backgroundColor: 'steelblue' }}
             className="btn btn-secondary">
            Soutenez-nous
          </a>
        </div>
      </section>

      {/* 4 Actions Section */}
      <section className="section section-gray">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
                {
                  title: 'Recueillir',
                  text: 'Nous recueillons des animaux abandonnés, non désirés, délaissés, trouvés, provenant de fourrières, ...'
                },
                {
                  title: 'Placer',
                  text: 'Nous les plaçons en famille d\'accueil pour quelques semaines ou quelques mois, le temps qu\'ils soient à jour sanitairement, ou le temps qu\'ils soient suffisamment sociables pour être adoptés.'
                },
                {
                  title: 'Soigner',
                  text: 'Nous les soignons, les identifions, les vaccinons, les stérilisons. Nous les sociabilisons parfois, quand il s\'agit de chatons ou de chats craintifs, afin qu\'ils puissent bien s\'intégrer dans leur future famille.'
                },
                {
                  title: 'Adopter',
                  text: 'Nous leur cherchons ensuite une famille d\'adoption qui leur convienne, en prêtant une attention toute particulière à leur futur environnement.'
                }
              ].map((action, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: '#00947e',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '2rem' }}>🐱</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>{action.title}</h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{action.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campagne de stérilisation */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Notre campagne de stérilisation
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Nous avons signé en mars 2022 une convention de partenariat avec l'ONG{' '}
                <a href="http://one-voice.fr" target="_blank" rel="noopener" style={{ color: '#00947e', textDecoration: 'underline' }}>
                  One Voice
                </a>
                , et l'hôpital de la Pitié-Salpêtrière à Paris.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Cette convention prévoit l'installation d'un{' '}
                <a href="https://www.chatipi.fr/" target="_blank" rel="noopener" style={{ color: '#00947e', textDecoration: 'underline' }}>
                  chatipi
                </a>
                {' '}sur le terrain de l'hôpital. Le chatipi est un petit chalet en bois muni de chatières destiné à abriter 
                les chats errants vivant dans l'enceinte de l'hôpital. Notre mission est d'identifier et de stériliser tous 
                ces chats, afin d'endiguer leur surpopulation et les maladies qui y sont liées.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                One Voice a financé le chalet et finance les actes vétérinaires sur les chats que nous relâchons. Nous nous 
                chargeons de l'aménagement, de l'approvisionnement et de l'entretien du chalet, et de trapper les chats de l'hôpital.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                A ce jour, nous avons attrapé une dizaine de chats, la plupart ont été adoptés ou sont en attente d'adoption. 
                Quelques-uns, trop sauvages, ont été relâchés après avoir été identifiés et stérilisés. Il en reste au moins 
                tout autant à stériliser, si vous souhaitez nous aider dans cette mission, vous pouvez vous proposer en tant que{' '}
                <a href="/benevole" style={{ color: '#00947e', textDecoration: 'underline' }}>
                  famille d'accueil pour effectuer des quarantaines
                </a>
                {' '}(c'est beaucoup plus sympa que ça en a l'air !)
              </p>
              <p>
                Vous pouvez également suivre les aventures de notre chatipi sur{' '}
                <a href="https://www.instagram.com/ninelivesparis/" target="_blank" rel="noopener" style={{ color: '#00947e', textDecoration: 'underline' }}>
                  notre page Instagram
                </a> !
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1f2937', textAlign: 'center' }}>
                Notre Chatipi dans la presse
              </h4>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '8px' }}>
                  <strong>Le Parisien</strong> - 18/09/2022<br/>
                  <a href="https://www.leparisien.fr/paris-75/paris-a-lhopital-de-la-pitie-salpetriere-on-soigne-aussi-les-chats-errants-18-09-2022-ENLW4MSQEVFJPPF7RY2UJ7LTAE.php" 
                     target="_blank" 
                     rel="noopener"
                     style={{ color: '#00947e', fontSize: '0.9rem' }}>
                    Lire l'article →
                  </a>
                </div>
                <div style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '8px' }}>
                  <strong>Le Point</strong> - 11/12/2022<br/>
                  <a href="https://www.lepoint.fr/societe/les-chats-vont-ils-envahir-la-planete-11-12-2022-2501309_23.php" 
                     target="_blank" 
                     rel="noopener"
                     style={{ color: '#00947e', fontSize: '0.9rem' }}>
                    Lire l'article →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interventions scolaires */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Interventions en milieu scolaire
          </h2>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <a href="https://education.l214.com/" target="_blank" rel="noopener">
              <img src="/images/l214-education-logo.png" alt="L214 Education" style={{ maxWidth: '200px' }} />
            </a>
            <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>avec le soutien de</p>
          </div>

          <p style={{ fontSize: '1.125rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', color: '#4b5563' }}>
            Parce que la protection animale et le respect de toute vie s'apprennent dès le plus jeune âge, 
            il est capital pour nous de participer à éduquer les enfants aux principes du bien-être animal 
            et à la prévention des abandons.
          </p>

          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1f2937' }}>
              Nos interventions récentes
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Ecole élémentaire Buffault - classes de primaire et maternelle - 16/02/2022',
                'Ecole élémentaire Saint-Jacques - classe de CE1 - 08/06/2021',
                'Ecole élémentaire Colonel Moll - classe de CE2-CM1 - 20 et 28/05/2021',
                'Ecole élémentaire d\'application Picpus - classe de CM1 - 06/05/2021',
                'Ecole Charles Peguy - classes de CP et CE2 - 06/03/2020'
              ].map((intervention, i) => (
                <li key={i} style={{ 
                  padding: '1rem', 
                  borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none',
                  color: '#4b5563'
                }}>
                  📚 {intervention}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sauvetages */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Retrouvez ici certains de nos sauvetages...
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <img src="/images/jango.webp" alt="Sauvetage" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <img src="/images/papaye.webp" alt="Papaye" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
