import React from 'react'

export const Logo = ({ size = 14 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    focusable="false"
    aria-hidden
  >
    <path d="M0 100V0L20.5 10.25V89.75L0 100Z" fill="currentColor" />
    <path
      d="M80 40L100 50L80 60L40.5 79.75V59.75L60 50L40.5 40.25V20.25L80 40Z"
      fill="currentColor"
    />
  </svg>
)
