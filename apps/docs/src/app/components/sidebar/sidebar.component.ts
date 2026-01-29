import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocsRegistryService } from '../../services/docs-registry.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .active-sidebar {
        color: var(--luma-color-primary-50);
        background-color: oklch(0.63 0.14 232.13 / 0.08);
        font-weight: 500;
      }
    `,
  ],
})
export class SidebarComponent {
  private readonly registry = inject(DocsRegistryService);

  readonly categories = this.registry.categories;
  readonly componentsByCategory = this.registry.componentsByCategory;
  readonly themePages = this.registry.themePages;

  /**
   * Get components for a specific category
   */
  getComponents(category: string) {
    return this.componentsByCategory().get(category) ?? [];
  }
}
