import { DefinePresetFile } from "eilos";

import { Options } from "../options";

const file = DefinePresetFile(Options, {
  mimeType: "application/json",
  generator: (ctx) => {
    const { merge } = ctx.util;
    const userConfig = ctx.getConfig("eslint", {});

    // Base 'eslint.config.json' contents
    const BaseConfig = {};

    return merge(BaseConfig, userConfig);
  },
});

export default file;
