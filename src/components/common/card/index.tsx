import clsx from 'clsx'

import styles from '@/components/common/card/card.module.scss'
import WithCaption from '@/components/common/withCaption'
import type { CustomizeProps } from '@/components/types/customize'

type CardProps = {
  className?: string
  style?: React.CSSProperties
  rounded?: boolean
  children: React.ReactNode
  shadow?: boolean
  caption?: string
  isFigure?: boolean
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
  isFigure = false,
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
      <WithCaption caption={caption} isFigure={isFigure}>
        {children}
      </WithCaption>
    </div>
  )
}

export default Card
