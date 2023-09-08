import styles from '@/components/base/article/article.module.scss'

export default function Article({ children }: { children: React.ReactNode }) {
  return <article className={styles.root}>{children}</article>
}
