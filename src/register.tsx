import React from 'react';
import { addons, types } from '@storybook/addons';

import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants';
import Panel from './Panel';

addons.register(ADDON_ID, () => {
  const channel = addons.getChannel();

  addons.add(PANEL_ID, {
    title: 'Playroom',
    type: types.TAB,
    route: ({ storyId }) => `/playroom/${storyId}`,
    match: ({ viewMode }) => viewMode === 'playroom',
    render: ({ active }) => (
      <Panel active={active} channel={channel} />
    ),
    paramKey: PARAM_KEY,
  });
});
