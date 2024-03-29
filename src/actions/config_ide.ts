import { DefineAction, RuntimeContext } from "eilos";
import fs from "fs";
import path from "path";
import util from "util";

import { Config } from "../config";

const fsReadFile = util.promisify(fs.readFile);
const fsWriteFile = util.promisify(fs.writeFile);
const fsMkdir = util.promisify(fs.mkdir);

async function updateGitignore(
  ctx: RuntimeContext,
  path: string,
  line: string
) {
  const gitignoreLines: string[] = fs.existsSync(path)
    ? await (await fsReadFile(path)).toString().split("\n")
    : [];

  const exists = gitignoreLines.includes(line);
  if (!exists) {
    ctx.logger.silly(`Adding '${line}' on gitignore at ${path}`);
    gitignoreLines.push(line);
    await fsWriteFile(path, gitignoreLines.join("\n"));
  }
}

const Action = DefineAction(Config, {
  description: "Creates sub-component configuration files for use by the IDE",
  run: async (ctx) => {
    const dProject = ctx.getDirectory("project");
    const dIde = path.join(dProject, ".ide");
    const dTypes = path.join(dIde, "types");

    const fTsconfigJson = path.join(dProject, "tsconfig.json");
    const fEslintrc = path.join(dProject, ".eslintrc.js");
    const fPrettierrc = path.join(dProject, ".prettierrc");
    const fJestConfigJs = path.join(dProject, "jest.config.js");
    const fGitignore = path.join(dProject, ".gitignore");
    const fTypings = path.join(dTypes, "typings.d.ts");

    // We are first going to override the expected file locations, so they
    // are correctly cross-referrence when their contents are later used
    ctx.setConfigFilePath("tsconfig.json", fTsconfigJson);
    ctx.setConfigFilePath("eslint.config.js", fEslintrc);
    ctx.setConfigFilePath("prettier.config.json", fPrettierrc);
    ctx.setConfigFilePath("jest.config.js", fJestConfigJs);

    // This is used by tsconfig.json to figure out where are the dynamic typings
    ctx.setConfigFilePath("@types" as any, dTypes);
    ctx.logger.debug(`Creating ${dTypes} directory`);
    await fsMkdir(dTypes, { recursive: true });

    // Write files
    ctx.logger.info(`Writing ${fTsconfigJson}`);
    await fsWriteFile(
      fTsconfigJson,
      await ctx.getConfigFileContents("tsconfig.json")
    );
    ctx.logger.info(`Writing ${fEslintrc}`);
    await fsWriteFile(
      fEslintrc,
      await ctx.getConfigFileContents("eslint.config.js")
    );
    ctx.logger.info(`Writing ${fPrettierrc}`);
    await fsWriteFile(
      fPrettierrc,
      await ctx.getConfigFileContents("prettier.config.json")
    );
    ctx.logger.info(`Writing ${fJestConfigJs}`);
    await fsWriteFile(
      fJestConfigJs,
      await ctx.getConfigFileContents("jest.config.js")
    );
    ctx.logger.info(`Writing ${fTypings}`);
    await fsWriteFile(
      fTypings,
      await ctx.getConfigFileContents("@types/typings.d.ts")
    );

    // Update gitignore
    ctx.logger.info(`Updating .gitignore`);
    await updateGitignore(ctx, fGitignore, "tsconfig.json");
    await updateGitignore(ctx, fGitignore, ".eslintrc.js");
    await updateGitignore(ctx, fGitignore, ".prettierrc");
    await updateGitignore(ctx, fGitignore, "jest.config.js");
    await updateGitignore(ctx, fGitignore, ".ide");
  },
});

export default Action;
