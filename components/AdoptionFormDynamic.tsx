'use client';

import dynamic from 'next/dynamic';
import type { Cat } from '@/lib/trello';

const AdoptionForm = dynamic(() => import('@/components/AdoptionForm'), {
  ssr: false,
  loading: () => (
    <div role="status" aria-live="polite" style={{ padding: '1rem' }}>
      Chargement du formulaire...
    </div>
  ),
});

export default function AdoptionFormDynamic({ cats }: { cats: Cat[] }) {
  return <AdoptionForm cats={cats} />;
}

