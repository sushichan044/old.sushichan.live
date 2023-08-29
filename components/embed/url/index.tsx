import fetchMetaData from '@/lib/fetchMetaData'

type Props = {
  url: string
}

const UrlEmbed = async ({}: Props) => {
  const metaData = await fetchMetaData()
  console.log(metaData)

  return (
    <div>
      <p>UrlEmbed</p>
    </div>
  )
}

export default UrlEmbed
