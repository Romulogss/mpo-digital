const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
console.log('The custom config is used');
module.exports = {
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
      result.request = result.request.replace(/typeorm/, "typeorm/browser");
    }),
    new webpack.ProvidePlugin({
      'window.SQL': 'sql.js/dist/sql-wasm-debug.js'
    }),
    new CopyPlugin({patterns: [{from: 'node_modules/sql.js/dist/sql-wasm-debug.wasm', to: "./sql-wasm-debug.wasm"}]})
  ],
  resolve: {
    fallback: {
      fs: false,
      path: false
    }
  },
  optimization: {
    minimize: false
  }
};
