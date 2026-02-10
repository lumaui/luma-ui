import { Component } from '@angular/core';
import { ComponentsSectionComponent } from '../../components/components-section/components-section.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-docs-overview',
  imports: [SidebarComponent, ComponentsSectionComponent],
  templateUrl: './docs-overview.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class DocsOverviewComponent {}
