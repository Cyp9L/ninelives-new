const TRELLO_API_BASE = 'https://api.trello.com/1';

interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  idAttachmentCover?: string;
  attachments?: Array<{
    id: string;
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
  return 'Annonce en cours de création... Contactez-nous pour plus d\'informations.';
}

export async function getAllCats() {
  const url = `${TRELLO_API_BASE}/lists/${process.env.TRELLO_LIST_ADOPTABLES_ID}/cards?` + 
    `key=${process.env.TRELLO_API_KEY}&` +
    `token=${process.env.TRELLO_TOKEN}&` +
    `fields=id,name,desc,idAttachmentCover,dateLastActivity&` +
    `attachments=true&` +
    `attachment_fields=id,url,mimeType`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 600 } // Cache for 10 minutes
    });

    if (!res.ok) {
      console.error('Failed to fetch from Trello');
      return { adultes: [], chatons: [], all: [] };
    }

    const cards: TrelloCard[] = await res.json();
    
    const cats = cards.map(card => {
      // Find the cover attachment
      const coverAttachment = card.attachments?.find(att => att.id === card.idAttachmentCover);
      
      // Get all image attachments
      const imageAttachments = card.attachments
        ?.filter(att => att.mimeType?.startsWith('image/'))
        .map(att => `/api/trello-image?url=${encodeURIComponent(att.url)}`) || [];
      
      // If cover exists and is an image, make sure it's first
      const coverUrl = coverAttachment?.url 
        ? `/api/trello-image?url=${encodeURIComponent(coverAttachment.url)}`
        : null;
      
      const images = coverUrl 
        ? [coverUrl, ...imageAttachments.filter(url => url !== coverUrl)]
        : imageAttachments;
      
      return {
        id: card.id,
        slug: card.name.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[éèê]/g, 'e')
          .replace(/[àâ]/g, 'a')
          .replace(/[îï]/g, 'i')
          .replace(/[ôö]/g, 'o')
          .replace(/[ùûü]/g, 'u')
          .replace(/[ç]/g, 'c')
          .replace(/[^\w-]/g, ''),
        name: card.name,
        description: extractDiffusion(card.desc || ''),
        images: images.length > 0 ? images : ['/images/default-cat.jpg'],
        dateAdded: card.dateLastActivity
      };
    });

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
