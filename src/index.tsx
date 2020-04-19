/* eslint-disable import/prefer-default-export */
import React, { FC } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import base64Url from 'base64-url';
import {
  addons, makeDecorator, WrapperSettings, StoryGetter, StoryContext,
} from '@storybook/addons';

import { EVENTS, PARAM_KEY } from './constants';

type Props = {
  getStory: StoryGetter;
  context: StoryContext;
  settings: WrapperSettings;
}

const Story: FC<Props> = ({
  getStory,
  context,
  settings: {
    parameters: {
      url = 'http://localhost:9000',
      code,
      disabled = false,
      reactElementToJSXStringOptions = { sortProps: false },
    } = {},
  },
}) => {
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
  allowDeprecatedUsage: true,
  wrapper: (getStory, context, settings) => (
    <Story
      getStory={getStory}
      context={context}
      settings={settings}
    />
  ),
});
