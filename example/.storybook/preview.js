import { addDecorator, addParameters } from '@storybook/react';
import { withPlayroom } from 'storybook-addon-playroom';

addDecorator(withPlayroom); // before any other decorators

addParameters({
  playroom: {
    // Because Playroom is built inside Storybook on this example's deploy,
    // we must define the absolute path to it when NODE_ENV is production,
    // otherwise set undefined to use the default Playroom URL (localhost)
    url: process.env.NODE_ENV === 'production' ? '/playroom/' : undefined,
  },
});
