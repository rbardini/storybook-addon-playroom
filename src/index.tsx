/* eslint-disable import/prefer-default-export */
import { createUrl } from 'playroom/utils';
import React, { FC, ReactElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import {
  addons,
  makeDecorator,
  WrapperSettings,
  LegacyStoryFn,
  StoryContext,
} from '@storybook/addons';

import { EVENTS, PARAM_KEY } from './constants';
import { getOptions } from './utils';

type Props = {
  storyFn: LegacyStoryFn;
  context: StoryContext;
  settings: WrapperSettings;
};

const Story: FC<Props> = ({ storyFn, context, settings: { parameters } }) => {
  const { url, code, reactElementToJSXStringOptions } = getOptions(parameters);
  const story = storyFn(context) as ReactElement;
  const jsxString =
    code || reactElementToJSXString(story, reactElementToJSXStringOptions);
  const channel = addons.getChannel();
  const codeUrl = url && createUrl({ baseUrl: url, code: jsxString });

  channel.emit(EVENTS.UPDATE, codeUrl);

  return story;
};

export const withPlayroom = makeDecorator({
  name: 'withPlayroom',
  parameterName: PARAM_KEY,
  wrapper: (storyFn, context, settings) => (
    <Story storyFn={storyFn} context={context} settings={settings} />
  ),
});
