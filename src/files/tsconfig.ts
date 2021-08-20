import { DefinePresetFile } from "eilos";
import path from "path";

import { Options } from "../options";

const file = DefinePresetFile(Options, {
  mimeType: "application/json",
  generator: (ctx) => {
    const { merge } = ctx.util;
    const userConfig = ctx.getOption("tsconfig", {});

    // Find the base dir from the entry point(s)
    const entryPoint = ctx.getOption("entry");
    let includeDirs: string[];
    if (typeof entryPoint !== "string") {
      includeDirs = Object.keys(entryPoint).map((key) => {
        return path.dirname(entryPoint[key]) + "/**/*";
      });
    } else {
      includeDirs = [path.dirname(entryPoint) + "/**/*"];
    }

    // Base 'tsconfig.json' contents
    const BaseConfig = {
      compilerOptions: {
        allowJs: true,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        resolveJsonModule: true,
        baseUrl: ctx.getDirectory("project"),
        declaration: true,
        importsNotUsedAsValues: "preserve",
        jsx: "react",
        lib: ["dom", "es2018"],
        declarationDir: ctx.getDirectory("dist"),
        module: "es6",
        moduleResolution: "node",
        noImplicitAny: true,
        outDir: ctx.getDirectory("dist"),
        sourceMap: true,
        strict: true,
        target: "es6",
      },
      include: [
        ...Array.from(new Set(includeDirs)),
        path.join(ctx.getConfigFilePath("@types"), "*"),
      ],
      exclude: ["node_modules", "**/*.spec.ts"],
    };

    return merge(BaseConfig, userConfig);
  },
});

export default file;
