import { type useGlobals } from '@storybook/preview-api'
import { Options as ReactElementToJSXStringOptions } from 'react-element-to-jsx-string'

import { PARAM_KEY } from './constants'

type Options = {
  url?: string
  code?: string
  disable?: boolean
  includeDecorators?: boolean
  reactElementToJSXStringOptions?: ReactElementToJSXStringOptions
}

type Globals = {
  codeUrl?: string
}

type UseGlobals = ReturnType<typeof useGlobals>

export const getOptions = ({
  url = 'http://localhost:9000',
  code = '',
  disable = false,
  includeDecorators = false,
  reactElementToJSXStringOptions = { sortProps: false },
}: Options = {}): Required<Options> => ({
  url,
  code,
  disable,
  includeDecorators,
  reactElementToJSXStringOptions,
})

export const getGlobals = (globals: UseGlobals[0]): Globals =>
  globals[PARAM_KEY]

export const setGlobals = (updateGlobals: UseGlobals[1], globals: Globals) =>
  updateGlobals({ [PARAM_KEY]: globals })
