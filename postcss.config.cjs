/* eslint-disable global-require */
/* eslint-disable no-undef */
const cssSafelistClassArray = [
  /result-section/,
  /result/,
  /result-link/,
  /clipboard-link/,
  /short-url/,
  /start-over-link/,
];

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    require('cssnano')({
      preset: 'default',
    }),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/index.html',
        './src/index.jsx',
        './src/components/*.jsx',
        './src/modules/*.jsx',
        './src/modules/*.js',
      ],
      fontFace: false,
      safelist: cssSafelistClassArray,
    }),
  ],
};
