import AbandonForm from '@/components/AbandonForm';
import Link from 'next/link';

export const metadata = {
  title: 'Abandon / Prise en charge | Nine Lives Paris',
  description: 'Confiez un animal à l\'association Nine Lives Paris. Nous recueillons les animaux des personnes hospitalisées, en maison de retraite ou décédées.',
};

export default function AbandonPage() {
  return (
    <main>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1rem' }}>
            Prise en charge
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src="/images/abandon-kitten.webp"
                alt="Chaton dans une cagette"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}>
              <p style={{ marginBottom: '1rem' }}>
                L&apos;une de nos missions est de <strong>recueillir les animaux des personnes hospitalisées, placées en maison de retraite ou décédées</strong>. Nous pouvons également prendre en charge les portées de chatons non désirés ou les <a href="#trouve" style={{ color: '#2563eb', textDecoration: 'underline' }}>chats trouvés</a>.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Remplissez le <a href="#formulaire" style={{ color: '#2563eb', textDecoration: 'underline' }}>formulaire</a> ci-dessous et nous vous recontacterons.
              </p>
              <p>
                Si l&apos;animal que vous souhaitez nous confier ne correspond pas à l&apos;une de ces situations, merci de lire <a href="#abandon" style={{ color: '#2563eb', textDecoration: 'underline' }}>ce qui suit</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vous avez trouvé un chat ? */}
      <section id="trouve" className="section section-gray">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '2.5rem' }}>
            Vous avez trouvé un chat ?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', alignItems: 'start', marginBottom: '3rem' }}>
            <div style={{ fontSize: '3.5rem', textAlign: 'center' }}>🏥</div>
            <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}>
              <p style={{ marginBottom: '1rem' }}>
                La première chose à faire est de l&apos;emmener chez <a href="https://sospets.fr/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>le vétérinaire le plus proche</a>, afin de vérifier s&apos;il est équipé d&apos;une puce électronique. C&apos;est totalement gratuit.
              </p>
              <p>
                Si c&apos;est le cas, le vétérinaire devrait pouvoir contacter sa famille, et si tout va bien le chat pourra rentrer chez lui rapidement.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ fontSize: '3.5rem', textAlign: 'center' }}>🔍</div>
            <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}>
              <p style={{ marginBottom: '1rem' }}>
                Si ce n&apos;est pas le cas, le vétérinaire devrait pouvoir faire un examen rapide du chat et vous dire son âge approximatif, s&apos;il s&apos;agit d&apos;un mâle ou d&apos;une femelle, et s&apos;il paraît en bonne santé.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Si vous ne pouvez absolument pas le garder même temporairement, <a href="#formulaire" style={{ color: '#2563eb', textDecoration: 'underline' }}>contactez-nous</a> ou d&apos;autres associations, afin de trouver quelqu&apos;un qui puisse l&apos;accueillir rapidement.
              </p>
              <p>
                Prenez quelques photos du chat et diffusez-les autour de l&apos;endroit où vous l&apos;avez trouvé, afin de rechercher sa famille éventuelle. Collez des affiches et postez une annonce sur <a href="https://www.petalert.fr/fr-fr" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>PetAlert</a>, et éventuellement sur des groupes Facebook dédiés à votre ville, ou <a href="https://www.facebook.com/AnimauxPerdusTrouves.fr/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>aux animaux perdus</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vous souhaitez nous confier votre animal ? */}
      <section id="abandon" className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '2.5rem' }}>
            Vous souhaitez nous confier votre animal ?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}>
              <p style={{ marginBottom: '1rem' }}>
                Vous trouverez la procédure plus bas.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Lorsque vous avez accueilli votre animal, vous vous êtes engagé vis-à-vis de lui à lui fournir un toit et la sécurité pour <strong>toute sa vie</strong>. Vous êtes bien souvent la seule famille qu&apos;il ait connue. Il fait partie de votre famille et de votre foyer.
              </p>
              <p>
                Un animal est un être vivant et doté d&apos;émotions, ce n&apos;est pas un objet de consommation dont on peut se débarrasser sans penser aux conséquences.
              </p>
            </div>
            <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src="/images/petit-prince.webp"
                alt="Citation du Petit Prince sur les animaux"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          <div style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: '8px',
            padding: '1.5rem',
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: '#991b1b'
          }}>
            <p style={{ marginBottom: '1rem' }}>
              <em><strong>L&apos;abandon d&apos;un animal domestique est puni de deux ans d&apos;emprisonnement et de 30 000 Euros d&apos;amende (article 521-1 du Code Pénal).</strong></em>
            </p>
            <p>
              Nous nous devons d&apos;informer et de sensibiliser. Nous utilisons le mot abandon car pour l&apos;animal, c&apos;est toujours ressenti comme tel. Peu importe la raison. Dans l&apos;intérêt de l&apos;animal, nous sommes cependant disposés à le recueillir, sous réserve des places disponibles. Si vous ne l&apos;avez pas déjà fait, merci de lire <Link href="/abandon/solutions" style={{ color: '#991b1b', textDecoration: 'underline' }}>cette page</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="formulaire" className="section section-gray">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '2rem', textAlign: 'center' }}>
            Formulaire de prise en charge
          </h2>
          <p style={{ textAlign: 'center', color: '#4b5563', marginBottom: '3rem' }}>
            Remplissez ce formulaire et nous vous recontacterons dans les meilleurs délais.
          </p>

          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <AbandonForm />
          </div>
        </div>
      </section>
    </main>
  );
}
