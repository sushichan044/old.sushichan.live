import { Inset } from '@radix-ui/themes'

import fetchMetaData from '@/lib/fetchMetaData'

type Props = {
  url: string
}

const UrlEmbed = async ({ url }: Props) => {
  const metaData = await fetchMetaData(url)
  console.log(metaData)

  return (
    <div>
      <Inset>いんせっと</Inset>
      <p>UrlEmbed</p>
    </div>
  )
}

export default UrlEmbed
