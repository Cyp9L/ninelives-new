import CollapsibleFormSection from '@/components/CollapsibleFormSection';
import Image from 'next/image';
import type { Metadata } from 'next';
import BenevoleFormDynamic from '@/components/BenevoleFormDynamic';

export const metadata: Metadata = {
  title: 'Devenir bénévole ou famille d\'accueil',
  description:
    'Rejoignez Nine Lives Paris comme bénévole ou famille d\'accueil pour chats à Paris. Plusieurs façons d\'aider selon votre disponibilité.',
};

export default function BenevolePage() {
  return (
    <main id="main-content">
      {/* Header */}
      <section className="hero" style={{ backgroundImage: 'url(/images/site/DSC01832.webp)', backgroundPosition: 'center 33%' }}>
        <div className="container">
          <div className="hero-content">
            <h1>Devenir bénévole</h1>
            <p>Rejoignez notre équipe et aidez-nous à sauver des vies !</p>
          </div>
        </div>
      </section>

      {/* What we need */}
      <section className="section">
        <div className="container-mid">
          <div className="float-img-right">
            <Image src="/images/site/14092021-IMG_5906.webp" alt="Chat commun" width={600} height={400} sizes="(max-width: 425px) 75vw, (max-width: 768px) 60vw, 40vw" />
          </div>
          <p className="text-large mb-lg">
            <strong>Nous ne disposons pas de refuge</strong> — tous nos animaux sont en familles d&apos;accueil qui en prennent soin au quotidien.
          </p>
          <p className="text-large mb-md">
            <strong>Nous avons besoin de :</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }} className="text-large mb-lg">
            <li>Familles d&apos;accueil pour chats, chatons</li>
            <li>Bénévoles pour transports (vétérinaire, adoption)</li>
            <li>Bénévoles pour visites pré-adoption</li>
            <li>Bénévoles pour aide administrative</li>
            <li>Bénévoles pour communication (réseaux sociaux, site web)</li>
          </ul>
        </div>
      </section>

      {/* Foster types */}
      <section className="section section-gray">
        <div className="container-mid">
          <div className="float-img-left">
            <Image src="/images/site/wiskey04.webp" alt="Chat endormi" width={600} height={400} sizes="(max-width: 425px) 75vw, (max-width: 768px) 60vw, 40vw" />
          </div>
          <h2 className="text-center">Quel type de famille d&apos;accueil ?</h2>

          <details className="accordion" open>
            <summary>🏥 2 à 3 semaines — Quarantaine</summary>
            <div className="accordion-content">
              <p className="text-body">
                Vous pouvez isoler un animal dans une salle de bains ou une pièce facile à nettoyer ? Vous pouvez être <strong>famille d&apos;accueil de quarantaine</strong>.
              </p>
              <p className="text-body">
                Les animaux provenant de l&apos;extérieur peuvent être porteurs de maladies transmissibles (coryza, typhus, leucose…). Nous les isolons 15 jours avant de les intégrer.
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>🐱 1 à 3 mois — Accueil court</summary>
            <div className="accordion-content">
              <p className="text-body">
                Que vous ayez d&apos;autres animaux ou pas, vous accueillez un ou plusieurs chats/chatons après la quarantaine (ou l&apos;effectuez vous-même).
              </p>
              <p className="text-body">
                Jeunes adultes ou chatons, ils seront rapidement adoptés. Vous les emmènerez chez l&apos;un de nos vétérinaires pour les mettre à jour sanitairement.
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>🏡 Plusieurs mois — Jusqu&apos;à adoption</summary>
            <div className="accordion-content">
              <p className="text-body">
                Vous accueillez un animal jusqu&apos;à son adoption, peu importe la durée. Chaton, adulte, ou chat craintif à socialiser.
              </p>
              <p className="text-body">
                Votre mission : l&apos;emmener chez l&apos;un de nos vétérinaires pour vaccination, stérilisation et identification.
              </p>
            </div>
          </details>

          <div className="alert alert-warning" style={{ marginTop: '1.5rem' }}>
            <p><strong>À noter :</strong></p>
            <p>Les frais vétérinaires sont couverts par l&apos;association. La nourriture est généralement prise en charge par la famille d&apos;accueil (sauf pathologie nécessitant une alimentation adaptée).</p>
          </div>
        </div>
      </section>

      {/* Merch — kept light */}
      <section className="section">
        <div className="container-mid text-center">
          <div className="float-img-left" style={{ width: '250px', shapeMargin: '1rem' }}>
            <Image src="/images/site/hoodie_back.webp" alt="Hoodie Nine Lives Paris" width={400} height={500} sizes="250px" style={{ borderRadius: '8px' }} />
          </div>
          <h2>Portez nos couleurs ! 🐱</h2>
          <p className="text-body">
            Soutenez l&apos;association en portant notre hoodie — <strong>30€</strong> (+frais de port).
          </p>
          <a href="https://www.helloasso.com/associations/nine-lives-paris/boutiques/boutique-nine-lives-paris" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Commander sur HelloAsso
          </a>
          <div style={{ clear: 'both' }} />
        </div>
      </section>

      {/* Form */}
      <CollapsibleFormSection
        id="formulaire"
        title="Formulaire de candidature"
        subtitle="Remplissez ce formulaire pour proposer votre candidature."
        buttonLabel="Remplir le formulaire"
        containerClass="container-mid"
      >
        <BenevoleFormDynamic />
      </CollapsibleFormSection>
    </main>
  );
}