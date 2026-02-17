import Link from 'next/link';

export const metadata = {
  title: 'Solutions pour éviter l\'abandon | Nine Lives Paris',
  description: 'Il existe toujours une solution pour éviter l\'abandon de votre animal. Découvrez les alternatives.',
};

export default function SolutionsAbandonPage() {
  const pStyle = {
    fontSize: '1.05rem',
    lineHeight: '1.8',
    color: '#4b5563',
    marginBottom: '1rem',
  };

  const h2Style = {
    fontSize: '2rem',
    fontWeight: '300' as const,
    color: '#1f2937',
    marginBottom: '1.5rem',
    marginTop: '3rem',
  };

  const h3Style = {
    fontSize: '1.25rem',
    fontWeight: '600' as const,
    color: '#1f2937',
    marginBottom: '1rem',
    marginTop: '2rem',
  };

  const linkStyle = {
    color: '#667eea',
    textDecoration: 'underline' as const,
  };

  const cardStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    marginBottom: '1.5rem',
  };

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
          <h1 style={{ fontSize: '3rem', fontWeight: '300' }}>
            Les solutions pour éviter l&apos;abandon
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <p style={{ ...pStyle, fontSize: '1.2rem' }}>
            Vos animaux sont des êtres sensibles. Ils n&apos;ont bien souvent connu que vous, vivre un abandon est donc <a href="https://www.francetvinfo.fr/animaux/certains-ne-bougent-plus-arretent-de-manger-se-laissent-mourir-les-refuges-pour-animaux-disent-halte-a-l-abandon_2239929.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>extrêmement traumatisant</a> pour eux. Quelle que soit la raison pour laquelle vous envisagez d&apos;abandonner votre animal, <strong>il existe forcément une solution</strong>.
          </p>
          <p style={pStyle}>
            Au bas mot, <a href="https://www.leparisien.fr/societe/abandons-d-animaux-les-francais-champions-d-europe-vraiment-19-06-2019-8096889.php" target="_blank" rel="noopener noreferrer" style={linkStyle}>100 000 animaux de compagnie</a> sont abandonnés chaque année. Lisez ce qui suit afin de ne pas faire grossir ce chiffre.
          </p>
        </div>
      </section>

      {/* Vacances */}
      <section className="section section-gray">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={h2Style}>🏖️ Vous partez en vacances ?</h2>
          <p style={pStyle}>
            Il existe de nombreuses solutions vous permettant de partir en vacances pour une durée plus ou moins longue lorsque vous avez un animal.
          </p>

          <div style={cardStyle}>
            <h3 style={h3Style}>🐱 Vous avez un chat, peu de budget, et vous partez moins de 2 semaines ?</h3>
            <p style={pStyle}>
              Votre chat peut tout à fait rester jusqu&apos;à 2 semaines chez vous si une personne de confiance passe quotidiennement lui donner à manger et à boire, nettoyer sa litière et vérifier qu&apos;il va bien. Il peut s&apos;agir d&apos;un.e voisin.e, un.e ami.e… Si vous avez plusieurs chats, encore mieux ! Ils ne s&apos;ennuieront pas en votre absence.
            </p>
            <p style={pStyle}>
              Vous pouvez également organiser avec votre voisinage des échanges de gardes.
            </p>
            <p style={pStyle}>
              Si vous ne connaissez personne, grâce à <a href="https://www.animal-fute.com/accueil-new.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>Animal Futé</a>, vous pourrez être mis en contact avec un particulier proche de chez vous pour un échange de garde (9,90€/an). <a href="https://pabete.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Pabete.com</a> propose des gardes entre 0 et 4€/jour. <a href="https://www.nomador.com/fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Nomador</a> vous met en relation avec des particuliers qui viennent chez vous pendant votre absence (à partir de 29€/trimestre).
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={h3Style}>🐱 Vous avez un chat, un budget, et vous partez moins de 2 semaines ?</h3>
            <p style={pStyle}>
              Optez pour la visite d&apos;un.e petsitter à votre domicile ! Cela vous permettra de bénéficier dans certains cas d&apos;une assurance ou d&apos;une garantie vétérinaire.
            </p>
            <p style={pStyle}>
              Vous pouvez trouver des petsitters sur <a href="http://animaute.fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Animaute</a> (assurance et assistance vétérinaire incluses), <a href="https://fr.catinaflat.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cat in a Flat</a> (garantie vétérinaire) ou <a href="https://www.nomador.com/fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Nomador</a>.
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={h3Style}>🐱 Vous avez un chat et vous partez plus de 2 semaines ?</h3>
            <p style={pStyle}>
              C&apos;est trop long pour laisser votre chat seul. Proposez à un.e ami.e de s&apos;installer chez vous, ou faites-le garder chez une personne de confiance.
            </p>
            <p style={pStyle}>
              Sinon, placez-le en pension. En région parisienne : <a href="https://www.lemoustachepensionparis.fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Le Moustache</a>. Ailleurs : consultez la liste sur <a href="https://wamiz.com/chats/garde/pension/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Wamiz</a>. Pensez à vous y prendre plusieurs semaines en avance.
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={h3Style}>🐶 Vous avez un chien ?</h3>
            <p style={pStyle}>
              Vous pouvez emmener votre chien avec vous ! Les hébergements acceptant les chiens sont de plus en plus nombreux. Consultez <a href="https://www.nosvacancesentreamis.com/bonnes-adresses/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Vacances entre amis</a> (Fondation 30 Millions d&apos;Amis), le <a href="https://www.club-oscar.fr/partenaires-privileges-hebergements-touristiques-oscar" target="_blank" rel="noopener noreferrer" style={linkStyle}>Club Oscar</a>, ou <a href="https://emmenetonchien.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Emmène ton chien</a>.
            </p>
            <p style={pStyle}>
              Pour la garde : <a href="https://www.empruntemontoutou.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Emprunte mon toutou</a> (29,90€/an, assurance incluse), <a href="https://pabete.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Pabete.com</a> (0 à 4€/jour), ou une <a href="https://wamiz.com/chiens/garde/pension/" target="_blank" rel="noopener noreferrer" style={linkStyle}>pension</a>.
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={h3Style}>🐰 Vous avez un lapin ou un NAC ?</h3>
            <p style={pStyle}>
              Nous avons rédigé un <a href="https://ninelives.fr/lapins-vacances/" target="_blank" rel="noopener noreferrer" style={linkStyle}>article spécifique</a> afin de vous aider à trouver une solution adaptée à votre animal.
            </p>
          </div>
        </div>
      </section>

      {/* Toxoplasmose */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={h2Style}>🤰 Vous êtes enceinte et vous craignez la toxoplasmose ?</h2>
          <p style={pStyle}>
            Merci de bien vouloir prendre 2 minutes pour <a href="https://www.lexpress.fr/actualite/societe/sante/grossesse-quels-risques-de-toxoplasmose-avec-un-chat_1007102.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>vous informer</a>.
          </p>
        </div>
      </section>

      {/* Autres raisons */}
      <section className="section section-gray">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={h2Style}>Vous souhaitez abandonner votre animal pour une autre raison ?</h2>

          <div style={cardStyle}>
            <h3 style={h3Style}>💰 Vous pensez ne pas avoir les moyens de le soigner ?</h3>
            <p style={pStyle}>
              Si vous avez de réelles difficultés financières, il existe de nombreux dispensaires qui peuvent pratiquer des actes vétérinaires à bas prix. Au minimum, demandez à votre vétérinaire le règlement en 3 fois.
            </p>
            <p style={pStyle}>
              <a href="https://www.fondationassistanceauxanimaux.org/dispensaires-animaux/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Fondation Assistance aux Animaux — Liste des dispensaires →</a>
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={h3Style}>🚽 Votre chat n&apos;est pas propre ?</h3>
            <p style={pStyle}>
              C&apos;est un problème qui se résout bien souvent soit en le faisant stériliser si ce n&apos;est pas déjà fait, soit en déplaçant sa litière si elle est située dans un endroit où le chat n&apos;a pas assez d&apos;intimité, soit en changeant la configuration du bac à litière.
            </p>
            <p style={pStyle}>
              <a href="https://educhateur.fr/proprete/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Les changements à apporter →</a>
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={h3Style}>📦 Vous avez déménagé dans un logement plus petit ?</h3>
            <p style={pStyle}>
              Votre chat sera probablement bien plus malheureux s&apos;il ne revoit plus la seule famille qu&apos;il ait jamais connu. Vous pouvez aménager son environnement afin de lui proposer suffisamment de stimulations.
            </p>
            <p style={pStyle}>
              <a href="https://www.equilicat.com/post/mon-chat-s-ennuie-comment-l-occuper" target="_blank" rel="noopener noreferrer" style={linkStyle}>Aménagez son environnement →</a>
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={h3Style}>😾 Votre animal a un problème de comportement ?</h3>
            <p style={pStyle}>
              Votre chat n&apos;a peut-être pas été sevré affectivement, ou bien il s&apos;ennuie. Votre chien fait peut-être de l&apos;hyperattachement. Vous pouvez consulter un.e comportementaliste qui vous aidera à trouver des solutions.
            </p>
            <p style={pStyle}>
              <a href="https://educhateur.fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Consultez un comportementaliste →</a>
            </p>
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '8px',
            padding: '2rem',
            lineHeight: '1.8',
            color: '#92400e'
          }}>
            <p style={{ marginBottom: '1rem' }}>
              Si malgré tout cela, vous souhaitez toujours abandonner votre animal, vous pouvez trouver une liste des associations proches de chez vous sur le site de <a href="https://www.secondechance.org/refuge/recherche" target="_blank" rel="noopener noreferrer" style={{ color: '#92400e', textDecoration: 'underline' }}>Seconde Chance</a>, ou, si vous êtes en Île-de-France, nous contacter en remplissant le formulaire figurant sur <Link href="/abandon" style={{ color: '#92400e', textDecoration: 'underline', fontWeight: '600' }}>cette page</Link>.
            </p>
            <p>
              Nous n&apos;accueillons actuellement plus de lapins, très peu de chiens, et au vu du nombre indécent des demandes d&apos;abandons de chats, nous ne sommes pas en mesure de tous les accueillir. Nous donnons la priorité aux animaux appartenant à des personnes hospitalisées, placées en maison de retraite ou décédées, sous réserve des places disponibles.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
