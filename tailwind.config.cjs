// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors');

// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/index.html',
    './src/index.jsx',
    './src/components/*.jsx',
    './src/modules/*.jsx',
    './src/modules/*.js',
  ],
  darkMode: 'media',
  theme: {
    colors: {
      amber: colors.amber,
      black: '#000',
      blue: colors.blue,
      bluegray: colors.slate,
      coolgray: colors.gray,
      cyan: colors.cyan,
      emerald: colors.emerald,
      gray: colors.zinc,
      green: colors.green,
      indigo: colors.indigo,
      sky: colors.sky,
      lime: colors.lime,
      orange: colors.orange,
      pink: colors.pink,
      purple: colors.purple,
      red: '#b31b1b',
      rose: colors.rose,
      teal: colors.teal,
      truegray: colors.neutral,
      violet: colors.violet,
      warmgray: colors.stone,
      white: colors.white,
      yellow: colors.yellow,
    },
    extend: {
      colors: {
        'blue-links': '#006699',
        carnellian: '#b31b1b',
        'dark-grey': '#222',
        'dark-warm-grey': '#073949',
        'green-graphics': '#6eb43f',
        'green-large-text': '#578e32',
        'light-grey': '#f7f7f7',
        'med-grey': '#bbb',
        navy: '#073949',
        'orange-graphics': '#f8981d',
        'orange-large-text': '#d47500',
        'red-graphics': '#ef4035',
        'red-text': '#df1e12',
        'green-text': '#4b7b2b',
        'sea-grey': '#9fad9f',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
