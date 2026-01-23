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
      output += `\n/* Tailwind Utilities */\n\n`;

      // Helper to get utility name without 'luma' prefix
      const getUtilityName = (path) => path.slice(1).join('-');

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
        output += `@utility bg-${utilityName} {\n`;
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
        output += `@utility text-${utilityName} {\n`;
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
        output += `@utility border-${utilityName} {\n`;
        output += `  border-color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Button focus ring utility
      const focusRingWidthToken = dictionary.allTokens.find(
        (t) =>
          t.path[1] === 'button' &&
          t.path[2] === 'focus' &&
          t.path.some((p) => typeof p === 'string' && p.startsWith('ring')),
      );
      if (focusRingWidthToken) {
        output += `/* Focus Ring */\n`;
        output += `@utility ring-button-focus {\n`;
        output += `  outline: var(--luma-button-focus-ring-width) solid var(--luma-button-focus-ring-color);\n`;
        output += `  outline-offset: 2px;\n`;
        output += `}\n\n`;
      }

      // General background utilities (non-button)
      output += `/* General Background Colors */\n`;
      const generalBgTokens = dictionary.allTokens.filter(
        (t) =>
          (t.path.includes('background') ||
            (t.path[1] === 'color' && !t.path.includes('text'))) &&
          !t.path.includes('button') &&
          !t.path.includes('bg-'),
      );
      generalBgTokens.forEach((token) => {
        const utilityName = getUtilityName(token.path);
        output += `@utility bg-${utilityName} {\n`;
        output += `  background-color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Text color utilities (non-button)
      output += `/* Text Colors */\n`;
      const textTokens = dictionary.allTokens.filter(
        (t) =>
          t.path.includes('text') &&
          t.path.includes('color') &&
          !t.path.includes('button'),
      );
      textTokens.forEach((token) => {
        const utilityName = token.path.slice(2).join('-');
        output += `@utility text-${utilityName} {\n`;
        output += `  color: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Border radius utilities
      output += `/* Border Radius */\n`;
      const radiusTokens = dictionary.allTokens.filter(
        (t) => t.path.includes('radius') && !t.path.includes('button'),
      );
      radiusTokens.forEach((token) => {
        const utilityName = getUtilityName(token.path);
        output += `@utility rounded-luma-${token.path[token.path.length - 1]} {\n`;
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
        output += `@utility text-luma-${sizeName} {\n`;
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
        output += `@utility duration-luma-${durationName} {\n`;
        output += `  transition-duration: var(${token.name});\n`;
        output += `}\n\n`;
      });

      // Card gradient utilities
      output += `/* Card Gradients */\n`;
      const gradientTokens = dictionary.allTokens.filter((t) =>
        t.path.includes('gradient'),
      );
      gradientTokens.forEach((token) => {
        const gradientPos = token.path[token.path.length - 1];
        if (gradientPos === 'from') {
          output += `@utility from-card-gradient-from {\n`;
          output += `  --tw-gradient-from: var(${token.name});\n`;
          output += `  --tw-gradient-to: rgb(255 255 255 / 0);\n`;
          output += `  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n`;
          output += `}\n\n`;
        } else if (gradientPos === 'to') {
          output += `@utility to-card-gradient-to {\n`;
          output += `  --tw-gradient-to: var(${token.name});\n`;
          output += `}\n\n`;
        }
      });

      // Card padding utility
      output += `/* Card Padding */\n`;
      const cardPaddingToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'card' && t.path[2] === 'padding',
      );
      if (cardPaddingToken) {
        output += `@utility p-card-padding {\n`;
        output += `  padding: var(${cardPaddingToken.name});\n`;
        output += `}\n\n`;
      }

      // Badge utilities
      output += `/* Badge */\n`;
      const badgeBgToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'bg',
      );
      if (badgeBgToken) {
        output += `@utility bg-badge-bg {\n`;
        output += `  background-color: var(${badgeBgToken.name});\n`;
        output += `}\n\n`;
      }
      const badgeColorToken = dictionary.allTokens.find(
        (t) => t.path[1] === 'badge' && t.path[2] === 'color',
      );
      if (badgeColorToken) {
        output += `@utility text-badge {\n`;
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
