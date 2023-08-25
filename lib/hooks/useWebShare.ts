'use client'

const useWebShare = () => {
  const webShareAPIIsAvailable = () => {
    if (!global?.navigator?.canShare) {
      console.warn('Web Share API is not available in this browser')
      return false
    }
    return true
  }

  const canShare = (data: ShareData) => {
    if (!webShareAPIIsAvailable()) return false
    return global.navigator.canShare(data)
  }

  const share = async (data: ShareData) => {
    if (!webShareAPIIsAvailable() || !canShare(data)) return

    // TODO: canWShareを切り出して、明示的にErrorObjectを返す仕組みにする
    try {
      await global.navigator.share(data)
    } catch (err) {
      console.warn('Web Share API error:', err)
    }
  }

  return { share }
}

export { useWebShare }
