import styles from '@/components/common/button/button.module.scss'

export type ButtonProps = {
  children: React.ReactNode
  role: React.ComponentProps<'button'>['role']
  style?: React.CSSProperties
  onClick?: React.ComponentProps<'button'>['onClick'] | undefined
}

const Button = ({ children, role, style, onClick }: ButtonProps) => {
  return (
    <button className={styles.root} onClick={onClick} role={role} style={style}>
      {children}
    </button>
  )
}

export default Button
