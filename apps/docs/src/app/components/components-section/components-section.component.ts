import { Component } from '@angular/core';
import { ComponentGridComponent } from '../component-grid/component-grid.component';

@Component({
  selector: 'app-components-section',
  imports: [ComponentGridComponent],
  templateUrl: './components-section.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ComponentsSectionComponent {}
