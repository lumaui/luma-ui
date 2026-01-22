import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ComponentGridComponent } from '../../components/component-grid/component-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ComponentGridComponent],
  templateUrl: './home.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HomeComponent {}
