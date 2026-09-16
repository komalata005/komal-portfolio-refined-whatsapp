/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBF9FD',
        paperTint: '#F1ECF8',
        ink: '#211732',
        inkSoft: '#5B5470',
        mist: '#ACAFC2',
        mistLine: '#DAD7E6',
        lilac: '#9B7FD9',
        violet: '#5A3E8E',
        violetDeep: '#46316F',
        midnight: '#241A3D',
        midnight2: '#2E2150',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
}
