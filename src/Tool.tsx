import React from 'react'
import { Button } from 'storybook/internal/components'
import { useGlobals } from 'storybook/manager-api'

import { PARAM_KEY } from './constants'
import { Logo } from './Logo'

export const Tool = () => {
  const [globals] = useGlobals()
  const { codeUrl } = globals[PARAM_KEY] ?? {}

  if (!codeUrl) {
    return null
  }

  return (
    <Button
      asChild
      padding="small"
      variant="ghost"
      ariaLabel="Open in Playroom"
    >
      <a href={codeUrl} target="_blank" rel="noopener noreferrer">
        <Logo />
      </a>
    </Button>
  )
}
