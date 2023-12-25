import { useChannel } from '@storybook/manager-api'
import { styled } from '@storybook/theming'
import React, { memo, useState } from 'react'

import { EVENTS } from './constants'

interface TabProps {
  active: boolean
}

const Message = styled.p({
  textAlign: 'center',
})

const Iframe = styled.iframe({
  border: '0 none',
  height: '100%',
  width: '100%',
})

export const Tab = memo<TabProps>(({ active }) => {
  const [url, setUrl] = useState('')
  useChannel({ [EVENTS.UPDATE]: setUrl })

  if (!active) {
    return null
  }

  if (!url) {
    return <Message>Playroom has been disabled for this story.</Message>
  }

  return <Iframe key={url} allowFullScreen src={url} title="Playroom" />
})
