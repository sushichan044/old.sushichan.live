import clsx from 'clsx'
import type { Metadata } from 'fetch-site-metadata'
import { Route } from 'next'

import s from '@/app/blog/components/card/url-card.module.scss'
import { CardCustomizeProps } from '@/components/common/card'
import EmbedCard from '@/components/common/card/embedCard'
import Link from '@/components/common/link'
import { RawImg, RawImgWithoutSize } from '@/components/image/rawImg'
import fetchMetaData from '@/lib/fetchMetaData'
import { adjustAspectRatio } from '@/utils/image'

type Props = {
  url: string | URL
}
type ImageSet = {
  src: string
  alt: string
}

const getImage = ({ image, icon, title }: Metadata): ImageSet | undefined => {
  if (image) {
    return {
      src: image.src,
      alt: image.alt ?? `ogp image of ${title}`,
    }
  }

  if (icon) {
    return {
      src: icon,
      alt: `icon of ${title}`,
    }
  }

  return undefined
}

const UrlCard = async ({
  url: rawUrl,
  ...props
}: CardCustomizeProps<Props>) => {
  const url = new URL(rawUrl)
  const metaData = await fetchMetaData(url.toString())

  const imageSet = getImage(metaData)
  const aspectRatio =
    metaData?.image?.width && metaData?.image?.height
      ? adjustAspectRatio(
          parseInt(metaData.image.width),
          parseInt(metaData.image.height),
        )
      : undefined

  return (
    <EmbedCard shadow {...props}>
      <Link
        className={s.link}
        href={url.toString() as Route}
        options={{ textDecoration: 'none' }}
      >
        <div className={s.root}>
          {imageSet && (
            <div className={s.image}>
              <RawImgWithoutSize
                alt={imageSet.alt ?? ''}
                className={clsx('aspect-square', {
                  [`md:aspect-1200/630`]: aspectRatio === '1200/630',
                  [`md:aspect-16/9`]: aspectRatio === '16/9',
                  [`md:aspect-4/3`]: aspectRatio === '4/3',
                  [`md:aspect-3/2`]: aspectRatio === '3/2',
                  [`md:aspect-1/1`]: aspectRatio === '1/1',
                })}
                src={imageSet.src}
              />
            </div>
          )}
          <div className={s.text}>
            <span className={s.title}>{metaData.title}</span>
            <span className={s.description}>{metaData.description}</span>
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
