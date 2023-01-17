import { useCounterContext } from "../hook/useCounterContext"
import { useTitleColorContext } from "../hook/useTitleColorContext"
import { ContextChanger } from "../components/ContextChanger"

const Home = () => {
  const { counter } = useCounterContext()
  const { color, dispatch } = useTitleColorContext()

  const setTitleColor = (color) => {
    dispatch({ type: color })
  }

  return (
    <div>
      <h1 style={{color: color}}>Home</h1>
      <p>Valor do contador {counter}</p>
      <ContextChanger/>
      <div>
        <button onClick={() => setTitleColor("RED")}>
          RED
        </button>
        <button onClick={() => setTitleColor("BLUE")}>
          BLUE
        </button>
      </div>
    </div>
  )
}

export default Home