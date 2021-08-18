import type { ConfigFileContents, RuntimeContext } from "eilos";

export default function (ctx: RuntimeContext): ConfigFileContents {
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
