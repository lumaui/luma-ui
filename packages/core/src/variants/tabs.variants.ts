import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Tabs List Variants
 * Container for tab triggers (role="tablist")
 */
export const tabsListVariants = cva(
  ['relative', 'w-full'], // Removed flex, items-center (now in wrapper/container)
  {
    variants: {
      variant: {
        underline: ['border-b', 'border-border'], // Removed gap-4 (now in scroll container)
        pills: ['p-1', 'bg-muted', 'rounded-lg', 'inline-flex', 'w-auto'], // Removed gap-1 (now in scroll container)
      },
    },
    defaultVariants: {
      variant: 'underline',
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
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'px-4',
    'py-2',
    'text-sm',
    'font-medium',
    'cursor-pointer',
    'transition-all',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        underline: [
          'border-b-2',
          'border-transparent',
          'bg-transparent',
          'text-muted-foreground',
          'hover:text-primary',
          'data-[state=active]:border-primary',
          'data-[state=active]:text-foreground',
        ],
        pills: [
          'rounded-md',
          'text-muted-foreground',
          'hover:text-primary',
          'data-[state=active]:bg-background',
          'data-[state=active]:text-foreground',
          'data-[state=active]:shadow-sm',
        ],
      },
    },
    defaultVariants: {
      variant: 'underline',
    },
  },
);

/**
 * Tabs Indicator Variants
 * Animated indicator for underline style (optional visual enhancement)
 */
export const tabsIndicatorVariants = cva(
  [
    'absolute',
    'bottom-0',
    'left-0',
    'h-0.5',
    'bg-primary',
    'rounded-full',
    'transition-all',
    'duration-200',
  ],
  {
    variants: {
      visible: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
    defaultVariants: {
      visible: true,
    },
  },
);

/**
 * Tabs Scroll Arrow Variants
 * Navigation arrows for scrollable tabs
 */
export const tabsScrollArrowVariants = cva(
  [
    // Layout - FLEX ITEM (not absolute)
    'flex',
    'items-center',
    'justify-center',
    'flex-shrink-0', // Prevent shrinking in flex container

    // Size (adequate touch target)
    'w-8',
    'h-8',

    // Typography
    'text-primary',
    'text-base',

    // Transitions (gentle)
    'transition-all',
    'duration-200',

    // Interactions (calm hover) - NO BACKGROUND
    'hover:text-foreground',
    'hover:opacity-80',
    'active:scale-95',

    // Accessibility
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',

    // Disabled state
    'disabled:opacity-30',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      direction: {
        left: [], // No positioning needed in flex layout
        right: [], // No positioning needed in flex layout
      },
    },
  },
);

/**
 * Tabs Panel Variants
 * Content panel (role="tabpanel")
 */
export const tabsPanelVariants = cva(
  [
    'mt-2',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
  ],
  {
    variants: {
      visible: {
        true: 'block',
        false: 'hidden',
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
export type TabsScrollArrowVariants = VariantProps<
  typeof tabsScrollArrowVariants
>;
export type TabsPanelVariants = VariantProps<typeof tabsPanelVariants>;

// Convenience types
export type TabsVariant = NonNullable<TabsListVariants['variant']>;
export type TabsScrollArrowDirection = NonNullable<
  TabsScrollArrowVariants['direction']
>;
