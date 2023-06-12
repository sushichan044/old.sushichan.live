import clsx from 'clsx'

import styles from '@/components/common/card/card.module.scss'

type CardProps = {
  className?: string
  style?: React.CSSProperties
  rounded?: boolean
  children: React.ReactNode
  shadow?: boolean
}

const Card = ({ children, rounded, className, style, shadow }: CardProps) => {
  return (
    <div
      className={clsx(
        styles.root,
        className && className,
        rounded && styles.round,
        shadow && styles.shadow
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export default Card
