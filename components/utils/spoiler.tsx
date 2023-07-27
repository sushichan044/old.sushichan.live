'use client'

import React, { useId, useRef } from 'react'

import styles from '@/components/utils/spoiler.module.scss'
import { toggleBoolString } from '@/utils/string'

const Spoiler = ({ children }: { children: React.ReactNode }) => {
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)
  const contentId = useId()

  const onClick = () => {
    if (!wrapperRef.current || !contentRef.current) {
      return
    }
    const wrapper = wrapperRef.current
    const content = contentRef.current

    wrapper.ariaExpanded = toggleBoolString(wrapper.ariaExpanded, {
      fallbackValue: 'false',
    })
    content.ariaHidden = toggleBoolString(content.ariaHidden, {
      fallbackValue: 'true',
    })
  }

  return (
    <span
      aria-controls={contentId}
      aria-expanded="false"
      aria-label="Spoiler"
      className={styles.root}
      onClick={onClick}
      ref={wrapperRef}
      role="button"
      tabIndex={0}
    >
      <span aria-hidden id={contentId} ref={contentRef}>
        {children}
      </span>
    </span>
  )
}

export default Spoiler
