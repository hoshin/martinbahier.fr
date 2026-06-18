/**
 * Tiny inline-markdown parser for CV free-text fields.
 *
 * Supports a single construct: `[text](url)` inline links.
 *  - External URLs (http/https or protocol-relative `//`) are marked external.
 *  - Anything else (relative paths, anchors, mailto:, etc.) is treated as
 *    internal and renders as a same-tab link.
 *
 * Edge cases:
 *  - Text without `[...](...)` is returned as a single text token.
 *  - URLs containing `)` need to be URL-encoded as `%29`.
 *  - Bracketed text without a following `(url)` (e.g. "[draft]") is left as-is.
 */

export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'link'; text: string; href: string; external: boolean };

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function renderInlineMarkdown(input: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let lastIndex = 0;

  for (const match of input.matchAll(LINK_RE)) {
    const [full, text, href] = match;
    const start = match.index ?? 0;
    if (start > lastIndex) {
      tokens.push({ type: 'text', value: input.slice(lastIndex, start) });
    }
    tokens.push({
      type: 'link',
      text,
      href,
      external: /^(https?:)?\/\//i.test(href),
    });
    lastIndex = start + full.length;
  }

  if (lastIndex < input.length) {
    tokens.push({ type: 'text', value: input.slice(lastIndex) });
  }

  // Empty input → return a single empty text token so consumers always get
  // a non-empty array; keeps the .map() in templates trivially safe.
  if (tokens.length === 0) {
    tokens.push({ type: 'text', value: input });
  }

  return tokens;
}
