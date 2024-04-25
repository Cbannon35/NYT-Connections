import { useState } from 'react'
import Game from './components/Game'
import './App.css'

const myDate = new Date();
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
const formattedDate = formatDate(myDate);
console.log("Today's Date: ", formattedDate);

function App() {
  const [gameID, setGameID] = useState("test");

  return (
    <>
      <Game gameID={gameID} />
    </>
  )
}

export default App
