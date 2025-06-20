import { Trans } from '@lingui/react/macro'
import { useObserve } from '@tawr/state'
import { useNavigate } from 'react-router'
import viteLogo from '@/assets/vite.jpg?w=75&h=75&format=webp'
import CarbonChartRadar from '~icons/carbon/chart-radar'

export default function Component() {
  const savedName = useObserve(() => userStore.savedName)
  const [name, setName] = useState<string>(savedName)

  const navigate = useNavigate()

  function go() {
    if (name) navigate(`/hi/${encodeURIComponent(name)}`)
  }

  return (
    <div>
      <div className="font-sans flex gap-4 justify-center m-4">
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src={viteLogo} />
        </a>
        <a
          href="https://github.com/ws-rush/reactive"
          rel="noreferrer"
          target="_blank"
        >
          <div className="text-5xl">
            <CarbonChartRadar />
          </div>
        </a>
      </div>
      <p>
        <a
          href="https://github.com/ws-rush/reactive"
          rel="noreferrer"
          target="_blank"
        >
          Reactive
        </a>
      </p>
      <p>
        <em className="text-sm opacity-75">
          <Trans>intro.desc</Trans>
        </em>
      </p>

      <div className="py-4" />

      <TheInput
        onInput={(event) => setName(event.target.value)}
        onPressEnter={() => go()}
        value={name}
      />

      <div>
        <button
          className="m-3 text-sm btn"
          disabled={!name}
          onClick={() => go()}
          type="button"
        >
          <Trans>button.go</Trans>
        </button>
      </div>
    </div>
  )
}
