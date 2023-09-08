import styles from '@/components/base/section/section.module.scss'

export type SectionProps = {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export const SectionBase = ({ children, className, style }: SectionProps) => (
  <section className={className} style={style}>
    {children}
  </section>
)

const Section = ({ children, className, style }: SectionProps) => (
  <SectionBase
    className={
      className
        ? `${className} ${styles['section-root']}`
        : styles['section-root']
    }
    style={style}
  >
    {children}
  </SectionBase>
)

export default Section
