import type { PresetRuntimeContext } from "../config";

/**
 * A very simple webpack plugin that
 */
export class StatsProcessorPlugin {
  private fn: (stats: any, ctx: PresetRuntimeContext) => void;
  private ctx: PresetRuntimeContext;

  constructor(opts: {
    fn: (stats: any, ctx: PresetRuntimeContext) => void;
    ctx: PresetRuntimeContext;
  }) {
    this.fn = opts.fn;
    this.ctx = opts.ctx;
  }

  apply(compiler: any) {
    compiler.hooks.done.tapPromise(
      "StatsProcessorPlugin",
      async (stats: any, callback: any) => {
        const statsJson = stats.toJson();
        await this.fn(statsJson, this.ctx);
      }
    );
  }
}
