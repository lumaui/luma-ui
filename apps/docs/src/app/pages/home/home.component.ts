import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { GettingStartedComponent } from '../../components/getting-started/getting-started.component';
import { ComponentsSectionComponent } from '../../components/components-section/components-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, GettingStartedComponent, ComponentsSectionComponent],
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
