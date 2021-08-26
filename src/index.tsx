/* eslint-disable import/prefer-default-export */
import { createUrl } from 'playroom/utils';
import React, { FC } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import {
  addons,
  makeDecorator,
  WrapperSettings,
  StoryGetter,
  StoryContext,
} from '@storybook/addons';

import { EVENTS, PARAM_KEY } from './constants';
import { getOptions } from './utils';

type Props = {
  getStory: StoryGetter;
  context: StoryContext;
  settings: WrapperSettings;
};

const Story: FC<Props> = ({ getStory, context, settings: { parameters } }) => {
  const { url, code, reactElementToJSXStringOptions } = getOptions(parameters);
  const story = getStory(context);
  const jsxString =
    code || reactElementToJSXString(story, reactElementToJSXStringOptions);
  const channel = addons.getChannel();
  const codeUrl = url && createUrl({ baseUrl: url, code: jsxString });

  channel.emit(EVENTS.UPDATE, codeUrl);

  return <>{story}</>;
};

export const withPlayroom = makeDecorator({
  name: 'withPlayroom',
  parameterName: PARAM_KEY,
  wrapper: (getStory, context, settings) => (
    <Story getStory={getStory} context={context} settings={settings} />
  ),
});
