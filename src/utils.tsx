/* eslint-disable import/prefer-default-export */
type Options = {
  url?: string;
  code?: string;
  disabled?: boolean;
  reactElementToJSXStringOptions?: object;
}

export const getOptions = ({
  url = 'http://localhost:9000',
  code,
  disabled = false,
  reactElementToJSXStringOptions = { sortProps: false },
}: Options = {}) => ({
  url, code, disabled, reactElementToJSXStringOptions,
});
