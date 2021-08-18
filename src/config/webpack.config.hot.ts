import type { ConfigFileContents, RuntimeContext } from "eilos";
import webpack from "webpack";

export default function (ctx: RuntimeContext): ConfigFileContents {
  return {
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      hot: true,
    },
  };
}
