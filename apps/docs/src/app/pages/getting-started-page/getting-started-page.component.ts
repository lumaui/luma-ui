import { Component } from '@angular/core';
import { GettingStartedComponent } from '../../components/getting-started/getting-started.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-getting-started-page',
  imports: [SidebarComponent, GettingStartedComponent],
  template: `
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row mt-8 md:mt-16">
      <app-sidebar />
      <div class="flex-1 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <app-getting-started alignment="left" />
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
export class GettingStartedPageComponent {}
