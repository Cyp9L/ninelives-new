import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="page-centered">
      <div className="text-center">
        <Image src="/images/site/cat-not-found.jpg" alt="Chat étonné" width={400} height={300} sizes="(max-width: 768px) 80vw, 400px" />
        <h1>Chat alors !</h1>
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