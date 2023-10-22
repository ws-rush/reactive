import { Trans } from '@lingui/macro'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { logger } from '@/utils/functions/logger'

export default function Component() {
  const [, setMode] = useMode()
  const [count, setCount] = useState(0)
  logger('render')

  const changeLocale = async (locale: string) => {
    const { messages } = await import(`../locales/${locale}.po`)
    i18n.load(locale, messages)
    i18n.activate(locale)
  }

  return (
    <>
      <div className='font-sans'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1><Trans>Vite + React</Trans></h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          <Trans>count is</Trans> {count} <i className='tabler-123' />
        </button>
        <p>
          <Trans>Edit <code>src/App.tsx</code> and save to test HMR</Trans>
        </p>
      </div>
      <p className="read-the-docs">
        <Trans>Click on the Vite and React logos to learn more</Trans>
      </p>

      <button type='button' onClick={() => setMode('system')}>System</button>
      <button type='button' onClick={() => setMode('light')}>Light</button>
      <button type='button' onClick={() => setMode('dark')}>Dark</button>

      <button type='button' onClick={() => changeLocale('ar')}>change arabic</button>
      <button type='button' onClick={() => changeLocale('en')}>change english</button>

    </>
  )
}