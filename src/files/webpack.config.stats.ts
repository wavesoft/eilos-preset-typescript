import StatoscopeWebpackPlugin from "@statoscope/webpack-plugin";

import type { ConfigFileContents } from "eilos";
import type { GlobalRuntimeContext } from "../options";

export default function (ctx: GlobalRuntimeContext): ConfigFileContents {
  return {
    plugins: [
      new StatoscopeWebpackPlugin({
        watchMode: true,
      }),
    ],
  };
}
