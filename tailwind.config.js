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
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'dark-placeholder']
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ],
}
