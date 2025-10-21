import { defineMain } from '@storybook/react-vite/node'
import { mergeConfig } from 'vite'

const config = defineMain({
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['./local-preset.cjs'],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    return mergeConfig(config, {
      build: { minify: false },
    })
  },
})

export default config
