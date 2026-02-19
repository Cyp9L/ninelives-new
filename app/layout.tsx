import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Lightbox from '@/components/Lightbox';
import { SpeedInsights } from '@vercel/speed-insights/next';
import RelatedActions from '@/components/RelatedActions';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const helloCasual = localFont({
  src: "../public/fonts/HelloCasual.ttf",
  variable: "--font-hello-casual",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ninelives.fr"),
  title: {
    default: "Nine Lives Paris - Association de sauvetage de chats",
    template: "%s | Nine Lives Paris",
  },
  description:
    "L'association Nine Lives Paris recueille les chats abandonnés, trouvés, errants, sortis de fourrière.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Nine Lives Paris",
    title: "Nine Lives Paris - Association de sauvetage de chats",
    description:
      "L'association Nine Lives Paris recueille les chats abandonnés, trouvés, errants, sortis de fourrière.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nine Lives Paris - Association de sauvetage de chats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nine Lives Paris - Association de sauvetage de chats",
    description:
      "L'association Nine Lives Paris recueille les chats abandonnés, trouvés, errants, sortis de fourrière.",
    images: ["/og-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Nine Lives Paris",
  alternateName: "Adopt' for life",
  url: "https://ninelives.fr",
  logo: "https://ninelives.fr/images/logo-nine-lives-paris.png",
  description:
    "Association loi 1901 de sauvetage de chats abandonnés, trouvés et errants à Paris.",
  email: "asso@ninelives.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "133 rue du Faubourg du Temple",
    addressLocality: "Paris",
    postalCode: "75010",
    addressCountry: "FR",
  },
  sameAs: [
    "https://www.instagram.com/ninelivesparis/",
    "https://www.facebook.com/ninelivesparis",
    "https://www.youtube.com/channel/UCM5TNRKUzUebUnw4OwLfZKA",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nine Lives Paris",
  url: "https://ninelives.fr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${helloCasual.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <Navigation />
        <Lightbox />
        {children}
        <RelatedActions />
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
