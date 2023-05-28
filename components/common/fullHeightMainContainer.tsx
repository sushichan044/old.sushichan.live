import styles from '@/components/common/full-height-main-container.module.scss'

export default function FullHeightMainContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.root}>{children}</div>
}
