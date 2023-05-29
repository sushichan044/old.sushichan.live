import React from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

import Button, { ButtonProps } from '@/components/common/button'

type ArrowButtonProps = {
  showBackArrow?: boolean
  showForwardArrow?: boolean
} & ButtonProps

export default function ArrowButton({
  children,
  onClick,
  style,
  showBackArrow: showBack,
  showForwardArrow: showForward,
}: ArrowButtonProps) {
  return (
    <Button onClick={onClick} style={style}>
      {showBack && <MdArrowBackIosNew />}
      {children}
      {showForward && <MdArrowForwardIos />}
    </Button>
  )
}
