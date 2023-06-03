'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { MouseEvent, useCallback, useEffect, useRef } from 'react'

import styles from '@/components/common/modal/modal.module.scss'

type ModalProps = {
  children: React.ReactNode
  className?: string
}

// https://github.com/vercel-labs/nextgram/blob/main/components/modal/index.js
export default function Modal({ children, className }: ModalProps) {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === modalRef.current || e.target === wrapperRef.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, modalRef]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      className={clsx(styles.root, className && className)}
      onClick={onClick}
      ref={modalRef}
    >
      <div className={styles.wrapper} ref={wrapperRef}>
        {children}
      </div>
    </div>
  )
}
