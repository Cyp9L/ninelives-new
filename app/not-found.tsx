import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page-centered">
      <div className="text-center">
        <div className="card-icon" style={{ fontSize: '5rem' }}>🐱</div>
        <h1>Page introuvable</h1>
        <p className="text-large text-muted mb-xl">
          Cette page n&apos;existe pas ou n&apos;existe plus.
          Si vous cherchiez un chat, il a peut-être déjà été adopté ! 🎉
        </p>
        <div className="btn-group">
          <Link href="/adopter" className="btn btn-gradient">
            Voir nos chats à l&apos;adoption
          </Link>
          <Link href="/" className="btn btn-outline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}