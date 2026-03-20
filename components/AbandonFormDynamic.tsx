'use client';

import dynamic from 'next/dynamic';

const AbandonForm = dynamic(() => import('@/components/AbandonForm'), {
  ssr: false,
  loading: () => (
    <div role="status" aria-live="polite" style={{ padding: '1rem' }}>
      Chargement du formulaire...
    </div>
  ),
});

export default function AbandonFormDynamic() {
  return <AbandonForm />;
}

