import { useContext } from "react"
import { CounterContext } from "../context/CounterContext"

export const ContextChanger = () => {
    const { counter, setCounter } = useContext(CounterContext)

    return (
        <button onClick={ () => setCounter(counter + 1)}>
            Update Counter
        </button>
    )
}
