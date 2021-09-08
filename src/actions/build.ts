import path from "path";
import bytes from "bytes";
import { DefineAction } from "eilos";

import { Config } from "../config";

const Action = DefineAction(Config, {
  useFiles: ["webpack.config.js", "tsconfig.json", "@types/typings.d.ts"],
  run: (ctx) => {
    const cfgFile = ctx.getConfigFilePath("webpack.config.js");
    const argv = ctx.getOption("argv", []);
    const args: string[] = ["--config", cfgFile];

    // If we have advanced chunk splitting enabled, then collect stats.json
    const collect = ctx.getOption("advancedChunkSplitting", false);
    if (collect) {
      const statsFile = ctx.getConfigFilePath("webpack.stats.json");
      args.push(`--json="${statsFile}"`);
    }

    return ctx.exec("webpack", args.concat(argv));
  },

  postRun: async (ctx) => {
    // If we have advanced chunk splitting enabled we should post-process
    // the produced chunks using an advanced splittung function
    const chunkSplitModule = ctx.getOption("advancedChunkSplitting", false);
    if (chunkSplitModule) {
      ctx.logger.debug(
        `Loading stats from ${ctx.getConfigFilePath("webpack.stats.json")}`
      );

      // Load the stats file contents
      const json: any = JSON.parse(
        await (await ctx.getConfigFileContents("webpack.stats.json")).toString()
      );

      // Since when using --json with webpack we are overriding the output
      // generation, we must print the generated result for the user to see
      for (const key in json.entrypoints) {
        const entry = json.entrypoints[key];
        ctx.logger.info(
          `Entrypoint ${key} ${bytes(entry.assetsSize)} (${
            entry.assets.length
          }+${entry.auxiliaryAssets.length} assets)`
        );

        for (const chunkId of entry.chunks) {
          const chunkInfo = (entry.chunks as any[]).find(
            (c) => c.id === chunkId
          ) || { modules: [], size: 0 };

          ctx.logger.info(
            `  - ${chunkId} ${bytes(chunkInfo.size)} (${
              chunkInfo.modules.length
            } modules)`
          );
        }
        ctx.logger.info("");
      }

      // Post-process the chunk information
      if (typeof chunkSplitModule === "string") {
        // Lcoate the full path to the module file, relative to the project root
        let fullPath = path.resolve(
          ctx.getDirectory("project"),
          chunkSplitModule
        );

        // Source module and run
        ctx.logger.debug(`Post-processing chunks using ${fullPath}`);
        const fn = require(fullPath);
        await fn(json);
      }
    }
  },
});

export default Action;
