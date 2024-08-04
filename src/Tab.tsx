import { useGlobals } from '@storybook/manager-api'
import { styled } from '@storybook/theming'
import React, { memo, useState } from 'react'

import { EVENTS, PARAM_KEY } from './constants'

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
  const [globals] = useGlobals()
  const { codeUrl } = globals[PARAM_KEY]

  if (!active) {
    return null
  }

  if (!codeUrl) {
    return <Message>Playroom has been disabled for this story.</Message>
  }

  return <Iframe key={codeUrl} allowFullScreen src={codeUrl} title="Playroom" />
})
