import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { cva } from 'class-variance-authority';

const cardVariants = cva([
  'relative',
  'rounded-luma-lg',
  'p-[1px]',
  'bg-gradient-to-b',
  'from-card-gradient-from',
  'to-card-gradient-to',
]);

const cardContentVariants = cva([
  'rounded-[17px]',
  'bg-card-background',
  'p-card-padding',
  'text-text-primary',
]);

@Component({
  selector: 'luma-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  // Computed class strings (Angular 20+)
  wrapperClasses = computed(() => cardVariants());
  contentClasses = computed(() => cardContentVariants());
}
