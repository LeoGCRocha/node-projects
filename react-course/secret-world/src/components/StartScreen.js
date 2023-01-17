import './StartScreen.css'

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
        <h1>Secret WORLD</h1>
        <p>Clique no botão para iniciar o jogo</p>
        <button onClick={startGame}>
            Começar o jogo
        </button>
    </div>
  )
}

export default StartScreen