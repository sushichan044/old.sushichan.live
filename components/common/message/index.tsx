import clsx from 'clsx'
import React from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'

import styles from '@/components/common/message/message.module.scss'

type MessageProps = {
  type: 'warning' | 'alert'
  children: string
}

const Message = ({ type, children }: MessageProps) => {
  const isWarning = type === 'warning'

  return (
    <div
      className={clsx(
        styles.card,
        isWarning ? styles.card__warn : styles.card__alert
      )}
    >
      <div className={styles.icon}>
        <RiErrorWarningLine color="inherit" size="1.75em" />
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Message
