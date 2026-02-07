/**
 * Extract Preview Code
 *
 * Extracts template code from *-previews.component.ts files.
 * Each @case block in the template is mapped to an example ID (slug).
 *
 * Returns: Record<slug, Record<exampleId, templateCode>>
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PREVIEW_COMPONENTS_PATH = path.resolve(
  __dirname,
  '../apps/docs/src/app/components/previews',
);

/**
 * Extract template code from a single preview component file
 */
function extractFromFile(
  filePath: string,
): Record<string, string> | undefined {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract component slug from filename
  // e.g., "button-previews.component.ts" → "button"
  const filename = path.basename(filePath);
  const componentSlug = filename.replace(/-previews\.component\.ts$/, '');

  // Find the template string
  const templateMatch = content.match(/template:\s*`([\s\S]*?)`\s*,/);
  if (!templateMatch) {
    console.warn(`⚠️  No template found in ${filename}`);
    return undefined;
  }

  const template = templateMatch[1];

  // Extract all @case blocks: @case ('id') { ... }
  // Regex captures: (1) case ID, (2) inner HTML
  const CASE_REGEX = /@case\s*\('([^']+)'\)\s*\{([\s\S]*?)\n\s{6}\}/g;
  const examples: Record<string, string> = {};

  let match;
  while ((match = CASE_REGEX.exec(template)) !== null) {
    const exampleId = match[1];
    let innerHtml = match[2];

    // Remove indentation (dedent)
    // Find minimum indentation level (ignoring empty lines)
    const lines = innerHtml.split('\n');
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

    if (nonEmptyLines.length === 0) {
      console.warn(
        `⚠️  Empty @case('${exampleId}') in ${componentSlug}-previews`,
      );
      continue;
    }

    const minIndent = Math.min(
      ...nonEmptyLines.map((line) => {
        const match = line.match(/^(\s*)/);
        return match ? match[1].length : 0;
      }),
    );

    // Remove common indentation
    innerHtml = lines
      .map((line) => line.slice(minIndent))
      .join('\n')
      .trim();

    // Remove wrapper divs used for preview layout (e.g., <div class="flex justify-center">)
    // Only remove the outermost wrapper if it's a layout div
    const wrapperMatch = innerHtml.match(
      /^<div class="[^"]*(?:flex|justify-center|items-center|gap-)[^"]*">\s*([\s\S]*?)\s*<\/div>$/,
    );
    if (wrapperMatch) {
      innerHtml = wrapperMatch[1].trim();
    }

    examples[exampleId] = innerHtml;
  }

  return examples;
}

/**
 * Extract all preview code from all preview component files
 */
export function extractPreviewCode(): Record<
  string,
  Record<string, string>
> {
  const previewMap: Record<string, Record<string, string>> = {};

  if (!fs.existsSync(PREVIEW_COMPONENTS_PATH)) {
    console.warn(`⚠️  Preview components directory not found: ${PREVIEW_COMPONENTS_PATH}`);
    return previewMap;
  }

  const files = fs.readdirSync(PREVIEW_COMPONENTS_PATH);

  for (const file of files) {
    if (file.endsWith('-previews.component.ts')) {
      const filePath = path.join(PREVIEW_COMPONENTS_PATH, file);
      const componentSlug = file.replace(/-previews\.component\.ts$/, '');

      const examples = extractFromFile(filePath);
      if (examples && Object.keys(examples).length > 0) {
        previewMap[componentSlug] = examples;
      }
    }
  }

  return previewMap;
}

/**
 * CLI entry point (for testing)
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('=== Extract Preview Code ===\n');

  const previewMap = extractPreviewCode();

  console.log('Extracted preview code:');
  for (const [slug, examples] of Object.entries(previewMap)) {
    console.log(`\n${slug}:`);
    for (const [exampleId, code] of Object.entries(examples)) {
      console.log(`  - ${exampleId} (${code.length} chars)`);
    }
  }

  console.log('\nDone!');
}
