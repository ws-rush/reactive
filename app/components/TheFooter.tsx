import { t } from '@lingui/macro'
import CarbonChartRadar from '~icons/carbon/chart-radar'
import CarbonDicomOverlay from '~icons/carbon/dicom-overlay'
import CarbonLanguage from '~icons/carbon/language'
import CarbonLogoGithub from '~icons/carbon/logo-github'
import CarbonMoon from '~icons/carbon/moon'
import CarbonSun from '~icons/carbon/sun'

export function TheFooter() {
  return (
    <nav className="flex gap-4 mt-6 justify-center text-xl">
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

      <a
        className="icon-btn"
        onClick={() => locale.toggleLocales()}
        title={t`button.toggle_langs`}
      >
        <CarbonLanguage />
      </a>

      <Link
        data-test-id="about"
        title={t`button.about`}
        to="/about"
      >
        <CarbonDicomOverlay className=" icon-btn" />
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
