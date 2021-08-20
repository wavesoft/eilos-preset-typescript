import { DefineAction } from "eilos";

import { Config } from "../config";

const Action = DefineAction(Config, {
  useFiles: ["jest.config.js", "tsconfig.json", "@types/typings.d.ts"],
  run: (ctx) => {
    const cfgFile = ctx.getConfigFilePath("jest.config.js");
    const argv = ctx.getOption("argv", []);

    return ctx.exec(
      "jest",
      ([] as string[]).concat(["--config=" + cfgFile], argv)
    );
  },
});

export default Action;
