import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '../components';

export default {
  title: 'Welcome',
  component: Welcome,
};

const Template = (args) => <Welcome {...args} />;

export const ToStorybook = Template.bind({});
ToStorybook.args = {
  showApp: linkTo('Button'),
};
