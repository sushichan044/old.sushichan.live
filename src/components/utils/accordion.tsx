'use client'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { useRef } from 'react'

import s from '@/components/utils/accordion.module.scss'

type AccordionItem = {
  label: string
  content: React.ReactNode
  internalValue: string
}

export type AccordionProps = {
  type: 'multiple' | 'single'
  collapsible?: boolean
  items: AccordionItem[]
  defaultInternalValue: string
}

const Item = ({ label, content, internalValue }: AccordionItem) => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <RadixAccordion.Item value={internalValue}>
      <RadixAccordion.Trigger className={s.trigger} ref={triggerRef}>
        {label}
        <FontAwesomeIcon className={s['chevron-down']} icon={faChevronDown} />
      </RadixAccordion.Trigger>
      <RadixAccordion.Content className={s.content} ref={contentRef}>
        {content}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  )
}

const Accordion = ({ items, type, collapsible = true }: AccordionProps) => {
  return (
    <RadixAccordion.Root
      className={s.root}
      collapsible={collapsible}
      title="クリックして表示/非表示を切り替え"
      type={type}
    >
      {items.map((item) => (
        <Item
          content={item.content}
          internalValue={item.internalValue}
          key={item.internalValue}
          label={item.label}
        />
      ))}
    </RadixAccordion.Root>
  )
}

export default Accordion
