'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CTAItem {
  emoji: string;
  title: string;
  description: string;
  href: string;
  label: string;
}

const allCTAs: Record<string, CTAItem> = {
  adopter: {
    emoji: '🐱',
    title: 'Adopter un chat',
    description: 'Découvrez nos chats à la recherche d\'une famille aimante.',
    href: '/adopter',
    label: 'Voir nos chats',
  },
  tousLesChats: {
    emoji: '🐱',
    title: 'Voir tous nos chats',
    description: 'Parcourez tous les profils de nos chats à l\'adoption.',
    href: '/adopter',
    label: 'Tous les chats',
  },
  benevole: {
    emoji: '🤝',
    title: 'Devenir famille d\'accueil',
    description: 'Accueillez temporairement un chat le temps qu\'il trouve sa famille.',
    href: '/benevole',
    label: 'En savoir plus',
  },
  donner: {
    emoji: '💝',
    title: 'Faire un don',
    description: 'Chaque euro contribue aux soins et au sauvetage de nos chats.',
    href: '/donner',
    label: 'Nous soutenir',
  },
  actions: {
    emoji: '🐾',
    title: 'Nos actions',
    description: 'Sauvetage, stérilisation, sensibilisation — découvrez notre quotidien.',
    href: '/actions',
    label: 'Découvrir',
  },
  contact: {
    emoji: '✉️',
    title: 'Nous contacter',
    description: 'Une question ? N\'hésitez pas à nous écrire.',
    href: '/contact',
    label: 'Nous écrire',
  },
  partenaires: {
    emoji: '🏢',
    title: 'Nos partenaires',
    description: 'Ils nous soutiennent et contribuent au bien-être de nos animaux.',
    href: '/partenaires',
    label: 'Les découvrir',
  },
  medias: {
    emoji: '📰',
    title: 'On parle de nous',
    description: 'Retrouvez nos apparitions dans la presse et les médias.',
    href: '/medias',
    label: 'Voir les articles',
  },
  abandon: {
    emoji: '🆘',
    title: 'Besoin d\'aide ?',
    description: 'Vous ne pouvez plus garder votre animal ? Nous pouvons vous aider.',
    href: '/abandon',
    label: 'Trouver de l\'aide',
  },
  pasEncoreAdopter: {
    emoji: '🏠',
    title: 'Pas encore prêt à adopter ?',
    description: 'Devenez famille d\'accueil et offrez un foyer temporaire à un chat en attente.',
    href: '/benevole',
    label: 'Devenir FA',
  },
  mentions: {
    emoji: '📄',
    title: 'Mentions légales',
    description: 'Informations légales sur l\'association et le site.',
    href: '/mentions',
    label: 'Consulter',
  },
  confidentialite: {
    emoji: '🔒',
    title: 'Politique de confidentialité',
    description: 'Comment nous traitons et protégeons vos données personnelles.',
    href: '/politique-de-confidentialite',
    label: 'Consulter',
  },
};

const pageConfig: Record<string, { heading?: string; items: string[] }> = {
  '/actions': {
    heading: 'Envie de nous aider ?',
    items: ['benevole', 'donner', 'partenaires'],
  },
  '/benevole': {
    heading: 'Découvrir Nine Lives Paris',
    items: ['adopter', 'actions', 'donner'],
  },
  '/abandon': {
    heading: 'Vous pouvez aussi…',
    items: ['contact', 'benevole', 'donner'],
  },
  '/donner': {
    heading: 'Autres façons de nous soutenir',
    items: ['benevole', 'actions', 'partenaires'],
  },
  '/partenaires': {
    heading: 'Découvrir l\'association',
    items: ['actions', 'medias', 'donner'],
  },
  '/medias': {
    heading: 'Aller plus loin',
    items: ['actions', 'adopter', 'partenaires'],
  },
  '/adopter': {
    heading: 'Vous pouvez aussi…',
    items: ['pasEncoreAdopter', 'donner', 'actions'],
  },
  '/adopter/[slug]': {
    heading: 'Vous pouvez aussi…',
    items: ['pasEncoreAdopter', 'tousLesChats', 'donner'],
  },
  '/contact': {
    heading: 'En attendant notre réponse…',
    items: ['adopter', 'actions', 'medias'],
  },
  '/mentions': {
    items: ['confidentialite', 'contact', 'actions'],
  },
  '/politique-de-confidentialite': {
    items: ['mentions', 'contact', 'adopter'],
  },
};

// Match dynamic routes: /adopter/anything → /adopter/[slug]
 export default function RelatedActions() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const current = pathname.startsWith('/adopter/') && pathname !== '/adopter'
    ? '/adopter/[slug]'
    : pathname;

  const config = pageConfig[current] || { items: ['adopter', 'benevole', 'donner'] };
  const heading = config.heading || 'Vous pouvez aussi…';
  const items = config.items.map((k) => allCTAs[k]).filter(Boolean);

  return (
    <section className="section section-gray">
      <div className="container">
        <h2 className="text-center" style={{ marginBottom: '1.5rem' }}>
          {heading}
        </h2>
        <div className={items.length === 2 ? 'grid-2' : 'grid-3'}>
          {items.map((item) => (
            <Link key={item.href + item.title} href={item.href}>
              <div className="card card-centered">
                <div className="card-icon">{item.emoji}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p style={{ marginTop: '1rem' }}>
                  <span className="btn btn-gradient">{item.label}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
