import { AiOutlineWarning } from 'react-icons/ai'

import Fukuwarai from '@/app/css-fukuwarai/fukuwarai'
import styles from '@/app/css-fukuwarai/page.module.scss'
import Section from '@/components/blog/section'

export default async function Page() {
  return (
    <div id="main-container">
      <div className={styles['sp-only']}>
        <Section className={styles['sp-notice']}>
          <AiOutlineWarning size="40%" />
          このコンテンツは
          <br />
          まだスマートフォンに
          <br />
          対応していません。
          <br />
          ご迷惑をおかけします。
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
    </div>
  )
}
