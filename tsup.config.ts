import { defineConfig, type Options } from 'tsup'

export default defineConfig(async options => {
  const packageJson = (
    await import('./package.json', { with: { type: 'json' } })
  ).default
  const {
    bundler: { managerEntries = [], previewEntries = [] },
  } = packageJson

  const commonConfig: Options = {
    clean: false,
    format: ['esm'],
    treeshake: true,
    splitting: true,
    external: ['react', 'react-dom', '@storybook/icons'],
  }

  const configs: Options[] = []

  if (managerEntries.length) {
    configs.push({
      ...commonConfig,
      entry: managerEntries,
      platform: 'browser',
      target: 'esnext',
    })
  }

  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      platform: 'browser',
      target: 'esnext',
      dts: true,
    })
  }

  return configs
})
