import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import React from 'react'

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

  const getIconName = () => {
    switch (type) {
      case 'warn':
        return 'exclamation-triangle'
      case 'alert':
        return 'exclamation-circle'
      default:
        return 'info-circle'
    }
  }

  return (
    <div className={clsx(styles.card, styles[`card__${type}`])}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={['fas', getIconName()]} size="lg" />
      </div>
      <div>
        <WithBudoux>{children}</WithBudoux>
      </div>
    </div>
  )
}

export default Message
