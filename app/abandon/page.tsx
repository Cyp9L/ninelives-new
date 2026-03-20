import CollapsibleFormSection from '@/components/CollapsibleFormSection';
import Link from 'next/link';
import type { Metadata } from 'next';
import AbandonFormDynamic from '@/components/AbandonFormDynamic';

export const metadata: Metadata = {
  title: 'Prise en charge de votre animal',
  description:
    'Vous ne pouvez plus garder votre chat ? Nine Lives Paris peut le recueillir sous réserve de places disponibles.',
};

export default function AbandonPage() {
  return (
    <main id="main-content">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <h1>Prise en charge</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container-mid">
          <div className="section-with-aside">
            <div>
              <p className="text-large mb-md">
                Nous recueillons en priorité les animaux des personnes <strong>hospitalisées, placées en maison de retraite ou décédées</strong>, ainsi que les portées de chatons non désirés.
              </p>
              <p className="text-large mb-md">
                La prise en charge se fait <strong>sous réserve des places disponibles</strong> dans nos familles d&apos;accueil. Nous ne possédons pas de refuge.
              </p>

              <div className="alert alert-warning mb-lg">
                <p>
                  Vous n&apos;avez pas encore exploré les alternatives ? Consultez d&apos;abord <Link href="/abandon/solutions" className="link-amber">les solutions pour éviter l&apos;abandon</Link>.
                </p>
              </div>

              <div className="alert alert-error"><p><em><strong>L'abandon d'un animal domestique est puni de trois ans d'emprisonnement et de 45 000 euros d'amende (article 521-1 du Code pénal). En cas d'abandon présentant un risque de mort, les peines sont portées à quatre ans et 60 000 euros.</strong></em></p><p>Nous utilisons le mot abandon car pour l'animal, c'est toujours ressenti comme tel. Dans l'intérêt de l'animal, nous sommes disposés à le recueillir sous réserve des places disponibles.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <CollapsibleFormSection
        id="formulaire"
        title="Formulaire de prise en charge"
        subtitle="Décrivez votre situation et nous vous recontacterons."
        buttonLabel="Remplir le formulaire"
        containerClass="container-mid"
      >
        <AbandonFormDynamic />
      </CollapsibleFormSection>
    </main>
  );
}