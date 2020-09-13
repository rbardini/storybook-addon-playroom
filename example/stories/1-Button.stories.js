import React from 'react';
import { Button } from '@storybook/react/demo';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

const Template = (args) => <Button {...args} />;

export const Text = Template.bind({});
Text.args = {
  children: 'Hello Button',
};

export const Emoji = Template.bind({});
Emoji.args = {
  children: '😀 😎 👍 💯',
};
