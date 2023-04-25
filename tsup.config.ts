import { defineConfig } from 'tsup'

export default defineConfig(options => {
  const isNode = options.platform === 'node'

  return {
    entry: isNode
      ? ['src/generateSnippets.ts']
      : ['src/index.ts', 'src/preview.ts', 'src/manager.ts'],
    splitting: false,
    minify: !options.watch,
    format: ['cjs', 'esm'],
    dts: {
      resolve: true,
    },
    treeshake: true,
    sourcemap: true,
    platform: options.platform ?? 'browser',
    esbuildOptions(options) {
      options.conditions = ['module']
    },
  }
})
