import Link from 'next/link';
import Image from 'next/image';
import HeroLcp from '@/components/HeroLcp';

export const metadata = {
  title: "Solutions pour éviter l'abandon | Nine Lives Paris",
  description: "Il existe toujours une solution pour éviter l'abandon de votre animal. Découvrez les alternatives.",
};

export default function SolutionsAbandonPage() {
  return (
    <main id="main-content">
      {/* Header */}
      <HeroLcp src="/images/site/29012021-IMG_3094.webp" noOverlay>
        <div className="hero-content">
          <h1>Les solutions pour éviter l&apos;abandon</h1>
        </div>
      </HeroLcp>

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

      {/* Vous avez trouvé un animal ? */}
      <section id="trouve" className="section section-gray">
        <div className="container-narrow">
          <h2>Vous avez trouvé un animal ?</h2>
          <div className="float-img-left">
            <Image src="/images/gallery/1771791278821-84743240_608995653004686_7948898929091805184_o.webp" alt="Chien perdu" width={600} height={400} sizes="(max-width: 425px) 75vw, (max-width: 768px) 60vw, 40vw" />
          </div>
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
                Si vous ne pouvez pas le garder, <Link href="/abandon#formulaire" className="link-blue">contactez-nous</Link> ou d&apos;autres associations. Prenez des photos et diffusez-les : affiches dans le quartier, annonce sur <a href="https://www.petalert.fr/" target="_blank" rel="noopener noreferrer" className="link-blue">PetAlert</a> et sur les <a href="https://www.facebook.com/AnimauxPerdusTrouves.fr/" target="_blank" rel="noopener noreferrer" className="link-blue">groupes Facebook dédiés</a>.
              </p>
            </div>
          </div>

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
                Source : <a href="https://www.faune-alfort.org/jai-trouve-un-animal-en-detresse-que-faire/" target="_blank" rel="noopener noreferrer" className="link-blue">faune-alfort.org</a>
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

      {/* Vacances */}
      <section className="section">
        <div className="container-narrow">
          <h2>🏖️ Vous partez en vacances ?</h2>
          <div className="section-with-aside">
            <div>
              <p className="text-large mb-lg">
                Quelques solutions selon votre situation :
              </p>

              <details className="accordion" open>
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
            </div>
            <Image src="/images/gallery/1771791291916-FullSizeRenderb.webp" alt="Look up" width={500} height={400} sizes="(max-width: 768px) 100vw, 300px" />
          </div>
        </div>
      </section>

      {/* Autres raisons */}
      <section className="section section-gray">
        <div className="container-narrow">
          <h2>Autre raison ?</h2>
          <div className="section-with-aside">
            <Image src="/images/gallery/1771693098283-Phoenix.webp" alt="Chaton assis" width={500} height={400} sizes="(max-width: 768px) 100vw, 300px" />
            <div>
              <details className="accordion">
                <summary>🤰 Enceinte et toxoplasmose ?</summary>
                <div className="accordion-content">
                  <p className="text-body">
                    Prenez 2 minutes pour <a href="https://www.lexpress.fr/actualite/societe/sante/grossesse-quels-risques-de-toxoplasmose-avec-un-chat_1007102.html" target="_blank" rel="noopener noreferrer" className="link-purple">vous informer</a> : le risque est bien plus faible que vous ne le pensez.
                  </p>
                </div>
              </details>

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
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="section">
        <div className="container-narrow">
          <div className="alert alert-warning">
            <p>
              Si malgré tout vous souhaitez nous confier un animal, remplissez le formulaire sur <Link href="/abandon" className="link-amber">cette page</Link>.
            </p>
            <p>
              Vous pouvez aussi consulter <a href="https://www.secondechance.org/refuge/recherche" target="_blank" rel="noopener noreferrer" className="link-amber">Seconde Chance</a> pour trouver une association près de chez vous.
            </p>
            </div>
        </div>
      </section>
    </main>
  );
}