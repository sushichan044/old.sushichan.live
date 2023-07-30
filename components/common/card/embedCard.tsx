import type { CardCustomizeProps } from '@/components/common/card'
import Card from '@/components/common/card'

const EmbedCard = ({
  children,
  shadow,
  ...props
}: CardCustomizeProps<{
  children: React.ReactNode
  shadow?: boolean
}>) => {
  return (
    <Card shadow={shadow} {...props}>
      {children}
    </Card>
  )
}

export default EmbedCard
