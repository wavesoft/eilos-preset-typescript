const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (ctx) => {
  const plugins = [];

  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        context: ctx.getDirectory("project"),
        configFile: ctx.getConfigFilePath("tsconfig.json"),
        profile: true,
      }
    })
  );
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    })
  );

  // Load copy plug-in if we have a static directory
  const staticDir = ctx.getConfig("static", "./static");
  if (fs.existsSync(staticDir)) {
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [{ from: staticDir }],
      })
    );
  }

  return {
    entry: ctx.getConfig("entry"),
    context: ctx.getDirectory("project"),
    mode: ctx.getMode(),
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                context: ctx.getDirectory("project"),
                configFile: ctx.getConfigFilePath("tsconfig.json"),
                happyPackMode: true,
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    plugins: plugins,
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
    output: {
      path: ctx.getDirectory("dist"),
      publicPath: "/",
      filename: "[id].js",
    },
    devServer: {
      contentBase: ctx.getDirectory("static"),
    },
  };
};
