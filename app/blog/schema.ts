import { z } from 'zod'

export const blogFrontMatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  created: z.date(),
  updated: z.date(),
  tags: z.array(z.string()).optional(),
  status: z.union([z.literal('private'), z.literal('public')]),
})
