import styles from '@/app/blog/components/tag.module.scss'

type TagProps = {
  tag: string
}

export const Tag = ({ tag }: TagProps) => {
  return <span className={styles.text}>{`#${tag}`}</span>
}

export default Tag
