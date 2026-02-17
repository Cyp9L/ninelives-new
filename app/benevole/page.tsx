import BenevoleForm from '@/components/BenevoleForm';

export default function BenevolePage() {
  return (
    <main>
      {/* Header */}
      <section style={{ 
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1rem' }}>
            Devenir bénévole
          </h1>
          <p style={{ fontSize: '1.125rem', maxWidth: '800px', margin: '0 auto' }}>
            Rejoignez notre équipe et aidez-nous à sauver des vies !
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '3rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>Comme indiqué sur ce site, nous ne disposons pas de refuge</strong>, tous nos animaux sont en familles d'accueil.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Les familles d'accueil prennent soin des animaux dont elles ont la garde. Nous n'avons donc pas besoin d'autres bénévoles pour nourrir les animaux, nettoyer les litières ou un local, câliner des chats, etc.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>En revanche, nous avons besoin de :</strong>
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem' }}>
              <li>Familles d'accueil pour chats, chatons, lapins</li>
              <li>Bénévoles pour transports (vétérinaire, adoption)</li>
              <li>Bénévoles pour visites pré-adoption</li>
              <li>Bénévoles pour aide administrative</li>
              <li>Bénévoles pour communication (réseaux sociaux, site web)</li>
            </ul>
            
            <div style={{ 
              background: '#fef3c7', 
              border: '1px solid #fbbf24',
              borderRadius: '8px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <p style={{ color: '#92400e', marginBottom: '0.5rem' }}>
                <strong>À noter :</strong>
              </p>
              <p style={{ color: '#92400e' }}>
                Les frais vétérinaires sont couverts par l'association. La nourriture est généralement prise en charge par la famille d'accueil (sauf pour les animaux ayant une pathologie nécessitant une nourriture adaptée).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="formulaire" className="section section-gray">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '2rem', textAlign: 'center' }}>
            Formulaire de candidature
          </h2>
          
          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <BenevoleForm />
          </div>
        </div>
      </section>
    </main>
  );
}
