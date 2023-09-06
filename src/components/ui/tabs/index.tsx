'use client'

import * as TabsBase from '@radix-ui/react-tabs'

import styles from '@/components/ui/tabs/tabs.module.scss'

type TabItem = {
  label: {
    internal: string
    external: string
  }
  content: React.ReactNode
  default?: boolean
}

type TabProps = {
  items: TabItem[]
}

const convertToComponent = (items: TabItem[]) => {
  const trigger = items.map((item) => (
    <TabsBase.Trigger
      asChild
      key={item.label.internal}
      value={item.label.internal}
    >
      <div className={styles.trigger}>{item.label.external}</div>
    </TabsBase.Trigger>
  ))
  const content = items.map((item) => (
    <TabsBase.Content key={item.label.internal} value={item.label.internal}>
      {item.content}
    </TabsBase.Content>
  ))

  // default value is the first item or the item with default flag
  const defaultValue =
    items.find((item) => item.default)?.label.internal ??
    items[0].label.internal
  return { trigger, content, defaultValue }
}

const Tabs = ({ items }: TabProps) => {
  const { trigger, content, defaultValue } = convertToComponent(items)

  return (
    <TabsBase.Root asChild defaultValue={defaultValue}>
      <div className={styles.root}>
        <TabsBase.List asChild>
          <div className={styles.list}>{trigger}</div>
        </TabsBase.List>
        <div className={styles.content}>{content}</div>
      </div>
    </TabsBase.Root>
  )
}

export default Tabs
