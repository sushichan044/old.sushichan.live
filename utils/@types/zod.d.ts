import type { AnyZodObject, z } from 'zod'

export type WithZodSchema<
  K extends string,
  O extends object,
  Schema extends AnyZodObject
> = {
  [key in K]: O
} & { schema: Schema }

export type MergedZodObjectType<
  T extends AnyZodObject,
  U extends AnyZodObject
> = z.infer<T & U>
