// Main Card component
export * from './card.component';

// Card compositional directives
export * from './card-title.directive';
export * from './card-description.directive';
export * from './card-header.directive';
export * from './card-content.directive';

// Re-export types from core for convenience
export type {
  CardVariants,
  CardContentVariants,
  CardTitleVariants,
  CardDescriptionVariants,
  CardVariant,
  CardTitleSize,
  CardDescriptionSize,
} from '@lumaui/core';
