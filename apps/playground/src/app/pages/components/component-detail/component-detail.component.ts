import { Component, Input, signal } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

type TabType = 'examples' | 'tokens' | 'api';

@Component({
  selector: 'app-component-detail',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './component-detail.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .tab-button {
        border-bottom-color: transparent;
        color: var(--luma-color-text-secondary);
      }

      .tab-button:hover {
        color: var(--luma-color-text-primary);
        border-bottom-color: var(--luma-color-text-secondary);
      }

      .tab-button.active {
        color: var(--luma-color-primary);
        border-bottom-color: var(--luma-color-primary);
      }
    `,
  ],
})
export class ComponentDetailComponent {
  @Input({ required: true }) componentName!: string;
  @Input({ required: true }) description!: string;

  activeTab = signal<TabType>('examples');

  setActiveTab(tab: TabType) {
    this.activeTab.set(tab);
  }
}
