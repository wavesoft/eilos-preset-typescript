const path = require('path')

module.exports = (ctx) => {
  // Find the base dir from the entry point(s)
  const entryPoint = ctx.getConfig('entry')
  let includeDirs
  if (typeof (entryPoint) !== 'string') {
    includeDirs = Object.keys(entryPoint).map(key => {
      return path.dirname(entryPoint[key]) + '/**/*'
    })
  } else {
    includeDirs = [path.dirname(entryPoint) + '/**/*']
  }

  return {
    compilerOptions: {
      allowJs: true,
      allowSyntheticDefaultImports: true,
      jsx: 'react',
      module: 'es6',
      noImplicitAny: true,
      outDir: ctx.getDirectory('dist'),
      sourceMap: true,
      target: 'es5'
    },
    include: includeDirs,
    exclude: [
      'node_modules',
      '**/*.spec.ts'
    ]
  }
}
