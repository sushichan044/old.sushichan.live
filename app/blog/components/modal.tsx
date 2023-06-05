'use client'

import { useRouter } from 'next/navigation'
import { MouseEvent, useCallback, useEffect, useRef } from 'react'

import styles from '@/app/blog/components/modal.module.scss'

type ModalProps = {
  children: React.ReactNode
}

// https://github.com/vercel-labs/nextgram/blob/main/components/modal/index.js
export default function Modal({ children }: ModalProps) {
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
    [onDismiss, modalRef, wrapperRef]
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
    <div className={styles.root} onClick={onClick} ref={modalRef}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {children}
      </div>
    </div>
  )
}
