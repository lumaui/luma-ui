// Shared types for Luma UI design system

/**
 * Common size variants used across components
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Extended size variants including full width
 */
export type SizeWithFull = Size | 'full';

/**
 * Common variant types for interactive components
 */
export type InteractiveVariant = 'primary' | 'outline' | 'ghost' | 'danger';

/**
 * Utility type for extracting variant keys from CVA
 */
export type ExtractVariantKeys<T> = T extends { variants: infer V }
  ? keyof V
  : never;
