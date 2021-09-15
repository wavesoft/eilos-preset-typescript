import { DefinePresetFile } from "eilos";

import { Options } from "../options";

const file = DefinePresetFile(Options, {
  mimeType: "application/json",
  generator: (ctx) => {
    const { merge } = ctx.util;
    const userConfig = ctx.getOption("prettier", {});

    // Base 'prettier.config.js' contents
    const BaseConfig = {
      trailingComma: "es5",
      tabWidth: 2,
      semi: true,
      singleQuote: false,
      printWidth: 100,
      useTabs: false,
    };

    return merge(BaseConfig, userConfig);
  },
});

export default file;
