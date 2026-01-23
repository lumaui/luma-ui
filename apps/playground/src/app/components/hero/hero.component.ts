import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonDirective } from '@luma/components';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule, ButtonDirective],
  templateUrl: './hero.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class HeroComponent {}
