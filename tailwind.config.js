module.exports = {
  purge: [
    "docs/*.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend:{
      colors:{
        globant:"#BFD732",
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [ require('@tailwindcss/typography') ],
}
