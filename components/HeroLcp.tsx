'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';

type HeroLcpBase = {
  src: string;
  /** Passed to CSS `object-position` (e.g. `center 30%`) */
  objectPosition?: string;
};

type HeroLcpHeroProps = HeroLcpBase & {
  variant?: 'hero';
  /** Transparent ::before (see `.page-header-no-overlay`) */
  noOverlay?: boolean;
  children: ReactNode;
};

type HeroLcpCatProps = HeroLcpBase & {
  variant: 'cat';
  /** Visible label for the hero photo */
  alt: string;
  children: ReactNode;
};

export type HeroLcpProps = HeroLcpHeroProps | HeroLcpCatProps;

/**
 * Hero photo as a real LCP `<img>` (not CSS background), with layout from CSS.
 *
 * **`unoptimized`**: These assets already live in `public/` (or `/api/trello-image`) as
 * WebP/JPEG. Routing them through `/_next/image` adds a server round-trip and decode work
 * on every `next start` / cold request — often slower than serving the file directly, which
 * is what `background-image` + preload did. Unoptimized restores that direct URL while
 * keeping `priority` / fetchpriority for LCP.
 */
export default function HeroLcp(props: HeroLcpProps) {
  const {
    src,
    objectPosition = 'center',
    children,
  } = props;

  const imgStyle = { objectFit: 'cover' as const, objectPosition };

  if (props.variant === 'cat') {
    return (
      <section className="cat-hero cat-hero--lcp-image">
        <div className="hero-lcp-image-wrap">
          <Image
            src={src}
            alt={props.alt}
            fill
            priority
            sizes="100vw"
            unoptimized
            style={imgStyle}
          />
        </div>
        {children}
      </section>
    );
  }

  const { noOverlay = false } = props;
  const sectionClass = [
    'hero',
    'hero--lcp-image',
    noOverlay ? 'page-header-no-overlay' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClass}>
      <div className="hero-lcp-image-wrap" aria-hidden>
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized
          style={imgStyle}
        />
      </div>
      <div className="container">{children}</div>
    </section>
  );
}
