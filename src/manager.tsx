import React from 'react'
import { addons, types } from 'storybook/manager-api'

import { ADDON_ID, TOOL_ID } from './constants'
import { Tool } from './Tool'

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    title: 'Playroom',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: Tool,
  })
})
