module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@models': './src/types',
          '@utils': './src/util',
          '@services': './src/services',
        },
      },
    ],
  ],
};