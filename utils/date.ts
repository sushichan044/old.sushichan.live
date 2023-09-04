import { format } from 'date-fns'
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz'

const formatDate = (date: Date, options: { format: string }) => {
  return format(date, options.format, {})
}

const formatDateInJST = (date: Date, options: { format: string }) => {
  const JST = 'Asia/Tokyo'
  return formatInTimeZone(date, JST, options.format, {})
}

const convertToJST = (rec: Date): Date => {
  const JST = 'Asia/Tokyo'
  const convertedDate = utcToZonedTime(rec, JST)
  return convertedDate
}

export { convertToJST, formatDate, formatDateInJST }
