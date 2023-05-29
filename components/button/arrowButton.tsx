import React from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

import styles from '@/components/button/arrow-button.module.scss'
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
      <span className={styles.label}>
        {showBack && <MdArrowBackIosNew size="0.8em" />}
        {children}
        {showForward && <MdArrowForwardIos size="0.8em" />}
      </span>
    </Button>
  )
}
