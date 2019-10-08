// 第一部分：一个简单的 webpack 配置 webpack.config.js



const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')   // 将样式文件分离
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 入口文件
  entry: './src/index.js',  
  
  // 输出（路径及文件夹）
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  // loader 一种处理多种文件格式的机制，负责吧某种文件转换成webpack可以支持打包的模块
  module: {
    rules: [
      {
        test: /\.jsx?/,   // 文件类型:babel转译jsx语法
        include: [
          path.resolve(__dirname, 'src'),   // 指定那些路径下的文件需要经过loader处理
        ],
        use: 'babel-loader',  // 指定使用的loader
      },
/*       {
        test: /\.css/,   // 处理样式文件：使用css-loader，style-loader转换
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'css-loader',
          'style-loader',
        ]
      }, */
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src'),
        use: [
            MiniCSSExtractPlugin.loader,
            'css-loader',
            'less-loader'
        ]
    },
/*       {
        test: /\.less/,   // 处理样式预编译文件：使用css-loader，style-loader转换

        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'less-loader',
            'css-loader'
          ]
        })
        
      }, */
      {
        test: /\.(jpg|png|gif)$/,   // 处理图片文件
        use: [
          {
            loader: 'file-loader',
          }
        ]
      }

    ]

  
  }, 

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"]
  },

  // 插件 
  plugins: [
    new MiniCSSExtractPlugin('[name].css'),  // 分离样式文件的插件
    new UglifyPlugin(),   // 压缩js代码的插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),   // 关联html文件
  ]
  
  
}
