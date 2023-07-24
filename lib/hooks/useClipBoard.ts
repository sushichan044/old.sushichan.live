const useClipBoard = () => {
  const clipboardIsAvailable = () => {
    if (!global?.navigator?.clipboard) {
      console.warn('Clipboard API is not available in this browser')
      return false
    }
    return true
  }

  const copy = async (value: Blob) => {
    if (!clipboardIsAvailable()) return
    await global.navigator.clipboard.write([
      new global.ClipboardItem({ [value.type]: value }),
    ])
  }

  const copyText = async (value: string) => {
    if (!clipboardIsAvailable()) return
    await global.navigator.clipboard.writeText(value)
  }

  // TODO: add read function after Permission.request() is available
  return { copy, copyText }
}

export { useClipBoard }
