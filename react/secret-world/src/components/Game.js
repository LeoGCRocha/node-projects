import './Game.css'
import { useState, useRef } from 'react'

const Game = ({ 
      verifyLetter, 
      pickedWord, 
      pickedCategory, 
      letters, 
      guessedLetters, 
      wrongLetters, 
      guesses, 
      score 
  }) => {

  const [ letter, setLetter ] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)
    setLetter("")
    letterInputRef.current.focus()
  }

  return (
    <div className='game'>
      <div className='points'>
        <span>Pontuação: {score}</span>
      </div>
      <h1>Adivinhe a palavra</h1>
      <h3 className='tip'>
        Dica sobre a palvra: <span> {pickedCategory} </span>
      </h3>
      <p>Você ainda tem <span> {guesses} </span> tentativas</p>
      <div className='worldContainer'>
        { letters.map((letter, index) => (
          guessedLetters.includes(letter) ? 
          ( <span key={index} className="letter"> { letter } </span> ) :
          ( <span key={index} className="blankSquare"></span> )
        ))}
      </div>
      <div className='letterContainer'>
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            ref={letterInputRef} 
            type="text" 
            onChange={(e) => setLetter(e.target.value)} 
            name='letter' 
            maxLength={1} 
            value={letter}
          />
          <button>
            Jogar!  
          </button>  
        </form>
      </div>
      <div className='wrongLetterContainer'>
        <p>Letras já utilizadas: </p>
        { [...wrongLetters, ...guessedLetters].map((letter, index) => (
          <span key={index}> { letter}</span>
        )) }

      </div>
    </div>
  )
}

export default Game