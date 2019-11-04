const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const { join } = require("path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "source-map",
  entry: [join(__dirname, "src", "index")],
  externals: [nodeExternals()],
  mode: "production",
  plugins: [new CleanWebpackPlugin()]
});
