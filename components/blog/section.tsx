import styles from '@/components/blog/section.module.scss'

type SectionProps = {
  className?: string
  children: React.ReactNode
}

const Section = ({ children, className }: SectionProps) => (
  <section className={className ? `${className} ${styles.root}` : styles.root}>
    {children}
  </section>
)

export default Section
