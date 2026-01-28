import { Injectable, signal, computed } from '@angular/core';
import registryData from '../../generated/docs-registry.json';

// Types matching the generated registry
export interface DocInput {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface DocToken {
  name: string;
  value: string;
  description: string;
}

export interface DocExample {
  title: string;
  code: string;
  language: string;
}

export interface CustomizationExample {
  title: string;
  description: string;
  code: string;
  language: string;
  overrideType: 'global' | 'theme' | 'component';
}

export interface DocCustomization {
  intro: string;
  examples: CustomizationExample[];
}

export interface DocDirective {
  name: string;
  selector: string;
  description: string;
  inputs?: DocInput[];
}

export interface DocComponent {
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
  directives?: DocDirective[];
  sections: {
    purpose?: string;
    accessibility?: string;
    neoMinimal?: string;
    usage?: string;
  };
  docPath: string;
  markdownContent: string;
}

export interface DocsRegistry {
  components: DocComponent[];
  categories: string[];
  generatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class DocsRegistryService {
  private readonly registry = signal<DocsRegistry>(
    registryData as DocsRegistry,
  );

  /**
   * Get all components from the registry
   */
  readonly components = computed(() => this.registry().components);

  /**
   * Get all categories from the registry
   */
  readonly categories = computed(() => this.registry().categories);

  /**
   * Get a component by its slug
   */
  getComponent(slug: string): DocComponent | undefined {
    return this.registry().components.find((c) => c.slug === slug);
  }

  /**
   * Get all components in a specific category
   */
  getComponentsByCategory(category: string): DocComponent[] {
    return this.registry().components.filter((c) => c.category === category);
  }

  /**
   * Get components grouped by category
   */
  readonly componentsByCategory = computed(() => {
    const grouped = new Map<string, DocComponent[]>();

    for (const category of this.registry().categories) {
      grouped.set(category, this.getComponentsByCategory(category));
    }

    return grouped;
  });

  /**
   * Get the generation timestamp
   */
  readonly generatedAt = computed(() => this.registry().generatedAt);
}
