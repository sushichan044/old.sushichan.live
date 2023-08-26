'use client'

import { Route } from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import q from 'query-string'
import { useCallback, useMemo } from 'react'

import s from '@/app/blog/components/tags.module.scss'

export const Tags = ({ tags }: { tags: string[] }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const selectedTags = useMemo(() => {
    return (params.get('tags')?.split(',') ?? []).filter(Boolean)
  }, [params])

  const addTag = useCallback(
    (tag: string) => {
      const newParams = q.stringify({
        tags: [...selectedTags, tag].join(','),
      })
      return newParams.toString()
    },
    [selectedTags],
  )
  const removeTag = useCallback(
    (tag: string) => {
      const newTags = selectedTags.filter((selectedTag) => selectedTag !== tag)
      if (newTags.length === 0) {
        return ''
      }

      const newParams = q.stringify({
        tags: newTags.join(','),
      })
      return newParams.toString()
    },
    [selectedTags],
  )

  return (
    <div className={s.tags}>
      {tags.map((tag) => {
        const isSelected = !!selectedTags.find(
          (selectedTag) => selectedTag === tag,
        )
        return (
          <>
            <button
              aria-pressed={isSelected}
              className={s.button}
              key={`btn-${tag}`}
              onClick={
                isSelected
                  ? () =>
                      router.push((pathname + '?' + removeTag(tag)) as Route, {
                        scroll: false,
                      })
                  : () =>
                      router.push((pathname + '?' + addTag(tag)) as Route, {
                        scroll: false,
                      })
              }
            >
              {`#${tag}`}
            </button>
          </>
        )
      })}
    </div>
  )
}

export default Tags
