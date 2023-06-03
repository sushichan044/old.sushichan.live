import clsx from 'clsx'
import React from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'

import WithBudoux from '@/components/common/budoux'
import styles from '@/components/common/message/message.module.scss'

const VALID_TYPES = ['warn', 'alert', 'info'] as const

type MessageProps = {
  type: (typeof VALID_TYPES)[number]
  children: string
}

const Message = ({ type, children }: MessageProps) => {
  if (!VALID_TYPES.includes(type)) {
    type = 'info'
  }

  return (
    <div className={clsx(styles.card, styles[`card__${type}`])}>
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
