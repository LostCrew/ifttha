const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false,
  theme: {
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
