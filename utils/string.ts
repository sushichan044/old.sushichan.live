type toggleBoolOptions = {
  trueValue?: string
  falseValue?: string
  fallbackValue?: string
}

const toggleBoolString = (
  str: string | null,
  {
    trueValue = 'true',
    falseValue = 'false',
    fallbackValue = '',
  }: toggleBoolOptions = {}
): string => {
  if (str === trueValue) return falseValue
  if (str === falseValue) return trueValue

  return fallbackValue
}

export { toggleBoolString }
