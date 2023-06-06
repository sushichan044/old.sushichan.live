import styles from '@/app/blog/components/card/text-card.module.scss'
import WithBudoux from '@/components/common/budoux'
import Card from '@/components/common/card'

const TextCard = ({
  children,
  useBudoux = true,
}: {
  children: string
  useBudoux: boolean
}) => {
  return (
    <Card className={styles.card}>
      {useBudoux ? <WithBudoux>{children}</WithBudoux> : children}
    </Card>
  )
}

export default TextCard
