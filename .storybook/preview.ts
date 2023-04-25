import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    playroom: {
      // Because Playroom is built inside Storybook on this example's deploy,
      // we must define the absolute path to it when NODE_ENV is production,
      // otherwise set undefined to use the default Playroom URL (localhost)
      url: process.env.NODE_ENV === 'production' ? '/playroom/' : undefined,
    },
  },
}

export default preview
