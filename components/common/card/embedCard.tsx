import Card from '@/components/common/card'

const EmbedCard = ({
  children,
  shadow,
}: {
  children: React.ReactNode
  shadow?: boolean
}) => {
  return (
    <Card
      shadow={shadow}
      style={{
        textAlign: 'center',
      }}
    >
      {children}
    </Card>
  )
}

export default EmbedCard
