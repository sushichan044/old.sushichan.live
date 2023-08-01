import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

const getFormattedDate = (date: Date, options: { format: string }) => {
  return format(date, options.format, {})
}

const convertToJST = <T extends Record<string, Date>>(rec: T): T => {
  const JST = 'Asia/Tokyo'
  const converted = Object.entries(rec).reduce((acc, [key, value]) => {
    const convertedDate = utcToZonedTime(value, JST)
    return {
      ...acc,
      [key]: convertedDate,
    }
  }, {} as T)
  return converted
}

export { convertToJST, getFormattedDate }
