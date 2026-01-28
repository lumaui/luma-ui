/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/components',
  plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  resolve: {
    alias: {
      '@lumaui/core': resolve(
        __dirname,
        '../../packages/core/dist/src/index.js',
      ),
    },
  },
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
