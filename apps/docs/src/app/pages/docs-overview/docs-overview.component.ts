import { Component } from '@angular/core';
import { ComponentsSectionComponent } from '../../components/components-section/components-section.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-docs-overview',
  imports: [SidebarComponent, ComponentsSectionComponent],
  template: `
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row mt-8 md:mt-16">
      <app-sidebar />
      <div class="flex-1 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <app-components-section />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class DocsOverviewComponent {}
