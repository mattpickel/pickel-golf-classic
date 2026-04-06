/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#1a3310',
        'secondary-color': '#e1c44d',
        'green': {
          950: '#0d1a08',
          900: '#1a3310',
          800: '#244a17',
          700: '#2e611e',
          600: '#3a7a26',
        },
        'gold': {
          300: '#f0dfa0',
          400: '#e8d074',
          500: '#e1c44d',
          600: '#d4b02e',
          700: '#b8961f',
        },
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'body': ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
