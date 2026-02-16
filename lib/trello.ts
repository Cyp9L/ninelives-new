const TRELLO_API_BASE = 'https://api.trello.com/1';

interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  attachments?: Array<{
    url: string;
    mimeType?: string;
  }>;
  dateLastActivity: string;
}

export async function getAllCats() {
  const url = `${TRELLO_API_BASE}/lists/${process.env.TRELLO_LIST_ADOPTABLES_ID}/cards?` + 
    `key=${process.env.TRELLO_API_KEY}&` +
    `token=${process.env.TRELLO_TOKEN}&` +
    `attachments=true`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 600 } // Cache for 10 minutes
    });

    if (!res.ok) {
      console.error('Failed to fetch from Trello');
      return { adultes: [], chatons: [], all: [] };
    }

    const cards: TrelloCard[] = await res.json();
    
    const cats = cards.map(card => ({
      id: card.id,
      slug: card.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: card.name,
      description: card.desc || 'À venir...',
      images: card.attachments
        ?.filter(att => att.mimeType?.startsWith('image/'))
        .map(att => `/api/trello-image?url=${encodeURIComponent(att.url)}`) || [],
      dateAdded: card.dateLastActivity
    }));

    // For now, treat all as adultes (we can separate later if needed)
    return {
      adultes: cats,
      chatons: [],
      all: cats
    };
  } catch (error) {
    console.error('Error fetching cats:', error);
    return { adultes: [], chatons: [], all: [] };
  }
}

export async function getCatBySlug(slug: string) {
  const { all } = await getAllCats();
  return all.find(cat => cat.slug === slug);
}