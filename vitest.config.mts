import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    // Same "@/..." shortcut as in tsconfig.json
    alias: { '@': fileURLToPath(new URL('./', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**', '.next/**', 'e2e/**'],
    coverage: {
      include: ['lib/**/*.ts', 'app/api/**/*.ts', 'app/sitemap.ts', 'app/robots.ts'],
      exclude: ['**/*.test.ts'],
    },
  },
});
