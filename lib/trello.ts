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

function extractDiffusion(desc: string): string {
  // Extract Identification number
  const idMatch = desc.match(/\*\*Identification\s*:\*\*\s*([^\n]+)/i);
  const identification = idMatch ? idMatch[1].trim() : null;
  
  // Find text between "Diffusion :" and the next section marker or end
  const diffusionMatch = desc.match(/\*\*Diffusion\s*:\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\n\n\*\*|$)/i);
  
  if (diffusionMatch && diffusionMatch[1]) {
    let diffusionText = diffusionMatch[1].trim();
    
    // Add identification at the end if found
    if (identification) {
      diffusionText += `\n\n**Identification :** ${identification}`;
    }
    
    return diffusionText;
  }
  
  // Fallback to full description if no Diffusion section found
  return desc || 'À venir...';
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
      description: extractDiffusion(card.desc || ''),
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