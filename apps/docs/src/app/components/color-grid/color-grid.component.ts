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
  template: `
    <div>
      <h3 class="text-lg font-semibold text-foreground mb-2">{{ title() }}</h3>
      <p class="text-sm text-muted-foreground mb-4">
        {{ description() }}
      </p>
      <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        @for (color of colors(); track color.step) {
          <div class="flex flex-col items-center gap-2">
            <div
              [style.backgroundColor]="color.value"
              class="w-12 h-12 rounded-full border-2 border-border hover:scale-105 transition-transform cursor-default"
              [title]="color.description"
            ></div>
            <span class="text-xs text-muted-foreground text-center">
              {{ color.step }}
            </span>
          </div>
        }
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
export class ColorGridComponent {
  title = input.required<string>();
  description = input.required<string>();
  colors = input.required<ColorSwatch[]>();
}
