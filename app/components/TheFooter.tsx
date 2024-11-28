import { t } from '@lingui/macro'
import CarbonChartRadar from '~icons/carbon/chart-radar'
import CarbonDicomOverlay from '~icons/carbon/dicom-overlay'
// import CarbonLanguage from '~icons/carbon/language'
import CarbonLogoGithub from '~icons/carbon/logo-github'
import CarbonMoon from '~icons/carbon/moon'
import CarbonSun from '~icons/carbon/sun'
import { Link, useLocation, useNavigate, useParams } from 'react-router'

export function TheFooter() {
  const lang = useParams()?.lang ?? ''
  let path = useLocation().pathname
  const navigate = useNavigate()

  return (
    <nav className="flex gap-4 mt-6 justify-center items-center text-xl">
      <Link
        title={t`button.home`}
        to="/"
      >
        <CarbonChartRadar className="icon-btn" />
      </Link>

      <button
        className="icon-btn"
        onClick={() => mode.toggleColorMode()}
        title={t`button.toggle_dark`}
        type="button"
      >
        <CarbonSun className="dark:hidden" />
        <CarbonMoon className="hidden dark:inline-block" />
      </button>

      {/* change url with spa mode */}
      {/* <a
        className="icon-btn"
        onClick={() => locale.toggleLocales()}
        title={t`button.toggle_langs`}
      >
        <CarbonLanguage />
      </a> */}

      {/* change language with url localization */}
      <select
        className="icon-btn"
        onChange={(event) => {
          const nextLang = event.currentTarget.value
          if (lang === nextLang) return

          // check if path has a lang prefix, if so remove it
          if (lang) {
            path = path.replace(`/${lang}`, '')
          }

          // Ensure path starts with /
          if (!path.startsWith('/')) {
            path = '/' + path
          }

          // Add new language prefix if selected
          const newPath = nextLang ? `/${nextLang}${path}` : path

          // Navigate to new path preserving search params and hash
          navigate(`${newPath}${location.search}${location.hash}`, {
            replace: true,
          })
        }}
        value={lang}
      >
        <option value="">Default</option>
        <option value="en">English</option>
        <option value="ar">Arabic</option>
      </select>

      <Link
        data-test-id="about"
        title={t`button.about`}
        to="/about"
      >
        <CarbonDicomOverlay className="icon-btn" />
      </Link>

      <a
        className="icon-btn"
        href="https://github.com/antfu/vitesse"
        rel="noreferrer"
        target="_blank"
        title="GitHub"
      >
        <CarbonLogoGithub />
      </a>
    </nav>
  )
}
