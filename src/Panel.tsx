import React, { FC, useEffect, useState } from 'react';
import { AddonStore, Listener } from '@storybook/addons';
import { styled } from '@storybook/theming';

import { EVENTS } from './constants';

type Props = {
  active: boolean;
  channel: ReturnType<AddonStore['getChannel']>;
}

const Message = styled.p({
  textAlign: 'center',
});

const Iframe = styled.iframe({
  border: '0 none',
  height: '100%',
  width: '100%',
});

const Panel: FC<Props> = ({ active, channel }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const listener: Listener = (newUrl: string) => setUrl(newUrl);

    channel.on(EVENTS.UPDATE, listener);

    return () => channel.off(EVENTS.UPDATE, listener);
  }, [channel]);

  if (!active) {
    return null;
  }

  if (!url) {
    return (
      <Message>
        Playroom has been disabled for this story.
      </Message>
    );
  }

  return (
    <Iframe key={url} allowFullScreen src={url} title="Playroom" />
  );
};

export default Panel;
