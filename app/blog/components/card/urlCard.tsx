import { Route } from 'next'

import s from '@/app/blog/components/card/url-card.module.scss'
import EmbedCard from '@/components/common/card/embedCard'
import Link from '@/components/common/link'
import { RawImg, RawImgWithoutSize } from '@/components/image/rawImg'
import AspectRatio from '@/components/utils/aspectRatio'
import fetchMetaData from '@/lib/fetchMetaData'
import { adjustAspectRatio } from '@/utils/image'

type Props = {
  url: string | URL
}

const UrlCard = async ({ url: rawUrl }: Props) => {
  const url = new URL(rawUrl)
  const { image, ...metaData } = await fetchMetaData(url.toString())

  const aspectRatio =
    image?.width && image?.height
      ? adjustAspectRatio(parseInt(image.width), parseInt(image.height))
      : undefined

  return (
    <EmbedCard shadow>
      <Link
        className={s.link}
        href={url.toString() as Route}
        options={{ textDecoration: 'none' }}
      >
        <div className={s.root}>
          {image && image.src && (
            <div className={s.image}>
              <AspectRatio
                aspectRatio={{
                  default: '1 / 1',
                  matchQuery: aspectRatio,
                }}
                query="(min-width: 768px)"
              >
                <RawImgWithoutSize alt={image.alt} src={image.src} />
              </AspectRatio>
            </div>
          )}
          <div className={s.text}>
            <span className={s.title}>{metaData.title}</span>
            <div className={s.host}>
              {metaData.icon && (
                <RawImg
                  alt={metaData.title}
                  height={16}
                  src={metaData.icon}
                  width={16}
                />
              )}
              <span>{url.hostname}</span>
            </div>
          </div>
        </div>
      </Link>
    </EmbedCard>
  )
}

export default UrlCard
