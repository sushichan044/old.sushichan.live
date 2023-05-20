import styles from '@/components/blog/section.module.scss'

type SectionProps = {
  children: React.ReactNode
}

const Section = ({ children }: SectionProps) => (
  <section className={styles['section-root']}>{children}</section>
)

export default Section
