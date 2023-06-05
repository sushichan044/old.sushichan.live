import styles from '@/app/blog/components/card/text-card.module.scss'
import Card from '@/components/common/card'

const TextCard = ({ children }: { children: string }) => {
  return <Card className={styles.card}>{children}</Card>
}

export default TextCard
