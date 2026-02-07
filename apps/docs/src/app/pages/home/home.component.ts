import { Component } from '@angular/core';
import { ComponentsSectionComponent } from '../../components/components-section/components-section.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,  ComponentsSectionComponent],
  templateUrl: './home.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class HomeComponent {}
