import preview from '../../.storybook/preview'

import { Button } from './Button'

const meta = preview.meta({
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
})

export const Primary = meta.story({
  args: {
    primary: true,
    children: 'Button',
  },
})

export const Secondary = meta.story({
  args: {
    children: 'Button',
  },
})

export const Large = meta.story({
  args: {
    size: 'large',
    children: 'Button',
  },
})

export const Small = meta.story({
  args: {
    size: 'small',
    children: 'Button',
  },
})
