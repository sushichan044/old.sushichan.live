import styles from '@/app/blog/_components/text-card.module.scss'
import Card from '@/components/common/card'

const AA = ({ children }: { children: string }) => {
  return <Card className={styles.card}>{children}</Card>
}

export default AA
