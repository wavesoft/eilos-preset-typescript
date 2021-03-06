const configWebpackBase = require("../config/webpack.config.base");
const configWebpackHot = require("../config/webpack.config.hot");
const configTs = require("../config/tsconfig");
const tsTypings = require("../config/tstypings");

module.exports = {
  files: {
    "webpack.config.js": (ctx) => {
      const { merge } = ctx.util;
      const options = ctx.getConfig("options");
      const userConfig = ctx.getConfig("webpack", {});

      // Enable hot module replacement if requested
      let config = configWebpackBase(ctx);
      if (options.hot) {
        config = merge(config, configWebpackHot(ctx));
      }

      return merge(config, userConfig);
    },
    "tsconfig.json": (ctx) => {
      const { merge } = ctx.util;
      const userConfig = ctx.getConfig("tsconfig", {});

      return merge(configTs(ctx), userConfig);
    },
    "@types/typings.d.ts": tsTypings,
  },

  run: (ctx) => {
    const cfgFile = ctx.getConfigFilePath("webpack.config.js");
    const argv = ctx.getConfig("argv", []);

    return ctx.exec("webpack", [].concat(["--config", cfgFile], argv));
  },
};
