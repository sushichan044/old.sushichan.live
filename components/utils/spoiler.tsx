'use client'

import React, { useId, useRef } from 'react'

import styles from '@/components/utils/spoiler.module.scss'
import { parseBoolean } from '@/utils/string'

const Spoiler = ({ children }: { children: React.ReactNode }) => {
  const contentId = useId()
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)

  const onClick = () => {
    if (!wrapperRef.current || !contentRef.current) {
      return
    }
    const wrapper = wrapperRef.current
    const content = contentRef.current

    wrapper.ariaExpanded = (!parseBoolean(wrapper.ariaExpanded)).toString()
    content.ariaHidden = (!parseBoolean(content.ariaHidden)).toString()
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
      title="クリックして表示/非表示を切り替え"
    >
      <span
        aria-hidden
        className={styles.content}
        id={contentId}
        ref={contentRef}
      >
        {children}
      </span>
    </span>
  )
}

export default Spoiler
