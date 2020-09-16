const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: "development",
  //指定打包的入口文件
  // mode: "development",
  entry: "./index.js",
  //指定打包后的资源位置
  output: {
    //公共路径设置
    //publicPath: "https://cdn.baidu.com",
    path: path.resolve(__dirname, "./build"),
    filename: "index.js"
  },
  /**
   * 选择一种 source map 格式来增强调试过程
   * eval:速度最快
   * cheap:较快，不⽤管列的报错
   * Module：第三⽅模块
   * 开发环境推荐: devtool:"cheap-module-eval-source-map"
   * 线上环境推荐:devtool:"cheap-module-source-map"
   */
  devtool: "none",
  module: {
    // 除了js之外的模块都要在module中设置相应的loader
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          // url-loader与file-loader的区别 
          // 可以根据模块的体积判断是否需要转换为base64，减少http请求
          loader: 'file-loader', // 把模块放到另外的目录里，并且把位置返回给我们
          options: {
            // name是打包前模块的名字 ext是打包前的模块格式
            name: "[name].[ext]", // 保留打包前的名字
            outputPath: "images/", // 为当前模块配置自定义 output 输出目录
            // limit: 1000 // 使用url-loader时，可以加limit，小于limit时以base64形式输出
          }
        },
      },
      {
        test: /\.css$/,
        // css-loader识别所有后缀为css的模块集成打包成一个文件
        // style-loader将css-loader打包后生成的css代码以style标签的形式放到html的head里面
        /**
         * 添加浏览器前缀 如-webkit等
         * 在数组最后添加postcss-loader，表示最先使用postcss-loader
         * 在根目录下新建postcss.config.js文件
         * module.exports = {
            plugins: [require("autoprefixer")]
          }
         */
        // use: ["style-loader","css-loader","postcss-loader"], // 使用style-loader
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // 使用mini-css-extract-plugin，将css生成独立的文件
      },
      {
        test: /\.scss$/,
        // 有执行顺序，从后往前
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  // 类似生命周期
  // 由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // 
      title: "11234",
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
  ],
  /**
   * 提升开发效率的利器,每次改完代码都需要重新打包⼀次，打开浏览器，刷新⼀次，很麻烦
   * 启动服务后，会发现build⽬录没有了，这是因为devServer把打包后的模块不会放在dist⽬录下，⽽是放到内存中，从⽽提升速度
   * 修改下package.json
   * "scripts": {
      "server": "webpack-dev-server"
      },
      
   */
  devServer: {
    contentBase: "./build", // 
    open: true, // 是否自动打开浏览器
    port: 8081,
    proxy: { // 跨域问题 联调期间，前后端分离，直接获取数据会跨域，上线后我们使⽤nginx转发，开发期间，webpack就可 以搞定这件事
      "/api": {
        target: "http://localhost:9092"
      }
    }
  },
};
