import { DefinePreset, PresetUserConfig } from "eilos";
import { Config } from "./config";

import buildAction from "./actions/build";
import devAction from "./actions/dev";
import lintAction from "./actions/lint";
import testAction from "./actions/test";
import configIdeAction from "./actions/config_ide";

/**
 * Eilos preset configuration
 */
const Preset = DefinePreset({
  engineVersion: "1.x",
  config: Config,
  actions: {
    build: buildAction,
    dev: devAction,
    lint: lintAction,
    test: testAction,
    "config-ide": configIdeAction,
  },
});

// Export preset and options (the options allow chaining)
export { Config } from "./config";
export type UserConfig = PresetUserConfig<typeof Config>;
export default Preset;
