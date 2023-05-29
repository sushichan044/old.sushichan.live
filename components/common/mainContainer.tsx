import styles from '@/components/common/main-container.module.scss'

export default function MainContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.root}>{children}</div>
}
