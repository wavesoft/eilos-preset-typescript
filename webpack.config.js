const path = require("path");
const isDevel = process.env.NODE_ENV === "development";

// Resolve ALL of the 'dependencies' as externals and therefore
// never include them in the produced bundle
const deps = require("./package.json");
const externals = Object.keys(deps.dependencies).reduce(
  (externals, pkg) => {
    externals[pkg] = `commonjs2 ${pkg}`;
    return externals;
  },
  {
    // Also externalize 'eilos'
    eilos: `commonjs2 eilos`,
  }
);

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  devtool: isDevel ? "source-map" : false,
  mode: isDevel ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "eilos-preset-typescript",
      type: "umd",
    },
  },
  externals,
};
