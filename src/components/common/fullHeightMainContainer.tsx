import clsx from 'clsx'

import styles from '@/components/common/full-height-main-container.module.scss'

export default function FullHeightMainContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx(styles.root, className && className)}>{children}</div>
  )
}
