import {
  DefinePresetConfig,
  DefinePresetOutputFile,
  PresetRuntimeContext as TPresetRuntimeContext,
} from "eilos";
import { Options } from "./options";

import eslitConfig from "./files/eslint.config";
import jestConfig from "./files/jest.config";
import prettierConfig from "./files/prettier.config";
import tsConfig from "./files/tsconfig";
import tsTypings from "./files/tstypings";
import webpackConfigFile from "./files/webpack.config";

/**
 * Complete preset configuration that is used by the actions
 * or by other implementations.
 */
export const Config = DefinePresetConfig({
  options: Options,
  files: {
    "@types/typings.d.ts": tsTypings,
    "eslint.config.js": eslitConfig,
    "jest.config.js": jestConfig,
    "prettier.config.json": prettierConfig,
    "tsconfig.json": tsConfig,
    "webpack.config.js": webpackConfigFile,

    // Output files
    "webpack.stats.json": DefinePresetOutputFile(Options, {
      mimeType: "application/json",
    }),
  },
});

/**
 * Extract the preset's runtime context
 */
export type PresetRuntimeContext = TPresetRuntimeContext<typeof Config>;
