import { DefineAction } from "eilos";

import { Config } from "../config";

const Action = DefineAction(Config, {
  useFiles: ["webpack.config.js", "tsconfig.json", "@types/typings.d.ts"],
  run: (ctx) => {
    const cfgFile = ctx.getConfigFilePath("webpack.config.js");
    const argv = ctx.getConfig("argv", []);

    return ctx.exec(
      "webpack-dev-server",
      ([] as string[]).concat(["--config", cfgFile], argv)
    );
  },
});

export default Action;
