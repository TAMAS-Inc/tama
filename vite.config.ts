import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';

export default defineConfig({
  server: { host: true },
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/**/*.{js,css,html,ico,png,svg}'],
      },
      includeAssets: ['assets/favicons/*.{js,css,html,ico,png,svg}'],
      manifest: {
        name: 'takkamakka',
        short_name: 'tamas',
        description: '타까마까입니다',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'assets/favicons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/favicons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'assets/favicons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
