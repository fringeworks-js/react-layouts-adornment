import { defineConfig } from '@playwright/test';

// 他のパッケージのstorybook(6006)を誤って再利用しないよう、e2e専用のポートを使う
const PORT = 6106;

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.spec.ts',
  webServer: {
    command: `pnpm exec storybook dev -p ${PORT} --ci --no-open`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
    viewport: { width: 1280, height: 800 },
  },
  workers: 1,
});
