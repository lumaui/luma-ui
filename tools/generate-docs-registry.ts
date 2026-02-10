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
import { codeToHtml, type ShikiTransformer } from 'shiki';
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
} from '@shikijs/transformers';

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

interface DocImport {
  name: string;
  module: string;
  description?: string;
}

interface DocToken {
  name: string;
  value: string;
  description: string;
}

interface DocTokenGroup {
  name: string;
  tokens: DocToken[];
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
  id: string;
  title: string;
  code: string;
  language: string;
  highlightedCode?: string;
}

interface DocUseCase {
  title: string;
  description: string;
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

interface GlobalConfigOption {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface DocGlobalConfig {
  provider: string;
  description: string;
  code: string;
  options: GlobalConfigOption[];
}

interface DocFrontMatter {
  name: string;
  type: 'component' | 'directive';
  selector: string;
  category: string;
  description: string;
  imports?: DocImport[];
  inputs?: DocInput[];
  tokens?: DocToken[];
  tokenGroups?: DocTokenGroup[];
  globalConfig?: DocGlobalConfig;
}

interface DocComponent {
  name: string;
  slug: string;
  type: 'component' | 'directive';
  category: string;
  description: string;
  selector: string;
  imports: DocImport[];
  inputs: DocInput[];
  tokens: DocToken[];
  tokenGroups: DocTokenGroup[];
  globalConfig?: DocGlobalConfig;
  examples: DocExample[];
  useCases: DocUseCase[];
  customization: DocCustomization;
  highlightedImportCode?: string;
  sections: {
    purpose?: string;
    accessibility?: string;
    neoMinimal?: string;
    usage?: string;
  };
  docPath: string;
  markdownContent: string;
}

interface CustomizingCodeBlock {
  id: string;
  code: string;
  language: string;
  highlightedCode?: string;
}

interface StylingCodeBlock {
  id: string;
  code: string;
  language: string;
  highlightedCode?: string;
}

interface DocsRegistry {
  components: DocComponent[];
  themePages: ThemePage[];
  customizingBlocks: CustomizingCodeBlock[];
  gettingStartedBlocks: CustomizingCodeBlock[];
  stylingBlocks: StylingCodeBlock[];
  categories: string[];
  generatedAt: string;
}

// Configuration
const ANGULAR_LIB_PATH = path.resolve(__dirname, '../packages/angular/src/lib');
const TOKENS_DOCS_PATH = path.resolve(__dirname, '../packages/tokens/src/docs');
const TOKENS_SRC_PATH = path.resolve(__dirname, '../packages/tokens/src');
const PREVIEW_COMPONENTS_PATH = path.resolve(
  __dirname,
  '../apps/docs/src/app/components/previews',
);
const CUSTOMIZING_PAGE_PATH = path.resolve(
  __dirname,
  '../apps/docs/src/app/pages/customizing-page/customizing-page.component.ts',
);
const GETTING_STARTED_PAGE_PATH = path.resolve(
  __dirname,
  '../apps/docs/src/app/pages/getting-started-page/getting-started-page.component.ts',
);
const STYLING_PAGE_PATH = path.resolve(
  __dirname,
  '../apps/docs/src/app/pages/styling-page/styling-page.component.ts',
);
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
 * Extract code examples from markdown content (only from ## Usage Examples section)
 */
function extractExamples(content: string): DocExample[] {
  // Normalize escaped backticks BEFORE parsing
  // This handles backticks that got escaped during refactoring
  const normalizedContent = content
    .replace(/\\`\\`\\`/g, '```') // Fix escaped backticks
    .replace(/\\`\\`\\`/g, '```'); // Fix double-escaped backticks

  // Extract only the Usage Examples section
  const usageExamplesMatch = normalizedContent.match(
    /## Usage Examples\n\n([\s\S]*?)(?=\n## |$)/,
  );
  if (!usageExamplesMatch) return [];

  const usageExamplesContent = usageExamplesMatch[1];

  const examples: DocExample[] = [];
  const lines = usageExamplesContent.split('\n');

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
        const title = currentTitle || `Example ${examples.length + 1}`;
        examples.push({
          id: slugify(title),
          title,
          code: currentCode.trim(),
          language: currentLanguage,
        });
      }
      // Title preserved for consecutive code blocks under same heading
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
 * Extract use cases from markdown content
 */
function extractUseCases(content: string): DocUseCase[] {
  const useCases: DocUseCase[] = [];

  // Match ## Use Cases section
  const useCasesMatch = content.match(/## Use Cases\n\n([\s\S]*?)(?=\n## |$)/);
  if (!useCasesMatch) return useCases;

  const useCasesContent = useCasesMatch[1];

  // Extract each ### subsection
  const subsectionRegex = /### ([^\n]+)\n\n([\s\S]*?)(?=\n### |$)/g;
  let match;

  while ((match = subsectionRegex.exec(useCasesContent)) !== null) {
    const title = match[1];
    const subsectionContent = match[2];

    // Extract description (text before code block)
    const descMatch = subsectionContent.match(/^([\s\S]*?)(?=\n```)/);
    const description = descMatch ? descMatch[1].trim() : '';

    // Extract code block
    const codeMatch = subsectionContent.match(/```(\w+)?\n([\s\S]*?)\n```/);
    if (codeMatch) {
      useCases.push({
        title,
        description,
        code: codeMatch[2].trim(),
        language: codeMatch[1] || 'typescript',
      });
    }
  }

  return useCases;
}

/**
 * Generate slug from component name
 */
function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Slugify title for example IDs
 */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Extract preview code from preview component files
 */
function extractPreviewCode(): Record<string, Record<string, string>> {
  const previewMap: Record<string, Record<string, string>> = {};

  if (!fs.existsSync(PREVIEW_COMPONENTS_PATH)) {
    console.warn(`⚠️  Preview components directory not found`);
    return previewMap;
  }

  const files = fs.readdirSync(PREVIEW_COMPONENTS_PATH);

  for (const file of files) {
    if (file.endsWith('-previews.component.ts')) {
      const filePath = path.join(PREVIEW_COMPONENTS_PATH, file);
      const componentSlug = file.replace(/-previews\.component\.ts$/, '');

      const content = fs.readFileSync(filePath, 'utf-8');

      // Find the template string
      const templateMatch = content.match(/template:\s*`([\s\S]*?)`\s*,/);
      if (!templateMatch) continue;

      const template = templateMatch[1];

      // Extract all @case blocks
      const CASE_REGEX = /@case\s*\('([^']+)'\)\s*\{([\s\S]*?)\n\s{6}\}/g;
      const examples: Record<string, string> = {};

      let match;
      while ((match = CASE_REGEX.exec(template)) !== null) {
        const exampleId = match[1];
        let innerHtml = match[2];

        // Dedent
        const lines = innerHtml.split('\n');
        const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

        if (nonEmptyLines.length === 0) continue;

        const minIndent = Math.min(
          ...nonEmptyLines.map((line) => {
            const m = line.match(/^(\s*)/);
            return m ? m[1].length : 0;
          }),
        );

        innerHtml = lines
          .map((line) => line.slice(minIndent))
          .join('\n')
          .trim();

        // Remove layout wrapper divs
        const wrapperMatch = innerHtml.match(
          /^<div class="[^"]*(?:flex|justify-center|items-center|gap-)[^"]*">\s*([\s\S]*?)\s*<\/div>$/,
        );
        if (wrapperMatch) {
          innerHtml = wrapperMatch[1].trim();
        }

        examples[exampleId] = innerHtml;
      }

      if (Object.keys(examples).length > 0) {
        previewMap[componentSlug] = examples;
      }
    }
  }

  return previewMap;
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
    const useCases = extractUseCases(content);
    const customization = extractCustomization(content);
    const sections = extractSections(content);

    return {
      name: frontMatter.name,
      slug: generateSlug(frontMatter.name),
      type: frontMatter.type,
      category: frontMatter.category,
      description: frontMatter.description || '',
      selector: frontMatter.selector || '',
      imports: frontMatter.imports || [],
      inputs: frontMatter.inputs || [],
      tokens: frontMatter.tokens || [],
      tokenGroups: frontMatter.tokenGroups || [],
      globalConfig: frontMatter.globalConfig,
      examples,
      useCases,
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
 * Merge preview code into examples (Single Source of Truth)
 */
function mergePreviewCode(
  components: DocComponent[],
  previewMap: Record<string, Record<string, string>>,
): void {
  console.log('\nMerging preview code into examples...');

  for (const component of components) {
    const previews = previewMap[component.slug] || {};

    for (const example of component.examples) {
      const previewCode = previews[example.id];

      if (previewCode) {
        // Preview is the source of truth
        example.code = previewCode;
      } else {
        // Fallback to .docs.md code if no preview exists
        // (for CSS/TypeScript examples that are code-only)
        if (!example.code) {
          console.warn(
            `  ⚠️  ${component.slug}/${example.id}: No code in preview or docs`,
          );
        }
      }
    }
  }

  console.log('Preview code merge complete');
}

/**
 * Language name mapping for display labels
 */
const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  html: 'HTML',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  js: 'JavaScript',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  bash: 'Bash',
  shell: 'Shell',
  markdown: 'Markdown',
  md: 'Markdown',
};

/**
 * Custom transformer that adds language label to code blocks
 */
function transformerLanguageLabel(): ShikiTransformer {
  return {
    name: 'luma:language-label',
    pre(node) {
      const lang = this.options.lang || 'text';
      const displayName =
        LANGUAGE_DISPLAY_NAMES[lang] ||
        lang.charAt(0).toUpperCase() + lang.slice(1);

      // Add data-language attribute
      node.properties['data-language'] = displayName;

      // Insert language label as first child
      const labelNode = {
        type: 'element',
        tagName: 'div',
        properties: {
          class: 'shiki-language-label',
          'aria-hidden': 'true',
        },
        children: [{ type: 'text', value: displayName }],
      };

      node.children.unshift(labelNode);
    },
  };
}

/**
 * Custom transformer for CSS counter-based line numbers
 * Activated via: ```typescript {lineNumbers}
 */
function transformerLineNumbers(): ShikiTransformer {
  return {
    name: 'luma:line-numbers',
    pre(node) {
      const meta = this.options.meta?.__raw || '';
      if (meta.includes('lineNumbers')) {
        node.properties['data-line-numbers'] = 'true';
      }
    },
    line(node, line) {
      node.properties['data-line'] = line;
    },
  };
}

/**
 * Add syntax highlighting to all examples
 */
async function highlightExamples(components: DocComponent[]): Promise<void> {
  console.log('\nAdding syntax highlighting to examples...');

  for (const component of components) {
    for (const example of component.examples) {
      if (example.code) {
        try {
          example.highlightedCode = await codeToHtml(example.code, {
            lang: example.language || 'html',
            themes: {
              light: 'min-light',
              dark: 'nord',
            },
            transformers: [
              transformerLanguageLabel(),
              transformerLineNumbers(),
              transformerMetaHighlight(),
              transformerNotationDiff(),
              transformerNotationFocus(),
            ],
          });
        } catch (error) {
          console.warn(
            `  Warning: Failed to highlight ${component.slug}/${example.id}: ${error}`,
          );
        }
      }
    }
  }

  console.log('Syntax highlighting complete');
}

/**
 * Generate formatted import statement from DocImport array
 * Mirrors the logic from component-docs.component.ts getImportStatement()
 */
function generateImportStatement(imports: DocImport[]): string {
  if (!imports || imports.length === 0) return '';

  // Group imports by module
  const byModule = new Map<string, string[]>();
  for (const imp of imports) {
    const names = byModule.get(imp.module) || [];
    names.push(imp.name);
    byModule.set(imp.module, names);
  }

  // Generate import statements
  const statements: string[] = [];
  for (const [module, names] of byModule) {
    if (names.length <= 2) {
      // Single line for 1-2 imports
      statements.push(`import { ${names.join(', ')} } from '${module}';`);
    } else {
      // Multi-line for 3+ imports
      const formattedNames = names.map((n) => `  ${n},`).join('\n');
      statements.push(`import {\n${formattedNames}\n} from '${module}';`);
    }
  }

  return statements.join('\n\n');
}

/**
 * Add syntax highlighting to import statements
 */
async function highlightImports(components: DocComponent[]): Promise<void> {
  console.log('\nAdding syntax highlighting to imports...');

  for (const component of components) {
    if (component.imports && component.imports.length > 0) {
      try {
        const importCode = generateImportStatement(component.imports);
        component.highlightedImportCode = await codeToHtml(importCode, {
          lang: 'typescript',
          themes: {
            light: 'min-light',
            dark: 'nord',
          },
          transformers: [
            transformerLanguageLabel(),
            transformerLineNumbers(),
            transformerMetaHighlight(),
            transformerNotationDiff(),
            transformerNotationFocus(),
          ],
        });
      } catch (error) {
        console.warn(
          `  Warning: Failed to highlight imports for ${component.slug}: ${error}`,
        );
      }
    }
  }

  console.log('Import highlighting complete');
}

/**
 * Generate the docs registry
 */
/**
 * Extract code blocks from customizing-page.component.ts
 */
function extractCustomizingBlocks(
  componentPath: string,
): CustomizingCodeBlock[] {
  if (!fs.existsSync(componentPath)) {
    console.warn(`  Warning: Customizing page not found at ${componentPath}`);
    return [];
  }

  const content = fs.readFileSync(componentPath, 'utf-8');
  const blocks: CustomizingCodeBlock[] = [];

  // Regex to find readonly properties with code (template strings)
  // Matches: readonly propertyName = `code`
  const propertyRegex = /readonly (\w+(?:Example|Command)) = `([^`]+)`/gs;

  let match;
  while ((match = propertyRegex.exec(content)) !== null) {
    const [, id, code] = match;

    // Infer language from property name and code content
    let language = 'text';

    // Check for shell commands (npm, npx, cd, etc.)
    if (
      code.startsWith('npm ') ||
      code.startsWith('npx ') ||
      code.startsWith('yarn ')
    ) {
      language = 'bash';
    }
    // Check for CSS
    else if (
      code.includes(':root') ||
      code.includes('--') ||
      code.includes('@import')
    ) {
      language = 'css';
    }
    // Check for HTML
    else if (code.includes('<') && code.includes('>') && code.includes('</')) {
      language = 'html';
    }
    // Check for TypeScript/JavaScript
    else if (
      code.includes('import {') ||
      code.includes('export ') ||
      code.includes('function') ||
      code.includes('const ')
    ) {
      language = 'typescript';
    }
    // Check for JavaScript config files
    else if (code.includes('export default') && code.includes('content:')) {
      language = 'javascript';
    }

    blocks.push({ id, code, language });
  }

  return blocks;
}

/**
 * Add syntax highlighting to customizing blocks
 */
async function highlightCustomizingBlocks(
  blocks: CustomizingCodeBlock[],
): Promise<void> {
  console.log('\nHighlighting customizing page blocks...');

  for (const block of blocks) {
    try {
      block.highlightedCode = await codeToHtml(block.code, {
        lang: block.language,
        themes: {
          light: 'min-light',
          dark: 'nord',
        },
        transformers: [
          transformerLanguageLabel(),
          transformerLineNumbers(),
          transformerMetaHighlight(),
          transformerNotationDiff(),
          transformerNotationFocus(),
        ],
      });
      console.log(`  ✓ ${block.id} (${block.language})`);
    } catch (error) {
      console.warn(`  Warning: Failed to highlight ${block.id}: ${error}`);
    }
  }

  console.log(`Highlighted ${blocks.length} customizing blocks`);
}

/**
 * Process template literal escape sequences
 * Converts literal \n, \t, \r to actual characters
 */
function processEscapeSequences(str: string): string {
  return str.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\r/g, '\r');
}

/**
 * Extract code blocks from styling-page.component.ts
 * Extracts cssExample from radiusTokens and shadowTokens arrays
 */
function extractStylingPageCodeBlocks(
  componentPath: string,
): StylingCodeBlock[] {
  if (!fs.existsSync(componentPath)) {
    console.warn(`  Warning: Styling page not found at ${componentPath}`);
    return [];
  }

  const content = fs.readFileSync(componentPath, 'utf-8');
  const blocks: StylingCodeBlock[] = [];

  // Extract radiusTokens array
  const radiusMatch = content.match(
    /readonly radiusTokens: TokenPreviewData\[\] = \[([\s\S]*?)\];/,
  );
  if (radiusMatch) {
    const radiusContent = radiusMatch[1];
    // Extract each token with name and cssExample
    const tokenRegex = /{\s*name:\s*'([^']+)',[\s\S]*?cssExample:\s*`([^`]+)`/g;
    let match;
    while ((match = tokenRegex.exec(radiusContent)) !== null) {
      const [, name, cssExample] = match;
      const id = name.toLowerCase().replace(/\s+/g, '-') + '-example';
      const processedCode = processEscapeSequences(cssExample);
      blocks.push({ id, code: processedCode, language: 'css' });
    }
  }

  // Extract shadowTokens array
  const shadowMatch = content.match(
    /readonly shadowTokens: TokenPreviewData\[\] = \[([\s\S]*?)\];/,
  );
  if (shadowMatch) {
    const shadowContent = shadowMatch[1];
    // Extract each token with name and cssExample
    const tokenRegex = /{\s*name:\s*'([^']+)',[\s\S]*?cssExample:\s*`([^`]+)`/g;
    let match;
    while ((match = tokenRegex.exec(shadowContent)) !== null) {
      const [, name, cssExample] = match;
      const id = name.toLowerCase().replace(/\s+/g, '-') + '-example';
      const processedCode = processEscapeSequences(cssExample);
      blocks.push({ id, code: processedCode, language: 'css' });
    }
  }

  return blocks;
}

/**
 * Add syntax highlighting to styling blocks
 */
async function highlightStylingBlocks(
  blocks: StylingCodeBlock[],
): Promise<void> {
  console.log('\nHighlighting styling page blocks...');

  for (const block of blocks) {
    try {
      block.highlightedCode = await codeToHtml(block.code, {
        lang: block.language,
        themes: {
          light: 'min-light',
          dark: 'nord',
        },
        transformers: [
          transformerLanguageLabel(),
          transformerLineNumbers(),
          transformerMetaHighlight(),
          transformerNotationDiff(),
          transformerNotationFocus(),
        ],
      });
      console.log(`  ✓ ${block.id} (${block.language})`);
    } catch (error) {
      console.warn(`  Warning: Failed to highlight ${block.id}: ${error}`);
    }
  }

  console.log(`Highlighted ${blocks.length} styling blocks`);
}

async function generateRegistry(): Promise<DocsRegistry> {
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

  // Extract preview code from preview components
  const previewMap = extractPreviewCode();

  // Merge preview code into examples (Single Source of Truth)
  mergePreviewCode(components, previewMap);

  // Add syntax highlighting to all examples
  await highlightExamples(components);

  // Add syntax highlighting to import statements
  await highlightImports(components);

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

  // Extract and highlight customizing blocks
  console.log('\nProcessing customizing page code blocks...');
  const customizingBlocks = extractCustomizingBlocks(CUSTOMIZING_PAGE_PATH);
  console.log(`Found ${customizingBlocks.length} code blocks`);
  await highlightCustomizingBlocks(customizingBlocks);

  // Extract and highlight getting started blocks
  console.log('\nProcessing getting started page code blocks...');
  const gettingStartedBlocks = extractCustomizingBlocks(
    GETTING_STARTED_PAGE_PATH,
  );
  console.log(`Found ${gettingStartedBlocks.length} code blocks`);
  await highlightCustomizingBlocks(gettingStartedBlocks);

  // Extract and highlight styling blocks
  console.log('\nProcessing styling page code blocks...');
  const stylingBlocks = extractStylingPageCodeBlocks(STYLING_PAGE_PATH);
  console.log(`Found ${stylingBlocks.length} code blocks`);
  await highlightStylingBlocks(stylingBlocks);

  return {
    components,
    themePages,
    customizingBlocks,
    gettingStartedBlocks,
    stylingBlocks,
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
  console.log(`  Customizing Blocks: ${registry.customizingBlocks.length}`);
  console.log(
    `  Getting Started Blocks: ${registry.gettingStartedBlocks.length}`,
  );
  console.log(`  Styling Blocks: ${registry.stylingBlocks.length}`);
  console.log(`  Categories: ${registry.categories.join(', ')}`);
}

// Main
async function main(): Promise<void> {
  console.log('=== Generate Docs Registry ===\n');

  const registry = await generateRegistry();
  writeRegistry(registry);

  console.log('\nDone!');
}

main();
