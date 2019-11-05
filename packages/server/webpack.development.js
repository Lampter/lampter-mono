const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const { join } = require("path");
const webpack = require("webpack");

const common = require("./webpack.common.js");

module.exports = merge.smart(common, {
  devtool: "inline-source-map",
  entry: ["webpack/hot/poll?1000", join(__dirname, "src", "server-bootstrap")],
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?1000"]
    })
  ],
  target: "node",
  mode: "development",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackShellPlugin({
      onBuildEnd: ["yarn start:dev"]
    })
  ],
  watch: true
});
