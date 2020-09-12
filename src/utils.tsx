/* eslint-disable import/prefer-default-export */
import { Options as ReactElementToJSXStringOptions } from 'react-element-to-jsx-string';

type Options = {
  url?: string;
  code?: string;
  disabled?: boolean;
  reactElementToJSXStringOptions?: ReactElementToJSXStringOptions;
}

export const getOptions = ({
  url = 'http://localhost:9000',
  code = '',
  disabled = false,
  reactElementToJSXStringOptions = { sortProps: false },
}: Options = {}): Required<Options> => ({
  url, code, disabled, reactElementToJSXStringOptions,
});
