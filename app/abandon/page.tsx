import AbandonForm from '@/components/AbandonForm';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'J\'ai besoin d\'aide pour mon animal',
  description:
    'Vous ne pouvez plus garder votre chat ? Nine Lives Paris vous accompagne pour trouver une solution avant l\'abandon. Contactez-nous.',
};

export default function AbandonPage() {
  return (
    <main>
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <h1>Prise en charge</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container-mid">
          <div className="float-img-left">
            <img src="/images/abandon-kitten.webp" alt="Chaton dans une cagette" />
          </div>

          <p className="text-large mb-md">
            L&apos;une de nos missions est de <strong>recueillir les animaux des personnes hospitalisées, placées en maison de retraite ou décédées</strong>. Nous pouvons également prendre en charge les portées de chatons non désirés ou les <a href="#trouve" className="link-blue">chats trouvés</a>.
          </p>
          <p className="text-large mb-md">
            Remplissez le <a href="#formulaire" className="link-blue">formulaire</a> ci-dessous et nous vous recontacterons.
          </p>
          <p className="text-large">
            Si l&apos;animal que vous souhaitez nous confier ne correspond pas à l&apos;une de ces situations, merci de lire <a href="#abandon" className="link-blue">ce qui suit</a>.
          </p>

          <div style={{ clear: 'both' }} />
        </div>
      </section>

      {/* Vous avez trouvé un animal ? */}
      <section id="trouve" className="section section-gray">
        <div className="container-mid">
          <h2>Vous avez trouvé un animal ?</h2>

          <div className="icon-text">
            <div className="icon-text-icon">🏥</div>
            <div>
              <p className="text-body">
                La première chose à faire est de l&apos;emmener chez le vétérinaire le plus proche pour vérifier s&apos;il a une puce électronique. C&apos;est <strong>totalement gratuit</strong>.
              </p>
              <p className="text-body">
                Si c&apos;est le cas, le vétérinaire pourra contacter sa famille et l&apos;animal pourra rentrer chez lui.
              </p>
            </div>
          </div>

          <div className="icon-text">
            <div className="icon-text-icon">🔍</div>
            <div>
              <p className="text-body">
                S&apos;il n&apos;est pas pucé, le vétérinaire pourra vous donner son âge approximatif, son sexe et son état de santé.
              </p>
              <p className="text-body">
                Si vous ne pouvez pas le garder, <a href="#formulaire" className="link-blue">contactez-nous</a> ou d&apos;autres associations. Prenez des photos et diffusez-les : affiches dans le quartier, annonce sur <a href="https://www.petalert.fr/" target="_blank" rel="noopener noreferrer" className="link-blue">PetAlert</a> et sur les <a href="https://www.facebook.com/AnimauxPerdusTrouves.fr/" target="_blank" rel="noopener noreferrer" className="link-blue">groupes Facebook dédiés</a>.
              </p>
            </div>
          </div>

          {/* Detailed guides */}
          <details className="accordion">
            <summary>🦊 Il s&apos;agit d&apos;un animal sauvage</summary>
            <div className="accordion-content">
              <p className="text-body">
                <strong>Il est peu réactif ou blessé :</strong> munissez-vous de gants et d&apos;une serviette, placez-le dans une caisse de transport ou un carton troué, et déposez-le au CHUV de Maisons-Alfort (<a href="https://goo.gl/maps/iknnXpz2KT6kvi6y7" target="_blank" rel="noopener noreferrer" className="link-blue">7 avenue du Général de Gaulle</a>, ouvert 365 j/an de 10h à 18h).
              </p>
              <p className="text-body">
                Si vous ne pouvez pas l&apos;attraper, appelez les pompiers (18) ou l&apos;OFB (Île-de-France, Vincennes : 01 45 14 36 00).
              </p>
              <p className="text-body">
                <strong>Il s&apos;agit d&apos;un petit (faon, renardeau, chouette…) :</strong> la maman n&apos;est généralement pas loin. N&apos;intervenez pas ! En cas de doute, écrivez à <a href="mailto:contact@faune-alfort.org" className="link-blue">contact@faune-alfort.org</a>.
              </p>
              <p className="text-small text-muted">
                Source : <a href="https://www.faune-alfort.org/informations-pratiques/je-trouve-un-animal-que-faire/" target="_blank" rel="noopener noreferrer" className="link-blue">faune-alfort.org</a>
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>🐱 Animal domestique — vous pouvez l&apos;attraper</summary>
            <div className="accordion-content">
              <p className="text-body">
                Emmenez-le chez le vétérinaire le plus proche pour vérifier s&apos;il est identifié (gratuit). Si oui, le vétérinaire contactera ses propriétaires.
              </p>
              <p className="text-body"><strong>S&apos;il n&apos;est pas identifié :</strong></p>
              <ol className="process-list">
                <li>Faites le tour des voisins et commerçants. Si vous n&apos;avez pas d&apos;animaux, vous pouvez le ramener chez vous. Sinon, isolez-le ou confiez-le à quelqu&apos;un.</li>
                <li>Prenez des photos reconnaissables. Déclarez-le sur <a href="https://www.petalert.fr/" target="_blank" rel="noopener noreferrer" className="link-blue">PetAlert</a> (gratuit). Imprimez des affiches avec photo, adresse et votre contact.</li>
                <li>Contactez des associations selon l&apos;espèce — liste sur <a href="https://www.secondechance.org/refuge/recherche" target="_blank" rel="noopener noreferrer" className="link-blue">Seconde Chance</a>.</li>
              </ol>
            </div>
          </details>

          <details className="accordion">
            <summary>🐱 Animal domestique — vous ne pouvez pas l&apos;attraper</summary>
            <div className="accordion-content">
              <p className="text-body">
                Prenez des photos de l&apos;animal et de l&apos;endroit, puis contactez les associations les plus proches avec un maximum d&apos;informations. Vous pouvez aussi publier sur le <a href="https://www.facebook.com/groups/wantedcommunityanimaux/" target="_blank" rel="noopener noreferrer" className="link-blue">groupe Facebook Wanted Community Animaux</a>.
              </p>
              <p className="text-body">
                Consultez les annonces d&apos;animaux perdus et déclarez-le comme vu sur <a href="https://www.petalert.fr/" target="_blank" rel="noopener noreferrer" className="link-blue">PetAlert</a> (gratuit).
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Vous souhaitez nous confier votre animal ? */}
      <section id="abandon" className="section">
        <div className="container-mid">
          <h2>Vous souhaitez nous confier votre animal ?</h2>

          <div className="float-img-right">
            <img src="/images/petit-prince.webp" alt="Citation du Petit Prince" />
          </div>

          <p className="text-large mb-md">
            Lorsque vous avez accueilli votre animal, vous vous êtes engagé à lui fournir un toit et la sécurité pour <strong>toute sa vie</strong>. Il fait partie de votre famille.
          </p>
          <p className="text-large mb-lg">
            Un animal est un être vivant doté d&apos;émotions, pas un objet dont on se débarrasse.
          </p>

          <div style={{ clear: 'both' }} />

          <div className="alert alert-error">
            <p>
              <em><strong>L&apos;abandon d&apos;un animal domestique est puni de trois ans d&apos;emprisonnement et de 45 000 euros d&apos;amende (article 521-1 du Code pénal). En cas d&apos;abandon présentant un risque de mort, les peines sont portées à quatre ans et 60 000 euros.</strong></em>
            </p>
            <p>
              Nous utilisons le mot abandon car pour l&apos;animal, c&apos;est toujours ressenti comme tel. Dans l&apos;intérêt de l&apos;animal, nous sommes disposés à le recueillir sous réserve des places disponibles. Merci de lire <Link href="/abandon/solutions" style={{ color: '#991b1b', textDecoration: 'underline' }}>les solutions pour éviter l&apos;abandon</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="formulaire" className="section section-gray">
        <div className="container-narrow">
          <h2 className="text-center">Formulaire de prise en charge</h2>
          <p className="text-center text-muted mb-xl">
            Remplissez ce formulaire et nous vous recontacterons dans les meilleurs délais.
          </p>
          <div className="form-container">
            <AbandonForm />
          </div>
        </div>
      </section>
    </main>
  );
}