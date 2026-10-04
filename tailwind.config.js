/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F8F7FC',
        paperTint: '#EEEAF8',
        ink: '#211732',
        inkSoft: '#5B5470',
        mist: '#ACAFC2',
        mistLine: '#E0D8EA',
        blush: '#C4B5E8',
        lilac: '#A78BDB',
        violet: '#5A3E8E',
        violetDeep: '#46316F',
        midnight: '#241A3D',
        midnight2: '#2E2150',
      },
      fontFamily: {
        serif: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        script: ['Syne', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
}
