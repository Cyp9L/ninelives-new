import Link from 'next/link';

export const metadata = {
  title: "Solutions pour éviter l'abandon | Nine Lives Paris",
  description: "Il existe toujours une solution pour éviter l'abandon de votre animal. Découvrez les alternatives.",
};

export default function SolutionsAbandonPage() {
  const pStyle = {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#4b5563',
    marginBottom: '0.75rem',
  };

  const h2Style = {
    fontSize: '1.5rem',
    fontWeight: '500' as const,
    color: '#1f2937',
    marginBottom: '1rem',
    marginTop: '0',
  };

  const linkStyle = {
    color: '#667eea',
    textDecoration: 'underline' as const,
  };

  const detailsStyle = {
    background: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    marginBottom: '0.5rem',
  };

  const summaryStyle = {
    padding: '0.85rem 1.25rem',
    fontSize: '1.05rem',
    fontWeight: '600' as const,
    color: '#1f2937',
    cursor: 'pointer',
    listStyle: 'none' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const contentStyle = {
    padding: '0 1.25rem 1rem',
  };

  const sectionStyle = {
    padding: '2rem 2rem',
  };

  return (
    <main>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: '300', margin: 0 }}>
            Les solutions pour éviter l&apos;abandon
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={sectionStyle}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p style={{ ...pStyle, fontSize: '1.1rem' }}>
            Vos animaux sont des êtres sensibles. Vivre un abandon est <a href="https://www.francetvinfo.fr/animaux/certains-ne-bougent-plus-arretent-de-manger-se-laissent-mourir-les-refuges-pour-animaux-disent-halte-a-l-abandon_2239929.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>extrêmement traumatisant</a> pour eux. Quelle que soit la raison pour laquelle vous envisagez d&apos;abandonner votre animal, <strong>il existe forcément une solution</strong>.
          </p>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            Au bas mot, <a href="https://www.leparisien.fr/societe/abandons-d-animaux-les-francais-champions-d-europe-vraiment-19-06-2019-8096889.php" target="_blank" rel="noopener noreferrer" style={linkStyle}>100 000 animaux de compagnie</a> sont abandonnés chaque année. Lisez ce qui suit afin de ne pas faire grossir ce chiffre.
          </p>
        </div>
      </section>

      {/* Vacances */}
      <section style={{ ...sectionStyle, background: '#f9fafb' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={h2Style}>🏖️ Vous partez en vacances ?</h2>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>🐱 Chat, peu de budget, moins de 2 semaines</summary>
            <div style={contentStyle}>
              <p style={pStyle}>
                Votre chat peut rester jusqu&apos;à 2 semaines chez vous si une personne de confiance passe quotidiennement lui donner à manger, nettoyer sa litière et vérifier qu&apos;il va bien. Organisez des échanges de garde avec votre voisinage.
              </p>
              <p style={{ ...pStyle, marginBottom: 0 }}>
                Sinon : <a href="https://www.animal-fute.com/accueil-new.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>Animal Futé</a> (échange de garde, 9,90€/an), <a href="https://pabete.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Pabete.com</a> (0 à 4€/jour), <a href="https://www.nomador.com/fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Nomador</a> (à partir de 29€/trimestre).
              </p>
            </div>
          </details>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>🐱 Chat, un budget, moins de 2 semaines</summary>
            <div style={contentStyle}>
              <p style={{ ...pStyle, marginBottom: 0 }}>
                Optez pour un.e petsitter à domicile : <a href="http://animaute.fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Animaute</a> (assurance et assistance vétérinaire incluses), <a href="https://fr.catinaflat.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cat in a Flat</a> (garantie vétérinaire), ou <a href="https://www.nomador.com/fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Nomador</a>.
              </p>
            </div>
          </details>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>🐱 Chat, plus de 2 semaines</summary>
            <div style={contentStyle}>
              <p style={{ ...pStyle, marginBottom: 0 }}>
                C&apos;est trop long pour laisser votre chat seul. Proposez à un.e ami.e de s&apos;installer chez vous, ou placez-le en pension : <a href="https://www.lemoustachepensionparis.fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Le Moustache</a> (Paris), ou consultez <a href="https://wamiz.com/chats/garde/pension/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Wamiz</a>. Pensez à vous y prendre plusieurs semaines en avance.
              </p>
            </div>
          </details>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>🐶 Chien</summary>
            <div style={contentStyle}>
              <p style={pStyle}>
                Emmenez-le ! Hébergements dog-friendly : <a href="https://www.nosvacancesentreamis.com/bonnes-adresses/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Vacances entre amis</a>, <a href="https://www.club-oscar.fr/partenaires-privileges-hebergements-touristiques-oscar" target="_blank" rel="noopener noreferrer" style={linkStyle}>Club Oscar</a>, <a href="https://emmenetonchien.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Emmène ton chien</a>.
              </p>
              <p style={{ ...pStyle, marginBottom: 0 }}>
                Pour la garde : <a href="https://www.empruntemontoutou.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Emprunte mon toutou</a> (29,90€/an, assurance incluse), <a href="https://pabete.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Pabete.com</a> (0 à 4€/jour), ou une <a href="https://wamiz.com/chiens/garde/pension/" target="_blank" rel="noopener noreferrer" style={linkStyle}>pension</a>.
              </p>
            </div>
          </details>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>🐰 Lapin ou NAC</summary>
            <div style={contentStyle}>
              <p style={{ ...pStyle, marginBottom: 0 }}>
                Consultez notre <a href="https://ninelives.fr/lapins-vacances/" target="_blank" rel="noopener noreferrer" style={linkStyle}>article dédié</a> pour trouver une solution adaptée.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Toxoplasmose */}
      <section style={sectionStyle}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={h2Style}>🤰 Enceinte et toxoplasmose ?</h2>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            Prenez 2 minutes pour <a href="https://www.lexpress.fr/actualite/societe/sante/grossesse-quels-risques-de-toxoplasmose-avec-un-chat_1007102.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>vous informer</a> : le risque est bien plus faible que vous ne le pensez.
          </p>
        </div>
      </section>

      {/* Autres raisons */}
      <section style={{ ...sectionStyle, background: '#f9fafb' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={h2Style}>Autre raison ?</h2>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>💰 Pas les moyens de le soigner ?</summary>
            <div style={contentStyle}>
              <p style={{ ...pStyle, marginBottom: 0 }}>
                Il existe des dispensaires pratiquant des actes vétérinaires à bas prix. Au minimum, demandez à votre vétérinaire le règlement en 3 fois. <a href="https://www.fondationassistanceauxanimaux.org/dispensaires-animaux/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Liste des dispensaires →</a>
              </p>
            </div>
          </details>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>🚽 Chat pas propre ?</summary>
            <div style={contentStyle}>
              <p style={{ ...pStyle, marginBottom: 0 }}>
                Ce problème se résout souvent par la stérilisation, le déplacement de la litière dans un endroit plus intime, ou un changement de configuration du bac. <a href="https://educhateur.fr/proprete/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Les changements à apporter →</a>
              </p>
            </div>
          </details>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>📦 Logement plus petit ?</summary>
            <div style={contentStyle}>
              <p style={{ ...pStyle, marginBottom: 0 }}>
                Votre chat sera bien plus malheureux en perdant sa famille qu&apos;en vivant dans un espace plus réduit. Aménagez son environnement pour compenser. <a href="https://www.equilicat.com/post/mon-chat-s-ennuie-comment-l-occuper" target="_blank" rel="noopener noreferrer" style={linkStyle}>Comment faire →</a>
              </p>
            </div>
          </details>

          <details style={detailsStyle}>
            <summary style={summaryStyle}>😾 Problème de comportement ?</summary>
            <div style={contentStyle}>
              <p style={{ ...pStyle, marginBottom: 0 }}>
                Sevrage affectif insuffisant, ennui, hyperattachement : un.e comportementaliste peut vous aider. <a href="https://educhateur.fr/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Consultez un comportementaliste →</a>
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Final */}
      <section style={sectionStyle}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '6px',
            padding: '1.25rem',
            lineHeight: '1.7',
            color: '#92400e',
            fontSize: '0.95rem'
          }}>
            <p style={{ marginBottom: '0.75rem' }}>
              Si malgré tout, vous souhaitez abandonner votre animal, consultez <a href="https://www.secondechance.org/refuge/recherche" target="_blank" rel="noopener noreferrer" style={{ color: '#92400e', textDecoration: 'underline' }}>Seconde Chance</a> pour trouver une association près de chez vous, ou, en Île-de-France, remplissez le formulaire sur <Link href="/abandon" style={{ color: '#92400e', textDecoration: 'underline', fontWeight: '600' }}>cette page</Link>.
            </p>
            <p style={{ margin: 0 }}>
              Nous n&apos;accueillons plus de lapins, très peu de chiens, et ne sommes pas en mesure de prendre en charge tous les chats. Priorité aux animaux de personnes hospitalisées, placées en maison de retraite ou décédées.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
