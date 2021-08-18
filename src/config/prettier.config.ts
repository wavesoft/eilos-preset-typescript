import type { ConfigFileContents } from "eilos";
import type { PresetRuntimeContext } from "../options";

export default function (ctx: PresetRuntimeContext): ConfigFileContents {
  return {
    trailingComma: "es5",
    tabWidth: 2,
    semi: true,
    singleQuote: false,
    printWidth: 100,
    useTabs: false,
  };
}
