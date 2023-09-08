import { z } from 'zod'

import { getMDX } from '@/lib/mdx'

const getAboutMDX = () => {
  const commonAbout = getMDX({
    mdx: {
      sourceDirectory: 'md',
      fileName: 'about',
    },
    schema: z.object({}),
  })
  const devAbout = getMDX({
    mdx: {
      sourceDirectory: 'md',
      fileName: 'about-dev',
    },
    schema: z.object({}),
  })
  const otakuAbout = getMDX({
    mdx: {
      sourceDirectory: 'md',
      fileName: 'about-otaku',
    },
    schema: z.object({}),
  })
  return { commonAbout, devAbout, otakuAbout }
}

export { getAboutMDX }
