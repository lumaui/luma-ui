/**
 * Generate Docs Registry
 *
 * This script scans .docs.md files in packages/angular/src/lib/ and generates
 * a JSON registry that powers the documentation app.
 *
 * Usage: npx ts-node tools/generate-docs-registry.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
interface DocInput {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface DocToken {
  name: string;
  value: string;
  description: string;
}

interface DocExample {
  title: string;
  code: string;
  language: string;
}

interface CustomizationExample {
  title: string;
  description: string;
  code: string;
  language: string;
  overrideType: 'global' | 'theme' | 'component';
}

interface DocCustomization {
  intro: string;
  examples: CustomizationExample[];
}

interface DocFrontMatter {
  name: string;
  type: 'component' | 'directive';
  selector: string;
  category: string;
  description: string;
  inputs?: DocInput[];
  tokens?: DocToken[];
}

interface DocComponent {
  name: string;
  slug: string;
  type: 'component' | 'directive';
  category: string;
  description: string;
  selector: string;
  inputs: DocInput[];
  tokens: DocToken[];
  examples: DocExample[];
  customization: DocCustomization;
  sections: {
    purpose?: string;
    accessibility?: string;
    neoMinimal?: string;
    usage?: string;
  };
  docPath: string;
  markdownContent: string;
}

interface DocsRegistry {
  components: DocComponent[];
  categories: string[];
  generatedAt: string;
}

// Configuration
const ANGULAR_LIB_PATH = path.resolve(__dirname, '../packages/angular/src/lib');
const OUTPUT_PATH = path.resolve(
  __dirname,
  '../apps/docs/src/generated/docs-registry.json',
);

/**
 * Find all .docs.md files in the library
 */
function findDocFiles(libPath: string): string[] {
  const docFiles: string[] = [];

  const componentDirs = fs.readdirSync(libPath, { withFileTypes: true });

  for (const dir of componentDirs) {
    if (!dir.isDirectory()) continue;

    const componentPath = path.join(libPath, dir.name);
    const files = fs.readdirSync(componentPath);

    for (const file of files) {
      if (file.endsWith('.docs.md')) {
        docFiles.push(path.join(componentPath, file));
      }
    }
  }

  return docFiles;
}

/**
 * Extract customization examples from markdown content
 */
