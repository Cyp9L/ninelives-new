import { getAllCats } from '@/lib/trello';
import Link from 'next/link';
import AdoptionForm from '@/components/AdoptionForm';

export const revalidate = 60;

export default async function AdopterPage() {
  const { adultes } = await getAllCats();

  return (
    <main>
      {/* Header Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1rem' }}>
            Adopter
          </h1>
          <p style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
            <strong>Attention :</strong> par manque de bénévoles, nous ne faisons adopter que dans les départements de Paris et petite couronne, 92, 94.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '2rem' }}>
            La procédure :
          </h2>
          
          <ol style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '1rem' }}>
              Remplissez le <Link href="#formulaire" className="link-blue">questionnaire de pré-adoption</Link> qui se trouve ci-dessous ;
            </li>
            <li style={{ marginBottom: '1rem' }}>
              Nous vous répondrons par mail ou par téléphone dès que possible ;
            </li>
            <li style={{ marginBottom: '1rem' }}>
              Si vous correspondez aux besoins de l'animal que vous souhaitez rencontrer, nous vous mettrons en contact avec la famille d'accueil afin d'organiser la rencontre avec notre petit protégé ;
            </li>
            <li style={{ marginBottom: '1rem' }}>
              Si le coup de cœur est réciproque, vous pourrez organiser l'adoption en concertation avec un bénévole de l'association.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              Si vous adoptez un chaton ou un lapereau, vous vous engagerez à le stériliser lorsqu'il aura atteint 6 mois.
            </li>
          </ol>

          <div style={{ 
            background: '#fef3c7', 
            border: '1px solid #fbbf24',
            borderRadius: '8px',
            padding: '1.5rem',
            marginTop: '2rem'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Les documents nécessaires :</h3>
            <p style={{ color: '#92400e' }}>
              Une photocopie de la pièce d'identité et d'un justificatif de domicile au nom de l'adoptant.
            </p>
          </div>
        </div>
      </section>

      {/* Adoption Fees */}
      <section className="section section-gray">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '2rem' }}>
            Nos frais d'adoption :
          </h2>
          
          <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}>
            <p style={{ marginBottom: '1rem' }}>
              Tous nos chats sont identifiés, vaccinés (typhus coryza leucose) et déparasités.
            </p>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '500' }}>
              <strong>Chatons : 180€</strong>
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Les adultes sont en plus stérilisés et testés FIV/FeLV (sida du chat et leucose) :
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>
              <strong>Adultes : 220€</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Cats Grid */}
      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '3rem', textAlign: 'center' }}>
            Nos chats à l'adoption
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {adultes.map(cat => (
              <Link 
                key={cat.id} 
                href={`/adopter/${cat.slug}`} 
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  background: 'white'
                }}
              >
                <div style={{
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  background: '#f3f4f6'
                }}>
                  {cat.images[0] ? (
                    <img 
                      src={cat.images[0]} 
                      alt={cat.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                      🐱
                    </div>
                  )}
                </div>
                <h3 style={{ 
                  padding: '1rem', 
                  margin: 0, 
                  fontSize: '1.25rem', 
                  fontWeight: '500',
                  textAlign: 'center' 
                }}>
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Form */}
      <section id="formulaire" className="section section-gray">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '2rem', textAlign: 'center' }}>
            Questionnaire de pré-adoption
          </h2>
          <p style={{ textAlign: 'center', color: '#4b5563', marginBottom: '3rem' }}>
            Remplissez ce formulaire pour commencer le processus d'adoption.
          </p>
          
          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <AdoptionForm cats={adultes} />
          </div>
        </div>
      </section>
    </main>
  );
}
