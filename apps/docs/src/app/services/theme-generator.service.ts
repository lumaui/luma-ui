import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type TokenCategory =
  | 'color'
  | 'spacing'
  | 'radius'
  | 'typography'
  | 'focus'
  | 'duration'
  | 'button'
  | 'card'
  | 'badge'
  | 'accordion'
  | 'tooltip'
  | 'tabs'
  | 'modal'
  | 'toast'
  | 'code';

export interface Token {
  name: string;
  category: TokenCategory;
  value: string;
  currentValue: string;
  isCore: boolean;
  dependencies: string[];
  dependents: string[];
  isModified: boolean;
  isCascaded: boolean;
}

export interface DependencyGraph {
  nodes: Map<string, Token>;
  edges: Map<string, Set<string>>;
  reverseEdges: Map<string, Set<string>>;
}

export interface ExportResult {
  css: string;
  tokenCount: number;
}

const CORE_CATEGORIES: TokenCategory[] = [
  'color',
  'spacing',
  'radius',
  'typography',
  'focus',
  'duration',
];

const STORAGE_KEY = 'luma-theme-generator-state';

@Injectable({
  providedIn: 'root',
})
export class ThemeGeneratorService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // State signals
  readonly isOpen = signal(false);
  readonly currentTab = signal<'light' | 'dark'>('light');
  readonly lightGraph = signal<DependencyGraph | null>(null);
  readonly darkGraph = signal<DependencyGraph | null>(null);
  readonly isInitialized = signal(false);

  // Computed
  readonly activeGraph = computed(() => {
    return this.currentTab() === 'light'
      ? this.lightGraph()
      : this.darkGraph();
  });

  readonly categories = computed(() => {
    const graph = this.activeGraph();
    if (!graph) return [];

    const categoryMap = new Map<TokenCategory, Token[]>();

    graph.nodes.forEach((token) => {
      if (!categoryMap.has(token.category)) {
        categoryMap.set(token.category, []);
      }
      categoryMap.get(token.category)!.push(token);
    });

    return Array.from(categoryMap.entries())
      .map(([category, tokens]) => ({
        name: category,
        tokens: tokens.sort((a, b) => a.name.localeCompare(b.name)),
        modifiedCount: tokens.filter((t) => t.isModified).length,
      }))
      .sort((a, b) => {
        // Core categories first
        const aIsCore = CORE_CATEGORIES.includes(a.name);
        const bIsCore = CORE_CATEGORIES.includes(b.name);
        if (aIsCore && !bIsCore) return -1;
        if (!aIsCore && bIsCore) return 1;
        return a.name.localeCompare(b.name);
      });
  });

  readonly hasModifications = computed(() => {
    const light = this.lightGraph();
    const dark = this.darkGraph();

    const lightHasMods =
      light && Array.from(light.nodes.values()).some((t) => t.isModified);
    const darkHasMods =
      dark && Array.from(dark.nodes.values()).some((t) => t.isModified);

    return lightHasMods || darkHasMods;
  });

  async initialize(): Promise<void> {
    if (!this.isBrowser || this.isInitialized()) return;

    try {
      // Load CSS files
      const [lightCss, darkCss] = await Promise.all([
        fetch('/assets/tokens/luma.css').then((r) => r.text()),
        fetch('/assets/tokens/luma-dark.css').then((r) => r.text()),
      ]);

      // Parse into dependency graphs
      const lightGraph = this.parseCss(lightCss, 'light');
      const darkGraph = this.parseCss(darkCss, 'dark');

      // Load saved state from localStorage
      this.loadState(lightGraph, darkGraph);

      this.lightGraph.set(lightGraph);
      this.darkGraph.set(darkGraph);
      this.isInitialized.set(true);
    } catch (error) {
      console.error('Failed to initialize theme generator:', error);
    }
  }

  private parseCss(cssContent: string, theme: 'light' | 'dark'): DependencyGraph {
    const nodes = new Map<string, Token>();
    const edges = new Map<string, Set<string>>();
    const reverseEdges = new Map<string, Set<string>>();

    // Extract all CSS custom properties
    const tokenRegex = /--(luma-[a-z-]+):\s*([^;]+);/g;
    let match;

    while ((match = tokenRegex.exec(cssContent)) !== null) {
      const name = `--${match[1]}`;
      const value = match[2].trim();

      // Extract var() dependencies
      const varRegex = /var\(--(luma-[a-z-]+)\)/g;
      const dependencies: string[] = [];
      let varMatch;

      while ((varMatch = varRegex.exec(value)) !== null) {
        dependencies.push(`--${varMatch[1]}`);
      }

      // Determine category from token name
      const category = this.categorizeToken(name);

      // Determine if core token
      const isCore = CORE_CATEGORIES.includes(category);

      const token: Token = {
        name,
        category,
        value,
        currentValue: value,
        isCore,
        dependencies,
        dependents: [],
        isModified: false,
        isCascaded: false,
      };

      nodes.set(name, token);

      // Build edges
      if (dependencies.length > 0) {
        edges.set(name, new Set(dependencies));
      }
    }

    // Build reverse edges (dependents)
    edges.forEach((deps, tokenName) => {
      deps.forEach((dep) => {
        if (!reverseEdges.has(dep)) {
          reverseEdges.set(dep, new Set());
        }
        reverseEdges.get(dep)!.add(tokenName);
      });
    });

    // Populate dependents in tokens
    reverseEdges.forEach((dependents, tokenName) => {
      const token = nodes.get(tokenName);
      if (token) {
        token.dependents = Array.from(dependents);
      }
    });

    return { nodes, edges, reverseEdges };
  }

  private categorizeToken(name: string): TokenCategory {
    // Extract category from token name pattern: --luma-{category}-...
    const match = name.match(/^--luma-([a-z]+)-/);
    if (!match) return 'color'; // fallback

    const category = match[1];

    // Map to known categories
    switch (category) {
      case 'color':
        return 'color';
      case 'spacing':
        return 'spacing';
      case 'radius':
        return 'radius';
      case 'typography':
      case 'font':
      case 'text':
        return 'typography';
      case 'focus':
        return 'focus';
      case 'duration':
      case 'transition':
        return 'duration';
      case 'button':
        return 'button';
      case 'card':
        return 'card';
      case 'badge':
        return 'badge';
      case 'accordion':
        return 'accordion';
      case 'tooltip':
        return 'tooltip';
      case 'tabs':
        return 'tabs';
      case 'modal':
        return 'modal';
      case 'toast':
        return 'toast';
      case 'code':
        return 'code';
      default:
        return 'color'; // fallback
    }
  }

  updateToken(tokenName: string, newValue: string): void {
    const graph = this.activeGraph();
    if (!graph) return;

    const token = graph.nodes.get(tokenName);
    if (!token) return;

    // Mark as modified (for export)
    token.isModified = true;
    token.currentValue = newValue;

    // Apply to DOM immediately
    if (this.isBrowser) {
      document.documentElement.style.setProperty(tokenName, newValue);
    }

    // Mark dependents as cascaded (but NOT modified)
    token.dependents.forEach((depName) => {
      const dependent = graph.nodes.get(depName);
      if (dependent && !dependent.isModified) {
        dependent.isCascaded = true;
      }
    });

    // Save state to localStorage
    this.saveState();

    // Trigger update
    if (this.currentTab() === 'light') {
      this.lightGraph.set({ ...graph });
    } else {
      this.darkGraph.set({ ...graph });
    }
  }

  exportTheme(include: 'light' | 'dark' | 'both'): ExportResult {
    let css = '';
    let tokenCount = 0;

    if (include === 'light' || include === 'both') {
      const lightCss = this.generateCss(this.lightGraph(), ':root');
      css += lightCss.css;
      tokenCount += lightCss.count;
    }

    if (include === 'dark' || include === 'both') {
      const darkCss = this.generateCss(this.darkGraph(), '.dark');
      if (css) css += '\n\n';
      css += darkCss.css;
      tokenCount += darkCss.count;
    }

    return { css, tokenCount };
  }

  private generateCss(
    graph: DependencyGraph | null,
    selector: string,
  ): { css: string; count: number } {
    if (!graph) return { css: '', count: 0 };

    // Filter only modified tokens (user explicitly changed)
    const modifiedTokens = Array.from(graph.nodes.values()).filter(
      (t) => t.isModified,
    );

    if (modifiedTokens.length === 0) {
      return { css: '', count: 0 };
    }

    // Group by category (core first, then components)
    const coreTokens = modifiedTokens.filter((t) => t.isCore);
    const componentTokens = modifiedTokens.filter((t) => !t.isCore);

    let css = `${selector} {\n`;

    // Core tokens
    if (coreTokens.length > 0) {
      css += '  /* Core Tokens */\n';
      coreTokens
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((token) => {
          css += `  ${token.name}: ${token.currentValue};\n`;
        });
    }

    // Component tokens
    if (componentTokens.length > 0) {
      if (coreTokens.length > 0) css += '\n';
      css += '  /* Component Tokens */\n';
      componentTokens
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((token) => {
          css += `  ${token.name}: ${token.currentValue};\n`;
        });
    }

    css += '}';

    return { css, count: modifiedTokens.length };
  }

  resetToken(tokenName: string): void {
    const graph = this.activeGraph();
    if (!graph) return;

    const token = graph.nodes.get(tokenName);
    if (!token) return;

    // Reset to original value
    token.currentValue = token.value;
    token.isModified = false;
    token.isCascaded = false;

    // Apply to DOM
    if (this.isBrowser) {
      document.documentElement.style.setProperty(tokenName, token.value);
    }

    // Save state
    this.saveState();

    // Trigger update
    if (this.currentTab() === 'light') {
      this.lightGraph.set({ ...graph });
    } else {
      this.darkGraph.set({ ...graph });
    }
  }

  reset(scope: 'current' | 'all'): void {
    if (scope === 'current') {
      const graph = this.activeGraph();
      if (!graph) return;

      // Reset all tokens in current theme
      graph.nodes.forEach((token) => {
        token.currentValue = token.value;
        token.isModified = false;
        token.isCascaded = false;

        if (this.isBrowser) {
          document.documentElement.style.setProperty(token.name, token.value);
        }
      });

      // Trigger update
      if (this.currentTab() === 'light') {
        this.lightGraph.set({ ...graph });
      } else {
        this.darkGraph.set({ ...graph });
      }
    } else {
      // Reset both themes
      [this.lightGraph(), this.darkGraph()].forEach((graph) => {
        if (!graph) return;

        graph.nodes.forEach((token) => {
          token.currentValue = token.value;
          token.isModified = false;
          token.isCascaded = false;

          if (this.isBrowser) {
            document.documentElement.style.setProperty(token.name, token.value);
          }
        });
      });

      // Trigger updates
      if (this.lightGraph()) {
        this.lightGraph.set({ ...this.lightGraph()! });
      }
      if (this.darkGraph()) {
        this.darkGraph.set({ ...this.darkGraph()! });
      }
    }

    this.saveState();
  }

  private saveState(): void {
    if (!this.isBrowser) return;

    const state = {
      light: this.serializeGraph(this.lightGraph()),
      dark: this.serializeGraph(this.darkGraph()),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save theme generator state:', error);
    }
  }

  private loadState(lightGraph: DependencyGraph, darkGraph: DependencyGraph): void {
    if (!this.isBrowser) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const state = JSON.parse(saved);

      // Track if we need to clean up corrupted values
      let needsCleanup = false;

      // Apply saved modifications to light graph
      if (state.light) {
        Object.entries(state.light).forEach(([name, value]) => {
          const token = lightGraph.nodes.get(name);
          if (token) {
            // Validate before applying to prevent corrupted values
            if (this.isValidOklchValue(value as string)) {
              token.currentValue = value as string;
              token.isModified = true;
              document.documentElement.style.setProperty(name, value as string);
            } else {
              console.warn(`Invalid OKLCH value for ${name}: ${value} - skipping`);
              delete state.light[name];
              needsCleanup = true;
            }
          }
        });
      }

      // Apply saved modifications to dark graph
      if (state.dark) {
        Object.entries(state.dark).forEach(([name, value]) => {
          const token = darkGraph.nodes.get(name);
          if (token) {
            // Validate before applying
            if (this.isValidOklchValue(value as string)) {
              token.currentValue = value as string;
              token.isModified = true;
            } else {
              console.warn(`Invalid OKLCH value for ${name}: ${value} - skipping`);
              delete state.dark[name];
              needsCleanup = true;
            }
          }
        });
      }

      // Auto-migrate: save cleaned state back to localStorage
      if (needsCleanup) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        console.log('Cleaned up corrupted localStorage values');
      }
    } catch (error) {
      console.error('Failed to load theme generator state:', error);
      // Clear corrupted localStorage
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /**
   * Validates OKLCH color value format
   * Accepts: oklch(L C H), oklch(L C none), oklch(L C H / A), var() references
   * Rejects: invalid lightness (>1), malformed syntax, corrupted float precision
   */
  private isValidOklchValue(value: string): boolean {
    // Accept var() references (these are valid token references)
    if (value.startsWith('var(')) return true;

    // Accept other valid CSS color formats
    if (value === 'transparent' || value.startsWith('rgb') || value.startsWith('#')) {
      return true;
    }

    // Validate OKLCH format: oklch(L C H) or oklch(L C H / A)
    // Allow 'none' for hue (achromatic colors per CSS Color Module Level 4)
    const oklchRegex = /^oklch\(\s*[\d.]+\s+[\d.]+\s+(?:[\d.]+|none)(?:\s*\/\s*[\d.]+)?\s*\)$/;

    if (!oklchRegex.test(value)) {
      return false;
    }

    // Extract lightness value and validate range [0, 1]
    const lMatch = value.match(/oklch\(\s*([\d.]+)/);
    if (lMatch) {
      const l = parseFloat(lMatch[1]);
      // Reject values > 1 (corrupted floating point like 1.0000000000000002)
      if (l < 0 || l > 1) {
        return false;
      }
    }

    return true;
  }

  private serializeGraph(graph: DependencyGraph | null): Record<string, string> {
    if (!graph) return {};

    const result: Record<string, string> = {};

    graph.nodes.forEach((token) => {
      if (token.isModified) {
        result[token.name] = token.currentValue;
      }
    });

    return result;
  }

  /**
   * Resets all customizations to default values
   * Clears localStorage and removes all custom CSS properties from DOM
   */
  resetToDefaults(): void {
    if (!this.isBrowser) return;

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);

    // Remove all customized tokens from DOM
    const lightGraph = this.lightGraph();
    if (lightGraph) {
      lightGraph.nodes.forEach((token) => {
        if (token.isModified) {
          document.documentElement.style.removeProperty(token.name);
        }
      });
    }

    const darkGraph = this.darkGraph();
    if (darkGraph) {
      darkGraph.nodes.forEach((token) => {
        if (token.isModified) {
          document.documentElement.style.removeProperty(token.name);
        }
      });
    }

    // Reinitialize to load fresh state from CSS files
    this.isInitialized.set(false);
    this.initialize();
  }

  toggle(): void {
    this.isOpen.set(!this.isOpen());
  }

  close(): void {
    this.isOpen.set(false);
  }

  switchTab(tab: 'light' | 'dark'): void {
    this.currentTab.set(tab);
  }
}
