const path = require('path');
const pwaAssetGenerator = require('pwa-asset-generator');

(async () => {
  await pwaAssetGenerator.generateImages(
    path.resolve(__dirname, '../public/icon.png'),
    path.resolve(__dirname, '../public'),
    {
      type: 'png',
      iconOnly: true,
      favicon: true,
      opaque: false,
      path: '/public',
      index: path.resolve(__dirname, '../public/index.html'),
      manifest: path.resolve(__dirname, '../public/manifest.json'),
    });
})();