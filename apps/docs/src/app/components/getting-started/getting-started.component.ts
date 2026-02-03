import { Component, computed, input } from '@angular/core';
import {
  LmCardComponent,
  LmCardHeaderDirective,
  LmCardTitleDirective,
  LmCardContentDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-getting-started',
  imports: [
    LmCardComponent,
    LmCardHeaderDirective,
    LmCardTitleDirective,
    LmCardContentDirective,
  ],
  templateUrl: './getting-started.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class GettingStartedComponent {
  alignment = input<'center' | 'left'>('center');

  headerClasses = computed(() =>
    this.alignment() === 'center' ? 'text-center mb-12 sm:mb-16' : 'mb-12',
  );

  descriptionClasses = computed(() =>
    this.alignment() === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl',
  );
}
