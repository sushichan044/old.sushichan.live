import styles from '@/app/blog/components/card/text-card.module.scss'
import WithBudoux from '@/components/common/budoux'
import type { CardCustomizeProps } from '@/components/common/card'
import Card from '@/components/common/card'

const TextCard = ({
  children,
  useBudoux = true,
  ...props
}: CardCustomizeProps<{
  children: string
  useBudoux: boolean
}>) => {
  return (
    <Card className={styles.card} {...props}>
      {useBudoux ? <WithBudoux>{children}</WithBudoux> : children}
    </Card>
  )
}

export default TextCard
