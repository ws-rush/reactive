import { attributes, ReactComponent } from '@/content/about.md'
import CarbonDicomOverlay from '~icons/carbon/dicom-overlay'
import { Helmet } from 'react-helmet'

export function Component() {
  return (
    <>
      <Helmet>
        <title>{attributes.title}</title>
      </Helmet>
      <div className="m-auto text-base prose">
        <div className="text-center">
          <CarbonDicomOverlay className="text-4xl -mb-6 m-auto" />
          <h3>{attributes.title}</h3>
        </div>
        <ReactComponent />
      </div>
    </>
  )
}
