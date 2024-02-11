import reactLogo from '@/assets/react.svg';
import viteLogo from '@/assets/vite.jpg?w=400&h=300&format=webp';
import { logger } from '@/utils/functions/logger';
import { Trans } from '@lingui/macro';

export function Component() {
  const [count, setCount] = useState(0);
  logger('render');

  return (
    <>
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
          href="https://react.dev"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="React logo"
            className="logo react"
            src={reactLogo}
          />
        </a>
      </div>
      <h1>
        <Trans>Vite + React</Trans>
      </h1>
      <div className="card">
        <button
          // eslint-disable-next-line @typescript-eslint/no-shadow
          onClick={() => setCount((count) => count + 1)}
          type="button"
        >
          <Trans>count is</Trans> {count} <i className="tabler-123" />
        </button>
        <p>
          <Trans>
            Edit <code>app/routes/_index.tsx</code> and save to test HMR
          </Trans>
        </p>
      </div>
      <p className="read-the-docs">
        <Trans>Click on the Vite and React logos to learn more</Trans>
      </p>

      <button
        className="btn"
        onClick={() => mode.set('system')}
        type="button"
      >
        System
      </button>
      <button
        className="btn"
        onClick={() => mode.set('light')}
        type="button"
      >
        Light
      </button>
      <button
        className="btn"
        onClick={() => mode.set('dark')}
        type="button"
      >
        Dark
      </button>

      <button
        className="btn"
        onClick={() => locale.set('ar')}
        type="button"
      >
        change arabic
      </button>
      <button
        className="btn"
        onClick={() => locale.set('en')}
        type="button"
      >
        change english
      </button>
    </>
  );
}
