const { join } = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");
const { NODE_ENV } = process.env;

const monorepoRoot = join(__dirname, "..", "..");

module.exports = {
  externals: [nodeExternals()],
  entry: join(__dirname, "src", "index"),
  output: {
    path: join(__dirname, "umd")
  },
  mode: NODE_ENV,
  target: "node",
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: join(monorepoRoot, "tsconfig.json")
      })
    ]
  },
  watch: NODE_ENV === "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "@ts-tools/webpack-loader"
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ["yarn start:dev"]
    })
  ]
};
