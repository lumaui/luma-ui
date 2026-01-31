import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Accordion Item Variants
 * Wrapper component that contains trigger and content
 */
export const accordionItemVariants = cva(
  [
    'block',
    'overflow-hidden',
    'group',
    'relative',
    'w-full',
    'lm-rounded-accordion-item',
    // Transition
    'transition-[border-color,box-shadow,background-color]',
    'lm-duration-accordion',
    'lm-ease-accordion',
  ],
  {
    variants: {
      variant: {
        default: [
          'lm-bg-accordion-item',
          'lm-border-accordion-item',
          'hover:lm-border-accordion-item-hover',
        ],
        bordered: [
          'border',
          'lm-border-accordion-item',
          'hover:lm-border-accordion-item-hover',
          'lm-bg-accordion-bordered',
          'hover:lm-bg-accordion-bordered-hover',
          'lm-rounded-accordion-bordered',
        ],
        filled: [
          'border',
          'lm-border-accordion-filled',
          'hover:lm-border-accordion-filled-hover',
          'lm-bg-accordion-filled',
          'lm-rounded-accordion-filled',
          '[&_div[lumaAccordionTrigger]]:bg-transparent',
          '[&_div[lumaAccordionTrigger]]:hover:lm-bg-accordion-filled-hover',
          '[&_div[lumaAccordionTrigger]]:active:bg-transparent',
          '[&_[lumaAccordionContent]]:bg-transparent',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

/**
 * Accordion Trigger Variants
 * Button element that toggles the accordion
 */
export const accordionTriggerVariants = cva([
  'w-full',
  'flex',
  'items-center',
  'justify-between',
  'lm-gap-accordion-trigger',
  'text-left',
  'cursor-pointer',
  // Background via utilities
  'lm-bg-accordion-trigger',
  'hover:lm-bg-accordion-trigger-hover',
  'active:lm-bg-accordion-trigger-active',
  // Padding via utilities
  'lm-px-accordion-trigger',
  'lm-py-accordion-trigger',
  // Focus
  'focus:outline-none',
  'focus-visible:lm-ring-accordion-focus',
  // Disabled
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  // Transition
  'transition-[background-color]',
  'lm-duration-accordion',
  'lm-ease-accordion',
]);

/**
 * Accordion Title Variants
 * Typography for the accordion header
 */
export const accordionTitleVariants = cva(
  [
    'flex-1',
    'lm-text-accordion-title',
    'lm-font-accordion-title',
    'lm-leading-accordion-title',
    'lm-tracking-accordion-title',
  ],
  {
    variants: {
      size: {
        sm: ['lm-text-accordion-title-sm'],
        md: ['lm-text-accordion-title-md'],
        lg: ['lm-text-accordion-title-lg'],
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/**
 * Accordion Icon Variants
 * Chevron/icon that rotates when open
 */
export const accordionIconVariants = cva(
  [
    'lm-text-accordion-icon',
    'shrink-0',
    'lm-size-accordion-icon',
    'transition-transform',
    'lm-duration-accordion-icon',
    'lm-ease-accordion',
  ],
  {
    variants: {
      open: {
        true: ['lm-rotate-accordion-icon'],
        false: ['rotate-0'],
      },
    },
    defaultVariants: { open: false },
  },
);

/**
 * Accordion Content Wrapper Variants
 * Grid wrapper for height animation
 */
export const accordionContentWrapperVariants = cva(
  [
    'grid',
    'transition-[grid-template-rows]',
    'lm-duration-accordion',
    'lm-ease-accordion',
  ],
  {
    variants: {
      open: {
        true: ['grid-rows-[1fr]'],
        false: ['grid-rows-[0fr]'],
      },
    },
    defaultVariants: { open: false },
  },
);

/**
 * Accordion Content Variants
 * Content panel with text styling
 */
export const accordionContentVariants = cva(
  [
    'lm-text-accordion-content',
    'lm-bg-accordion-content',
    'lm-text-size-accordion-content',
    'lm-leading-accordion-content',
    'lm-px-accordion-content',
    'lm-pt-accordion-content',
    'lm-pb-accordion-content',
    'transition-opacity',
    'lm-duration-accordion-content',
    'lm-ease-accordion',
  ],
  {
    variants: {
      open: {
        true: ['opacity-100'],
        false: ['opacity-0'],
      },
    },
    defaultVariants: { open: false },
  },
);

// Type exports
export type AccordionItemVariants = VariantProps<typeof accordionItemVariants>;
export type AccordionTriggerVariants = VariantProps<
  typeof accordionTriggerVariants
>;
export type AccordionTitleVariants = VariantProps<
  typeof accordionTitleVariants
>;
export type AccordionIconVariants = VariantProps<typeof accordionIconVariants>;
export type AccordionContentWrapperVariants = VariantProps<
  typeof accordionContentWrapperVariants
>;
export type AccordionContentVariants = VariantProps<
  typeof accordionContentVariants
>;

export type AccordionItemVariant = NonNullable<
  AccordionItemVariants['variant']
>;
export type AccordionTitleSize = NonNullable<AccordionTitleVariants['size']>;
