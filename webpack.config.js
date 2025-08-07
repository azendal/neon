const path = require('path');

module.exports = {
  entry: {
    'neon': './neon.js',
    'neon.stdlib': './stdlib/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    library: 'Neon',
    libraryTarget: 'umd'
  }
};
