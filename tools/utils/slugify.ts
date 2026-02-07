/**
 * Slugify utility - shared between generate-docs and component-docs
 *
 * Converts a title to a URL-friendly slug.
 * Used to link .docs.md headings → preview @case blocks → display.
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
