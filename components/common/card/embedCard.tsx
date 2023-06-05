import Card from '@/components/common/card'

const EmbedCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card
      style={{
        textAlign: 'center',
      }}
    >
      {children}
    </Card>
  )
}

export default EmbedCard
