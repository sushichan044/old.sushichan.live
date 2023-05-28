import { SectionBase, type SectionProps } from '@/components/section'
import styles from '@/components/section/full-screen-section.module.scss'

const FullScreenSection = ({ children, className, style }: SectionProps) => (
  <SectionBase
    className={className ? `${className} ${styles.root}` : styles.root}
    style={style}
  >
    {children}
  </SectionBase>
)

export default FullScreenSection
