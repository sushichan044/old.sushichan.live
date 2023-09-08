import type { CardCustomizeProps } from '@/components/base/card'
import Card from '@/components/base/card'
import WithBudoux from '@/components/common/budoux'
import styles from '@/components/ui/card/text-card.module.scss'

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
