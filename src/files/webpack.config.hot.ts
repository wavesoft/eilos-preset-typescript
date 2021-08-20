import webpack from "webpack";

import type { ConfigFileContents } from "eilos";
import type { GlobalRuntimeContext } from "../options";

export default function (ctx: GlobalRuntimeContext): ConfigFileContents {
  return {
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      hot: true,
    },
  };
}
