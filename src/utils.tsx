/* eslint-disable import/prefer-default-export */
import { Args, ArgsStoryFn, StoryFn } from '@storybook/addons';
import { Options as ReactElementToJSXStringOptions } from 'react-element-to-jsx-string';

type Options = {
  url?: string;
  code?: string;
  disable?: boolean;
  reactElementToJSXStringOptions?: ReactElementToJSXStringOptions;
}

type StoryFnWithArgs = ArgsStoryFn & { args?: Args };

export const getOptions = ({
  url = 'http://localhost:9000',
  code = '',
  disable = false,
  reactElementToJSXStringOptions = { sortProps: false },
}: Options = {}): Required<Options> => ({
  url, code, disable, reactElementToJSXStringOptions,
});

export const isStoryFnWithArgs = (storyFn: StoryFn | StoryFnWithArgs): storyFn is StoryFnWithArgs => 'args' in storyFn;
