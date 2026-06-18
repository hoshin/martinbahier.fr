import type { Lang } from '../i18n/ui';

/**
 * Convert a blog post collection id (e.g. "2026-06-16-hello.en.md" or
 * "2026-06-16-hello.en") into the URL slug ("2026-06-16-hello").
 */
export function postSlug(id: string): string {
  return id.replace(/\.(fr|en)(\.(md|mdx))?$/, '');
}

export function formatDate(date: Date, lang: Lang): string {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
