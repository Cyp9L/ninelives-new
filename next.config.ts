import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old page URLs
      { source: '/devenir-benevole', destination: '/benevole', permanent: true },
      { source: '/mentions-legales', destination: '/mentions', permanent: true },
      { source: '/solutions-abandon', destination: '/abandon/solutions', permanent: true },

      // Old form URLs
      { source: '/entry_form/formulaire-benevolat', destination: '/benevole', permanent: true },
      { source: '/entry_form/formulaire-dabandon', destination: '/abandon', permanent: true },
      { source: '/entry_form/formulaire-de-contact', destination: '/contact', permanent: true },
      { source: '/entry_form/formulaire-de-pre-adoption', destination: '/adopter', permanent: true },

      // Old category pages
      { source: '/adopter/nos-adultes', destination: '/adopter', permanent: true },
      { source: '/adopter/nos-conseils', destination: '/adopter', permanent: true },

      // Dead pages
      { source: '/plan-du-site', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
