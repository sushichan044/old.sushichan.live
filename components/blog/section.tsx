import styles from '@/components/blog/section.module.scss'

type SectionProps = {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

const Section = ({ children, className, style }: SectionProps) => (
  <section
    className={
      className
        ? `${className} ${styles['section-root']}`
        : styles['section-root']
    }
    style={style}
  >
    {children}
  </section>
)

export default Section
