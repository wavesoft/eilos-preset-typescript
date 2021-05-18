module.exports = {
  _actions: {
    build: require("./actions/build"),
    test: require("./actions/test"),
    dev: require("./actions/dev"),
    lint: require("./actions/lint"),
  },

  //////////////////////////////////////////////////////////////////////
  // Global configuration options
  //////////////////////////////////////////////////////////////////////

  options: {
    /**
     * Enable hot module loading
     */
    hot: false,
  },

  //////////////////////////////////////////////////////////////////////
  // Common configuration options
  //////////////////////////////////////////////////////////////////////

  /**
   * The entry point(s) to the project sources
   *
   * ---
   * entry: "path/to/file.js";      // Build a single-target project
   * ---
   * entry: {                       // Build multiple targets
   *  build_a: "path/to/a.js",
   *  build_b: "path/to/b.js",
   * }
   * ---
   */
  entry: "./src/index.ts",

  /**
   * Defines weather to build a library project
   *
   * ---
   * library: null;                 // Do not build a library
   * ---
   * library: "name";               // Build a library with the given name
   * ---
   */
  library: false,

  /**
   * The output filename
   */
  output: "[id].js",

  //////////////////////////////////////////////////////////////////////
  // Custom resource linking
  //////////////////////////////////////////////////////////////////////

  /**
   * Indicates the resources that are external to the project and must be
   * referred to using require() and/or DLL
   */
  externals: [],

  /**
   * An array of `node_module` modules to include in the processing chain
   * when resolving.
   */
  sourceModules: [],

  //////////////////////////////////////////////////////////////////////
  // Custom component configuration
  //////////////////////////////////////////////////////////////////////

  /**
   * Custom webpack configuration
   */
  webpack: {},

  /**
   * Custom tsconfig configuration
   */
  tsconfig: {},

  /**
   * Custom jest configuration
   */
  jest: {},
};
