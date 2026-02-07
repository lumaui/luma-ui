import StyleDictionary from 'style-dictionary';

/**
 * Purple Theme Configuration (Light Mode)
 * Uses 12-step color scale + background/foreground
 * Structural tokens (radius, shadow, alpha) from shared/
 */

StyleDictionary.registerFormat({
  name: 'css/theme',
  format: ({ dictionary }) => {
    let output = `@import "tailwindcss";\n\n`;
    output += `@theme {\n`;
    output += `  /* Luma Design System - Purple Theme (Light) */\n\n`;

    // Process primary color scale (12-step)
    const primaryTokens = dictionary.allTokens.filter(t => t.path[1] === 'primary');
    if (primaryTokens.length > 0) {
      output += `  /* Primary Color Scale (12-step Radix-inspired) */\n`;
      primaryTokens.forEach((token) => {
        const step = token.path[2];
        output += `  --color-primary-${step}: ${token.value};\n`;
      });
      output += `\n`;

      // Create semantic mappings from primary scale
      output += `  /* Semantic Primary Mappings */\n`;
      const primary5 = primaryTokens.find(t => t.path[2] === '5');
      const primary12 = primaryTokens.find(t => t.path[2] === '12');
      const primary2 = primaryTokens.find(t => t.path[2] === '2');
      const primary4 = primaryTokens.find(t => t.path[2] === '4');
      const primary3 = primaryTokens.find(t => t.path[2] === '3');
      const primary6 = primaryTokens.find(t => t.path[2] === '6');

      if (primary5) output += `  --color-primary: ${primary5.value};\n`;
      if (primary12) output += `  --color-primary-foreground: ${primary12.value};\n`;

      // Derived semantic colors from primary scale
      if (primary2) {
        output += `  --color-secondary: ${primary2.value};\n`;
        if (primary12) output += `  --color-secondary-foreground: ${primary12.value};\n`;
      }
      if (primary4) {
        output += `  --color-accent: ${primary4.value};\n`;
        if (primary12) output += `  --color-accent-foreground: ${primary12.value};\n`;
      }

      // Border and input from lighter primary shades
      if (primary3) output += `  --color-border: ${primary3.value};\n`;
      if (primary2) output += `  --color-input: ${primary2.value};\n`;

      // Focus ring with alpha
      if (primary6) output += `  --color-ring: oklch(0.43 0.085 300 / 0.35);\n`;

      output += `\n`;
    }

    // Process background and foreground
    const backgroundToken = dictionary.allTokens.find(t => t.path[1] === 'background');
    const foregroundToken = dictionary.allTokens.find(t => t.path[1] === 'foreground');
    const popoverToken = dictionary.allTokens.find(t => t.path[1] === 'popover' && t.path.length === 2);
    const popoverForegroundToken = dictionary.allTokens.find(t => t.path[1] === 'popover-foreground');

    if (backgroundToken || foregroundToken || popoverToken) {
      output += `  /* Surface Colors */\n`;
      if (backgroundToken) {
        output += `  --color-background: ${backgroundToken.value};\n`;
        // Card and popover use background as default
        output += `  --color-card: ${backgroundToken.value};\n`;
        // Use explicit popover token if exists, otherwise fallback to background
        if (!popoverToken) {
          output += `  --color-popover: ${backgroundToken.value};\n`;
        }
        // Muted uses same as background
        output += `  --color-muted: ${backgroundToken.value};\n`;
      }
      if (foregroundToken) {
        output += `  --color-foreground: ${foregroundToken.value};\n`;
        // Card foreground uses same
        output += `  --color-card-foreground: ${foregroundToken.value};\n`;
        // Use explicit popover-foreground if exists, otherwise fallback to foreground
        if (!popoverForegroundToken) {
          output += `  --color-popover-foreground: ${foregroundToken.value};\n`;
        }
        // Muted foreground with reduced opacity (conceptual - using lighter value)
        output += `  --color-muted-foreground: oklch(0.48 0.01 290);\n`;
      }
      // Add explicit popover tokens if they exist
      if (popoverToken) {
        output += `  --color-popover: ${popoverToken.value};\n`;
      }
      if (popoverForegroundToken) {
        output += `  --color-popover-foreground: ${popoverForegroundToken.value};\n`;
      }
      output += `\n`;
    }

    // Process semantic states (destructive, warning, success)
    const destructiveBg = dictionary.allTokens.find(t =>
      t.path[1] === 'destructive' && t.path[2] === 'background'
    );
    const destructiveFg = dictionary.allTokens.find(t =>
      t.path[1] === 'destructive' && t.path[2] === 'foreground'
    );
    const warningBg = dictionary.allTokens.find(t =>
      t.path[1] === 'warning' && t.path[2] === 'background'
    );
    const warningFg = dictionary.allTokens.find(t =>
      t.path[1] === 'warning' && t.path[2] === 'foreground'
    );
    const successBg = dictionary.allTokens.find(t =>
      t.path[1] === 'success' && t.path[2] === 'background'
    );
    const successFg = dictionary.allTokens.find(t =>
      t.path[1] === 'success' && t.path[2] === 'foreground'
    );

    if (destructiveBg || warningBg || successBg) {
      output += `  /* Semantic States (from shared/semantic.json) */\n`;
      if (destructiveBg) output += `  --color-destructive: ${destructiveBg.value};\n`;
      if (destructiveFg) output += `  --color-destructive-foreground: ${destructiveFg.value};\n`;
      if (warningBg) output += `  --color-warning: ${warningBg.value};\n`;
      if (warningFg) output += `  --color-warning-foreground: ${warningFg.value};\n`;
      if (successBg) output += `  --color-success: ${successBg.value};\n`;
      if (successFg) output += `  --color-success-foreground: ${successFg.value};\n`;
      output += `\n`;
    }

    // Process font tokens
    const fontTokens = dictionary.allTokens.filter(t => t.path[1] === 'font');
    if (fontTokens.length > 0) {
      output += `  /* Typography (from shared/typography.json) */\n`;
      fontTokens.forEach((token) => {
        const fontProp = token.path.slice(2).join('-');
        output += `  --font-${fontProp}: ${token.value};\n`;
      });
      output += `\n`;
    }

    // Process radius tokens
    const radiusTokens = dictionary.allTokens.filter(t => t.path[1] === 'radius');
    if (radiusTokens.length > 0) {
      output += `  /* Border Radius (from shared/radius.json) */\n`;
      radiusTokens.forEach((token) => {
        const size = token.path[2];
        output += `  --radius-${size}: ${token.value};\n`;
      });
      output += `\n`;
    }

    // Process shadow tokens
    const shadowTokens = dictionary.allTokens.filter(t => t.path[1] === 'shadow');
    if (shadowTokens.length > 0) {
      output += `  /* Box Shadow (from shared/shadow.json) */\n`;
      shadowTokens.forEach((token) => {
        const size = token.path[2];
        output += `  --shadow-${size}: ${token.value};\n`;
      });
      output += `\n`;
    }

    // Process alpha tokens
    const alphaTokens = dictionary.allTokens.filter(t => t.path[1] === 'alpha');
    if (alphaTokens.length > 0) {
      output += `  /* Alpha Values (from shared/alpha.json) */\n`;
      alphaTokens.forEach((token) => {
        const alphaName = token.path.slice(2).join('-');
        output += `  --color-${alphaName}: ${token.value};\n`;
      });
      output += `\n`;
    }

    output += `}\n`;
    return output;
  },
});

export default {
  source: [
    'src/themes/purple/purple.json',    // Purple theme colors (primary scale + surfaces)
    'src/shared/**/*.json',             // Structural tokens (radius, shadow, alpha, typography, semantic)
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [
        {
          destination: 'luma.css',
          format: 'css/theme',
        },
      ],
    },
  },
};
