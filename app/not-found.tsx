import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px' }}>
        <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🐱</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '300', color: '#1f2937', marginBottom: '1rem' }}>
          Page introuvable
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
          Cette page n&apos;existe pas ou n&apos;existe plus.
          Si vous cherchiez un chat, il a peut-être déjà été adopté ! 🎉
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/adopter"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1.05rem'
            }}
          >
            Voir nos chats à l&apos;adoption
          </Link>
          <Link
            href="/"
            style={{
              padding: '0.75rem 1.5rem',
              border: '2px solid #d1d5db',
              color: '#4b5563',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1.05rem'
            }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
