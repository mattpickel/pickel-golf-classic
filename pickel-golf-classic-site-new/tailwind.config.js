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
        'gold-dark': '#c4a93a',
        'cream': '#f5f0e6',
        'cream-dark': '#ede5d4',
        'text-dark': '#1c1c10',
        'text-mid': '#3d3d28',
        'text-muted': '#6a6a58',
        'green-muted': '#2a4520',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
