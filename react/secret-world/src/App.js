// react
import { useCallback, useEffect, useState } from 'react'

// css
import './App.css';

// components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

// data
import { wordlist } from './data/words'

const stages = [ 
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
 ]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordlist)

  const [ pickedWord, setPickedWord ] = useState("")
  const [ pickedCategory, setPickedCategory] = useState("")
  const [ letters, setLetters ] = useState([])

  const [ guessedLetters, setGuessedLetters ] = useState([])
  const [ wrongLetters, setWrongLetters ] = useState([])
  const [ guesses, setGuesses ] = useState(3)
  const [ score, setScore] = useState(20)

  const pickWorldAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]

    const wordsToCheck = words[category]
    const word = wordsToCheck[Math.floor(Math.random() * wordsToCheck.length)]

    return { word, category }
  }, [words])

  // starts secret world game
  const startGame = useCallback(() => {
    clearLetterStates()
    // pick world and pick category
    const { word, category } = pickWorldAndCategory()

    // create an array of letters
    let worldLetters = word.split("")

    setPickedWord(word)
    setPickedCategory(category)
    setScore(score)
    setLetters(worldLetters)
    setGuessedLetters(letters)

    setGameStage(stages[1].name)
  }, [pickWorldAndCategory, letters, score])

  // process the letter input
  const verifyLetter = (letter) => {
    const normalized = letter.toLowerCase()

    // check if letter has already been utilized
    if (guessedLetters.includes(normalized) || wrongLetters.includes(normalized)) {
      return 
    } 

    // push guessed letter or remove guess
    if (pickedWord.includes(letter)) {
      setGuessedLetters((prevGuessed) => [
        ...prevGuessed,
        normalized
      ])
    } else{
      setWrongLetters((prevWrong) => [
        ...prevWrong,
        normalized
      ])
      setGuesses(guesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
    setLetters([])
  }

  useEffect(() => {
    if (gameStage === 'game') {
      const uniqueLetters = [...new Set(letters)]
      
      if (guessedLetters.length === uniqueLetters.length) {
        // win condition
        setScore((prevScore) => prevScore += 100)
        startGame()
      }
    }
  }, [guessedLetters, letters, startGame, gameStage])

  useEffect(() => {
    // reset all states
    
    if (guesses === 0) {
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])
 
  // restarts the game
  const retry = () => {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && 
        <Game 
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          pickedWord={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}  
        /> }
      {gameStage === 'end' && 
        <GameOver 
          retry={ retry }
          score={score}
      /> }
    </div>
  );
}

export default App;
