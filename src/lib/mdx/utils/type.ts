const isNotEmptyArray = <T>(array: T[] | undefined): array is T[] => {
  return array !== undefined && array.length > 0
}

const isMDXFile = (ext: string): ext is '.mdx' | '.md' => {
  return ext === '.mdx' || ext === '.md'
}

export { isNotEmptyArray, isMDXFile }
