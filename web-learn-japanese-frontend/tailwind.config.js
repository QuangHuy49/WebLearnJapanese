/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        'custom-text-color-blue': '#415A80',
      },
      backgroundColor: {
        'custom-color-blue': '#0891b2'
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
}

