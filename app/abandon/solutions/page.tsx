import Link from 'next/link';

export const metadata = {
  title: "Solutions pour éviter l'abandon | Nine Lives Paris",
  description: "Il existe toujours une solution pour éviter l'abandon de votre animal. Découvrez les alternatives.",
};

export default function SolutionsAbandonPage() {
  return (
    <main>
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <h1>Les solutions pour éviter l&apos;abandon</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container-narrow">
          <p className="text-large mb-md">
            Vos animaux sont des êtres sensibles. Vivre un abandon est <a href="https://www.francetvinfo.fr/animaux/certains-ne-bougent-plus-arretent-de-manger-se-laissent-mourir-les-refuges-pour-animaux-disent-halte-a-l-abandon_2239929.html" target="_blank" rel="noopener noreferrer" className="link-purple">extrêmement traumatisant</a> pour eux. Quelle que soit la raison, <strong>il existe forcément une solution</strong>.
          </p>
          <p className="text-body">
            Au bas mot, <a href="https://www.leparisien.fr/societe/abandons-d-animaux-les-francais-champions-d-europe-vraiment-19-06-2019-8096889.php" target="_blank" rel="noopener noreferrer" className="link-purple">100 000 animaux</a> sont abandonnés chaque année. Lisez ce qui suit afin de ne pas faire grossir ce chiffre.
          </p>
        </div>
      </section>

      {/* Vacances */}
      <section className="section section-gray">
        <div className="container-narrow">
          <h2>🏖️ Vous partez en vacances ?</h2>

          <details className="accordion">
            <summary>🐱 Chat, peu de budget, moins de 2 semaines</summary>
            <div className="accordion-content">
              <p className="text-body">
                Votre chat peut rester chez vous si une personne passe quotidiennement. Organisez des échanges de garde avec votre voisinage.
              </p>
              <p className="text-body">
                Sinon : <a href="https://www.animal-fute.com/accueil-new.html" target="_blank" rel="noopener noreferrer" className="link-purple">Animal Futé</a> (9,90€/an), <a href="https://pabete.com/" target="_blank" rel="noopener noreferrer" className="link-purple">Pabete.com</a> (0 à 4€/jour), <a href="https://www.nomador.com/fr/" target="_blank" rel="noopener noreferrer" className="link-purple">Nomador</a> (à partir de 29€/trimestre).
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>🐱 Chat, un budget, moins de 2 semaines</summary>
            <div className="accordion-content">
              <p className="text-body">
                Petsitter à domicile : <a href="http://animaute.fr/" target="_blank" rel="noopener noreferrer" className="link-purple">Animaute</a> (assurance incluse), <a href="https://fr.catinaflat.com/" target="_blank" rel="noopener noreferrer" className="link-purple">Cat in a Flat</a> (garantie véto), ou <a href="https://www.nomador.com/fr/" target="_blank" rel="noopener noreferrer" className="link-purple">Nomador</a>.
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>🐱 Chat, plus de 2 semaines</summary>
            <div className="accordion-content">
              <p className="text-body">
                Trop long pour laisser votre chat seul. Proposez à un.e ami.e de s&apos;installer chez vous, ou pension : <a href="https://www.lemoustachepensionparis.fr/" target="_blank" rel="noopener noreferrer" className="link-purple">Le Moustache</a> (Paris), <a href="https://wamiz.com/chats/garde/pension/" target="_blank" rel="noopener noreferrer" className="link-purple">Wamiz</a>. Réservez plusieurs semaines en avance.
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>🐶 Chien</summary>
            <div className="accordion-content">
              <p className="text-body">
                Emmenez-le ! <a href="https://www.nosvacancesentreamis.com/bonnes-adresses/" target="_blank" rel="noopener noreferrer" className="link-purple">Vacances entre amis</a>, <a href="https://www.club-oscar.fr/partenaires-privileges-hebergements-touristiques-oscar" target="_blank" rel="noopener noreferrer" className="link-purple">Club Oscar</a>, <a href="https://emmenetonchien.com/" target="_blank" rel="noopener noreferrer" className="link-purple">Emmène ton chien</a>.
              </p>
              <p className="text-body">
                Pour la garde : <a href="https://www.empruntemontoutou.com/" target="_blank" rel="noopener noreferrer" className="link-purple">Emprunte mon toutou</a> (29,90€/an), <a href="https://pabete.com/" target="_blank" rel="noopener noreferrer" className="link-purple">Pabete.com</a>, ou une <a href="https://wamiz.com/chiens/garde/pension/" target="_blank" rel="noopener noreferrer" className="link-purple">pension</a>.
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>🐰 Lapin ou NAC</summary>
            <div className="accordion-content">
              <p className="text-body">
                Consultez notre <a href="https://ninelives.fr/lapins-vacances/" target="_blank" rel="noopener noreferrer" className="link-purple">article dédié</a> pour trouver une solution adaptée.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Toxoplasmose */}
      <section className="section">
        <div className="container-narrow">
          <h2>🤰 Enceinte et toxoplasmose ?</h2>
          <p className="text-body">
            Prenez 2 minutes pour <a href="https://www.lexpress.fr/actualite/societe/sante/grossesse-quels-risques-de-toxoplasmose-avec-un-chat_1007102.html" target="_blank" rel="noopener noreferrer" className="link-purple">vous informer</a> : le risque est bien plus faible que vous ne le pensez.
          </p>
        </div>
      </section>

      {/* Autres raisons */}
      <section className="section section-gray">
        <div className="container-narrow">
          <h2>Autre raison ?</h2>

          <details className="accordion">
            <summary>💰 Pas les moyens de le soigner ?</summary>
            <div className="accordion-content">
              <p className="text-body">
                Des dispensaires pratiquent des actes à bas prix. Demandez aussi le règlement en 3 fois à votre véto. <a href="https://www.fondationassistanceauxanimaux.org/dispensaires-animaux/" target="_blank" rel="noopener noreferrer" className="link-purple">Liste des dispensaires →</a>
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>🚽 Chat pas propre ?</summary>
            <div className="accordion-content">
              <p className="text-body">
                Se résout souvent par la stérilisation, un déplacement de la litière ou un changement de bac. <a href="https://educhateur.fr/proprete/" target="_blank" rel="noopener noreferrer" className="link-purple">Les changements à apporter →</a>
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>📦 Logement plus petit ?</summary>
            <div className="accordion-content">
              <p className="text-body">
                Votre chat sera bien plus malheureux en perdant sa famille qu&apos;en vivant dans un espace réduit. Aménagez-lui son environnement. <a href="https://www.equilicat.com/post/mon-chat-s-ennuie-comment-l-occuper" target="_blank" rel="noopener noreferrer" className="link-purple">Comment faire →</a>
              </p>
            </div>
          </details>

          <details className="accordion">
            <summary>😾 Problème de comportement ?</summary>
            <div className="accordion-content">
              <p className="text-body">
                Sevrage insuffisant, ennui, hyperattachement : un.e comportementaliste peut vous aider. <a href="https://educhateur.fr/" target="_blank" rel="noopener noreferrer" className="link-purple">Consultez un comportementaliste →</a>
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Final */}
      <section className="section">
        <div className="container-narrow">
          <div className="alert alert-warning">
            <p>
              Si malgré tout vous souhaitez abandonner votre animal, consultez <a href="https://www.secondechance.org/refuge/recherche" target="_blank" rel="noopener noreferrer" className="link-amber">Seconde Chance</a> pour trouver une association, ou remplissez le formulaire sur <Link href="/abandon" className="link-amber">cette page</Link>.
            </p>
            <p>
              Nous n&apos;accueillons plus de lapins, très peu de chiens, et ne pouvons pas prendre en charge tous les chats. Priorité aux animaux de personnes hospitalisées, placées en maison de retraite ou décédées.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}