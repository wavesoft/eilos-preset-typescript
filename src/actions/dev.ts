import { DefineAction } from "eilos";

import configWebpackBase from "../config/webpack.config.base";
import configWebpackHot from "../config/webpack.config.hot";
import configTs from "../config/tsconfig";
import tsTypings from "../config/tstypings";
import { Options } from "../options";

const Action = DefineAction(Options, {
  files: {
    "webpack.config.js": (ctx) => {
      const { merge } = ctx.util;
      const userConfig = ctx.getConfig("webpack", {});

      // Enable hot module replacement if requested
      let config = configWebpackBase(ctx);
      if (ctx.getConfig("hot")) {
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

    return ctx.exec(
      "webpack-dev-server",
      [].concat(["--config", cfgFile], argv)
    );
  },
});

export default Action;
