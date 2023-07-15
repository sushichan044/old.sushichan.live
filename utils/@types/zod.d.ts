export type WithZodSchema<
  K extends string,
  O extends object,
  Schema extends ZodTypeAny
> = {
  [key in K]: O
} & { schema: Schema }
