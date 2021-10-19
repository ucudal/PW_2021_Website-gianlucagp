module.exports = {
  purge: [
    "docs/*.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend:{
      colors:{
        globant:"#BFD732",
      },
      backgroundImage:{
        'image-pattern': "url('/docs/pistola_gato.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [ require('@tailwindcss/typography') ],
}
