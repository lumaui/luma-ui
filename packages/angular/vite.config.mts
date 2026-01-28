/// <reference types='vitest' />
import { defineConfig, type Plugin } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

// Define __dirname for ESM compatibility (not available by default in .mts files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to @lumaui/core dist
const lumaCorePath = resolve(
  __dirname,
  '../../packages/core/dist/src/index.js',
);

// Custom plugin to resolve @lumaui/core BEFORE other plugins (nxViteTsPaths)
// This is needed because nxViteTsPaths reads from tsconfig which points to a directory
const lumaCoreAliasPlugin: Plugin = {
  name: 'lumaui-core-alias',
  enforce: 'pre',
  resolveId(id) {
    if (id === '@lumaui/core') {
      return lumaCorePath;
    }
    return null;
  },
};

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/components',
  plugins: [
    lumaCoreAliasPlugin,
    angular(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //   plugins: () => [ nxViteTsPaths() ],
  // },
  test: {
    name: 'components',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    alias: {
      '@lumaui/core': resolve(
        __dirname,
        '../../packages/core/dist/src/index.js',
      ),
    },
    coverage: {
      reportsDirectory: '../../coverage/packages/components',
      provider: 'v8' as const,
    },
  },
}));
