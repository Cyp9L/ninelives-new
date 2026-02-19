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
  labels?: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  dateLastActivity: string;
}

function getCategory(labels?: Array<{ name: string }>): 'chaton' | 'adulte' | 'senior' {
  if (!labels) return 'adulte';
  for (const label of labels) {
    const name = label.name.toLowerCase();
    if (name.includes('chaton')) return 'chaton';
    if (name.includes('senior')) return 'senior';
  }
  return 'adulte';
}

function extractCaractere(desc: string): string {
  const patterns = [
    /\*\*Caractère\s*:?\s*\*\*\s*:?\s*(.+)/i,
    /\*\*Caractère\s*:\s*(.+?)\*\*/i,
    /Caractère\s*:\s*(.+?)(?:\n|$)/i,
  ];
  for (const pattern of patterns) {
    const match = desc.match(pattern);
    if (match) {
      return match[1].replace(/\*+/g, '').trim();
    }
  }
  return '';
}

export async function getAllCats() {
  const url = `${TRELLO_API_BASE}/lists/${process.env.TRELLO_LIST_ADOPTABLES_ID}/cards?` +
    `key=${process.env.TRELLO_API_KEY}&` +
    `token=${process.env.TRELLO_TOKEN}&` +
    `fields=id,name,desc,idAttachmentCover,dateLastActivity,labels&` +
    `attachments=true&` +
    `attachment_fields=id,url,mimeType`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 600 }
    });

    if (!res.ok) {
      console.error('Failed to fetch from Trello');
      return { adultes: [], chatons: [], seniors: [], all: [] };
    }

    const cards: TrelloCard[] = await res.json();

    const cats = cards.map(card => {
      const coverAttachment = card.attachments?.find(att => att.id === card.idAttachmentCover);

      const imageAttachments = card.attachments
        ?.filter(att => att.mimeType?.startsWith('image/'))
        .map(att => `/api/trello-image?url=${encodeURIComponent(att.url)}`) || [];

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
        description: card.desc || '',
        images: images.length > 0 ? images : ['/images/default-cat.webp'],
        category: getCategory(card.labels),
        caractere: extractCaractere(card.desc || ''),
        dateAdded: card.dateLastActivity
      };
    });

    return {
      adultes: cats.filter(c => c.category === 'adulte'),
      chatons: cats.filter(c => c.category === 'chaton'),
      seniors: cats.filter(c => c.category === 'senior'),
      all: cats
    };
  } catch (error) {
    console.error('Error fetching cats:', error);
    return { adultes: [], chatons: [], seniors: [], all: [] };
  }
}

export async function getCatBySlug(slug: string) {
  const { all } = await getAllCats();
  return all.find(cat => cat.slug === slug);
}