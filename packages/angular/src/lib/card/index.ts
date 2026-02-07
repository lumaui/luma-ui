// Main Card component
export * from './card.component';

// Card compositional directives
export * from './card-title.directive';
export * from './card-description.directive';
export * from './card-header.directive';
export * from './card-content.directive';
export * from './card-footer.directive';

// Re-export types from core for convenience
export type {
  CardVariants,
  CardContentVariants,
  CardHeaderVariants,
  CardTitleVariants,
  CardDescriptionVariants,
  CardFooterVariants,
  CardVariant,
  CardTitleSize,
  CardDescriptionSize,
} from '@lumaui/core';
