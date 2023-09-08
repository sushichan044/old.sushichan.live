import { SectionBase, type SectionProps } from '@/components/base/section'
import styles from '@/components/base/section/full-screen-section.module.scss'

const FullScreenSection = ({ children, className, style }: SectionProps) => (
  <SectionBase
    className={className ? `${className} ${styles.root}` : styles.root}
    style={style}
  >
    {children}
  </SectionBase>
)

export default FullScreenSection
