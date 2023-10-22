import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { logger } from '@/utils/functions/logger'

export default function Component() {
  const [, setMode] = useMode()
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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} <i className='tabler-123' />
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <button type='button' onClick={() => setMode('system')}>System</button>
      <button type='button' onClick={() => setMode('light')}>Light</button>
      <button type='button' onClick={() => setMode('dark')}>Dark</button>
    </>
  )
}