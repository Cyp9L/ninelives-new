export const metadata = {
  title: 'Politique de confidentialité | Nine Lives Paris',
};

export default function PolitiqueConfidentialitePage() {
  const sectionStyle = {
    marginBottom: '2rem',
  };

  const h2Style = {
    fontSize: '1.5rem',
    fontWeight: '600' as const,
    color: '#1f2937',
    marginBottom: '1rem',
    marginTop: '2.5rem',
  };

  const pStyle = {
    fontSize: '1.05rem',
    lineHeight: '1.8',
    color: '#4b5563',
    marginBottom: '1rem',
  };

  return (
    <main>
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '300' }}>Politique de confidentialité</h1>
          <p style={{ marginTop: '0.5rem', opacity: 0.8, fontStyle: 'italic' }}>Dernière mise à jour : février 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Responsable du traitement</h2>
            <p style={pStyle}>
              Association Nine Lives Paris, RNA W751248523, dont le siège social est situé 133 rue du Faubourg du Temple, 75010 Paris. Pour toute question relative à vos données personnelles : <a href="mailto:asso@ninelives.fr" style={{ color: '#667eea', textDecoration: 'underline' }}>asso@ninelives.fr</a>.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Données collectées et finalités</h2>
            <p style={pStyle}>
              Nous collectons les données que vous nous communiquez volontairement via les formulaires de notre site, dans le cadre de nos missions de protection animale.
            </p>
            <p style={pStyle}>
              <strong>Formulaire de pré-adoption.</strong> Nom, prénom, adresse postale, téléphone, e-mail, âge, informations sur votre logement, votre foyer, vos animaux et votre projet d&apos;adoption. Ces données sont traitées pour évaluer les demandes d&apos;adoption et assurer le bien-être des animaux placés. Une copie de pièce d&apos;identité et un justificatif de domicile sont demandés lors de la finalisation de l&apos;adoption.
            </p>
            <p style={pStyle}>
              <strong>Formulaire de prise en charge.</strong> Nom, prénom, e-mail, téléphone, adresse postale, ainsi que les informations relatives à l&apos;animal concerné. Ces données sont traitées pour évaluer la situation de l&apos;animal et organiser sa prise en charge.
            </p>
            <p style={pStyle}>
              <strong>Formulaire de bénévolat et famille d&apos;accueil.</strong> Nom, prénom, âge, adresse postale, e-mail, téléphone, disponibilités et préférences de mission. Ces données sont traitées pour vous proposer des missions adaptées à votre profil.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Base juridique</h2>
            <p style={pStyle}>
              Le traitement de vos données repose sur l&apos;intérêt légitime de l&apos;association (article 6.1.f du RGPD), à savoir la poursuite de son objet associatif de protection animale, et sur votre consentement lorsque celui-ci vous est demandé (article 6.1.a).
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Caractère obligatoire des données</h2>
            <p style={pStyle}>
              Les champs marqués d&apos;un astérisque sont nécessaires au traitement de votre demande. Si vous ne les remplissez pas, nous ne serons pas en mesure de traiter votre candidature à l&apos;adoption, votre demande de prise en charge ou votre candidature au bénévolat, selon le formulaire concerné.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Destinataires</h2>
            <p style={pStyle}>
              Vos données sont accessibles aux seuls bénévoles de l&apos;association habilités à traiter votre demande. Elles ne sont ni vendues ni cédées à des tiers à des fins commerciales.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Durée de conservation</h2>
            <p style={pStyle}>
              Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis supprimées dans un délai raisonnable à compter de la clôture du dossier. Les données relatives aux adoptions réalisées sont conservées pendant la durée de vie estimée de l&apos;animal, afin de permettre un suivi en cas de besoin.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Cookies et services tiers</h2>
            <p style={pStyle}>
              Le site utilise Cloudflare Turnstile, un service de vérification anti-robot, lors de la soumission des formulaires. Ce service peut déposer des cookies strictement nécessaires au fonctionnement du formulaire. Aucun cookie publicitaire ou de suivi n&apos;est utilisé sur ce site.
            </p>
            <p style={pStyle}>
              Les dons sont collectés via la plateforme HelloAsso, vers laquelle vous êtes redirigé. Le traitement de vos données dans ce cadre est régi par la politique de confidentialité de HelloAsso.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Vos droits</h2>
            <p style={pStyle}>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation du traitement, de portabilité de vos données et d&apos;opposition au traitement. Vous pouvez également retirer votre consentement à tout moment lorsque celui-ci constitue la base du traitement.
            </p>
            <p style={pStyle}>
              Pour exercer ces droits, adressez votre demande à <a href="mailto:asso@ninelives.fr" style={{ color: '#667eea', textDecoration: 'underline' }}>asso@ninelives.fr</a> en précisant votre nom et l&apos;objet de votre demande. Nous y répondrons dans un délai d&apos;un mois.
            </p>
            <p style={pStyle}>
              En cas de difficulté, vous pouvez introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>www.cnil.fr</a>).
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Hébergement</h2>
            <p style={pStyle}>
              Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. Les données des formulaires transitent par les serveurs de Vercel. Pour en savoir plus : <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>vercel.com/legal/privacy-policy</a>.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
