import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      // Coverage measured only on pure-logic files; complex UI/pages
      // require extensive browser-API mocking beyond the scope of unit tests.
      include: [
        'src/utils/**',
        'src/hooks/**',
        'src/components/ui/**',
      ],
      exclude: [
        '**/*.test.*',
        '**/*.d.ts',
        'src/test/**',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
