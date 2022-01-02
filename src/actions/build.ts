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
    // Configure the dist folder
    const outputDir = ctx.getOption("outputDir", "dist");
    ctx.setDirectory("dist", outputDir);

    const cfgFile = ctx.getConfigFilePath("webpack.config.js");
    const argv = ctx.getOption("argv", []);
    const args: string[] = ["--config", cfgFile];

    return ctx.exec("webpack", args.concat(argv));
  },
});

export default Action;