function extractCustomization(content: string): DocCustomization {
  const result: DocCustomization = {
    intro: '',
    examples: [],
  };

  // Match ## Customizing section (must be exactly "## Customizing" not "## Customizing X")
  const customizingMatch = content.match(
    /## Customizing\n\n([\s\S]*?)(?=\n## |$)/,
  );
  if (!customizingMatch) return result;

  const customizingContent = customizingMatch[1];

  // Extract intro paragraph (text before first ###)
  const introMatch = customizingContent.match(/^([\s\S]*?)(?=\n### )/);
  if (introMatch) {
    result.intro = introMatch[1].trim();
  }

  // Extract each ### subsection
  const subsectionRegex =
    /### (Override (?:Globally|Per Theme|Per Component))\n\n([\s\S]*?)(?=\n### |$)/g;
  let match;

  while ((match = subsectionRegex.exec(customizingContent)) !== null) {
    const title = match[1];
    const subsectionContent = match[2];

    // Extract description (text before code block)
    const descMatch = subsectionContent.match(/^([\s\S]*?)(?=\n```)/);
    const description = descMatch ? descMatch[1].trim() : '';

    // Extract code block
    const codeMatch = subsectionContent.match(/```(\w+)?\n([\s\S]*?)\n```/);
    if (codeMatch) {
      const overrideType: 'global' | 'theme' | 'component' = title.includes(
        'Globally',
      )
        ? 'global'
        : title.includes('Theme')
          ? 'theme'
          : 'component';

      result.examples.push({
        title,
        description,
        code: codeMatch[2].trim(),
        language: codeMatch[1] || 'css',
        overrideType,
      });
    }
  }

  return result;
}

/**
 * Extract code examples from markdown content (excluding Customizing section)
 */
function extractExamples(content: string): DocExample[] {
  // Remove the Customizing section before extracting examples
  const contentWithoutCustomizing = content.replace(
    /## Customizing\n\n[\s\S]*?(?=\n## |$)/,
    '',
  );

  const examples: DocExample[] = [];
  const lines = contentWithoutCustomizing.split('\n');

  let currentTitle = '';
  let inCodeBlock = false;
  let currentCode = '';
  let currentLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for heading (potential example title)
    const headingMatch = line.match(/^###\s+(.+)$/);
    if (headingMatch && !inCodeBlock) {
      currentTitle = headingMatch[1];
      continue;
    }

    // Check for code block start
    const codeStartMatch = line.match(/^```(\w+)?$/);
    if (codeStartMatch && !inCodeBlock) {
      inCodeBlock = true;
      currentLanguage = codeStartMatch[1] || 'html';
      currentCode = '';
      continue;
    }

    // Check for code block end
    if (line === '```' && inCodeBlock) {
      inCodeBlock = false;
      if (currentCode.trim()) {
        examples.push({
          title: currentTitle || `Example ${examples.length + 1}`,
          code: currentCode.trim(),
          language: currentLanguage,
        });
      }
      currentTitle = '';
      continue;
    }

    // Accumulate code
    if (inCodeBlock) {
      currentCode += line + '\n';
    }
  }

  return examples;
}

/**
 * Extract sections from markdown content
 */
function extractSections(content: string): DocComponent['sections'] {
  const sections: DocComponent['sections'] = {};

  // Extract Purpose section
  const purposeMatch = content.match(/## Purpose\n\n([\s\S]*?)(?=\n## |$)/);
  if (purposeMatch) {
    sections.purpose = purposeMatch[1].trim();
  }

  // Extract Accessibility section
  const accessibilityMatch = content.match(
    /## Accessibility\n\n([\s\S]*?)(?=\n## |$)/,
  );
  if (accessibilityMatch) {
    sections.accessibility = accessibilityMatch[1].trim();
  }

  // Extract Neo-Minimal Principles section
  const neoMinimalMatch = content.match(
    /## Neo-Minimal Principles\n\n([\s\S]*?)(?=\n## |$)/,
  );
  if (neoMinimalMatch) {
    sections.neoMinimal = neoMinimalMatch[1].trim();
  }

  // Extract Usage Examples section
  const usageMatch = content.match(
    /## Usage Examples\n\n([\s\S]*?)(?=\n## |$)/,
  );
  if (usageMatch) {
    sections.usage = usageMatch[1].trim();
  }

  return sections;
}

/**
 * Generate slug from component name
 */
function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Parse a single .docs.md file
 */
function parseDocFile(filePath: string): DocComponent | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const frontMatter = data as DocFrontMatter;

    // Validate required fields
    if (!frontMatter.name || !frontMatter.type || !frontMatter.category) {
      console.warn(`Warning: Missing required front matter in ${filePath}`);
      console.warn('  Required: name, type, category');
      return null;
    }

    const examples = extractExamples(content);
    const customization = extractCustomization(content);
    const sections = extractSections(content);

    return {
      name: frontMatter.name,
      slug: generateSlug(frontMatter.name),
      type: frontMatter.type,
      category: frontMatter.category,
      description: frontMatter.description || '',
      selector: frontMatter.selector || '',
      inputs: frontMatter.inputs || [],
      tokens: frontMatter.tokens || [],
      examples,
      customization,
      sections,
      docPath: path.relative(path.resolve(__dirname, '..'), filePath),
      markdownContent: content,
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

/**
 * Generate the docs registry
 */
function generateRegistry(): DocsRegistry {
  console.log('Scanning for .docs.md files...');

  const docFiles = findDocFiles(ANGULAR_LIB_PATH);
  console.log(`Found ${docFiles.length} documentation files`);

  const components: DocComponent[] = [];
  const categoriesSet = new Set<string>();

  for (const filePath of docFiles) {
    console.log(`  Processing: ${path.basename(filePath)}`);
    const component = parseDocFile(filePath);

    if (component) {
      components.push(component);
      categoriesSet.add(component.category);
    }
  }

  // Sort components by name
  components.sort((a, b) => a.name.localeCompare(b.name));

  // Sort categories
  const categories = Array.from(categoriesSet).sort();

  return {
    components,
    categories,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Write registry to file
 */
function writeRegistry(registry: DocsRegistry): void {
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2));
  console.log(`\nRegistry written to: ${OUTPUT_PATH}`);
  console.log(`  Components: ${registry.components.length}`);
  console.log(`  Categories: ${registry.categories.join(', ')}`);
}

// Main
function main(): void {
  console.log('=== Generate Docs Registry ===\n');

  const registry = generateRegistry();
  writeRegistry(registry);

  console.log('\nDone!');
}

main();
