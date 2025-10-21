import { createUrl } from 'playroom'
import type { ReactElement } from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from 'storybook/internal/types'
import { useGlobals } from 'storybook/preview-api'

import { PARAM_KEY } from './constants'
import { getGlobals, getOptions, setGlobals } from './utils'

const updateCodeUrl = (
  [globals, updateGlobals]: ReturnType<typeof useGlobals>,
  codeUrl: string | undefined,
) =>
  getGlobals(globals).codeUrl !== codeUrl &&
  setGlobals(updateGlobals, { codeUrl })

export const withGlobals = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const globals = useGlobals()
  const { parameters, undecoratedStoryFn } = context
  const {
    url,
    code,
    disable,
    includeDecorators,
    reactElementToJSXStringOptions,
  } = getOptions(parameters[PARAM_KEY])

  const story = StoryFn() as ReactElement

  if (disable) {
    updateCodeUrl(globals, undefined)
    return story
  }

  const storyCode = includeDecorators
    ? story
    : (undecoratedStoryFn(context) as ReactElement)
  const jsxString =
    code || reactElementToJSXString(storyCode, reactElementToJSXStringOptions)
  const codeUrl = url && createUrl({ baseUrl: url, code: jsxString })

  updateCodeUrl(globals, codeUrl)
  return story
}
