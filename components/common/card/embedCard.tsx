import Card from '@/components/common/card'

const EmbedCard = ({
  children,
  shadow,
  caption,
}: {
  children: React.ReactNode
  shadow?: boolean
  caption?: string
}) => {
  return (
    <Card caption={caption} shadow={shadow}>
      {children}
    </Card>
  )
}

export default EmbedCard
