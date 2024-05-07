// import reactLogo from '@/assets/react.svg'
// import viteLogo from '@/assets/vite.jpg?w=400&h=300&format=webp'
// import { logger } from '@/utils/functions/logger'
import { Trans } from '@lingui/macro'

export function Component() {
  //   const [count, setCount] = useState(0)
  //   logger('render')

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
