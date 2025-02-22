import { Trans } from '@lingui/react/macro'
import { useObserve } from '@tawr/state'
import CarbonPedestrian from '~icons/carbon/pedestrian'
import { Link, useNavigate, useParams } from 'react-router'

export default function Component() {
  const navigate = useNavigate()
  const { name } = useParams()
  const [savedName, otherNames] = useObserve(() => [
    userStore.savedName,
    userStore.otherNames,
  ])

  useEffect(() => {
    if (name) userStore.setNewName(name)
  }, [name])

  return (
    <div className="text-center">
      <CarbonPedestrian className="text-4xl mx-auto" />
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
            {otherNames.map((otherName: string) => (
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
