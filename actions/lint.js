const configPrettier = require("../config/prettier.config");
const configEslint = require("../config/eslint.config");

function runPrettier(ctx, argv) {
  // Get file patterns to match from `options` or use the default pattern
  let prettier_file_patterns;
  const options = ctx.getConfig("options");
  if (options.prettier_file_patterns && options.prettier_file_patterns.length) {
    prettier_file_patterns = options.prettier_file_patterns;
  } else {
    prettier_file_patterns = ["src/**/*.js", "src/**/*.ts", "**/*.md"];
  }

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
    ctx.logger.error("Unknown option: " + argv);
    return;
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
    [].concat(
      [prettier_action, "--config", cfgFile, prettier_file_patterns].flat(),
      argv
    )
  );
}

function runEslint(ctx) {
  // Make sure there aren't any options that we are ignoring or that we don't know about

  // Search the directory tree for .prettierrc and use the one provided by eilos if we can't find it
  let eslintrcFile;
  try {
    eslintrcFile = ctx.resolveFilePath(".eslintrc.js");
    ctx.logger.debug("eslint configuration file from: ", eslintrcFile);
  } catch (e) {
    eslintrcFile = ctx.getConfigFilePath("eslint.config.json");
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

module.exports = {
  files: {
    "eslint.config.json": (ctx) => {
      const { merge } = ctx.util;
      const userConfig = ctx.getConfig("eslint", {});

      return merge(configEslint(ctx), userConfig);
    },
    "prettier.config.json": (ctx) => {
      const { merge } = ctx.util;
      const userConfig = ctx.getConfig("prettier", {});

      return merge(configPrettier(ctx), userConfig);
    },
  },

  run: (ctx) => {
    let argv = ctx.getConfig("argv", []);

    if (argv[0] === "prettier") {
      argv.shift();
      return runPrettier(ctx, argv);
    }

    if (argv[0] === "eslint") {
      argv.shift();
      return runEslint(ctx);
    }

    if (argv[0] === "all") {
      argv.shift();
      return runPrettier(ctx, argv).then(() => runEslint(ctx));
    }
  },
};
