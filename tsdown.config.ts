import createExternalOptionFunction from '@fringeworks/dev/createExternalOptionFunction';
import distPackage from '@fringeworks/rollup-plugin-dist-package';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.test-d.{ts,tsx}',
    '!src/**/*.d.{ts,tsx}',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  unbundle: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  minify: false,
  css: {
    inject: true,
  },
  inputOptions: {
    external: createExternalOptionFunction(),
  },
  outputOptions: {
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    distPackage({
      resolveWorkspaceDeps: true,
      range: '^',
      content: {
        main: './index.cjs',
        module: './index.mjs',
        sideEffects: ['**/*.css'],
        exports: {
          '.': {
            import: './index.mjs',
            require: './index.cjs',
          },
          './constants': {
            import: './constants.mjs',
            require: './constants.cjs',
          },
          './*.css': './css/*.css',
          './with-css': {
            import: './with-css/index.mjs',
            require: './with-css/index.cjs',
          },
          './with-css/*': {
            import: './with-css/*/index.mjs',
            require: './with-css/*/index.cjs',
          },
          './*': {
            import: './*/index.mjs',
            require: './*/index.cjs',
          },
        },
      },
    }),
    copy({
      targets: [
        {
          src: ['LICENSE', 'README.md', 'README.ja.md'],
          dest: 'dist',
        },
      ],
    }),
    {
      name: 'fix-css-cjs-extension',
      renderChunk(code, _, options) {
        if (options.format !== 'cjs') {
          return null;
        }
        return {
          code: code.replace(
            /require\((['"])([^'"]*\/css\/[^'"]+)\.cjs\1\)/g,
            'require($1$2.css$1)',
          ),
          map: null,
        };
      },
    },
  ],
});
