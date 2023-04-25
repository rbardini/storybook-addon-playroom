// Based on https://github.com/storybookjs/storybook/blob/next/addons/storyshots/storyshots-core/src/frameworks/configure.ts
import fs from 'node:fs'
import path from 'node:path'
// @ts-expect-error
import registerRequireContextHook from '@storybook/babel-plugin-require-context-hook/register'
import { normalizeStoriesEntry } from '@storybook/core-common'
import { toRequireContext } from '@storybook/core-webpack'
import { global } from '@storybook/global'
import { ClientApi } from '@storybook/preview-api'
import {
  Addon_Loadable,
  ArgTypesEnhancer,
  ArgsEnhancer,
  DecoratorFunction,
  Renderer,
  StoriesEntry,
} from '@storybook/types'
import { yellow } from 'ansi-colors'
import registerGlobalJSDOM from 'global-jsdom'
import { ReactNode } from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'

import { getOptions } from './utils'

interface ConfigurableClientApi extends ClientApi<Renderer> {
  configure(
    loader: Addon_Loadable,
    module: NodeModule | false,
    showDeprecationWarning?: boolean,
  ): void
}

type Output = {
  preview?: string
  stories?: string[]
}

type Configuration = {
  configDir?: string
}

type Options = {
  outFile: string
}

registerRequireContextHook()
registerGlobalJSDOM()

const storybook = require('@storybook/react') as ConfigurableClientApi

const isFile = (file: string) => {
  try {
    return fs.lstatSync(file).isFile()
  } catch (err) {
    return false
  }
}

const extensions = ['ts', 'tsx', 'js', 'jsx']

const resolveFile = (configDir: string, filenames: string[]) =>
  filenames
    .flatMap(filename =>
      extensions.map(ext => path.join(configDir, `${filename}.${ext}`)),
    )
    .find(isFile) || false

const getPreviewFile = (configDir: string) =>
  resolveFile(configDir, ['preview', 'config'])

const getMainFile = (configDir: string) => resolveFile(configDir, ['main'])

const getConfigPathParts = (input: string): Output => {
  const configDir = path.resolve(input)

  if (fs.lstatSync(configDir).isDirectory()) {
    const output: Output = {}
    const preview = getPreviewFile(configDir)
    const main = getMainFile(configDir)

    if (preview) {
      output.preview = preview
    }

    if (main) {
      const { stories = [] } = require(main).default
      const workingDir = process.cwd()

      output.stories = stories.map((entry: StoriesEntry) => {
        const specifier = normalizeStoriesEntry(entry, {
          configDir,
          workingDir,
        })
        const { path: basePath, recursive, match } = toRequireContext(specifier)

        // @ts-expect-error
        return global.__requireContext(workingDir, basePath, recursive, match)
      })
    }

    return output
  }

  return { preview: configDir }
}

const configure = (options: Configuration) => {
  const { configDir } = options
  const { preview, stories } = getConfigPathParts(configDir)

  if (preview) {
    const {
      parameters,
      decorators,
      globals,
      globalTypes,
      argsEnhancers,
      argTypesEnhancers,
    } = require(preview)

    if (decorators) {
      decorators.forEach((decorator: DecoratorFunction) =>
        storybook.addDecorator(decorator),
      )
    }

    if (parameters || globals || globalTypes) {
      storybook.addParameters({ ...parameters, globals, globalTypes })
    }

    if (argsEnhancers) {
      argsEnhancers.forEach((enhancer: ArgsEnhancer) =>
        storybook.addArgsEnhancer(enhancer),
      )
    }

    if (argTypesEnhancers) {
      argTypesEnhancers.forEach((enhancer: ArgTypesEnhancer) =>
        storybook.addArgTypesEnhancer(enhancer),
      )
    }
  }

  if (stories?.length > 0) {
    storybook.configure(stories, false, false)
  }
}

export default (configDir: string, { outFile }: Options) => {
  configure({
    configDir,
  })

  const snippets = storybook
    .raw()
    .map(({ kind: group, name, storyFn, parameters: { playroom } = {} }) => {
      const { disable, reactElementToJSXStringOptions } = getOptions(playroom)

      if (disable) {
        return undefined
      }

      console.log(`Generating ${yellow([group, name].join('/'))} snippet...`)

      const code = reactElementToJSXString(
        storyFn() as ReactNode,
        reactElementToJSXStringOptions,
      )

      return { group, name, code }
    })
    .filter(Boolean)
  const count = snippets.length

  fs.writeFileSync(
    path.resolve(process.cwd(), outFile),
    JSON.stringify(snippets, null, 2),
  )

  console.log(`\n${count} ${count === 1 ? 'snippet' : 'snippets'} generated.`)
}
