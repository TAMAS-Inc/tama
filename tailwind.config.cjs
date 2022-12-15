const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    colors: {
      Black: '#181818',
      White: '#ffffff',
      Primary: {
        '100': '#fff4db',
        '200': '#ffe5a8',
        '300': '#ffd677',
        '400': '#ffc642',
        '500': '#ffb70f',
        '600': '#db9900',
        '700': '#a87600',
        '800': '#755200',
        '900': '#422e00',
      },
      Gray: {
        '100': '#ededed',
        '200': '#d4d4d4',
        '300': '#bababa',
        '400': '#a1a1a1',
        '500': '#878787',
        '600': '#6e6e6e',
        '700': '#545454',
        '800': '#3b3b3b',
        '900': '#212121',
      },
    },
    fontSize: {
      sm: '0.75rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '1.875rem',
      '3xl': '2.25rem',
      '4xl': '3rem',
    },
    fontFamily: {
      'line-seed-sans-kr': 'LINE Seed Sans KR',
    },
    extend: {
      backgroundImage: {
        'icon-close': 'url(/public/assets/images/icon-close.svg)',
        'icon-search': 'url(/public/assets/images/icon-search.svg)',
      },
      fontSize: {
        body1: '20px',
        body2: '16px',
        body3: '12px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
