const configJest = require("../config/jest.config");
const configTs = require("../config/tsconfig");
const tsTypings = require("../config/tstypings");

module.exports = {
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
};
