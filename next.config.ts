import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/**',
        search: '',  // Regular local images (no query strings)
      },
      {
        pathname: '/api/trello-image',
        // search omitted → any query string is allowed
      },
    ],
  },
  async redirects() {
    return [
      // Old page URLs
      { source: '/devenir-benevole', destination: '/benevole', permanent: true },
      { source: '/mentions-legales', destination: '/mentions', permanent: true },
      { source: '/solutions-abandon', destination: '/abandon/solutions', permanent: true },
      { source: '/jai-trouve-un-animal-que-faire', destination: '/abandon/solutions', permanent: true },
      { source: '/aider-autrement', destination: '/donner', permanent: true },
      { source: '/lapins-vacances', destination: '/abandon/solutions', permanent: true },
      { source: '/une-cage-pour-mes-lapins', destination: '/abandon/solutions', permanent: true },

      // Old form URLs
      { source: '/entry_form/formulaire-benevolat', destination: '/benevole', permanent: true },
      { source: '/entry_form/formulaire-dabandon', destination: '/abandon', permanent: true },
      { source: '/entry_form/formulaire-de-contact', destination: '/contact', permanent: true },
      { source: '/entry_form/formulaire-de-pre-adoption', destination: '/adopter', permanent: true },

      // Old category pages
      { source: '/adopter/nos-adultes', destination: '/adopter', permanent: true },
      { source: '/nos-chatons', destination: '/adopter', permanent: true },
      { source: '/adopter/nos-chatons', destination: '/adopter', permanent: true },
      { source: '/nos-chiens', destination: '/adopter', permanent: true },
      { source: '/adopter/nos-chiens', destination: '/adopter', permanent: true },
      { source: '/nos-lapins', destination: '/adopter', permanent: true },
      { source: '/adopter/nos-lapins', destination: '/adopter', permanent: true },
      { source: '/adopter/nos-conseils', destination: '/adopter', permanent: true },

      // Dead pages
      { source: '/plan-du-site', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;