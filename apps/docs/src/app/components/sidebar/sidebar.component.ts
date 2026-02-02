import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ButtonDirective } from '@lumaui/angular';
import { DocsRegistryService } from '../../services/docs-registry.service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, ButtonDirective],
  templateUrl: './sidebar.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .active-sidebar {
        color: var(--luma-color-primary-50);
        background-color: color-mix(
          in oklch,
          var(--luma-color-primary-50) 8%,
          transparent
        );
        font-weight: 500;
      }

      /* Drawer animations */
      .drawer-backdrop {
        animation: fadeIn 200ms ease-out;
      }

      .drawer-panel {
        animation: slideIn 200ms ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideIn {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(0);
        }
      }
    `,
  ],
})
export class SidebarComponent {
  private readonly registry = inject(DocsRegistryService);
  private readonly router = inject(Router);

  readonly categories = this.registry.categories;
  readonly componentsByCategory = this.registry.componentsByCategory;
  readonly themePages = this.registry.themePages;

  /** Mobile drawer state */
  readonly drawerOpen = signal(false);

  constructor() {
    // Close drawer on navigation
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.drawerOpen.set(false);
      });
  }

  /**
   * Get components for a specific category
   */
  getComponents(category: string) {
    return this.componentsByCategory().get(category) ?? [];
  }

  openDrawer(): void {
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }
}
