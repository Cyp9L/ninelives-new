import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité et de traitement des données personnelles de l\'association Nine Lives Paris.',
};
export default function PolitiqueConfidentialitePage() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Politique de confidentialité</h1>
          <p className="text-small" style={{ opacity: 0.8, fontStyle: 'italic' }}>Dernière mise à jour : février 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">

          <h2>Responsable du traitement</h2>
          <p className="text-body">
            Association Nine Lives Paris, RNA W751248523, 133 rue du Faubourg du Temple, 75010 Paris. Contact : <a href="mailto:asso@ninelives.fr" className="link-purple">asso@ninelives.fr</a>.
          </p>

          <h2>Données collectées et finalités</h2>
          <p className="text-body">
            Nous collectons les données que vous nous communiquez volontairement via les formulaires, dans le cadre de nos missions de protection animale.
          </p>
          <p className="text-body">
            <strong>Formulaire de pré-adoption.</strong> Nom, prénom, adresse, téléphone, e-mail, âge, informations sur votre logement, foyer, animaux et projet d&apos;adoption. Traitées pour évaluer les demandes et assurer le bien-être des animaux. Pièce d&apos;identité et justificatif de domicile demandés lors de la finalisation.
          </p>
          <p className="text-body">
            <strong>Formulaire de prise en charge.</strong> Nom, prénom, e-mail, téléphone, adresse, informations sur l&apos;animal. Traitées pour évaluer la situation et organiser la prise en charge.
          </p>
          <p className="text-body">
            <strong>Formulaire de bénévolat.</strong> Nom, prénom, âge, adresse, e-mail, téléphone, disponibilités et préférences. Traitées pour vous proposer des missions adaptées.
          </p>

          <h2>Base juridique</h2>
          <p className="text-body">
            Intérêt légitime de l&apos;association (article 6.1.f du RGPD) et consentement lorsqu&apos;il vous est demandé (article 6.1.a).
          </p>

          <h2>Caractère obligatoire des données</h2>
          <p className="text-body">
            Les champs marqués d&apos;un astérisque sont nécessaires au traitement. Sans eux, nous ne pourrons pas traiter votre demande.
          </p>

          <h2>Destinataires</h2>
          <p className="text-body">
            Vos données sont accessibles aux seuls bénévoles habilités. Elles ne sont ni vendues ni cédées à des tiers à des fins commerciales.
          </p>

          <h2>Durée de conservation</h2>
          <p className="text-body">
            Conservées pendant la durée de traitement, puis supprimées dans un délai raisonnable. Les données d&apos;adoption sont conservées pendant la durée de vie estimée de l&apos;animal pour permettre un suivi.
          </p>

          <h2>Cookies et services tiers</h2>
          <p className="text-body">
            Le site utilise Cloudflare Turnstile (vérification anti-robot) qui peut déposer des cookies strictement nécessaires. Aucun cookie publicitaire ou de suivi.
          </p>
          <p className="text-body">
            Les dons sont collectés via HelloAsso, régi par sa propre politique de confidentialité.
          </p>
          <p className="text-body">
            Les formulaires transitent par e-mail via Resend (Resend, Inc.), serveurs dans l&apos;Union européenne.
          </p>

          <h2>Vos droits</h2>
          <p className="text-body">
            Conformément au RGPD : droit d&apos;accès, rectification, effacement, limitation, portabilité et opposition. Retrait du consentement possible à tout moment.
          </p>
          <p className="text-body">
            Contactez <a href="mailto:asso@ninelives.fr" className="link-purple">asso@ninelives.fr</a> en précisant votre nom et l&apos;objet. Réponse sous un mois.
          </p>
          <p className="text-body">
            Réclamation possible auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="link-purple">CNIL</a>.
          </p>

          <h2>Hébergement</h2>
          <p className="text-body">
            Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="link-purple">Politique de confidentialité Vercel</a>.
          </p>

        </div>
      </section>
    </main>
  );
}