import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  // link:で参照したパッケージが別のReactを読み込まないようにする
  resolve: { dedupe: ['react', 'react-dom'] },
  test: {
    globals: true,
    coverage: { enabled: true },
    exclude: [...configDefaults.exclude, '**/*.e2e.spec.ts'],
    typecheck: {
      // `*.test-d.tsx`の型アサーションをテストとして実行する
      enabled: true,
      tsconfig: './tsconfig.json',
    },
  },
});
