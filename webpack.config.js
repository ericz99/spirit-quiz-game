const { join, resolve } = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config = {
  mode: "production",
  entry: __dirname + "/src/app/index.js",
  plugins: [new CleanWebpackPlugin(["dist"])],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.min.js",
    publicPath: "/",
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/index.html",
      inject: "body"
    }),
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([
      {
        from: __dirname + "/src/public"
      }
    ])
  ],
  devServer: {
    contentBase: "./src/public",
    port: 7000
  }
};

module.exports = config;
