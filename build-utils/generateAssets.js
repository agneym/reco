const path = require('path');
const pwaAssetGenerator = require('pwa-asset-generator');

(async () => {
  await pwaAssetGenerator.generateImages(
    path.resolve(__dirname, '../public/icon.png'),
    path.resolve(__dirname, '../public'),
    {
      background: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
      iconOnly: true,
      favicon: true,
      index: path.resolve(__dirname, '../public/index.html'),
      manifest: path.resolve(__dirname, '../public/manifest.json'),
    });
})();