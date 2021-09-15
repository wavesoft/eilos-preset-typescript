import { DefineAction } from "eilos";

import { Config } from "../config";
import type { PresetRuntimeContext } from "../config";

function runPrettier(ctx: PresetRuntimeContext, argv: string[]) {
  // Get file patterns to match from `options` or use the default pattern
  const prettier_file_patterns = ctx.getOption("prettierFilePatterns");

  // Determine the prettier action that we want to take. It can either be `check` or `write`. We default to
  // `--check`
  let prettier_action = "--check";
  if (argv[0] === "check") {
    prettier_action = "--check";
    argv.pop();
  } else if (argv[0] === "write") {
    prettier_action = "--write";
    argv.pop();
  }

  // Make sure there aren't any options that we are ignoring or that we don't know about
  if (argv.length) {
    throw new TypeError(`Unknown prettier option: ${argv}`);
  }

  // Search the directory tree for .prettierrc and use the one provided by eilos if we can't find it
  let cfgFile;
  try {
    cfgFile = ctx.resolveFilePath(".prettierrc");
    ctx.logger.debug("Prettier configuration from: " + cfgFile);
  } catch (e) {
    cfgFile = ctx.getConfigFilePath("prettier.config.json");
    ctx.logger.debug("Prettier configuration from eilos: " + cfgFile);
  }

  return ctx.exec(
    "prettier",
    ([] as string[]).concat(
      [prettier_action, "--config", cfgFile, prettier_file_patterns].flat(),
      argv
    )
  );
}

function runEslint(ctx: PresetRuntimeContext) {
  // Make sure there aren't any options that we are ignoring or that we don't know about

  // Search the directory tree for .prettierrc and use the one provided by eilos if we can't find it
  let eslintrcFile;
  try {
    eslintrcFile = ctx.resolveFilePath(".eslintrc.js");
    ctx.logger.debug("eslint configuration file from: ", eslintrcFile);
  } catch (e) {
    eslintrcFile = ctx.getConfigFilePath("eslint.config.js");
    ctx.logger.debug("eslint configuration file from eilos: ", eslintrcFile);
  }

  let eslintIgnoreFile;
  try {
    eslintIgnoreFile = ctx.resolveFilePath(".eslintignore");
    ctx.logger.debug("eslint configuration file from: ", eslintrcFile);
  } catch {}

  let eslintArgs = ["--config", eslintrcFile];

  if (eslintIgnoreFile) {
    eslintArgs = eslintArgs.concat(["--ignore-path", eslintIgnoreFile]);
  }

  eslintArgs.push(".");

  return ctx.exec("eslint", eslintArgs);
}

const Action = DefineAction(Config, {
  useFiles: ["eslint.config.js", "prettier.config.json", "tsconfig.json"],
  run: async (ctx) => {
    let argv = ctx.getOption("argv", []);

    if (argv[0] === "prettier") {
      argv.shift();
      await runPrettier(ctx, argv);
    }

    if (argv[0] === "eslint") {
      argv.shift();
      await runEslint(ctx);
    }

    if (argv[0] === "all") {
      argv.shift();
      await runPrettier(ctx, argv).then(() => runEslint(ctx));
    }
  },
});

export default Action;
