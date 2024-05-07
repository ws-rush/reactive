import { t } from '@lingui/macro'

export function TheFooter() {
  return (
    <nav className="flex gap-4 mt-6 justify-center text-xl">
      <Link
        title={t`button.home`}
        to="/"
      >
        <div className="icon-btn i-carbon-chart-radar" />
      </Link>

      <button
        className="icon-btn"
        onClick={() => mode.toggleColorMode()}
        title={t`button.toggle_dark`}
        type="button"
      >
        <div className="i-carbon-sun dark:i-carbon-moon" />
      </button>

      <a
        className="icon-btn"
        onClick={() => locale.toggleLocales()}
        title={t`button.toggle_langs`}
      >
        <div className="i-carbon-language" />
      </a>

      <Link
        data-test-id="about"
        title={t`button.about`}
        to="/about"
      >
        <div className=" icon-btn i-carbon-dicom-overlay" />
      </Link>

      <a
        className="icon-btn"
        href="https://github.com/antfu/vitesse"
        rel="noreferrer"
        target="_blank"
        title="GitHub"
      >
        <div className="i-carbon-logo-github" />
      </a>
    </nav>
  )
}
