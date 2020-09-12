/* eslint-disable import/prefer-default-export */
import React, { FC } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import base64Url from 'base64-url';
import {
  addons, makeDecorator, WrapperSettings, StoryGetter, StoryContext,
} from '@storybook/addons';

import { EVENTS, PARAM_KEY } from './constants';
import { getOptions } from './utils';

type Props = {
  getStory: StoryGetter;
  context: StoryContext;
  settings: WrapperSettings;
}

const Story: FC<Props> = ({
  getStory,
  context,
  settings: {
    parameters,
  },
}) => {
  const {
    url, code, disabled, reactElementToJSXStringOptions,
  } = getOptions(parameters);
  const story = getStory(context);
  const jsxString = code || reactElementToJSXString(story, reactElementToJSXStringOptions);
  const channel = addons.getChannel();
  const codeUrl = url && `${url}#?code=${base64Url.encode(jsxString)}`;

  channel.emit(EVENTS.UPDATE, codeUrl, disabled);

  return <>{story}</>;
};

export const withPlayroom = makeDecorator({
  name: 'withPlayroom',
  parameterName: PARAM_KEY,
  wrapper: (getStory, context, settings) => (
    <Story
      getStory={getStory}
      context={context}
      settings={settings}
    />
  ),
});
