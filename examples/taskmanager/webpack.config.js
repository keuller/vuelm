var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: ['vue', 'vuelm']
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },

  resolve: {
      extensions: ['.js', '.vue'],
      modules: ['src', 'node_modules']
  },

  node: {
      fs: 'empty'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true
  },

  devtool: '#eval-source-map',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      warnings: false
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: false,
      compress: {
        warnings: false,
        conditionals: true,
        warnings: false,
        dead_code: true,
        unused: true,
        evaluate: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
