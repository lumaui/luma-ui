import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Tabs List Variants
 * Container for tab triggers (role="tablist")
 */
export const tabsListVariants = cva(
  ['relative', 'flex', 'items-center', 'w-full'],
  {
    variants: {
      style: {
        underline: ['lm-gap-tabs-list', 'border-b', 'lm-border-tabs-list'],
        background: ['lm-gap-tabs-list'],
        pill: [
          'lm-gap-tabs-pill',
          'lm-p-tabs-pill',
          'lm-bg-tabs-pill',
          'lm-rounded-tabs-pill',
        ],
      },
      scrollable: {
        true: [
          'overflow-x-auto',
          'scrollbar-none',
          '-webkit-overflow-scrolling-touch',
        ],
        false: ['overflow-visible'],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      style: 'underline',
      scrollable: false,
    },
  },
);

/**
 * Tabs Trigger Variants
 * Individual tab button (role="tab")
 */
export const tabsTriggerVariants = cva(
  [
    'relative',
    'flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'cursor-pointer',
    // Typography
    'lm-text-size-tabs-trigger',
    'lm-font-tabs-trigger',
    // Padding
    'lm-px-tabs-trigger',
    'lm-py-tabs-trigger',
    // Transitions
    'transition-[color,background-color]',
    'lm-duration-tabs',
    'lm-ease-tabs',
    // Focus
    'focus:outline-none',
    'focus-visible:lm-ring-focus',
    // Disabled - more visible with grayscale
    'disabled:opacity-30',
    'disabled:grayscale',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      style: {
        underline: [
          'bg-transparent',
          'lm-text-tabs-trigger',
          'hover:lm-text-tabs-trigger-hover',
        ],
        background: [
          'lm-rounded-tabs-trigger',
          'lm-text-tabs-trigger',
          'hover:lm-text-tabs-trigger-hover',
          'hover:lm-bg-tabs-trigger-hover',
        ],
        pill: [
          'lm-rounded-tabs-trigger',
          'lm-text-tabs-trigger',
          'hover:lm-text-tabs-trigger-hover',
        ],
      },
      selected: {
        true: [],
        false: [],
      },
    },
    compoundVariants: [
      // Underline selected
      {
        style: 'underline',
        selected: true,
        class: ['lm-text-tabs-trigger-selected'],
      },
      // Background selected
      {
        style: 'background',
        selected: true,
        class: ['lm-text-tabs-trigger-selected', 'lm-bg-tabs-trigger-selected'],
      },
      // Pill selected
      {
        style: 'pill',
        selected: true,
        class: [
          'lm-text-tabs-trigger-selected',
          'lm-bg-tabs-pill-selected',
          'shadow-sm',
        ],
      },
    ],
    defaultVariants: {
      style: 'underline',
      selected: false,
    },
  },
);

/**
 * Tabs Indicator Variants
 * Animated indicator for underline style
 */
export const tabsIndicatorVariants = cva(
  [
    'absolute',
    'bottom-0',
    'left-0',
    'lm-h-tabs-indicator',
    'lm-bg-tabs-indicator',
    'lm-rounded-tabs-indicator',
    'transition-[transform,width]',
    'lm-duration-tabs',
    'lm-ease-tabs',
  ],
  {
    variants: {
      visible: {
        true: ['opacity-100'],
        false: ['opacity-0'],
      },
    },
    defaultVariants: {
      visible: true,
    },
  },
);

/**
 * Tabs Panel Variants
 * Content panel (role="tabpanel")
 */
export const tabsPanelVariants = cva(
  ['lm-p-tabs-panel', 'focus:outline-none'],
  {
    variants: {
      visible: {
        true: ['block'],
        false: ['hidden'],
      },
    },
    defaultVariants: {
      visible: true,
    },
  },
);

// Type exports
export type TabsListVariants = VariantProps<typeof tabsListVariants>;
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;
export type TabsIndicatorVariants = VariantProps<typeof tabsIndicatorVariants>;
export type TabsPanelVariants = VariantProps<typeof tabsPanelVariants>;

// Convenience types
export type TabsStyle = NonNullable<TabsListVariants['style']>;
