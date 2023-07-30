import clsx from 'clsx'

import styles from '@/components/common/card/card.module.scss'
import type { CustomizeProps } from '@/components/types/customize'

type CardProps = {
  className?: string
  style?: React.CSSProperties
  rounded?: boolean
  children: React.ReactNode
  shadow?: boolean
  caption?: string
}

export type CardCustomizeProps<T extends object> = CustomizeProps<T> & {
  caption?: string
}

const Card = ({
  children,
  rounded,
  className,
  style,
  shadow,
  caption,
}: CustomizeProps<CardProps>) => {
  return (
    <div
      className={clsx(
        styles.root,
        className && className,
        rounded && styles.round,
        shadow && styles.shadow,
      )}
      style={style}
    >
      {children}
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  )
}

export default Card
