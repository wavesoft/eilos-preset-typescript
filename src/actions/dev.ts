import { DefineAction } from "eilos";

import { Config } from "../config";

const Action = DefineAction(Config, {
  useFiles: ["webpack.config.js", "tsconfig.json", "@types/typings.d.ts"],
  arguments: {
    stats: {
      defaultValue: false,
      description: "Create a stats report after the build",
      type: "boolean",
    },
  },
  run: (ctx) => {
    const cfgFile = ctx.getConfigFilePath("webpack.config.js");
    const argv = ctx.getOption("argv", []);

    return ctx.exec(
      "webpack-dev-server",
      ([] as string[]).concat(["--config", cfgFile], argv)
    );
  },
});

export default Action;
