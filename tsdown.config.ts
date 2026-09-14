import { defineConfig, type UserConfig } from 'tsdown'

export default defineConfig(async () => {
  const packageJson = (
    await import('./package.json', { with: { type: 'json' } })
  ).default
  const {
    bundler: { managerEntries = [], previewEntries = [] },
  } = packageJson

  const commonConfig: UserConfig = {
    clean: false,
    format: 'esm',
    platform: 'browser',
    target: 'esnext',
    treeshake: true,
    deps: {
      neverBundle: ['react', 'react-dom', '@storybook/icons'],
      // TODO remove once https://github.com/algolia/react-element-to-jsx-string/pull/974 ships
      alwaysBundle: ['react-element-to-jsx-string'],
    },
    inputOptions: {
      // TODO remove once https://github.com/algolia/react-element-to-jsx-string/pull/974 ships
      resolve: {
        mainFields: ['module', 'main'],
      },
    },
  }

  const configs: UserConfig[] = []

  if (managerEntries.length) {
    configs.push({
      ...commonConfig,
      entry: managerEntries,
      dts: false,
    })
  }

  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      dts: true,
    })
  }

  return configs
})
