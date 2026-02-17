export const metadata = {
  title: 'Faire un don | Nine Lives Paris',
  description: 'Soutenez notre association en faisant un don financier ou matériel pour sauver des vies.',
};

export default function DonnerPage() {
  return (
    <main>
      {/* Header */}
      <section style={{ 
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '0' }}>
            Faire un don
          </h1>
        </div>
      </section>

      {/* Financial Donation Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                background: '#f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="60" height="60" fill="white">
                  <path d="M256,0c-61.206,0-111,49.794-111,111c0,31.92,13.549,60.732,35.191,81h151.617C353.451,171.732,367,142.92,367,111C367,49.794,317.206,0,256,0z M285.732,135.953c-1.511,3.049-3.501,5.546-5.969,7.492c-2.47,1.947-5.289,3.415-8.456,4.407c-3.169,0.992-6.449,1.598-9.838,1.818V163h-8.843v-13.551c-5.084-0.44-10.133-1.432-15.143-2.975c-5.012-1.542-9.506-3.487-13.485-5.839l9.285-18.839c1.99,1.25,4.126,2.424,6.411,3.526c1.915,0.955,4.145,1.892,6.687,2.809c2.543,0.919,5.14,1.562,7.793,1.928v-9.695c-2.283-0.587-4.568-1.284-6.851-2.093c-3.465-1.174-6.449-2.441-8.954-3.801c-2.506-1.358-4.57-2.901-6.19-4.627c-1.622-1.725-2.819-3.691-3.593-5.894c-0.774-2.204-1.16-4.737-1.16-7.601c0-3.966,0.663-7.473,1.99-10.522c1.326-3.047,3.131-5.673,5.416-7.877c2.284-2.204,4.955-3.966,8.014-5.288c3.057-1.322,6.318-2.166,9.782-2.534V59h8.843v11.237c2.432,0.294,4.789,0.735,7.074,1.322c2.283,0.589,4.477,1.267,6.577,2.038c2.1,0.771,4.071,1.581,5.913,2.424c1.841,0.845,3.537,1.635,5.085,2.368l-9.285,17.737c-1.622-1.027-3.391-1.983-5.306-2.864c-1.622-0.807-3.445-1.56-5.471-2.258c-2.027-0.697-4.072-1.229-6.135-1.598v9.915c0.663,0.148,1.363,0.35,2.1,0.606c0.736,0.258,1.51,0.496,2.321,0.717c3.61,1.101,6.871,2.313,9.782,3.635c2.911,1.322,5.397,2.883,7.461,4.682c2.062,1.801,3.648,3.985,4.753,6.555c1.105,2.572,1.658,5.693,1.658,9.365C287.998,129.216,287.241,132.906,285.732,135.953z"/>
                  <rect x="61" y="222" width="390" height="30"/>
                  <path d="M86,282v230h340V282H86z M320.822,388.82L256,453.639l-64.82-64.819c-17.545-17.546-17.545-46.094,0-63.64c17.546-17.544,46.095-17.544,63.64,0l1.181,1.18l1.18-1.18c17.546-17.544,46.095-17.544,63.64,0C338.366,342.726,338.366,371.275,320.822,388.82z"/>
                </svg>
              </div>

              <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '2rem' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  <strong>Sauver des vies a un coût.</strong>
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  L'expérience nous a appris que même un chat vacciné, qui a toujours vécu en appartement, qui semble en bonne santé et qui est abandonné directement dans nos bras peut cacher des calculs rénaux, une insuffisance hépatique, une leucémie, ou autre.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Sans parler des animaux sortis de fourrière ou des chatons trouvés dans la rue. Les soins d'urgence, auxquels s'ajoutent le prix des vaccins, de l'identification, de la stérilisation, et évidemment les frais de base (alimentation et litière), font que la facture s'alourdit vite.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Nous avons toute la bonne volonté du monde, nous avons l'expérience, nous avons une super équipe de bénévoles et de familles d'accueil, tout ce qu'il nous manque pour sauver des vies, ce sont les fonds.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  <strong>Nous comptons sur votre soutien pour nous aider à sauver ces vies.</strong>
                </p>
              </div>

              <a 
                href="https://www.helloasso.com/associations/nine-lives-paris/formulaires/1/" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '1.125rem', display: 'inline-block' }}
              >
                Faire un don financier
              </a>

              <p style={{ marginTop: '1.5rem', color: '#6b7280', fontSize: '0.95rem' }}>
                Vos dons à l'association sont déductibles des impôts à hauteur de 66%.<br />
                <strong>Votre don de 100€ ne vous coûte que 34€ !</strong>
              </p>
            </div>

            <div style={{ 
              height: '600px',
              background: 'url(/images/wiskey.jpg) center/cover',
              borderRadius: '8px'
            }} />
          </div>
        </div>
      </section>

      {/* Material Donation Section */}
      <section className="section section-gray">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ 
              height: '600px',
              background: 'url(/images/salomon.webp) center/cover',
              borderRadius: '8px'
            }} />

            <div>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                background: '#f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="60" height="60" fill="white">
                  <path d="M429.965,106C433.813,98.493,436,90,436,81c0-30.327-24.673-55-55-55c-15.75,0-29.964,6.665-40,17.31C330.964,32.665,316.75,26,301,26c-30.327,0-55,24.673-55,55c0,9,2.187,17.493,6.035,25H191v60h300v-60H429.965z M326,106h-25c-13.785,0-25-11.215-25-25c0-13.785,11.215-25,25-25c13.785,0,25,11.215,25,25V106z M381,106h-25V81c0-13.785,11.215-25,25-25c13.785,0,25,11.215,25,25C406,94.785,394.785,106,381,106z"/>
                  <path d="M495.314,352.424c-10.604-7.836-23.915-10.111-36.517-6.237c-17.807,6.081-33.984,16.16-47.289,29.466l-12.449,12.449C389.338,399.486,375.258,406,360.309,406H250.727l-0.281-0.009c-13.121-0.058-25.438-5.177-34.728-14.457l21.203-21.225c3.673,3.67,8.554,5.687,13.752,5.687c0.031,0,109.636,0.004,109.636,0.004c6.242,0,12.126-2.779,16.144-7.625l30.9-30.993C399.897,319.044,381.824,306,361,306h-91.155l-39.932-38.792c-14.075-13.674-32.634-21.204-52.256-21.204L110,246v202.379C131.048,471.48,161.36,486,195,486h172.692l122.271-64.073C503.556,414.805,512,400.846,512,385.499C512,372.314,505.918,360.259,495.314,352.424z"/>
                  <path d="M211,196v25.404c14.767,4.933,28.355,13.151,39.817,24.286l31.2,30.31H361c16.191,0,31.828,4.882,45.22,14.117c12.315,8.493,21.939,20.1,27.953,33.682c4.869-2.263,9.855-4.27,14.93-6.003l0.437-0.149l0.441-0.136c6.85-2.106,13.921-3.174,21.015-3.174c0.001,0,0.002,0,0.003,0V196H211z"/>
                </svg>
              </div>

              <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '2rem' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  <strong>Nous avons sans cesse besoin de matériel.</strong>
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Caisses de transport, bacs à litière, cages à lapins (pour effectuer les quarantaines), mais également antiparasitaires (antipuces et vermifuges), nourriture et litière, jouets, griffoirs pour nos familles d'accueil, …
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Ce sont des choses que bien souvent vous avez chez vous et qui pourraient nous être d'une grande utilité. Vous pouvez choisir d'en faire don à l'association, il suffit de <a href="/contact" style={{ color: '#f59e0b', textDecoration: 'underline' }}>nous contacter</a> et nous enverrons quelqu'un pour récupérer vos dons.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Si vous n'avez rien en stock, vous pouvez également choisir d'offrir à nos petits protégés un ou plusieurs cadeaux qui se trouvent sur notre liste de cadeaux en ligne, ou vous en inspirer !
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  <strong>Il n'y a pas de petit don, toute aide est la bienvenue et contribue à sauver des chats.</strong>
                </p>
              </div>

              <a 
                href="https://www.kadolog.com/fr/list/un-cadeau-pour-les-proteges-de-lassociation" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '1.125rem', display: 'inline-block' }}
              >
                Faire un don matériel
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
