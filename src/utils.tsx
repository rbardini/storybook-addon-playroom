import { Options as ReactElementToJSXStringOptions } from 'react-element-to-jsx-string'

type Options = {
  url?: string
  code?: string
  disable?: boolean
  omitCodeDecorators?: boolean
  reactElementToJSXStringOptions?: ReactElementToJSXStringOptions
}

export const getOptions = ({
  url = 'http://localhost:9000',
  code = '',
  disable = false,
  omitCodeDecorators = false,
  reactElementToJSXStringOptions = { sortProps: false },
}: Options = {}): Required<Options> => ({
  url,
  code,
  disable,
  omitCodeDecorators,
  reactElementToJSXStringOptions,
})
