import styles from '@/components/section/styles.module.scss'

type SectionBase = {
  children: React.ReactNode
  id: string
  useFullWidth?: boolean
}

type SectionProps = SectionBase & {
  title?: never
  heading?: never
}

type SectionWithTitleProps = SectionBase & {
  title: string
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Section: React.FC<SectionProps | SectionWithTitleProps> = ({
  children,
  id,
  useFullWidth = false,
  title,
  heading: Heading,
}) => {
  return (
    <section className={styles.container} id={id}>
      {title && <Heading>{title}</Heading>}
      <div
        className={
          useFullWidth ? styles['content-full-width'] : styles['content-normal']
        }
      >
        {children}
      </div>
    </section>
  )
}

export default Section
