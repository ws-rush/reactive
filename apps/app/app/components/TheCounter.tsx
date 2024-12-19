type Props = {
  readonly initial: number
}

export default function TheCounter({ initial }: Props) {
  const [count, setCount] = useState(initial)

  const inc = () => {
    setCount((previousCount) => previousCount + 1)
  }

  const dec = () => {
    setCount((previousCount) => previousCount - 1)
  }

  return (
    <div>
      {count}
      <button
        className="inc"
        data-testid="inc-button"
        onClick={inc}
        type="button"
      >
        +
      </button>
      <button
        className="dec"
        data-testid="dec-button"
        onClick={dec}
        type="button"
      >
        -
      </button>
    </div>
  )
}
