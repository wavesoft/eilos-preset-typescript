import { DefinePresetFile } from "eilos";

import { Options } from "../options";

const file = DefinePresetFile(Options, {
  mimeType: "application/javascript",
  generator: (ctx) => {
    const { merge } = ctx.util;
    const userConfig = ctx.getOption("eslint", {});

    // Base 'eslint.config.js' contents
    const BaseConfig = {

    };

    return merge(BaseConfig, userConfig);
  },
});

export default file;
