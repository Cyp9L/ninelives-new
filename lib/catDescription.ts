// Helpers to read the cat descriptions written in Trello (Markdown).

/** Strip markdown formatting for use in meta descriptions */
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s?/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Extract a named field from the Trello description template */
export function extractField(desc: string, fieldName: string): string {
  const pattern = new RegExp(`\\*\\*${fieldName}\\s*:?\\s*\\*\\*\\s*:?\\s*(.+?)(?:\\n|$)`, 'i');
  const match = desc.match(pattern);
  return match ? match[1].replace(/\*+/g, '').trim() : '';
}

