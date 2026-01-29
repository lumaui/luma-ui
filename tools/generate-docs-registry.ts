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

// Theme documentation types
interface ThemeToken {
  name: string; // CSS variable name, e.g., --luma-color-primary-50
  value: string; // Light theme value
  darkValue?: string; // Dark theme value (optional)
  type: string; // Token type: color, dimension, etc.
  description: string;
}

interface ThemeTokenGroup {
  name: string; // Group name, e.g., "Primary", "Neutral"
  tokens: ThemeToken[];
}

interface ThemePage {
  name: string;
  slug: string;
  category: 'Theme';
  description: string;
  groups: ThemeTokenGroup[];
  sections: {
    purpose?: string;
    neoMinimal?: string;
    usage?: string;
  };
  docPath: string;
  markdownContent: string;
}

interface ThemeFrontMatter {
  name: string;
  slug: string;
  category: 'Theme';
  description: string;
  sourceFiles: {
    light: string;
    dark?: string;
  };
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
  themePages: ThemePage[];
  categories: string[];
  generatedAt: string;
}

// Configuration
const ANGULAR_LIB_PATH = path.resolve(__dirname, '../packages/angular/src/lib');
const TOKENS_DOCS_PATH = path.resolve(__dirname, '../packages/tokens/src/docs');
const TOKENS_SRC_PATH = path.resolve(__dirname, '../packages/tokens/src');
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
 * Find all .docs.md files in the theme docs directory
 */
function findThemeDocFiles(docsPath: string): string[] {
  if (!fs.existsSync(docsPath)) {
    return [];
  }

  const docFiles: string[] = [];
  const files = fs.readdirSync(docsPath);

  for (const file of files) {
    if (file.endsWith('.docs.md')) {
      docFiles.push(path.join(docsPath, file));
    }
  }

  return docFiles;
}

/**
 * Extract tokens from a JSON token file
 * Recursively traverses the structure to build CSS variable names
 */
function extractTokensFromJson(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: any,
  prefix = '',
): { path: string; value: string; type: string; description: string }[] {
  const tokens: {
    path: string;
    value: string;
    type: string;
    description: string;
  }[] = [];

  for (const [key, val] of Object.entries(json)) {
    const currentPath = prefix ? `${prefix}-${key}` : key;

    if (
      val &&
      typeof val === 'object' &&
      'value' in (val as Record<string, unknown>)
    ) {
      const tokenVal = val as {
        value: string;
        type?: string;
        description?: string;
      };
      // Skip tokens that reference other tokens (contain {})
      if (typeof tokenVal.value === 'string' && !tokenVal.value.includes('{')) {
        tokens.push({
          path: currentPath,
          value: tokenVal.value,
          type: tokenVal.type || 'unknown',
          description: tokenVal.description || '',
        });
      }
    } else if (val && typeof val === 'object') {
      tokens.push(...extractTokensFromJson(val, currentPath));
    }
  }

  return tokens;
}

/**
 * Group tokens by their second-level key (e.g., color.primary -> Primary)
 */
function groupTokens(
  lightTokens: {
    path: string;
    value: string;
    type: string;
    description: string;
  }[],
  darkTokens: Map<string, string>,
): ThemeTokenGroup[] {
  const groups = new Map<string, ThemeToken[]>();

  for (const token of lightTokens) {
    // Extract group name from path (second segment after luma)
    // e.g., "luma-color-primary-50" -> "primary"
    const pathParts = token.path.split('-');
    let groupName: string;

    if (pathParts.length >= 3) {
      // Skip "luma" prefix if present, then take the category and subcategory
      const startIndex = pathParts[0] === 'luma' ? 1 : 0;
      if (pathParts.length > startIndex + 1) {
        groupName = pathParts[startIndex + 1]; // e.g., "primary", "neutral"
      } else {
        groupName = pathParts[startIndex]; // e.g., "spacing", "radius"
      }
    } else {
      groupName = pathParts[pathParts.length - 1];
    }

    // Capitalize group name
    const displayName = groupName.charAt(0).toUpperCase() + groupName.slice(1);

    if (!groups.has(displayName)) {
      groups.set(displayName, []);
    }

    const cssVarName = `--${token.path}`;
    groups.get(displayName)!.push({
      name: cssVarName,
      value: token.value,
      darkValue: darkTokens.get(token.path),
      type: token.type,
      description: token.description,
    });
  }

  // Convert to array and sort groups
  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, tokens]) => ({ name, tokens }));
}

