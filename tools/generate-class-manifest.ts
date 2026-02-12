/**
 * Script to extract all Tailwind classes used by @lumaui/angular components
 * and generate a manifest file that Tailwind can scan
 *
 * Uses heuristic pattern matching to automatically capture ALL Tailwind utilities
 * while filtering out TypeScript keywords and CVA configuration
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

// Regex to match quoted strings in code
const CLASS_REGEX = /['"`]([^'"`\s]+)['"`]/g;

/**
 * Patterns that ACCEPT strings as Tailwind classes
 * These patterns are designed to match valid Tailwind utility syntax
 */
const TAILWIND_CLASS_PATTERNS: RegExp[] = [
  // Standard utilities: px-4, bg-blue-500, rounded-lg, text-sm
  /^[a-z][a-z0-9-]*-[a-z0-9-.]+$/,

  // Negative values: -mr-1, -translate-x-1/2
  /^-[a-z][a-z0-9-]*-[a-z0-9-.]+$/,

  // Modifiers: hover:, focus:, md:, dark:, group-hover:, peer-focus:
  /^[a-z-]+:/,

  // Arbitrary values: px-[10px], bg-[#ff0000], w-[calc(100%-2rem)]
  /\[.+\]/,

  // Fractions/opacity: w-1/2, bg-black/50
  /\/\d+$/,

  // Layout utilities (single words): flex, grid, hidden, block, etc.
  /^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|hidden|relative|absolute|fixed|sticky|static|group|inset-0|pointer-events-none|pointer-events-auto|isolate|aspect-auto|aspect-square|aspect-video)$/,

  // Data attributes: data-[state=open]:opacity-100
  /^data-\[/,

  // Complex selectors: [&[data-state=open]>svg]:rotate-180
  /^\[&/,

  // Arbitrary variants: [@media(min-width:640px)]:block
  /^\[@/,
];

/**
 * Patterns that REJECT strings as non-classes
 * These are TypeScript keywords, CVA config, and other code artifacts
 */
const NON_CLASS_PATTERNS: RegExp[] = [
  // File paths
  /^\.|^\//,

  // TypeScript/JavaScript keywords
  /^(import|export|from|class-variance-authority|cva|type|typeof|const|let|var|function|return|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|new|delete|void|typeof|instanceof|in|of|as|extends|implements|interface|enum|namespace|module|declare|public|private|protected|static|readonly|abstract|async|await)$/i,

  // Type utilities
  /^(VariantProps|NonNullable|Partial|Required|Readonly|Pick|Omit|Record|Exclude|Extract|ReturnType|InstanceType|ThisType|Parameters|ConstructorParameters)$/i,

  // CVA property names (when used standalone)
  /^(variant|size|align|direction|position|state|visible|open|disabled|radius|elevation|color|orientation|placement)$/,

  // Boolean literals
  /^(default|true|false|null|undefined)$/,

  // Size/alignment values (when used standalone, not as part of class)
  /^(sm|md|lg|xl|2xl|3xl|full|start|end|center|between|around|evenly|stretch|baseline|left|right|top|bottom|auto)$/,

  // Variant names (when used standalone)
  /^(info|success|warning|error|danger|primary|secondary|accent|destructive|ghost|outline|filled|solid|soft|surface|underline|pills|default)$/,

  // Very long strings (likely not classes)
  /^.{150,}$/,

  // Contains spaces (not valid class names)
  /\s/,

  // Pure numbers
  /^\d+$/,

  // URLs or protocols
  /^(http|https|ftp|mailto|tel|data):/i,
];

/**
 * Check if a string matches any pattern in an array
 */
function matchesAnyPattern(str: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(str));
}

/**
 * Extract Tailwind classes from a file using heuristic pattern matching
 */
function extractClassesFromFile(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const classes: string[] = [];

  let match;
  while ((match = CLASS_REGEX.exec(content)) !== null) {
    const candidate = match[1];

    // Skip empty strings
    if (!candidate || candidate.length === 0) {
      continue;
    }

    // 1. Quick reject: Check blacklist patterns first (faster)
    if (matchesAnyPattern(candidate, NON_CLASS_PATTERNS)) {
      continue;
    }

    // 2. Accept if matches Tailwind patterns
    if (matchesAnyPattern(candidate, TAILWIND_CLASS_PATTERNS)) {
      classes.push(candidate);
    }
  }

  return classes;
}

/**
 * Generate the class manifest file
 */
function generateManifest(): void {
  const allClasses = new Set<string>();

  // Read all variant files from @lumaui/core
  const files = fs
    .readdirSync(CORE_VARIANTS_DIR)
    .filter((f) => f.endsWith('.ts') && !f.includes('index'));

  console.log(`\nScanning ${files.length} variant files...`);

  for (const file of files) {
    const filePath = path.join(CORE_VARIANTS_DIR, file);
    const classes = extractClassesFromFile(filePath);
    classes.forEach((c) => allClasses.add(c));
  }

  // Sort classes for deterministic output
  const sortedClasses = Array.from(allClasses).sort();

  // Generate JavaScript file with class manifest
  const output = `/**
 * Auto-generated manifest of classes used by @lumaui/angular components
 * DO NOT EDIT - This file is regenerated during build
 *
 * This file exists so Tailwind can detect which classes are used by Luma components
 * without requiring users to configure @source patterns manually.
 *
 * Generated by: tools/generate-class-manifest.ts
 * Total classes: ${sortedClasses.length}
 */

export const LUMA_COMPONENT_CLASSES = [
${sortedClasses.map((c) => `  '${c}'`).join(',\n')}
];
`;

  // Ensure build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }

  // Write manifest file
  fs.writeFileSync(OUTPUT_FILE, output);

  console.log(`\n✅ Generated ${OUTPUT_FILE}`);
  console.log(`   Total classes: ${sortedClasses.length}`);
  console.log(`\n📦 Sample classes (first 20):`);
  console.log(`   ${sortedClasses.slice(0, 20).join(', ')}...`);

  // Verify critical spacing utilities are present
  const spacingUtils = ['px-3', 'px-4', 'px-5', 'py-2', 'py-2.5', 'py-3'];
  const missingSpacing = spacingUtils.filter((u) => !allClasses.has(u));

  if (missingSpacing.length === 0) {
    console.log(`\n✅ All critical spacing utilities present`);
  } else {
    console.warn(
      `\n⚠️  Missing spacing utilities: ${missingSpacing.join(', ')}`,
    );
  }

  // Copy the luma-complete.css template to build directory
  if (fs.existsSync(TEMPLATE_FILE)) {
    fs.copyFileSync(TEMPLATE_FILE, COMPLETE_CSS_FILE);
    console.log(`\n✅ Copied ${COMPLETE_CSS_FILE}`);
  } else {
    console.warn(`\n⚠️  Warning: Template file not found: ${TEMPLATE_FILE}`);
  }
}

// Run the generator
generateManifest();
