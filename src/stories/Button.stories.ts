import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export default meta

export const Primary: Story = {
  args: {
    primary: true,
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
}
