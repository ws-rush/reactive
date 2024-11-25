import { Trans } from '@lingui/macro'
import { Outlet } from 'react-router'

export default function Component() {
  return (
    <main className="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <Outlet />
      <TheFooter />
      <div className="mx-auto mt-5 text-center text-sm opacity-50">
        <Trans>[Home Layout]</Trans>
      </div>
    </main>
  )
}
