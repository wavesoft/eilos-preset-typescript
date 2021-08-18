import type { ConfigFileContents, RuntimeContext } from "eilos";

export default function (ctx: RuntimeContext): ConfigFileContents {
  return {
    trailingComma: "es5",
    tabWidth: 2,
    semi: true,
    singleQuote: false,
    printWidth: 100,
    useTabs: false,
  };
}
