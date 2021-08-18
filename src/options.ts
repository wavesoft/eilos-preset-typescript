import { DefinePresetOptions } from "eilos";

/**
 * User-configurable options for this preset
 */
export const Options = DefinePresetOptions({
  hot: {
    defaultValue: false,
    description: "Enable hot module loading in the emitted source",
    schema: {
      type: "boolean",
    },
  },
  embedAssets: {
    defaultValue: false,
    description:
      "Enable this flag to embed all assets as base64 blobs into the bundle",
    schema: {
      type: "boolean",
    },
  },

  entry: {
    defaultValue: "./src/index.ts",
    description: "The entry point(s) to the project sources",
    schema: [
      {
        type: "string",
      },
      {
        elements: {
          type: "string",
        },
      },
    ],
  },

  library: {
    defaultValue: false,
    description:
      "When set to string instead of 'false', will build a library bundle",
    schema: [
      {
        type: "string",
      },
      {
        type: "boolean",
        enum: [false],
      },
    ],
  },

  output: {
    defaultValue: "[id].js",
    description: "The name of the output bundle",
    schema: {
      type: "string",
    },
  },

  outputDir: {
    defaultValue: "./dist",
    description: "The directory were to emit the output bundle",
    schema: {
      type: "string",
    },
  },

  externals: {
    defaultValue: [],
    description:
      "Indicates the resources that are external to the project and must be referred to using UMD",
    schema: {
      type: "string",
    },
  },

  sourceModules: {
    defaultValue: [],
    description:
      "An array of packages from 'node_module' modules to include in the processing chain when resolving. " +
      "This is useful when sourcing a typescript source package that must be pre-processed.",
    schema: {
      type: "string",
    },
  },

  //////////////////////////////////////
  // Deprecated parameters
  //////////////////////////////////////
  webpack: {
    defaultValue: {},
    deprecated:
      "You should never override this configuration, instead you should create a custom preset for your needs",
    description: "Arbitrary configuration to forward to webpack as-is",
    schema: {
      properties: {},
      additionalProperties: true,
    },
  },
  tsconfig: {
    defaultValue: {},
    deprecated:
      "You should never override this configuration, instead you should create a custom preset for your needs",
    description: "Arbitrary configuration to forward to typescript as-is",
    schema: {
      properties: {},
      additionalProperties: true,
    },
  },
  jest: {
    defaultValue: {},
    deprecated:
      "You should never override this configuration, instead you should create a custom preset for your needs",
    description: "Arbitrary configuration to forward to jest as-is",
    schema: {
      properties: {},
      additionalProperties: true,
    },
  },
  eslint: {
    defaultValue: {},
    deprecated:
      "You should never override this configuration, instead you should create a custom preset for your needs",
    description: "Arbitrary configuration to forward to eslint as-is",
    schema: {
      properties: {},
      additionalProperties: true,
    },
  },
  prettier: {
    defaultValue: {},
    deprecated:
      "You should never override this configuration, instead you should create a custom preset for your needs",
    description: "Arbitrary configuration to forward to prettier as-is",
    schema: {
      properties: {},
      additionalProperties: true,
    },
  },
});
