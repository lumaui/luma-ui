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

      // ============================================
      // BADGE LAYOUT UTILITIES
      // ============================================

      output += `/* Badge Layout Utilities */\n`;

      // Badge radius
      const badgeRadiusToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'radius',
      );
      if (badgeRadiusToken) {
        output += `@utility lm-rounded-badge {\n`;
        output += `  border-radius: var(${badgeRadiusToken.name});\n`;
        output += `}\n\n`;
      }

      // Badge font weight
      const badgeFontWeightToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'font-weight',
      );
      if (badgeFontWeightToken) {
        output += `@utility lm-font-badge {\n`;
        output += `  font-weight: var(${badgeFontWeightToken.name});\n`;
        output += `}\n\n`;
      }

      // Badge border width
      const badgeBorderWidthToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'border-width',
      );
      if (badgeBorderWidthToken) {
        output += `@utility lm-border-w-badge {\n`;
        output += `  border-width: var(${badgeBorderWidthToken.name});\n`;
        output += `}\n\n`;
      }

      // Badge padding-x
      const badgePaddingXToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'padding-x',
      );
      if (badgePaddingXToken) {
        output += `@utility lm-px-badge {\n`;
        output += `  padding-left: var(${badgePaddingXToken.name});\n`;
        output += `  padding-right: var(${badgePaddingXToken.name});\n`;
        output += `}\n\n`;
      }

      // Badge padding-y
      const badgePaddingYToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'padding-y',
      );
      if (badgePaddingYToken) {
        output += `@utility lm-py-badge {\n`;
        output += `  padding-top: var(${badgePaddingYToken.name});\n`;
        output += `  padding-bottom: var(${badgePaddingYToken.name});\n`;
        output += `}\n\n`;
      }

      // Badge font-size
      const badgeFontSizeToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'font-size',
      );
      if (badgeFontSizeToken) {
        output += `@utility lm-text-size-badge {\n`;
        output += `  font-size: var(${badgeFontSizeToken.name});\n`;
        output += `}\n\n`;
      }

      // ============================================
      // ACCORDION UTILITIES
      // ============================================

      output += `/* Accordion Item Utilities */\n`;

      // Accordion item border
      const accordionItemBorder = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'item' &&
          t.path[3] === 'border',
      );
      if (accordionItemBorder) {
        output += `@utility lm-border-accordion-item {\n`;
        output += `  border-color: var(${accordionItemBorder.name});\n`;
        output += `}\n\n`;
      }

      const accordionItemBorderHover = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'item' &&
          t.path[3] === 'border-hover',
      );
      if (accordionItemBorderHover) {
        output += `@utility lm-border-accordion-item-hover {\n`;
        output += `  border-color: var(${accordionItemBorderHover.name});\n`;
        output += `}\n\n`;
      }

      // Accordion item radius
      const accordionItemRadius = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'item' &&
          t.path[3] === 'radius',
      );
      if (accordionItemRadius) {
        output += `@utility lm-rounded-accordion-item {\n`;
        output += `  border-radius: var(${accordionItemRadius.name});\n`;
        output += `}\n\n`;
      }

      const accordionItemRadiusBordered = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'item' &&
          t.path[3] === 'radius-bordered',
      );
      if (accordionItemRadiusBordered) {
        output += `@utility lm-rounded-t-accordion-item-bordered {\n`;
        output += `  border-top-left-radius: var(${accordionItemRadiusBordered.name});\n`;
        output += `  border-top-right-radius: var(${accordionItemRadiusBordered.name});\n`;
        output += `}\n\n`;
        output += `@utility lm-rounded-b-accordion-item-bordered {\n`;
        output += `  border-bottom-left-radius: var(${accordionItemRadiusBordered.name});\n`;
        output += `  border-bottom-right-radius: var(${accordionItemRadiusBordered.name});\n`;
        output += `}\n\n`;
      }

      // Accordion item background
      const accordionItemBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'item' &&
          t.path[3] === 'background',
      );
      if (accordionItemBg) {
        output += `@utility lm-bg-accordion-item {\n`;
        output += `  background-color: var(${accordionItemBg.name});\n`;
        output += `}\n\n`;
      }

      // Accordion item shadow
      const accordionItemShadow = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'item' &&
          t.path[3] === 'shadow',
      );
      if (accordionItemShadow) {
        output += `@utility lm-shadow-accordion-item {\n`;
        output += `  box-shadow: var(${accordionItemShadow.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Accordion Trigger Utilities */\n`;

      // Accordion trigger backgrounds
      const accordionTriggerBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'background',
      );
      if (accordionTriggerBg) {
        output += `@utility lm-bg-accordion-trigger {\n`;
        output += `  background-color: var(${accordionTriggerBg.name});\n`;
        output += `}\n\n`;
      }

      const accordionTriggerBgHover = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'background-hover',
      );
      if (accordionTriggerBgHover) {
        output += `@utility lm-bg-accordion-trigger-hover {\n`;
        output += `  background-color: var(${accordionTriggerBgHover.name});\n`;
        output += `}\n\n`;
      }

      const accordionTriggerBgActive = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'background-active',
      );
      if (accordionTriggerBgActive) {
        output += `@utility lm-bg-accordion-trigger-active {\n`;
        output += `  background-color: var(${accordionTriggerBgActive.name});\n`;
        output += `}\n\n`;
      }

      // Accordion trigger padding
      const accordionTriggerPaddingX = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'padding-x',
      );
      if (accordionTriggerPaddingX) {
        output += `@utility lm-px-accordion-trigger {\n`;
        output += `  padding-left: var(${accordionTriggerPaddingX.name});\n`;
        output += `  padding-right: var(${accordionTriggerPaddingX.name});\n`;
        output += `}\n\n`;
      }

      const accordionTriggerPaddingY = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'padding-y',
      );
      if (accordionTriggerPaddingY) {
        output += `@utility lm-py-accordion-trigger {\n`;
        output += `  padding-top: var(${accordionTriggerPaddingY.name});\n`;
        output += `  padding-bottom: var(${accordionTriggerPaddingY.name});\n`;
        output += `}\n\n`;
      }

      // Accordion trigger gap
      const accordionTriggerGap = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'gap',
      );
      if (accordionTriggerGap) {
        output += `@utility lm-gap-accordion-trigger {\n`;
        output += `  gap: var(${accordionTriggerGap.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Accordion Title Utilities */\n`;

      // Accordion title color
      const accordionTitleColor = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'title' &&
          t.path[3] === 'color',
      );
      if (accordionTitleColor) {
        output += `@utility lm-text-accordion-title {\n`;
        output += `  color: var(${accordionTitleColor.name});\n`;
        output += `}\n\n`;
      }

      // Accordion title font sizes
      const accordionTitleFontSize = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'title' &&
          t.path[3] === 'font-size',
      );
      if (accordionTitleFontSize) {
        output += `@utility lm-text-accordion-title-md {\n`;
        output += `  font-size: var(${accordionTitleFontSize.name});\n`;
        output += `}\n\n`;
      }

      const accordionTitleFontSizeSm = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'title' &&
          t.path[3] === 'font-size-sm',
      );
      if (accordionTitleFontSizeSm) {
        output += `@utility lm-text-accordion-title-sm {\n`;
        output += `  font-size: var(${accordionTitleFontSizeSm.name});\n`;
        output += `}\n\n`;
      }

      const accordionTitleFontSizeLg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'title' &&
          t.path[3] === 'font-size-lg',
      );
      if (accordionTitleFontSizeLg) {
        output += `@utility lm-text-accordion-title-lg {\n`;
        output += `  font-size: var(${accordionTitleFontSizeLg.name});\n`;
        output += `}\n\n`;
      }

      // Accordion title font weight
      const accordionTitleFontWeight = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'title' &&
          t.path[3] === 'font-weight',
      );
      if (accordionTitleFontWeight) {
        output += `@utility lm-font-accordion-title {\n`;
        output += `  font-weight: var(${accordionTitleFontWeight.name});\n`;
        output += `}\n\n`;
      }

      // Accordion title line height
      const accordionTitleLineHeight = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'title' &&
          t.path[3] === 'line-height',
      );
      if (accordionTitleLineHeight) {
        output += `@utility lm-leading-accordion-title {\n`;
        output += `  line-height: var(${accordionTitleLineHeight.name});\n`;
        output += `}\n\n`;
      }

      // Accordion title letter spacing
      const accordionTitleLetterSpacing = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'title' &&
          t.path[3] === 'letter-spacing',
      );
      if (accordionTitleLetterSpacing) {
        output += `@utility lm-tracking-accordion-title {\n`;
        output += `  letter-spacing: var(${accordionTitleLetterSpacing.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Accordion Icon Utilities */\n`;

      // Accordion icon color
      const accordionIconColor = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'icon' &&
          t.path[3] === 'color',
      );
      if (accordionIconColor) {
        output += `@utility lm-text-accordion-icon {\n`;
        output += `  color: var(${accordionIconColor.name});\n`;
        output += `}\n\n`;
      }

      // Accordion icon size
      const accordionIconSize = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'icon' &&
          t.path[3] === 'size',
      );
      if (accordionIconSize) {
        output += `@utility lm-size-accordion-icon {\n`;
        output += `  width: var(${accordionIconSize.name});\n`;
        output += `  height: var(${accordionIconSize.name});\n`;
        output += `}\n\n`;
      }

      // Accordion icon rotation
      const accordionIconRotation = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'icon' &&
          t.path[3] === 'rotation',
      );
      if (accordionIconRotation) {
        output += `@utility lm-rotate-accordion-icon {\n`;
        output += `  transform: rotate(var(${accordionIconRotation.name}));\n`;
        output += `}\n\n`;
      }

      // Accordion icon transition duration
      const accordionIconDuration = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'icon' &&
          t.path[3] === 'transition-duration',
      );
      if (accordionIconDuration) {
        output += `@utility lm-duration-accordion-icon {\n`;
        output += `  transition-duration: var(${accordionIconDuration.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Accordion Content Utilities */\n`;

      // Accordion content background
      const accordionContentBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'content' &&
          t.path[3] === 'background',
      );
      if (accordionContentBg) {
        output += `@utility lm-bg-accordion-content {\n`;
        output += `  background-color: var(${accordionContentBg.name});\n`;
        output += `}\n\n`;
      }

      // Accordion content color
      const accordionContentColor = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'content' &&
          t.path[3] === 'color',
      );
      if (accordionContentColor) {
        output += `@utility lm-text-accordion-content {\n`;
        output += `  color: var(${accordionContentColor.name});\n`;
        output += `}\n\n`;
      }

      // Accordion content font size
      const accordionContentFontSize = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'content' &&
          t.path[3] === 'font-size',
      );
      if (accordionContentFontSize) {
        output += `@utility lm-text-size-accordion-content {\n`;
        output += `  font-size: var(${accordionContentFontSize.name});\n`;
        output += `}\n\n`;
      }

      // Accordion content line height
      const accordionContentLineHeight = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'content' &&
          t.path[3] === 'line-height',
      );
      if (accordionContentLineHeight) {
        output += `@utility lm-leading-accordion-content {\n`;
        output += `  line-height: var(${accordionContentLineHeight.name});\n`;
        output += `}\n\n`;
      }

      // Accordion content padding
      const accordionContentPaddingX = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'content' &&
          t.path[3] === 'padding-x',
      );
      if (accordionContentPaddingX) {
        output += `@utility lm-px-accordion-content {\n`;
        output += `  padding-left: var(${accordionContentPaddingX.name});\n`;
        output += `  padding-right: var(${accordionContentPaddingX.name});\n`;
        output += `}\n\n`;
      }

      const accordionContentPaddingTop = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'content' &&
          t.path[3] === 'padding-top',
      );
      if (accordionContentPaddingTop) {
        output += `@utility lm-pt-accordion-content {\n`;
        output += `  padding-top: var(${accordionContentPaddingTop.name});\n`;
        output += `}\n\n`;
      }

      const accordionContentPaddingBottom = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'content' &&
          t.path[3] === 'padding-bottom',
      );
      if (accordionContentPaddingBottom) {
        output += `@utility lm-pb-accordion-content {\n`;
        output += `  padding-bottom: var(${accordionContentPaddingBottom.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Accordion Transition Utilities */\n`;

      // Accordion transition duration
      const accordionTransitionDuration = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'transition' &&
          t.path[3] === 'duration',
      );
      if (accordionTransitionDuration) {
        output += `@utility lm-duration-accordion {\n`;
        output += `  transition-duration: var(${accordionTransitionDuration.name});\n`;
        output += `}\n\n`;
      }

      const accordionTransitionDurationContent = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'transition' &&
          t.path[3] === 'duration-content',
      );
      if (accordionTransitionDurationContent) {
        output += `@utility lm-duration-accordion-content {\n`;
        output += `  transition-duration: var(${accordionTransitionDurationContent.name});\n`;
        output += `}\n\n`;
      }

      // Accordion transition timing
      const accordionTransitionTiming = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'transition' &&
          t.path[3] === 'timing',
      );
      if (accordionTransitionTiming) {
        output += `@utility lm-ease-accordion {\n`;
        output += `  transition-timing-function: var(${accordionTransitionTiming.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Accordion Filled Variant */\n`;

      // Accordion filled background
      const accordionFilledBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'filled' &&
          t.path[3] === 'background',
      );
      if (accordionFilledBg) {
        output += `@utility lm-bg-accordion-filled {\n`;
        output += `  background-color: var(${accordionFilledBg.name});\n`;
        output += `}\n\n`;
      }

      // Accordion filled background hover
      const accordionFilledBgHover = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'filled' &&
          t.path[3] === 'background-hover',
      );
      if (accordionFilledBgHover) {
        output += `@utility lm-bg-accordion-filled-hover {\n`;
        output += `  background-color: var(${accordionFilledBgHover.name});\n`;
        output += `}\n\n`;
      }

      // Accordion filled border
      const accordionFilledBorder = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'filled' &&
          t.path[3] === 'border',
      );
      if (accordionFilledBorder) {
        output += `@utility lm-border-accordion-filled {\n`;
        output += `  border-color: var(${accordionFilledBorder.name});\n`;
        output += `}\n\n`;
      }

      // Accordion filled border hover
      const accordionFilledBorderHover = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'filled' &&
          t.path[3] === 'border-hover',
      );
      if (accordionFilledBorderHover) {
        output += `@utility lm-border-accordion-filled-hover {\n`;
        output += `  border-color: var(${accordionFilledBorderHover.name});\n`;
        output += `}\n\n`;
      }

      // Accordion filled radius
      const accordionFilledRadius = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'filled' &&
          t.path[3] === 'radius',
      );
      if (accordionFilledRadius) {
        output += `@utility lm-rounded-accordion-filled {\n`;
        output += `  border-radius: var(${accordionFilledRadius.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Accordion Bordered Variant */\n`;

      // Accordion bordered background
      const accordionBorderedBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'bordered' &&
          t.path[3] === 'background',
      );
      if (accordionBorderedBg) {
        output += `@utility lm-bg-accordion-bordered {\n`;
        output += `  background-color: var(${accordionBorderedBg.name});\n`;
        output += `}\n\n`;
      }

      // Accordion bordered background hover
      const accordionBorderedBgHover = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'bordered' &&
          t.path[3] === 'background-hover',
      );
      if (accordionBorderedBgHover) {
        output += `@utility lm-bg-accordion-bordered-hover {\n`;
        output += `  background-color: var(${accordionBorderedBgHover.name});\n`;
        output += `}\n\n`;
      }

      // Accordion bordered radius
      const accordionBorderedRadius = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'bordered' &&
          t.path[3] === 'radius',
      );
      if (accordionBorderedRadius) {
        output += `@utility lm-rounded-accordion-bordered {\n`;
        output += `  border-radius: var(${accordionBorderedRadius.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Accordion Focus Ring */\n`;

      // Accordion focus ring
      const accordionFocusRingWidth = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'accordion' &&
          t.path[2] === 'focus' &&
          t.path[3] === 'ring-width',
      );
      if (accordionFocusRingWidth) {
        output += `@utility lm-ring-accordion-focus {\n`;
        output += `  outline: var(--luma-accordion-focus-ring-width) solid var(--luma-accordion-focus-ring-color);\n`;
        output += `  outline-offset: var(--luma-accordion-focus-ring-offset);\n`;
        output += `}\n\n`;
      }

      // ============================================
      // TOOLTIP UTILITIES
      // ============================================

      output += `/* Tooltip Utilities */\n`;

      // Tooltip background
      const tooltipBgToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'tooltip' && t.path[2] === 'background',
      );
      if (tooltipBgToken) {
        output += `@utility lm-bg-tooltip {\n`;
        output += `  background-color: var(${tooltipBgToken.name});\n`;
        output += `}\n\n`;
      }

      // Tooltip text color
      const tooltipTextToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'tooltip' && t.path[2] === 'text',
      );
      if (tooltipTextToken) {
        output += `@utility lm-text-tooltip {\n`;
        output += `  color: var(${tooltipTextToken.name});\n`;
        output += `}\n\n`;
      }

      // Tooltip font size
      const tooltipFontSizeToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'tooltip' && t.path[2] === 'font-size',
      );
      if (tooltipFontSizeToken) {
        output += `@utility lm-text-size-tooltip {\n`;
        output += `  font-size: var(${tooltipFontSizeToken.name});\n`;
        output += `}\n\n`;
      }

      // Tooltip padding (uniform)
      const tooltipPaddingToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'tooltip' && t.path[2] === 'padding',
      );
      if (tooltipPaddingToken) {
        output += `@utility lm-p-tooltip {\n`;
        output += `  padding: var(${tooltipPaddingToken.name});\n`;
        output += `}\n\n`;
      }

      // Tooltip radius
      const tooltipRadiusToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'tooltip' && t.path[2] === 'radius',
      );
      if (tooltipRadiusToken) {
        output += `@utility lm-rounded-tooltip {\n`;
        output += `  border-radius: var(${tooltipRadiusToken.name});\n`;
        output += `}\n\n`;
      }

      // Tooltip shadow
      const tooltipShadowToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'tooltip' && t.path[2] === 'shadow',
      );
      if (tooltipShadowToken) {
        output += `@utility lm-shadow-tooltip {\n`;
        output += `  box-shadow: var(${tooltipShadowToken.name});\n`;
        output += `}\n\n`;
      }

      // Tooltip max-width
      const tooltipMaxWidthToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'tooltip' && t.path[2] === 'max-width',
      );
      if (tooltipMaxWidthToken) {
        output += `@utility lm-max-w-tooltip {\n`;
        output += `  max-width: var(${tooltipMaxWidthToken.name});\n`;
        output += `}\n\n`;
      }

      // Tooltip transition duration
      const tooltipDurationToken = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tooltip' &&
          t.path[2] === 'transition' &&
          t.path[3] === 'duration',
      );
      if (tooltipDurationToken) {
        output += `@utility lm-duration-tooltip {\n`;
        output += `  transition-duration: var(${tooltipDurationToken.name});\n`;
        output += `}\n\n`;
      }

      // Tooltip transition timing
      const tooltipTimingToken = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tooltip' &&
          t.path[2] === 'transition' &&
          t.path[3] === 'timing',
      );
      if (tooltipTimingToken) {
        output += `@utility lm-ease-tooltip {\n`;
        output += `  transition-timing-function: var(${tooltipTimingToken.name});\n`;
        output += `}\n\n`;
      }

      // ============================================
      // TABS UTILITIES
      // ============================================

      output += `/* Tabs List Utilities */\n`;

      // Tabs list gap
      const tabsListGap = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' && t.path[2] === 'list' && t.path[3] === 'gap',
      );
      if (tabsListGap) {
        output += `@utility lm-gap-tabs-list {\n`;
        output += `  gap: var(${tabsListGap.name});\n`;
        output += `}\n\n`;
      }

      // Tabs list border color
      const tabsListBorder = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'list' &&
          t.path[3] === 'border-color',
      );
      if (tabsListBorder) {
        output += `@utility lm-border-tabs-list {\n`;
        output += `  border-color: var(${tabsListBorder.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Tabs Trigger Utilities */\n`;

      // Tabs trigger text colors
      const tabsTriggerText = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'text',
      );
      if (tabsTriggerText) {
        output += `@utility lm-text-tabs-trigger {\n`;
        output += `  color: var(${tabsTriggerText.name});\n`;
        output += `}\n\n`;
      }

      const tabsTriggerTextHover = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'text-hover',
      );
      if (tabsTriggerTextHover) {
        output += `@utility lm-text-tabs-trigger-hover {\n`;
        output += `  color: var(${tabsTriggerTextHover.name});\n`;
        output += `}\n\n`;
      }

      const tabsTriggerTextSelected = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'text-selected',
      );
      if (tabsTriggerTextSelected) {
        output += `@utility lm-text-tabs-trigger-selected {\n`;
        output += `  color: var(${tabsTriggerTextSelected.name});\n`;
        output += `}\n\n`;
      }

      // Tabs trigger backgrounds
      const tabsTriggerBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'background',
      );
      if (tabsTriggerBg) {
        output += `@utility lm-bg-tabs-trigger {\n`;
        output += `  background-color: var(${tabsTriggerBg.name});\n`;
        output += `}\n\n`;
      }

      const tabsTriggerBgHover = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'background-hover',
      );
      if (tabsTriggerBgHover) {
        output += `@utility lm-bg-tabs-trigger-hover {\n`;
        output += `  background-color: var(${tabsTriggerBgHover.name});\n`;
        output += `}\n\n`;
      }

      const tabsTriggerBgSelected = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'background-selected',
      );
      if (tabsTriggerBgSelected) {
        output += `@utility lm-bg-tabs-trigger-selected {\n`;
        output += `  background-color: var(${tabsTriggerBgSelected.name});\n`;
        output += `}\n\n`;
      }

      // Tabs trigger padding
      const tabsTriggerPaddingX = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'padding-x',
      );
      if (tabsTriggerPaddingX) {
        output += `@utility lm-px-tabs-trigger {\n`;
        output += `  padding-left: var(${tabsTriggerPaddingX.name});\n`;
        output += `  padding-right: var(${tabsTriggerPaddingX.name});\n`;
        output += `}\n\n`;
      }

      const tabsTriggerPaddingY = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'padding-y',
      );
      if (tabsTriggerPaddingY) {
        output += `@utility lm-py-tabs-trigger {\n`;
        output += `  padding-top: var(${tabsTriggerPaddingY.name});\n`;
        output += `  padding-bottom: var(${tabsTriggerPaddingY.name});\n`;
        output += `}\n\n`;
      }

      // Tabs trigger font
      const tabsTriggerFontSize = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'font-size',
      );
      if (tabsTriggerFontSize) {
        output += `@utility lm-text-size-tabs-trigger {\n`;
        output += `  font-size: var(${tabsTriggerFontSize.name});\n`;
        output += `}\n\n`;
      }

      const tabsTriggerFontWeight = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'font-weight',
      );
      if (tabsTriggerFontWeight) {
        output += `@utility lm-font-tabs-trigger {\n`;
        output += `  font-weight: var(${tabsTriggerFontWeight.name});\n`;
        output += `}\n\n`;
      }

      // Tabs trigger radius
      const tabsTriggerRadius = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'trigger' &&
          t.path[3] === 'radius',
      );
      if (tabsTriggerRadius) {
        output += `@utility lm-rounded-tabs-trigger {\n`;
        output += `  border-radius: var(${tabsTriggerRadius.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Tabs Indicator Utilities */\n`;

      // Tabs indicator height
      const tabsIndicatorHeight = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'indicator' &&
          t.path[3] === 'height',
      );
      if (tabsIndicatorHeight) {
        output += `@utility lm-h-tabs-indicator {\n`;
        output += `  height: var(${tabsIndicatorHeight.name});\n`;
        output += `}\n\n`;
      }

      // Tabs indicator color (background)
      const tabsIndicatorColor = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'indicator' &&
          t.path[3] === 'color',
      );
      if (tabsIndicatorColor) {
        output += `@utility lm-bg-tabs-indicator {\n`;
        output += `  background-color: var(${tabsIndicatorColor.name});\n`;
        output += `}\n\n`;
      }

      // Tabs indicator radius
      const tabsIndicatorRadius = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'indicator' &&
          t.path[3] === 'radius',
      );
      if (tabsIndicatorRadius) {
        output += `@utility lm-rounded-tabs-indicator {\n`;
        output += `  border-radius: var(${tabsIndicatorRadius.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Tabs Panel Utilities */\n`;

      // Tabs panel padding
      const tabsPanelPadding = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'panel' &&
          t.path[3] === 'padding',
      );
      if (tabsPanelPadding) {
        output += `@utility lm-p-tabs-panel {\n`;
        output += `  padding: var(${tabsPanelPadding.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Tabs Pill Variant Utilities */\n`;

      // Tabs pill background
      const tabsPillBg = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'pill' &&
          t.path[3] === 'background',
      );
      if (tabsPillBg) {
        output += `@utility lm-bg-tabs-pill {\n`;
        output += `  background-color: var(${tabsPillBg.name});\n`;
        output += `}\n\n`;
      }

      const tabsPillBgSelected = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'pill' &&
          t.path[3] === 'background-selected',
      );
      if (tabsPillBgSelected) {
        output += `@utility lm-bg-tabs-pill-selected {\n`;
        output += `  background-color: var(${tabsPillBgSelected.name});\n`;
        output += `}\n\n`;
      }

      // Tabs pill gap
      const tabsPillGap = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' && t.path[2] === 'pill' && t.path[3] === 'gap',
      );
      if (tabsPillGap) {
        output += `@utility lm-gap-tabs-pill {\n`;
        output += `  gap: var(${tabsPillGap.name});\n`;
        output += `}\n\n`;
      }

      // Tabs pill padding
      const tabsPillPadding = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'pill' &&
          t.path[3] === 'padding',
      );
      if (tabsPillPadding) {
        output += `@utility lm-p-tabs-pill {\n`;
        output += `  padding: var(${tabsPillPadding.name});\n`;
        output += `}\n\n`;
      }

      // Tabs pill radius
      const tabsPillRadius = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'pill' &&
          t.path[3] === 'radius',
      );
      if (tabsPillRadius) {
        output += `@utility lm-rounded-tabs-pill {\n`;
        output += `  border-radius: var(${tabsPillRadius.name});\n`;
        output += `}\n\n`;
      }

      output += `/* Tabs Transition Utilities */\n`;

      // Tabs transition duration
      const tabsDuration = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'transition' &&
          t.path[3] === 'duration',
      );
      if (tabsDuration) {
        output += `@utility lm-duration-tabs {\n`;
        output += `  transition-duration: var(${tabsDuration.name});\n`;
        output += `}\n\n`;
      }

      // Tabs transition timing
      const tabsTiming = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'tabs' &&
          t.path[2] === 'transition' &&
          t.path[3] === 'timing',
      );
      if (tabsTiming) {
        output += `@utility lm-ease-tabs {\n`;
        output += `  transition-timing-function: var(${tabsTiming.name});\n`;
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
    'src/components/accordion/accordion.json',
    'src/components/tooltip/tooltip.json',
    'src/components/tabs/tabs.json',
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
