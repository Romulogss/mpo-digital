const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')

console.log("Usando custom.webpack.config.js")
module.exports = {
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
      result.request = result.request.replace(/typeorm/, "typeorm/browser");
    }),
    new webpack.ProvidePlugin({
      'window.SQL': 'sql.js/dist/sql-wasm-debug.js'
    }),
    new WriteFilePlugin()
  ],
  resolve: {
    fallback: {
      fs: false,
      net: false,
      tls: false,
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    }
  },
  optimization: {
    minimize: false
  },
  experiments: {
    syncWebAssembly: true
  }
};
