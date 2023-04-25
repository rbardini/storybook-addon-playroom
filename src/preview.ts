import type { Renderer, ProjectAnnotations } from '@storybook/types'

import { PARAM_KEY } from './constants'
import { withGlobals } from './withGlobals'

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withGlobals],
  globals: {
    [PARAM_KEY]: false,
  },
}

export default preview