/**
 * Extract theme sections from markdown content
 */
function extractThemeSections(content: string): ThemePage['sections'] {
  const sections: ThemePage['sections'] = {};

  // Extract Purpose section
  const purposeMatch = content.match(/## Purpose\n\n([\s\S]*?)(?=\n## |$)/);
  if (purposeMatch) {
    sections.purpose = purposeMatch[1].trim();
  }

  // Extract Neo-Minimal Principles section
  const neoMinimalMatch = content.match(
    /## Neo-Minimal Principles\n\n([\s\S]*?)(?=\n## |$)/,
  );
  if (neoMinimalMatch) {
    sections.neoMinimal = neoMinimalMatch[1].trim();
  }

  // Extract Usage section
  const usageMatch = content.match(/## Usage\n\n([\s\S]*?)(?=\n## |$)/);
  if (usageMatch) {
    sections.usage = usageMatch[1].trim();
  }

  return sections;
}

/**
 * Parse a single theme .docs.md file
 */
function parseThemeDocFile(filePath: string): ThemePage | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const frontMatter = data as ThemeFrontMatter;

    // Validate required fields
    if (!frontMatter.name || !frontMatter.slug || !frontMatter.sourceFiles) {
      console.warn(`Warning: Missing required front matter in ${filePath}`);
      console.warn('  Required: name, slug, sourceFiles');
      return null;
    }

    // Read light theme tokens
    const lightJsonPath = path.join(
      TOKENS_SRC_PATH,
      frontMatter.sourceFiles.light,
    );
    if (!fs.existsSync(lightJsonPath)) {
      console.warn(`Warning: Light theme file not found: ${lightJsonPath}`);
      return null;
    }

    const lightJson = JSON.parse(fs.readFileSync(lightJsonPath, 'utf-8'));
    const lightTokens = extractTokensFromJson(lightJson);

    // Read dark theme tokens if specified
    const darkTokens = new Map<string, string>();
    if (frontMatter.sourceFiles.dark) {
      const darkJsonPath = path.join(
        TOKENS_SRC_PATH,
        frontMatter.sourceFiles.dark,
      );
      if (fs.existsSync(darkJsonPath)) {
        const darkJson = JSON.parse(fs.readFileSync(darkJsonPath, 'utf-8'));
        const darkTokenList = extractTokensFromJson(darkJson);
        for (const token of darkTokenList) {
          darkTokens.set(token.path, token.value);
        }
      }
    }

    // Group tokens
    const groups = groupTokens(lightTokens, darkTokens);

    // Extract sections
    const sections = extractThemeSections(content);

    return {
      name: frontMatter.name,
      slug: frontMatter.slug,
      category: 'Theme',
      description: frontMatter.description || '',
      groups,
      sections,
      docPath: path.relative(path.resolve(__dirname, '..'), filePath),
      markdownContent: content,
    };
  } catch (error) {
    console.error(`Error parsing theme doc ${filePath}:`, error);
    return null;
  }
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
  console.log('Scanning for component .docs.md files...');

  const docFiles = findDocFiles(ANGULAR_LIB_PATH);
  console.log(`Found ${docFiles.length} component documentation files`);

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

  // Process theme documentation files
  console.log('\nScanning for theme .docs.md files...');
  const themeDocFiles = findThemeDocFiles(TOKENS_DOCS_PATH);
  console.log(`Found ${themeDocFiles.length} theme documentation files`);

  const themePages: ThemePage[] = [];

  for (const filePath of themeDocFiles) {
    console.log(`  Processing: ${path.basename(filePath)}`);
    const themePage = parseThemeDocFile(filePath);

    if (themePage) {
      themePages.push(themePage);
    }
  }

  // Sort theme pages by name
  themePages.sort((a, b) => a.name.localeCompare(b.name));

  return {
    components,
    themePages,
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
  console.log(`  Theme Pages: ${registry.themePages.length}`);
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
