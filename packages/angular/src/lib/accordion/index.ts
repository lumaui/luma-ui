// Main Accordion components
export * from './accordion-group.component';
export * from './accordion-item.component';

// Accordion directives
export * from './accordion-trigger.directive';
export * from './accordion-title.directive';
export * from './accordion-icon.directive';
export * from './accordion-content.directive';

// Injection token
export * from './accordion.tokens';

// Re-export types from core for convenience
export type {
  AccordionItemVariants,
  AccordionTriggerVariants,
  AccordionTitleVariants,
  AccordionIconVariants,
  AccordionContentWrapperVariants,
  AccordionContentVariants,
  AccordionItemVariant,
  AccordionItemSize,
  AccordionTitleSize,
} from '@lumaui/core';
