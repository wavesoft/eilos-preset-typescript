import type { ConfigFileContents } from "eilos";
import type { PresetRuntimeContext } from "../options";

export default function (ctx: PresetRuntimeContext): ConfigFileContents {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: ctx.getDirectory("project"),
    globals: {
      "ts-jest": {
        tsconfig: ctx.getConfigFilePath("tsconfig.json"),
      },
    },
  };
}
