import { defineConfig, type Options } from 'tsup'
import { readFile } from 'fs/promises'
import { globalPackages as globalManagerPackages } from '@storybook/manager/globals'
import { globalPackages as globalPreviewPackages } from '@storybook/preview/globals'

// The current browsers supported by Storybook v7
const BROWSER_TARGET: Options['target'] = ['chrome100', 'safari15', 'firefox91']
const NODE_TARGET: Options['target'] = ['node18']

type BundlerConfig = {
  bundler?: {
    exportEntries?: string[]
    managerEntries?: string[]
    previewEntries?: string[]
  }
}

export default defineConfig(async options => {
  const packageJson = (await readFile('./package.json', 'utf8').then(
    JSON.parse,
  )) as BundlerConfig

  const {
    bundler: {
      exportEntries = [],
      managerEntries = [],
      previewEntries = [],
    } = {},
  } = packageJson

  const commonConfig: Options = {
    splitting: false,
    minify: !options.watch,
    treeshake: true,
    sourcemap: true,
    clean: true,
  }

  const configs: Options[] = []

  if (exportEntries.length) {
    configs.push({
      ...commonConfig,
      entry: exportEntries,
      dts: { resolve: true },
      format: ['esm', 'cjs'],
      target: [...BROWSER_TARGET, ...NODE_TARGET],
      platform: 'neutral',
      external: [...globalManagerPackages, ...globalPreviewPackages],
    })
  }

  if (managerEntries.length) {
    configs.push({
      ...commonConfig,
      entry: managerEntries,
      format: ['esm'],
      target: BROWSER_TARGET,
      platform: 'browser',
      external: globalManagerPackages,
    })
  }

  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      dts: { resolve: true },
      format: ['esm', 'cjs'],
      target: BROWSER_TARGET,
      platform: 'browser',
      external: globalPreviewPackages,
    })
  }

  return configs
})
