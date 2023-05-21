//'https://imagedelivery.net/i4QA6VLSP0gXyj6-3zNFXg/205537f6-a446-4d3e-ed39-0b67cbfdad00/public'
const regex = /([\w-]+)\/([\w-]+)\/public/

const getImageId = (src: string) => {
  const match = regex.exec(src)
  if (!match) {
    throw new Error('Invalid src')
  }
  return match[2]
}

export default getImageId
