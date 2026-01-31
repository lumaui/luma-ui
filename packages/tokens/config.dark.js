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
 * Custom transform group for dark theme
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

// Dark theme config - only .dark.json files
const config = {
  log: {
    verbosity: 'silent',
    warnings: 'disabled',
  },
  source: [
    'src/core/colors.dark.json',
    'src/components/button/button.dark.json',
    'src/components/card/card.dark.json',
    'src/components/badge/badge.dark.json',
    'src/components/accordion/accordion.dark.json',
  ],
  platforms: {
    'css-dark': {
      transformGroup: 'luma/css',
      buildPath: 'build/',
      files: [
        {
          destination: 'luma-dark.css',
          format: 'css/luma-dark',
          options: {
            outputReferences: false,
          },
        },
      ],
    },
  },
};

export default config;
