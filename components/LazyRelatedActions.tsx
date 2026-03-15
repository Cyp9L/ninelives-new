'use client';
import dynamic from 'next/dynamic';

const RelatedActions = dynamic(() => import('./RelatedActions'), { ssr: false });

export default function LazyRelatedActions() {
  return <RelatedActions />;
}