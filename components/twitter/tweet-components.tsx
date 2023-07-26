import Image from 'next/image'
import type { TwitterComponents } from 'react-tweet'

const TweetComponents: TwitterComponents = {
  AvatarImg: ({ alt, ...props }) => <Image alt={alt} {...props} />,
  MediaImg: ({ alt, ...props }) => (
    <Image alt={alt} {...props} fill unoptimized />
  ),
}

export { TweetComponents }
