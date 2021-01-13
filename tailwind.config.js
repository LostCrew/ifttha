const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    fontSize: {
      xs: '.65rem',
      sm: '.725rem',
      base: '.85rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.25rem',
      '3xl': '1.5rem',
      '4xl': '1.875rem',
      '5xl': '2.25rem',
      '6xl': '3rem'
    },
    extend: {
      colors: {
        blue: colors.cyan,
        gray: colors.coolGray,
        green: colors.emerald
      }
    }
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus']
    }
  },
  plugins: []
}
