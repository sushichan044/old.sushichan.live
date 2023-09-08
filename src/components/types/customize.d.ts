export type CustomizeProps<T extends object> = {
  className?: string
  style?: React.CSSProperties
} & Omit<T, 'className' | 'style'>
