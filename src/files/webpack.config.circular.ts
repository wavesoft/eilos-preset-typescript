const CircularDependencyPlugin = require("circular-dependency-plugin");

import type { ConfigFileContents } from "eilos";
import type { GlobalRuntimeContext } from "../options";

export default function (ctx: GlobalRuntimeContext): ConfigFileContents {
  const root = ctx.getDirectory("project");

  return {
    plugins: [
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: root,
      }),
    ],
  };
}
