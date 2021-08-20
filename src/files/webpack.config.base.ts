import fs from "fs";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { ConfigFileContents } from "eilos";
import type { GlobalRuntimeContext } from "../options";

function getEntryConfig(ctx: GlobalRuntimeContext) {
  const entry = ctx.getOption("entry");
  if (typeof entry === "string") {
    return {
      index: entry,
    };
  }

  return entry;
}

export default function (ctx: GlobalRuntimeContext): ConfigFileContents {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
  ];

  // Load copy plug-in if we have a static directory
  const staticDir = ctx.getOption("staticSrcDir", "./static");
  if (fs.existsSync(staticDir)) {
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [{ from: staticDir }],
      })
    );
  }

  // Check if we are building a library
  const library = ctx.getOption("library", false);
  const libraryOutput = {} as any;
  if (library != null) {
    libraryOutput.libraryTarget = "umd";

    if (typeof library === "string") {
      libraryOutput.library = library;
    } else {
      Object.assign(libraryOutput, {
        library: libraryOutput.name,
        libraryTarget: libraryOutput.target || "umd",
      });
    }
  }

  // Enable typescript optimisations if we are not building a library. That's a
  // limitation of the `ts-loader` plugin, since when we set `transpileOnly: true`
  // the generator won't emit type files.
  const tsLoaderOptions = {};
  if (!library) {
    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          context: ctx.getDirectory("project"),
          configFile: ctx.getConfigFilePath("tsconfig.json"),
        },
      })
    );
    Object.assign(tsLoaderOptions, {
      happyPackMode: true,
      transpileOnly: true,
    });
  }

  // If we have external references, build the webpack configuration for them
  const externalModules = ctx.getOption("externals", []);
  const externals = {} as any;
  if (externalModules && externalModules.length) {
    externalModules.forEach((extern) => {
      externals[extern] = `commonjs2 ${extern}`;
    });
  }

  // Additional modules to include
  const srcModules = ctx.getOption("sourceModules");
  const ignoreExcludeRules = {} as any;
  if (srcModules) {
    if (Array.isArray(srcModules)) {
      ignoreExcludeRules.exclude = srcModules;
    }
  }

  return {
    entry: getEntryConfig(ctx),
    context: ctx.getDirectory("project"),
    mode: ctx.getMode(),
    module: {
      rules: [
        {
          test: /\.react\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          exclude: /\.react\.svg$/,
          use: ctx.getOption("embedAssets")
            ? [
                {
                  loader: "url-loader",
                  options: {
                    limit: Infinity,
                  },
                },
              ]
            : [
                {
                  loader: "file-loader",
                },
              ],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.([tj]sx?)$/i,
          exclude: {
            and: ([/node_modules/] as any[]).concat(
              ignoreExcludeRules.length ? [{ not: ignoreExcludeRules }] : []
            ),
          },
          use: [
            {
              loader: "ts-loader",
              options: Object.assign(
                {
                  context: ctx.getDirectory("project"),
                  configFile: ctx.getConfigFilePath("tsconfig.json"),
                },
                tsLoaderOptions
              ),
            },
          ],
        },
      ],
    },
    plugins: plugins,
    externals,
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
    output: Object.assign(
      {
        path: ctx.getDirectory("dist"),
        publicPath: "/",
        filename: "[name].js",
      },
      libraryOutput
    ),
    devServer: {
      contentBase: ctx.getDirectory("static"),
    },
  };
}
