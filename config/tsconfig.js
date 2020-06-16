const path = require('path')

module.exports = (ctx) => ({
  compilerOptions: {
    outDir: ctx.getDirectory('dist'),
    sourceMap: true
    // noImplicitAny: true,
    // module: 'es6',
    // target: 'es5',
    // jsx: 'react',
    // allowJs: true
  },
  include: [
    path.dirname(ctx.getConfig('entry', './src/index.js')) + '/**/*'
  ],
  exclude: [
    'node_modules',
    '**/*.spec.ts'
  ]
})
