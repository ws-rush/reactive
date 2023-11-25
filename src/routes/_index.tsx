import { Trans } from '@lingui/macro'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.jpg?w=400&h=300&format=webp'
import { logger } from '@/utils/functions/logger'

export default function Component() {
  const [count, setCount] = useState(0)
  logger('render')

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

      <button className='btn' type='button' onClick={() => mode.set('system')}>System</button>
      <button className='btn' type='button' onClick={() => mode.set('light')}>Light</button>
      <button className='btn' type='button' onClick={() => mode.set('dark')}>Dark</button>

      <button className='btn' type='button' onClick={() => locale.set('ar')}>change arabic</button>
      <button className='btn' type='button' onClick={() => locale.set('en')}>change english</button>

    </>
  )
}