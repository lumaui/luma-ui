import StyleDictionary from 'style-dictionary';

/**
 * Radix-inspired token configuration
 * Generates 12-step primary scale + radius/shadow scales
 */

StyleDictionary.registerFormat({
  name: 'css/radix-theme',
  format: ({ dictionary, options }) => {
    const themeName = options?.theme || 'Theme';
    let output = `@import "tailwindcss";\n\n`;
    output += `@theme {\n`;
    output += `  /* Luma Design System - ${themeName} */\n\n`;

    // Group tokens by category
    const categories = {
      primary: [],
      alpha: [],
      radius: [],
      shadow: [],
      destructive: [],
      warning: [],
      success: [],
    };

    dictionary.allTokens.forEach(token => {
      const category = token.path[1];
      if (categories[category]) {
        categories[category].push(token);
      }
    });

    // Output primary scale (12 steps)
    if (categories.primary.length > 0) {
      output += `  /* Primary Scale (12 steps) - Step 5 is BASE COLOR */\n`;
      categories.primary
        .sort((a, b) => Number(a.path[2]) - Number(b.path[2]))
        .forEach(token => {
          const step = token.path[2];
          output += `  --color-primary-${step}: ${token.value};\n`;
        });
      output += `\n`;
    }

    // Output alpha colors (for shadows)
    if (categories.alpha.length > 0) {
      output += `  /* Alpha Colors (for shadows) */\n`;
      categories.alpha.forEach(token => {
        const name = token.path[2];
        output += `  --color-${name}: ${token.value};\n`;
      });
      output += `\n`;
    }

    // Output radius scale (6 steps)
    if (categories.radius.length > 0) {
      output += `  /* Radius Scale (6 steps) */\n`;
      categories.radius
        .sort((a, b) => Number(a.path[2]) - Number(b.path[2]))
        .forEach(token => {
          const step = token.path[2];
          output += `  --radius-${step}: ${token.value};\n`;
        });
      output += `\n`;
    }

    // Output shadow scale (6 steps)
    if (categories.shadow.length > 0) {
      output += `  /* Shadow Scale (6 steps) */\n`;
      categories.shadow
        .sort((a, b) => Number(a.path[2]) - Number(b.path[2]))
        .forEach(token => {
          const step = token.path[2];
          output += `  --shadow-${step}: ${token.value};\n`;
        });
      output += `\n`;
    }

    // Output semantic colors (destructive, warning, success)
    const semanticCategories = ['destructive', 'warning', 'success'];
    semanticCategories.forEach(category => {
      if (categories[category].length > 0) {
        output += `  /* ${category.charAt(0).toUpperCase() + category.slice(1)} */\n`;
        categories[category].forEach(token => {
          const prop = token.path[2]; // 'background' or 'foreground'
          output += `  --color-${category}-${prop}: ${token.value};\n`;
        });
        output += `\n`;
      }
    });

    output += `}\n`;
    return output;
  },
});

// Build configuration for purple theme (light and dark)
const configs = [
  // Purple light theme
  {
    source: ['src/themes/purple.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'build/',
        files: [
          {
            destination: 'luma-purple.css',
            format: 'css/radix-theme',
            options: {
              theme: 'Purple',
            },
          },
        ],
      },
    },
  },
  // Purple dark theme
  {
    source: ['src/themes/purple.dark.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'build/',
        files: [
          {
            destination: 'luma-purple-dark.css',
            format: 'css/radix-theme',
            options: {
              theme: 'Purple (Dark)',
            },
          },
        ],
      },
    },
  },
];

export default configs;
