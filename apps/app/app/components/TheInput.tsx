import { useLingui } from '@lingui/react/macro'

type Props = {
  readonly onInput: React.ChangeEventHandler<HTMLInputElement>
  readonly onPressEnter: (evnt: React.KeyboardEvent<HTMLInputElement>) => void
  readonly value?: string
}

export function TheInput({ onInput, onPressEnter, value }: Props) {
  const { t } = useLingui()

  function onKeyDownHandler(evnt: React.KeyboardEvent<HTMLInputElement>) {
    if (evnt.keyCode === 13) onPressEnter(evnt)
  }

  return (
    <input
      autoComplete="false"
      className="px-4 py-2 w-[250px] text-center bg-transparent border rounded border-gray-200 dark:border-gray-700 outline-none active:outline-none"
      id="input"
      onInput={onInput}
      onKeyDown={(event) => onKeyDownHandler(event)}
      // placeholder={i18n._(msg`intro.whats-your-name`)}
      placeholder={t`intro.whats-your-name`}
      type="text"
      value={value}
    />
  )
}
