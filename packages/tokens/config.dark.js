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
 * Supports runtime token composition via outputReferences option
 */
StyleDictionary.registerFormat({
  name: 'css/luma-dark',
  format: ({ dictionary, options }) => {
    const { outputReferencesTransformed } = options;

    /**
     * Helper para obter o valor de um token, respeitando outputReferences
     * Se outputReferencesTransformed retornar true, gera var() reference
     */
    const getTokenValue = (token) => {
      // Se tem função de filtro e ela retorna true, gerar referência
      if (
        outputReferencesTransformed &&
        outputReferencesTransformed(token, options)
      ) {
        // Encontrar o token referenciado
        // token.original.value é algo como "{luma.color.primary.50}"
        const refPath = token.original.value
          .replace(/\{/g, '')
          .replace(/\}/g, '')
          .split('.');

        // Construir o nome da variável CSS referenciada
        const refName = '--' + refPath.join('-');
        return `var(${refName})`;
      }

      // Caso contrário, usar valor hardcoded
      return token.value;
    };

    let output = `/* Luma Design System - Dark Theme */\n`;
    output += `.dark {\n`;

    dictionary.allTokens.forEach((token) => {
      const value = getTokenValue(token);
      output += `  ${token.name}: ${value};\n`;
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

/**
 * Filtro de referências para dark theme - lógica idêntica ao light theme
 * MANTER SINCRONIZADO COM config.js
 *
 * @param {object} token - Token object from Style Dictionary
 * @param {object} options - Options passed to the format
 * @returns {boolean} - true para gerar var(), false para valor hardcoded
 */
const shouldOutputReference = (token, options) => {
  // Core tokens sempre geram valores reais (são a fonte)
  const coreCategories = [
    'color',
    'spacing',
    'radius',
    'duration',
    'transition',
    'focus',
  ];
  if (coreCategories.includes(token.path[1])) {
    return false;
  }

  // Component tokens: verificar se tem referência original
  const componentCategories = [
    'button',
    'card',
    'badge',
    'accordion',
    'tooltip',
    'tabs',
    'modal',
    'toast',
    'code',
  ];
  if (componentCategories.includes(token.path[1])) {
    // Se o token original tinha uma referência (ex: "{luma.color.primary.50}"),
    // então gerar var() reference
    if (token.original && token.original.value) {
      const originalValue = token.original.value;
      return typeof originalValue === 'string' && originalValue.startsWith('{');
    }
  }

  return false;
};

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
    'src/components/tooltip/tooltip.dark.json',
    'src/components/tabs/tabs.dark.json',
    'src/components/modal/modal.dark.json',
    'src/components/toast/toast.dark.json',
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
            outputReferences: true,
            outputReferencesTransformed: shouldOutputReference,
          },
        },
      ],
    },
  },
};

export default config;
