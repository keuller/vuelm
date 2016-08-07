var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },

  resolve: {
      extensions: ['', '.js', '.vue'],
      modulesDirectories: ['src', 'node_modules']
  },

  node: {
      fs: 'empty'
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  babel: {
    presets: ["es2015", "stage-2"],
    plugins: ["transform-runtime"]
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
