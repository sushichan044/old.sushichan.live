import { z } from 'zod'

export const MDXFrontMatterBaseSchema = z.object({
  status: z.union([z.literal('public'), z.literal('private')]),
  created: z.date(),
  updated: z.date().optional(),
})
