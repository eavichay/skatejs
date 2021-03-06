const path = require('path');
const webpack = require('webpack');

const contextPath = path.join(__dirname, 'site');
const publicPath = path.join(__dirname, 'public');

// require('@skatejs/ssr/register');
// const render = require('@skatejs/ssr');
// const fs = require('fs');
//
// class WebpackPrerenderPlugin {
//   getFile(name) {
//     return fs.readFileSync(path.join(publicPath, name)).toString();
//   }
//   apply(compiler) {
//     // if (process.env.NODE_ENV !== 'production') {
//     //   return;
//     // }
//     compiler.plugin('done', (comp, done) => {
//       document.ssr.scriptBase = './public';
//       document.body.innerHTML = this.getFile('index.html');
//       render()
//         .then(console.log)
//         .then(done);
//     });
//   }
// }

module.exports = {
  context: contextPath,
  devServer: {
    compress: true,
    contentBase: publicPath,
    historyApiFallback: true,
    open: true
  },
  devtool: 'source-map',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['transform-react-jsx', { pragma: 'h' }],
              'transform-skate-flow-props'
            ],
            presets: ['env', 'flow', 'react', 'stage-0']
          }
        }
      },
      {
        test: /\.(html)/,
        loaders: 'file-loader?{ name: "[path][name].[ext]"}'
      },
      {
        test: /\.(png)/,
        loaders: ['file-loader', 'img-loader']
      },
      {
        test: /\.worker\.js$/,
        loaders: 'worker-loader'
      }
    ]
  },
  output: {
    filename: 'chunk.[name].js',
    path: publicPath,
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      deepChildren: true,
      filename: 'entry.js',
      minChunks: 2,
      name: 'main'
    })
    // new WebpackPrerenderPlugin()
  ]
};
