import { DefinePreset } from "eilos";
import { Options } from "./options";

import buildAction from "./actions/build";
import devAction from "./actions/dev";
import lintAction from "./actions/lint";
import testAction from "./actions/test";

/**
 * Eilos preset configuration
 */
const Preset = DefinePreset({
  options: Options,
  actions: {
    build: buildAction,
    dev: devAction,
    lint: lintAction,
    test: testAction,
  },
});

// Export preset and options (the options allow chaining)
export { Options } from "./options";
export default Preset;
