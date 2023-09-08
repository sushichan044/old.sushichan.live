import type { CardCustomizeProps } from '@/components/base/card'
import Card from '@/components/base/card'

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
