'use client'

import { Slot } from '@radix-ui/react-slot'
import React, { useState } from 'react'

import { useClipBoard } from '@/lib/hooks/useClipBoard'
import { useTimeout } from '@/lib/hooks/useTimeout'
import type { PropsWithAsChild } from '@/utils/@types/propsAsChild'

type CopyToClipboardProps = {
  textToCopy: string
  childrenBeforeCopy: React.ReactNode
  childrenAfterCopy: React.ReactNode
  title?: string
  timeoutDuration?: number // default: 2 seconds
}

const CopyToClipboard = ({
  textToCopy,
  childrenAfterCopy,
  childrenBeforeCopy,
  title,
  asChild,
  timeoutDuration = 2000,
  ...rest
}: PropsWithAsChild<CopyToClipboardProps, 'button'>) => {
  const [isCopied, setCopied] = useState(false)
  const { copyText } = useClipBoard()
  const Component = asChild ? Slot : 'button'

  // set isCopied to false after 2 seconds
  useTimeout(() => {
    if (isCopied) setCopied(false)
  }, timeoutDuration)

  const onClick = async (e: React.MouseEvent<HTMLElement>) => {
    if (!e.defaultPrevented) {
      console.log(
        'CopyToClipboard: WARNING: default onClick event was not prevented.',
      )
    }
    await copyText(textToCopy)
    setCopied(true)
  }

  return (
    <Component
      onClick={(e) => onClick(e)}
      role="button"
      title={title}
      {...rest}
    >
      {isCopied ? childrenAfterCopy : childrenBeforeCopy}
    </Component>
  )
}

export default CopyToClipboard
