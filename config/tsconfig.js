const path = require("path");

module.exports = (ctx) => {
  // Find the base dir from the entry point(s)
  const entryPoint = ctx.getConfig("entry");
  let includeDirs;
  if (typeof entryPoint !== "string") {
    includeDirs = Object.keys(entryPoint).map((key) => {
      return path.dirname(entryPoint[key]) + "/**/*";
    });
  } else {
    includeDirs = [path.dirname(entryPoint) + "/**/*"];
  }

  return {
    compilerOptions: {
      allowJs: true,
      allowSyntheticDefaultImports: true,
      noImplicitAny: true,
      jsx: "react",
      module: "es6",
      target: "es5",
      sourceMap: true,
      outDir: ctx.getDirectory("dist"),
      baseUrl: ctx.getDirectory("project"),
      importsNotUsedAsValues: "preserve",
    },
    include: [
      ...new Set(includeDirs),
      path.join(ctx.getConfigFilePath("@types"), "*"),
    ],
    exclude: ["node_modules", "**/*.spec.ts"],
  };
};
