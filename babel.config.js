export default {
    presets: [
      ['@babel/preset-env', {
        targets: {
          browsers: [
            'last 2 versions',
            'safari >= 9', // Soporte para Safari en iPhone 6
          ],
        },
      }],
    ],
  };
  