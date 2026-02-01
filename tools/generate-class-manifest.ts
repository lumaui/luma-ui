/**
 * Script to extract all Tailwind classes used by @lumaui/angular components
 * and generate a manifest file that Tailwind can scan
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORE_VARIANTS_DIR = path.join(__dirname, '../packages/core/src/variants');
const BUILD_DIR = path.join(__dirname, '../packages/tokens/build');
const OUTPUT_FILE = path.join(BUILD_DIR, 'luma-classes.js');
const TEMPLATE_FILE = path.join(
  __dirname,
  '../packages/tokens/templates/luma-complete.css',
);
const COMPLETE_CSS_FILE = path.join(BUILD_DIR, 'luma-complete.css');

// Regex to match class strings in arrays
const CLASS_REGEX = /['"`]([^'"`\s]+)['"`]/g;

function extractClassesFromFile(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const classes: string[] = [];

  let match;
  while ((match = CLASS_REGEX.exec(content)) !== null) {
    const className = match[1];
    // Only include classes that look like Tailwind classes (contain lm- or common patterns)
    if (
      className.includes('lm-') ||
      className.match(/^(hover:|focus:|active:|disabled:|focus-visible:)/) ||
      className.match(
        /^(inline-flex|items-center|justify-center|font-medium|leading-snug|transition|w-full|w-max|relative|border|bg-|text-|rounded-|p-\[|px-\[|py-\[|mb-)/,
      )
    ) {
      classes.push(className);
    }
  }

  return classes;
}

function generateManifest(): void {
  const allClasses = new Set<string>();

  // Read all variant files
  const files = fs
    .readdirSync(CORE_VARIANTS_DIR)
    .filter((f) => f.endsWith('.ts') && !f.includes('index'));

  for (const file of files) {
    const filePath = path.join(CORE_VARIANTS_DIR, file);
    const classes = extractClassesFromFile(filePath);
    classes.forEach((c) => allClasses.add(c));
  }

  // Generate a JS file that Tailwind can scan
  // This file contains all class names as string literals
  const sortedClasses = Array.from(allClasses).sort();

  const output = `/**
 * Auto-generated manifest of classes used by @lumaui/angular components
 * DO NOT EDIT - This file is regenerated during build
 *
 * This file exists so Tailwind can detect which classes are used
 * without requiring @source directive in user's CSS
 */

export const LUMA_COMPONENT_CLASSES = [
${sortedClasses.map((c) => `  '${c}'`).join(',\n')}
];
`;

  // Ensure build directory exists
  const buildDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, output);

  console.log(`Generated ${OUTPUT_FILE} with ${sortedClasses.length} classes`);
  console.log('Classes:', sortedClasses.slice(0, 10).join(', '), '...');

  // Copy the luma-complete.css template to build directory
  if (fs.existsSync(TEMPLATE_FILE)) {
    fs.copyFileSync(TEMPLATE_FILE, COMPLETE_CSS_FILE);
    console.log(`Copied ${COMPLETE_CSS_FILE}`);
  } else {
    console.warn(`Warning: Template file not found: ${TEMPLATE_FILE}`);
  }
}

generateManifest();
