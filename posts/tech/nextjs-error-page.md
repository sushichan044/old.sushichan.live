---
title: Next.js(app router)でのCustom Error Page
description: 404の方はすんなり解決したけど500で沼った
date: 2023-05-30
thumbnail: https://imagedelivery.net/i4QA6VLSP0gXyj6-3zNFXg/483de844-1c72-4d3d-6fe9-ac4e867dc200/public
tags:
  - Next.js
  - 技術
---

## Next.jsのエラーページをカスタマイズする

### error.tsx

各`layout.tsx`と同じフォルダに`error.tsx`を作ると500エラーが出たときそこに誘導される。
この場合は、その階層までのLayoutが適用される。

```tsx title="error.tsx"
'use client'

import { GiSushis } from 'react-icons/gi'

import styles from '@/app/not-found.module.scss'
import BackButton from '@/components/button/backButton'
import FullHeightMainContainer from '@/components/common/fullHeightMainContainer'
import FullScreenSection from '@/components/section/fullScreenSection'

export default function Page() {
  return (
    <FullHeightMainContainer>
      <FullScreenSection>
        <GiSushis className={styles.logo} />
        <p>500 Server Error</p>
        <BackButton />
      </FullScreenSection>
    </FullHeightMainContainer>
  )
}
```

#### ところが

`app`フォルダ直下にエラーページを作成したい場合は勝手が異なる。
この場合は`app/error.tsx`ではなく`app/global-error.tsx`を作成するのだが...

```tsx title="global-error.tsx"
// https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

なんとこの`global-error.tsx`はすべてのレイアウトなどを無視して完全にクライアント側で描画されてしまう。
つまり、**完全に生なHTML+CSS**で書かないと正しく描画されないのである。

### 暫定的解決策

`app/*`の`layout.tsx`が存在するフォルダに個別で`error.tsx`を作って
その階層で受け取ればレイアウトが崩壊しない。
