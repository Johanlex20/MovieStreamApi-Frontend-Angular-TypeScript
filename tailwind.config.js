/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      width:{
        '60':'60px',
      },
      height:{
        '60':'60px'
      },
      colors:{
        'azulbarra':'rgb(15, 123, 212);'
      },
      gridTemplateColumns:{
        '70-30':'70% 30%'
      }
    },
  },
  plugins: [],
}

