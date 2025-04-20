/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dg: '#0d0d0d',
        ldg: '#171717',
        lldg: '#1c1c1c',
        lav: '#9ea3f5',
        dlav: '#7f84db',
        bl: '#080808',
      },
      fontFamily: {
        league: ['"League Script"', 'cursive'],
        asswoop: ['"Ms Madi"', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
