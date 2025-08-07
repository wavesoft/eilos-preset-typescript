import { DefinePresetFile } from "eilos";
import path from "path";

import { Options } from "../options";

const file = DefinePresetFile(Options, {
  mimeType: "application/json",
  generator: (ctx) => {
    const { merge } = ctx.util;
    const userConfig = ctx.getOption("tsconfig", {});
    const projectDir = ctx.getDirectory("project");

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

    // Convert relative to absolute URLs
    includeDirs = includeDirs.map((dir) => {
      if (!dir.startsWith("./")) return dir;
      return path.join(projectDir, dir.substring(1));
    });

    // Include possibly additional source directories
    const sourceDirs = ctx.getOption("sourceDirs");
    includeDirs = sourceDirs.reduce(
      (dirs, dir) =>
        dirs.concat(ctx.getAbsolutePathFromDirectory("project", dir)),
      includeDirs
    );

    // Base 'tsconfig.json' contents
    const BaseConfig = {
      compilerOptions: {
        allowJs: true,
        allowSyntheticDefaultImports: true,
        baseUrl: projectDir,
        declaration: true,
        declarationDir: ctx.getDirectory("dist"),
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        jsx: "react",
        lib: ["dom", "esnext"],
        module: ctx.getOption("advancedChunkSplitting") ? "esnext" : "es6",
        moduleResolution: "node",
        noImplicitAny: true,
        outDir: ctx.getDirectory("dist"),
        resolveJsonModule: true,
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
