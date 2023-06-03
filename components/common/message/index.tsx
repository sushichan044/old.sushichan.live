import clsx from 'clsx'
import React from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'

import WithBudoux from '@/components/common/budoux'
import styles from '@/components/common/message/message.module.scss'

type MessageProps = {
  type: 'warning' | 'alert' | 'info'
  children: string
}

const Message = ({ type, children }: MessageProps) => {
  return (
    <div
      className={clsx(
        styles.card,
        type === 'warning' && styles.card__warn,
        type === 'alert' && styles.card__alert,
        type === 'info' && styles.card__info
      )}
    >
      <div className={styles.icon}>
        <RiErrorWarningLine color="inherit" size="1.75em" />
      </div>
      <div>
        <WithBudoux>{children}</WithBudoux>
      </div>
    </div>
  )
}

export default Message
