import { useChannel } from '@storybook/preview-api'
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from '@storybook/types'
import { createUrl } from 'playroom/utils'
import type { ReactElement } from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'

import { EVENTS, PARAM_KEY } from './constants'
import { getOptions } from './utils'

export const withGlobals = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const { parameters } = context
  const playroomConfig = parameters[PARAM_KEY]
  const { url, code, reactElementToJSXStringOptions } =
    getOptions(playroomConfig)
  const story = StoryFn() as ReactElement
  const jsxString =
    code || reactElementToJSXString(story, reactElementToJSXStringOptions)
  const codeUrl = url && createUrl({ baseUrl: url, code: jsxString })

  const emit = useChannel({})
  emit(EVENTS.UPDATE, codeUrl)

  return story
}
