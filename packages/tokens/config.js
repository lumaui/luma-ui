import StyleDictionary from 'style-dictionary';

/**
 * Custom transform to add -- prefix to CSS variable names
 */
StyleDictionary.registerTransform({
  name: 'name/css-custom-properties',
  type: 'name',
  transform: (token) => {
    return '--' + token.path.join('-');
  },
});

/**
 * Custom format for generating CSS with @theme block and utilities
 * All utilities use the `lm-` prefix for easy identification in projects
 */
StyleDictionary.registerFormat({
  name: 'css/luma-theme',
  format: ({ dictionary, options }) => {
    const { selector = '@theme', utilities = true } = options;

    let output = `@import "tailwindcss";\n\n`;
    output += `${selector} {\n`;
    output += `  /* Luma Design System Tokens */\n\n`;

    // Group tokens by category
    const groups = {};
    dictionary.allTokens.forEach((token) => {
      const category = token.path[1] || 'other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(token);
    });

    // Output tokens grouped by category
    Object.entries(groups).forEach(([category, tokens]) => {
      output += `  /* ${category.charAt(0).toUpperCase() + category.slice(1)} */\n`;
      tokens.forEach((token) => {
        output += `  ${token.name}: ${token.value};\n`;
      });
      output += `\n`;
    });

    output += `}\n`;

    // Add utilities if enabled
    if (utilities && selector === '@theme') {
      output += `\n/* Tailwind Utilities - All prefixed with lm- */\n\n`;

      // Helper to get utility name without 'luma' prefix
      const getUtilityName = (path) => path.slice(1).join('-');

      // ============================================
      // SCALE-BASED COLOR UTILITIES
      // ============================================

      output += `/* Scale-Based Color Utilities */\n`;

      // Primary scale utilities (50, 60, 70, 80)
      const primaryScaleTokens = dictionary.allTokens.filter(
        (t) =>
          t.path[1] === 'color' &&
          t.path[2] === 'primary' &&
          ['50', '60', '70', '80'].includes(t.path[3]),
      );
      primaryScaleTokens.forEach((token) => {
        const scale = token.path[3];
        output += `@utility lm-bg-primary-${scale} {\n`;
        output += `  background-color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-text-primary-${scale} {\n`;
        output += `  color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-border-primary-${scale} {\n`;
        output += `  border-color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Neutral scale utilities (50, 60, 70, 80, 90, 100)
      const neutralScaleTokens = dictionary.allTokens.filter(
        (t) =>
          t.path[1] === 'color' &&
          t.path[2] === 'neutral' &&
          ['50', '60', '70', '80', '90', '100'].includes(t.path[3]),
      );
      neutralScaleTokens.forEach((token) => {
        const scale = token.path[3];
        output += `@utility lm-bg-neutral-${scale} {\n`;
        output += `  background-color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-text-neutral-${scale} {\n`;
        output += `  color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-border-neutral-${scale} {\n`;
        output += `  border-color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Success scale utilities (50, 60, 70, 80)
      const successScaleTokens = dictionary.allTokens.filter(
        (t) =>
          t.path[1] === 'color' &&
          t.path[2] === 'success' &&
          ['50', '60', '70', '80'].includes(t.path[3]),
      );
      successScaleTokens.forEach((token) => {
        const scale = token.path[3];
        output += `@utility lm-bg-success-${scale} {\n`;
        output += `  background-color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-text-success-${scale} {\n`;
        output += `  color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-border-success-${scale} {\n`;
        output += `  border-color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Warning scale utilities (50, 60, 70, 80)
      const warningScaleTokens = dictionary.allTokens.filter(
        (t) =>
          t.path[1] === 'color' &&
          t.path[2] === 'warning' &&
          ['50', '60', '70', '80'].includes(t.path[3]),
      );
      warningScaleTokens.forEach((token) => {
        const scale = token.path[3];
        output += `@utility lm-bg-warning-${scale} {\n`;
        output += `  background-color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-text-warning-${scale} {\n`;
        output += `  color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-border-warning-${scale} {\n`;
        output += `  border-color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Error scale utilities (50, 60, 70, 80)
      const errorScaleTokens = dictionary.allTokens.filter(
        (t) =>
          t.path[1] === 'color' &&
          t.path[2] === 'error' &&
          ['50', '60', '70', '80'].includes(t.path[3]),
      );
      errorScaleTokens.forEach((token) => {
        const scale = token.path[3];
        output += `@utility lm-bg-error-${scale} {\n`;
        output += `  background-color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-text-error-${scale} {\n`;
        output += `  color: var(${token.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-border-error-${scale} {\n`;
        output += `  border-color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // ============================================
      // SEMANTIC TEXT UTILITIES
      // ============================================

      output += `/* Semantic Text Utilities */\n`;

      // Text primary/secondary utilities
      const textTokens = dictionary.allTokens.filter(
        (t) =>
          t.path[1] === 'color' &&
          t.path[2] === 'text' &&
          ['primary', 'secondary'].includes(t.path[3]),
      );
      textTokens.forEach((token) => {
        const variant = token.path[3];
        output += `@utility lm-text-${variant} {\n`;
        output += `  color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Surface base utility
      const surfaceBaseToken = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'color' &&
          t.path[2] === 'surface' &&
          t.path[3] === 'base',
      );
      if (surfaceBaseToken) {
        output += `@utility lm-bg-surface-base {\n`;
        output += `  background-color: var(${surfaceBaseToken.name});\n`;
        output += `}\n\n`;
      }

      // ============================================
      // GLOBAL FOCUS RING
      // ============================================

      output += `/* Global Focus Ring */\n`;
      const globalFocusRingColor = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'focus' &&
          t.path[2] === 'ring' &&
          t.path[3] === 'color',
      );
      if (globalFocusRingColor) {
        output += `@utility lm-ring-focus {\n`;
        output += `  outline: var(--luma-focus-ring-width) solid var(--luma-focus-ring-color);\n`;
        output += `  outline-offset: var(--luma-focus-ring-offset);\n`;
        output += `}\n\n`;
      }

      // ============================================
      // BUTTON UTILITIES
      // ============================================

      // Button background utilities (with hover and active states)
      output += `/* Button Background Colors */\n`;
      const buttonBgTokens = dictionary.allTokens.filter(
        (t) =>
          t.path[1] === 'button' &&
          t.path.some((p) => typeof p === 'string' && p.startsWith('bg')) &&
          !t.path.includes('badge'),
      );
      buttonBgTokens.forEach((token) => {
        const utilityName = getUtilityName(token.path);
        output += `@utility lm-bg-${utilityName} {\n`;
        output += `  background-color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Button text color utilities
      output += `/* Button Text Colors */\n`;
      const buttonTextTokens = dictionary.allTokens.filter(
        (t) => t.path[1] === 'button' && t.path[t.path.length - 1] === 'text',
      );
      buttonTextTokens.forEach((token) => {
        const utilityName = getUtilityName(token.path);
        output += `@utility lm-text-${utilityName} {\n`;
        output += `  color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Button border utilities
      output += `/* Button Border Colors */\n`;
      const buttonBorderTokens = dictionary.allTokens.filter(
        (t) =>
          t.path[1] === 'button' &&
          t.path.some((p) => typeof p === 'string' && p.startsWith('border')),
      );
      buttonBorderTokens.forEach((token) => {
        const utilityName = getUtilityName(token.path);
        output += `@utility lm-border-${utilityName} {\n`;
        output += `  border-color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Button focus ring utility (references global tokens)
      const buttonFocusRingToken = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'button' &&
          t.path[2] === 'focus' &&
          t.path.some((p) => typeof p === 'string' && p.startsWith('ring')),
      );
      if (buttonFocusRingToken) {
        output += `/* Button Focus Ring */\n`;
        output += `@utility lm-ring-button-focus {\n`;
        output += `  outline: var(--luma-button-focus-ring-width) solid var(--luma-button-focus-ring-color);\n`;
        output += `  outline-offset: 2px;\n`;
        output += `}\n\n`;
      }

      // Button radius utility
      const buttonRadiusToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'button' && t.path[2] === 'radius',
      );
      if (buttonRadiusToken) {
        output += `/* Button Radius */\n`;
        output += `@utility lm-rounded-button {\n`;
        output += `  border-radius: var(${buttonRadiusToken.name});\n`;
        output += `}\n\n`;
      }

      // ============================================
      // CARD VARIANT UTILITIES
      // ============================================

      output += `/* Card Variant Utilities */\n`;

      // Card shadow variant
      const cardShadowBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'shadow' &&
          t.path[3] === 'background',
      );
      if (cardShadowBg) {
        output += `@utility lm-bg-card-shadow {\n`;
        output += `  background-color: var(${cardShadowBg.name});\n`;
        output += `}\n\n`;
      }

      const cardShadowBorder = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'shadow' &&
          t.path[3] === 'border',
      );
      if (cardShadowBorder) {
        output += `@utility lm-border-card-shadow {\n`;
        output += `  border-color: var(${cardShadowBorder.name});\n`;
        output += `}\n\n`;
      }

      const cardShadowShadow = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'shadow' &&
          t.path[3] === 'shadow',
      );
      if (cardShadowShadow) {
        output += `@utility lm-shadow-card-shadow {\n`;
        output += `  box-shadow: var(${cardShadowShadow.name});\n`;
        output += `}\n\n`;
      }

      const cardShadowRadius = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'shadow' &&
          t.path[3] === 'radius',
      );
      if (cardShadowRadius) {
        output += `@utility lm-rounded-card-shadow {\n`;
        output += `  border-radius: var(${cardShadowRadius.name});\n`;
        output += `}\n\n`;
      }

      // Card nested variant
      const cardNestedBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'nested' &&
          t.path[3] === 'background',
      );
      if (cardNestedBg) {
        output += `@utility lm-bg-card-nested {\n`;
        output += `  background-color: var(${cardNestedBg.name});\n`;
        output += `}\n\n`;
      }

      const cardNestedBorder = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'nested' &&
          t.path[3] === 'border',
      );
      if (cardNestedBorder) {
        output += `@utility lm-border-card-nested {\n`;
        output += `  border-color: var(${cardNestedBorder.name});\n`;
        output += `}\n\n`;
      }

      const cardNestedRadius = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'nested' &&
          t.path[3] === 'radius',
      );
      if (cardNestedRadius) {
        output += `@utility lm-rounded-card-nested {\n`;
        output += `  border-radius: var(${cardNestedRadius.name});\n`;
        output += `}\n\n`;
      }

      // Card preview variant
      const cardPreviewBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'preview' &&
          t.path[3] === 'background',
      );
      if (cardPreviewBg) {
        output += `@utility lm-bg-card-preview {\n`;
        output += `  background-color: var(${cardPreviewBg.name});\n`;
        output += `}\n\n`;
      }

      const cardPreviewBorder = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'preview' &&
          t.path[3] === 'border',
      );
      if (cardPreviewBorder) {
        output += `@utility lm-border-card-preview {\n`;
        output += `  border-color: var(${cardPreviewBorder.name});\n`;
        output += `}\n\n`;
      }

      const cardPreviewRadius = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'card' &&
          t.path[2] === 'preview' &&
          t.path[3] === 'radius',
      );
      if (cardPreviewRadius) {
        output += `@utility lm-rounded-card-preview {\n`;
        output += `  border-radius: var(${cardPreviewRadius.name});\n`;
        output += `}\n\n`;
      }

      // Legacy card utilities (gradient wrapper)
      output += `/* Card Legacy Utilities (gradient wrapper) */\n`;
      const gradientTokens = dictionary.allTokens.filter((t) =>
        t.path.includes('gradient'),
      );
      gradientTokens.forEach((token) => {
        const gradientPos = token.path[token.path.length - 1];
        if (gradientPos === 'from') {
          output += `@utility lm-from-card-gradient-from {\n`;
          output += `  --tw-gradient-from: var(${token.name});\n`;
          output += `  --tw-gradient-to: rgb(255 255 255 / 0);\n`;
          output += `  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n`;
          output += `}\n\n`;
        } else if (gradientPos === 'to') {
          output += `@utility lm-to-card-gradient-to {\n`;
          output += `  --tw-gradient-to: var(${token.name});\n`;
          output += `}\n\n`;
        }
      });

      // Card background (legacy)
      const cardBgToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'card' && t.path[2] === 'background',
      );
      if (cardBgToken) {
        output += `@utility lm-bg-card-background {\n`;
        output += `  background-color: var(${cardBgToken.name});\n`;
        output += `}\n\n`;
      }

      // Card padding utility
      const cardPaddingToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'card' && t.path[2] === 'padding',
      );
      if (cardPaddingToken) {
        output += `@utility lm-p-card {\n`;
        output += `  padding: var(${cardPaddingToken.name});\n`;
        output += `}\n\n`;
      }

      // Card box-shadow utility (legacy)
      const cardShadowToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'card' && t.path[2] === 'box-shadow',
      );
      if (cardShadowToken) {
        output += `@utility lm-shadow-card {\n`;
        output += `  box-shadow: var(${cardShadowToken.name});\n`;
        output += `}\n\n`;
      }

      // ============================================
      // CODE BLOCK UTILITIES
      // ============================================

      output += `/* Code Block Utilities */\n`;

      const codeBgToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'code' && t.path[2] === 'background',
      );
      if (codeBgToken) {
        output += `@utility lm-bg-code {\n`;
        output += `  background-color: var(${codeBgToken.name});\n`;
        output += `}\n\n`;
      }

      const codeTextToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'code' && t.path[2] === 'text',
      );
      if (codeTextToken) {
        output += `@utility lm-text-code {\n`;
        output += `  color: var(${codeTextToken.name});\n`;
        output += `}\n\n`;
      }

      const codeBorderToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'code' && t.path[2] === 'border',
      );
      if (codeBorderToken) {
        output += `@utility lm-border-code {\n`;
        output += `  border-color: var(${codeBorderToken.name});\n`;
        output += `}\n\n`;
      }

      const codeRadiusToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'code' && t.path[2] === 'radius',
      );
      if (codeRadiusToken) {
        output += `@utility lm-rounded-code {\n`;
        output += `  border-radius: var(${codeRadiusToken.name});\n`;
        output += `}\n\n`;
      }

      // ============================================
      // GENERAL UTILITIES
      // ============================================

      // Border radius utilities
      output += `/* Border Radius */\n`;
      const radiusTokens = dictionary.allTokens.filter(
        (t) =>
          t.path[1] === 'radius' &&
          !t.path.includes('button') &&
          !t.path.includes('card') &&
          !t.path.includes('code'),
      );
      radiusTokens.forEach((token) => {
        const sizeName = token.path[token.path.length - 1];
        output += `@utility lm-rounded-${sizeName} {\n`;
        output += `  border-radius: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Font size utilities
      output += `/* Font Sizes */\n`;
      const textSizeTokens = dictionary.allTokens.filter(
        (t) => t.path[1] === 'text' && t.path.length === 3,
      );
      textSizeTokens.forEach((token) => {
        const sizeName = token.path[token.path.length - 1];
        output += `@utility lm-text-size-${sizeName} {\n`;
        output += `  font-size: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Duration utilities
      output += `/* Transitions */\n`;
      const durationTokens = dictionary.allTokens.filter(
        (t) => t.path[1] === 'duration' && t.path.length === 3,
      );
      durationTokens.forEach((token) => {
        const durationName = token.path[token.path.length - 1];
        output += `@utility lm-duration-${durationName} {\n`;
        output += `  transition-duration: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Badge utilities
      output += `/* Badge */\n`;
      const badgeBgToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'bg',
      );
      if (badgeBgToken) {
        output += `@utility lm-bg-badge {\n`;
        output += `  background-color: var(${badgeBgToken.name});\n`;
        output += `}\n\n`;
      }
      const badgeColorToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'color',
      );
      if (badgeColorToken) {
        output += `@utility lm-text-badge {\n`;
        output += `  color: var(${badgeColorToken.name});\n`;
        output += `}\n\n`;
      }
    }

    return output;
  },
});

/**
 * Custom format for dark theme
 */
StyleDictionary.registerFormat({
  name: 'css/luma-dark',
  format: ({ dictionary }) => {
    let output = `/* Luma Design System - Dark Theme */\n`;
    output += `.dark {\n`;

    dictionary.allTokens.forEach((token) => {
      output += `  ${token.name}: ${token.value};\n`;
    });

    output += `}\n`;

    return output;
  },
});

/**
 * Custom transform group that includes our CSS custom properties transform
 */
StyleDictionary.registerTransformGroup({
  name: 'luma/css',
  transforms: [
    'name/css-custom-properties',
    'time/seconds',
    'html/icon',
    'size/rem',
    'color/css',
  ],
});

// Light theme config - excludes .dark.json files
const config = {
  log: {
    verbosity: 'silent',
    warnings: 'disabled',
  },
  source: [
    'src/core/colors.json',
    'src/core/spacing.json',
    'src/core/typography.json',
    'src/core/transitions.json',
    'src/components/button/button.json',
    'src/components/card/card.json',
    'src/components/badge/badge.json',
  ],
  platforms: {
    'css-light': {
      transformGroup: 'luma/css',
      buildPath: 'build/',
      files: [
        {
          destination: 'luma.css',
          format: 'css/luma-theme',
          options: {
            selector: '@theme',
            utilities: true,
            outputReferences: false,
          },
        },
      ],
    },
  },
};

export default config;
