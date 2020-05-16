module.exports = ({ env }) => ({
  plugins: {
    'tailwindcss': true,
    'cssnano': env === 'production',
  },
});
