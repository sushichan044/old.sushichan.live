'use client'

import * as TabsBase from '@radix-ui/react-tabs'

import styles from '@/components/tabs/tabs.module.scss'

type TabItem = {
  label: {
    internal: string
    external: string
  }
  content: React.ReactNode
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
  const contentBase = items.map((item) => (
    <TabsBase.Content
      asChild
      key={item.label.internal}
      value={item.label.internal}
    >
      <div className={styles.content}>{item.content}</div>
    </TabsBase.Content>
  ))

  const defaultValue = items[0].label.internal
  return { trigger, content: contentBase, defaultValue }
}

const Tabs = ({ items }: TabProps) => {
  const { trigger, content, defaultValue } = convertToComponent(items)

  return (
    <TabsBase.Root asChild defaultValue={defaultValue}>
      <div className={styles.root}>
        <TabsBase.List asChild>
          <div className={styles.list}>{trigger}</div>
        </TabsBase.List>
        {content}
      </div>
    </TabsBase.Root>
  )
}

export default Tabs
