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
    "no-circular": {
      defaultValue: false,
      description:
        "Throws an error if there are circular references on the modules",
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
