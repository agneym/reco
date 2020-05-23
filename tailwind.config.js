module.exports = {
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.js'
    ],
    options: {
      whitelist: ['mode-dark'],
    },
  },
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['hover', 'dark', 'dark-hover'],
    borderColor: ['hover', 'dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder']
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ],
}
