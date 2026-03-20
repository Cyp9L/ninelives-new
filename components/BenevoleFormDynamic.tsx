'use client';

import dynamic from 'next/dynamic';

const BenevoleForm = dynamic(() => import('@/components/BenevoleForm'), {
  ssr: false,
  loading: () => (
    <div role="status" aria-live="polite" style={{ padding: '1rem' }}>
      Chargement du formulaire...
    </div>
  ),
});

export default function BenevoleFormDynamic() {
  return <BenevoleForm />;
}

