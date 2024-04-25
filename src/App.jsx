import { useState } from 'react'
import Word from './components/Word'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='cardContainer cardContainer2'>
        {['Hello', 'World', 'Vite', 'React', 'Hello', 'World', 'Vite', 'React', 'Hello', 'World', 'Vite', 'React', 'Hello', 'World', 'Vite', 'React'].map((word, index) => (
          <Word key={index} word={word} />
        ))}
      </div>
    </>
  )
}

export default App
