import type { Resend } from 'resend';

const EMAIL_PATTERN = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;

/** True for a single, plausible email address (no lists, no spaces). */
export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 254 && EMAIL_PATTERN.test(value);
}

/** Name for an email subject: "Ana Dupont", "Ana", or a placeholder when both are missing. */
export function senderName(firstName: unknown, lastName: unknown): string {
  const name = [firstName, lastName]
    .filter((part): part is string => typeof part === 'string')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return name || 'Nom non renseigné';
}

/**
 * Sends the person who filled in a form a copy of their answers, as a separate email.
 *
 * The copy repeats text typed by the visitor, so anyone could make us send it to any
 * address. To keep that harmless, the subject is fixed and a notice at the top says it
 * is a form copy that can be ignored. Never throws: the form has already been received.
 */
export async function sendCopyToSender(
  resend: Resend,
  { from, to, formName, html }: { from: string; to: unknown; formName: string; html: string }
) {
  if (!isValidEmail(to)) return;

  const notice = `
  <div style="background:#f0f9ff; border-left:4px solid #009AB6; border-radius:6px; padding:12px 16px; margin-bottom:20px; font-family:Arial, sans-serif; color:#015768;">
    Ceci est une copie de ce que vous avez rempli sur le formulaire <strong>${formName}</strong> du site ninelives.fr.<br>
    Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.
  </div>`;

  const htmlWithNotice = html.includes('<body>')
    ? html.replace('<body>', `<body>${notice}`)
    : notice + html;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Copie de votre formulaire « ${formName} » — Nine Lives Paris`,
      html: htmlWithNotice,
    });
    if (error) console.error('Resend error (copy to sender):', error);
  } catch (error) {
    console.error('Error sending copy to sender:', error);
  }
}
