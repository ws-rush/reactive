import { attributes, ReactComponent } from '@/content/readme.md'
import { Helmet } from 'react-helmet'

export function Component() {
  return (
    <>
      <Helmet>
        <title>{attributes.title}</title>
      </Helmet>
      <div className="text-base p-4 prose prose-truegray xl:text-xl">
        <ReactComponent />
      </div>
    </>
  )
}
