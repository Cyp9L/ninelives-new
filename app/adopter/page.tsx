import { getAllCats } from '@/lib/trello';
import Link from 'next/link';
import CollapsibleFormSection from '@/components/CollapsibleFormSection';
import AdoptionForm from '@/components/AdoptionForm';
import CatShowcase from '@/components/CatShowcase';

export const revalidate = 60;
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adopter un chat',
  description:
    'Découvrez nos chats à l\'adoption à Paris (75, 92, 94). Procédure, frais d\'adoption et questionnaire de pré-adoption en ligne.',
};
export default async function AdopterPage() {
  const { all } = await getAllCats();

  return (
    <main id="main-content">
      {/* Header */}
      <section className="hero" role="img" aria-label="Chat écaille de tortue" style={{ backgroundImage: 'url(/images/site/26032021-IMG_4304.webp' }}>
        <div className="container">
        <div className="hero-content">
          <h1>Adopter</h1>
          <p>
            Nos chats sont adoptables à Paris et en petite couronne.
          </p>
        </div>
        </div>
      </section>

      {/* Cats Showcase */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-xl">Nos chats à l&apos;adoption</h2>
          <CatShowcase cats={all} />
        </div>
      </section>

      {/* Process + Kittens (two columns) */}
      <section className="section section-gray">
        <div className="container-mid">
          <div className="grid-2">
            {/* Left: Process */}
            <div>
              <h2>La procédure</h2>
              <ol className="process-list">
                <li>Remplissez le <Link href="#formulaire" className="link-blue">questionnaire de pré-adoption</Link> ci-dessous ;</li>
                <li>Nous vous répondrons par mail ou téléphone dès que possible ;</li>
                <li>Si votre profil correspond, nous organiserons une rencontre avec l&apos;animal via sa famille d&apos;accueil ;</li>
                <li>Si le coup de cœur est réciproque, vous finalisez l&apos;adoption avec un bénévole ;</li>
                <li>Si vous adoptez un chaton vous vous engagez à le stériliser à 6 mois.</li>
              </ol>
              <div className="alert alert-warning" style={{ marginTop: '1rem' }}>
                <strong>Documents nécessaires :</strong> photocopie de pièce d&apos;identité, justificatif de domicile et <Link href="https://agriculture.gouv.fr/animaux-de-compagnie-equides-tout-savoir-sur-le-certificat-dengagement-et-de-connaissance" className="link-amber">"Certificat d'engagement et de connaissance"</Link>.
              </div>
            </div>

            {/* Right: Kittens */}
            <div>
              <h2>🐾 Les chatons</h2>
              <img
                src="/images/gallery/1771685699346-04072021-IMG_5721.jpg"
                alt="Chaton tenu dans une main"
                className="float-img-right"
                data-no-lightbox
              />
              <p className="text-body">
                Un chaton ne reste un « bébé duveteux » que 5 à 6 mois — dans une vie qui peut atteindre 20 ans. Réfléchissez bien.
              </p>
              <p className="text-body">
                <strong>C&apos;est un bébé :</strong> il explore, casse, griffonne, mordille et se réfugie dans des endroits inimaginables. Préparez-vous à accueillir tout cela avec patience.
              </p>
              <p className="text-body">
                <strong>Son caractère évolue :</strong> il ne s&apos;affirme pas avant 7 mois et la stérilisation l&apos;influence. Un chaton joueur peut devenir un adulte pantouflard, et inversement.
              </p>
              <p className="text-body">
                <strong>Pas de réservation :</strong> nos chatons ne sont pas disponibles avant 3 mois. Si vous souhaitez en adopter un qui n&apos;est pas encore prêt à être adopté, la procédure et les frais d&apos;adoption s&apos;appliquent immédiatement — il restera en famille d&apos;accueil jusqu&apos;à son départ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="section">
        <div className="container-mid">
          <h2>Nos frais d&apos;adoption</h2>

          <p className="text-body mb-md">
            Tous nos chats sont identifiés, vaccinés (typhus coryza leucose) et déparasités. Les adultes sont en plus stérilisés et testés FIV/FeLV.
          </p>

          <div className="price-comparison">
            {/* Our fees */}
            <div className="price-card">
              <div className="price-card-header price-card-header-green">
                🐱 Adopter avec Nine Lives
              </div>
              <div className="price-card-body">
                <div className="price-line">
                  <span className="price-line-label">Chaton</span>
                  <span className="price-line-value">180€</span>
                </div>
                <div className="price-line">
                  <span className="price-line-label">Adulte</span>
                  <span className="price-line-value">220€</span>
                </div>
                <div className="price-line">
                  <span className="price-line-label">Chat de 10 ans et +</span>
                  <span className="price-line-value">80 — 150€</span>
                </div>
                <div className="price-total">
                  <span>Tout inclus</span>
                  <span>✓</span>
                </div>
              </div>
            </div>

            {/* Vet fees */}
            <div className="price-card">
              <div className="price-card-header price-card-header-gray">
                💊 Chez un vétérinaire
              </div>
              <div className="price-card-body">
                <div className="price-line">
                  <span className="price-line-label"><a href="https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006071367&idArticle=LEGIARTI000006583095" target="_blank" rel="noopener noreferrer" className="link-purple">Identification</a> (obligatoire dès 7 mois)</span>
                  <span className="price-line-value">70€</span>
                </div>
                <div className="price-line">
                  <span className="price-line-label">Consultation de contrôle</span>
                  <span className="price-line-value">37€</span>
                </div>
                <div className="price-line">
                  <span className="price-line-label">Stérilisation / castration</span>
                  <span className="price-line-value">68 — 125€</span>
                </div>
                <div className="price-line">
                  <span className="price-line-label">Vaccins typhus + coryza + leucose</span>
                  <span className="price-line-value">182€</span>
                </div>
                <div className="price-line">
                  <span className="price-line-label">Test FIV/FeLV</span>
                  <span className="price-line-value">70€</span>
                </div>
                <div className="price-line">
                  <span className="price-line-label">Déparasitage</span>
                  <span className="price-line-value">20€</span>
                </div>
                <div className="price-total">
                  <span>Total estimé</span>
                  <span>447 — 504€</span>
                </div>
              </div>
            </div>
          </div>

          <div className="price-savings">
            Vous économisez entre 227€ et 284€ en adoptant chez Nine Lives 💚
          </div>

          <p className="text-small" style={{ marginTop: '0.75rem' }}>
            Source : <a href="https://www.quechoisir.org/enquete-tarifs-veterinaires-du-simple-au-triple-n59793/" target="_blank" rel="noopener noreferrer" className="link-purple">Que Choisir — Tarifs vétérinaires</a>. Tarifs variables selon les praticiens.
          </p>
        </div>
      </section>

      {/* Form */}
      <CollapsibleFormSection
        id="formulaire"
        title="Questionnaire de pré-adoption"
        subtitle="Remplissez ce formulaire pour commencer le processus d'adoption."
        buttonLabel="Remplir le questionnaire"
      >
        <AdoptionForm cats={all} />
      </CollapsibleFormSection>
    </main>
  );
}