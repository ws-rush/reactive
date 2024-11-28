import viteLogo from '@/assets/vite.jpg?w=75&h=75&format=webp'
import { Trans } from '@lingui/macro'
import CarbonChartRadar from '~icons/carbon/chart-radar'
import { useNavigate } from 'react-router'
import { useSnapshot } from 'tawr-state'

export default function Component() {
  const user = useSnapshot(userStore)
  const [name, setName] = useState<string>(user.savedName)

  const navigate = useNavigate()

  function go() {
    if (name) navigate(`/hi/${encodeURIComponent(name)}`)
  }

  return (
    <div>
      <div className="font-sans flex gap-4 justify-center m-4">
        <a
          href="https://vitejs.dev"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="Vite logo"
            className="logo"
            src={viteLogo}
          />
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
      <label
        className="hidden"
        htmlFor="input"
      >
        <Trans>intro.whats-your-name</Trans>
      </label>

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
