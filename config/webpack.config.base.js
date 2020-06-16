module.exports = (context) => {
  return {
    entry: context.getConfig('entry'),
    mode: context.getMode(),
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                context: context.getDirectory('project'),
                configFile: context.getConfigFilePath('tsconfig.json')
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    output: {
      path: context.getDirectory('dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: context.getDirectory('static')
    }
  }
}
