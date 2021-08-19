import { DefinePresetFile } from "eilos";

import { Options } from "../options";

const file = DefinePresetFile(Options, {
  mimeType: "application/javascript",
  generator: (ctx) => {
    const { merge } = ctx.util;
    const userConfig = ctx.getConfig("jest", {});

    // Base 'jest.config.js' contents
    const BaseConfig = {
      preset: "ts-jest",
      testEnvironment: "node",
      rootDir: ctx.getDirectory("project"),
      globals: {
        "ts-jest": {
          tsconfig: ctx.getConfigFilePath("tsconfig.json"),
        },
      },
    };

    return merge(BaseConfig, userConfig);
  },
});

export default file;
