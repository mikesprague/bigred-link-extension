/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-unpublished-import */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

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
