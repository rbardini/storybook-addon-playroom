import { addons, types } from '@storybook/manager-api'
import React from 'react'

import { ADDON_ID, PARAM_KEY, TAB_ID } from './constants'
import { Tab } from './Tab'

addons.register(ADDON_ID, () => {
  addons.add(TAB_ID, {
    type: types.TAB,
    title: 'Playroom',
    route: ({ storyId }) => `/playroom/${storyId}`,
    match: ({ viewMode }) => viewMode === 'playroom',
    render: ({ active }) => <Tab active={active} />,
    paramKey: PARAM_KEY,
  })
})
