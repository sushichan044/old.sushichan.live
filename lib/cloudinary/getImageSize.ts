import { cloudinaryMetadataLoader } from '@/lib/imageLoader'

const getCloudinaryImageSize = async (
  url: string,
): Promise<{ width: number; height: number }> => {
  try {
    const res = await fetch(cloudinaryMetadataLoader(url))
    const isJson = res.headers.get('content-type')?.includes('application/json')
    const data = isJson ? await res.json() : await res.text()
    if (res.ok) {
      return {
        width: data?.input?.width,
        height: data?.input?.height,
      }
    }
  } catch (e) {
    console.error(e)
  }

  return {
    width: 1200,
    height: 900,
  }
}

export { getCloudinaryImageSize }
