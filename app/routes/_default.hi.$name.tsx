import { setNewName, useUserStore } from '@/stores/user'
import { Trans } from '@lingui/macro'

export function Component() {
  const navigate = useNavigate()
  const { name } = useParams()
  const { otherNames, savedName } = useUserStore((state) => ({
    otherNames: state.filters.otherNames(),
    savedName: state.savedName,
  }))

  useEffect(() => {
    if (name) setNewName(name)
  }, [name])

  return (
    <div className="text-center">
      <div className="text-4xl">
        <div className="i-carbon-pedestrian inline-block" />
      </div>
      <p>
        <Trans>intro.hi, {savedName}!</Trans>
      </p>

      <p className="text-sm opacity-75">
        <em>
          <Trans>intro.dynamic-route</Trans>
        </em>
      </p>

      {(otherNames.length && (
        <p className="mt-4 text-sm">
          <span className="opacity-75">
            <Trans>intro.aka</Trans>:
          </span>
          <ul>
            {otherNames.map((otherName) => (
              <li key={otherName}>
                <Link
                  replace
                  to={`/hi/${otherName}`}
                >
                  {otherName}
                </Link>
              </li>
            ))}
          </ul>
        </p>
      )) ||
        ''}

      <div>
        <button
          className="text-sm btn m-3 mt-6"
          onClick={() => navigate(-1)}
          type="button"
        >
          <Trans>button.back</Trans>
        </button>
      </div>
    </div>
  )
}
