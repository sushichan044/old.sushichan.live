import styles from '@/components/article/article.module.scss'

export default function Article({ children }: { children: React.ReactNode }) {
  return <article className={styles.root}>{children}</article>
}
