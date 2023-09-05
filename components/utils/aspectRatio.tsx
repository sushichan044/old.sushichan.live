'use client'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import { useMediaQuery } from 'react-responsive'

type Props = {
  query: string
  aspectRatio: {
    default: React.CSSProperties['aspectRatio']
    matchQuery: React.CSSProperties['aspectRatio']
  }
  children: React.ReactNode
}

const AspectRatio = ({ query, aspectRatio, children }: Props) => {
  const queryResult = useMediaQuery({ query: query })

  return (
    <Slot
      style={{
        aspectRatio: queryResult ? aspectRatio.matchQuery : aspectRatio.default,
      }}
    >
      {children}
    </Slot>
  )
}

export default AspectRatio
