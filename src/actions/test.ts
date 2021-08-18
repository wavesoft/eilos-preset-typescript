import { DefineAction } from "eilos";

import { Options } from "../options";
import configJest from "../config/jest.config";
import configTs from "../config/tsconfig";
import tsTypings from "../config/tstypings";

const Action = DefineAction(Options, {
  files: {
    "jest.config.js": (ctx) => {
      const { merge } = ctx.util;
      const userConfig = ctx.getConfig("jest", {});

      return merge(configJest(ctx), userConfig);
    },
    "tsconfig.json": (ctx) => {
      const { merge } = ctx.util;
      const userConfig = ctx.getConfig("tsconfig", {});

      return merge(configTs(ctx), userConfig);
    },
    "@types/typings.d.ts": tsTypings,
  },

  run: (ctx) => {
    const cfgFile = ctx.getConfigFilePath("jest.config.js");
    const argv = ctx.getConfig("argv", []);

    return ctx.exec("jest", [].concat(["--config=" + cfgFile], argv));
  },
});

export default Action;
