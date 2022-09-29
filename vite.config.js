/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-unpublished-import */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src',
  mode: 'development',
  build: {
    outDir: '../build',
  },
  publicDir: '../public',
  base: './',
  outDir: './',
  appType: 'spa',
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
  ],
});
