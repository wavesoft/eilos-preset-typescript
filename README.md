# είλως - Typescript Preset

This preset can be used for a typical, modern Typescript project with React.

## Components

* Webpack (5.101)
* Typescript (5.9)
* React (17.0)
* Jest (30.0)
* SASS (1.90)

### Optimisations

In order to speed-up typescript checking, this preset is using:

* `fork-ts-checker-webpack-plugin` for running type-checking in another thread

## Supported Lifecycle Steps

### `build`

```js
{
  ...
  "scripts": {
    "build": "eilos build"
  }
  ...
}
```

Builds your project using [Webpack](https://webpack.js.org/guides/typescript) and the typescript engine.

### `dev`

```js
{
  ...
  "scripts": {
    "dev": "eilos dev"
  }
  ...
}
```

Starts an webpack-dev-server for testing your project locally.


### `test`

```js
{
  ...
  "scripts": {
    "test": "eilos test"
  }
  ...
}
```

Run tests using `jest`
