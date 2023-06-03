import clsx from 'clsx'

import styles from '@/components/common/card/card.module.scss'

type CardProps = {
  className?: string
  rounded?: boolean
  children: React.ReactNode
}

const Card = ({ children, rounded, className }: CardProps) => {
  return (
    <div
      className={clsx(
        styles.root,
        className && className,
        rounded && styles.round
      )}
    >
      {children}
    </div>
  )
}

export default Card
