import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColorSwatch {
  step: number;
  value: string; // OKLCH value
  description: string;
}

@Component({
  selector: 'app-color-grid',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './color-grid.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ColorGridComponent {
  title = input.required<string>();
  description = input.required<string>();
  colors = input.required<ColorSwatch[]>();
}
