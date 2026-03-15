import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../build',
  },
  publicDir: '../public',
  base: './',
  outDir: './',
  appType: 'mpa',
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
  ],
});
