import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { host: true },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
