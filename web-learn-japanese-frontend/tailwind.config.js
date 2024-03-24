/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        'custom-color-blue': '#14375f', //#0891b2
      },
      backgroundColor: {
        'custom-color-blue': '#14375f',
        'custom-color-gray': '#6c8299'
      },
      colors: {
        'custom-color-gray': '#6c8299'
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
}

