// Placeholder Trello integration
// Will connect to real API once we have credentials

export async function getAllCats() {
    // Mock data for now
    const mockCats = [
      {
        id: '1',
        slug: 'felix',
        name: 'Félix',
        description: 'Chat adulte très câlin, cherche famille aimante.',
        images: ['/placeholder-cat.jpg'],
        category: 'adulte'
      },
      {
        id: '2',
        slug: 'luna',
        name: 'Luna',
        description: 'Petite chatte tigrée de 6 mois, joueuse et affectueuse.',
        images: ['/placeholder-cat.jpg'],
        category: 'chaton'
      }
    ];
  
    const adultes = mockCats.filter(cat => cat.category === 'adulte');
    const chatons = mockCats.filter(cat => cat.category === 'chaton');
  
    return {
      adultes,
      chatons,
      all: mockCats
    };
  }
  
  export async function getCatBySlug(slug: string) {
    const { all } = await getAllCats();
    return all.find(cat => cat.slug === slug);
  }