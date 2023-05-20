import { convertDate } from '@/lib/date'
import { type mdxMetaDataWithFile } from '@/lib/mdx'

const FrontMatter = ({ title, date, description }: mdxMetaDataWithFile) => {
  return (
    <div>
      <p>{convertDate(date)}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default FrontMatter
