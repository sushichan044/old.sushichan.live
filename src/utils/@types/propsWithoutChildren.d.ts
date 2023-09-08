import React from 'react'

export type PropsWithoutChildren<T extends React.ComponentPropsWithoutRef> =
  Omit<T, 'children'>
