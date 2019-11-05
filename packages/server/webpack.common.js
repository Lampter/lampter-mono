const { join, resolve } = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const monorepoRoot = join(__dirname, "..", "..");

module.exports = {
  externals: [nodeExternals({})],
  target: "node",
  output: {
    filename: "index.js",
    path: join(__dirname, "umd")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: join(monorepoRoot, "tsconfig.json")
      })
    ]
  },
  module: {
    rules: [
      {
        exclude: [resolve(__dirname, "node_modules")],
        test: /\.ts?$/,
        loader: "@ts-tools/webpack-loader"
      }
    ]
  }
};
