import viteLogo from '@/assets/vite.jpg?w=400&h=300&format=webp'
import { useUserStore } from '@/stores/user'
import { t } from '@lingui/macro'

export function Component() {
  const { savedName } = useUserStore((state) => ({
    savedName: state.savedName,
  }))
  const [name, setName] = useState<string>(savedName)

  const navigate = useNavigate()

  function go() {
    if (name) navigate(`/hi/${encodeURIComponent(name)}`)
  }

  return (
    <div>
      <div className="font-sans">
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
          <div className="text-4xl">
            <div className="i-carbon-chart-radar inline-block" />
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
        <em className="text-sm opacity-75">{t`intro.desc`}</em>
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
      >{t`intro.whats-your-name`}</label>

      <div>
        <button
          className="m-3 text-sm btn"
          disabled={!name}
          onClick={() => go()}
          type="button"
        >
          {t`button.go`}
        </button>
      </div>
    </div>
  )
}
