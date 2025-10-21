import React from 'react'
import { addons, types } from 'storybook/manager-api'

import { ADDON_ID, PARAM_KEY, TAB_ID } from './constants'
import { Tab } from './Tab'

addons.register(ADDON_ID, () => {
  addons.add(TAB_ID, {
    type: types.TAB,
    title: 'Playroom',
    render: ({ active }) => <Tab active={!!active} />,
  })
})
