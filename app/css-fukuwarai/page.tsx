import { Metadata } from 'next'

import Fukuwarai from '@/app/css-fukuwarai/fukuwarai'
import styles from '@/app/css-fukuwarai/page.module.scss'
import ErrorDialog from '@/components/error/errorDialog'
import Section from '@/components/section'

export const metadata: Metadata = {
  title: 'CSS福笑い',
}

export default async function Page() {
  return (
    <>
      <div className={styles['sp-only']}>
        <Section className={styles['sp-notice']}>
          <ErrorDialog>
            このコンテンツは
            <br />
            まだスマートフォンに
            <br />
            対応していません。
            <br />
            ご迷惑をおかけします。
          </ErrorDialog>
        </Section>
      </div>
      <div className={styles['sp-hide']}>
        <Section>
          <h1>CSS福笑い</h1>
          左側のエディタにCSSを書くと右側に反映されます。
          <br />
          有効なセレクタは最初から書かれているクラスのみです。
          <br />
          ネストが正しくコンパイルされる保証はありません。
          <br />
          Keyframeなど含めてすべてのCSSが使用可能です。
        </Section>
        <Fukuwarai />
      </div>
    </>
  )
}
