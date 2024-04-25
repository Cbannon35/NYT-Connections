import React, { useState, useEffect } from 'react'
import { getShuffledTestWords } from '../utils/games'

const Menu = ({ game, setGame }) => {

    function deselectAll() {
        setGame(prevGame => ({
            ...prevGame,
            currentGuess: []
        }));
    }

    function shuffle() {
        setGame(prevGame => ({
            ...prevGame,
            words: getShuffledTestWords()
        }));
    }
    return (
        <div className='flex flex-row gap-10 justify-center'>
            <button className="px-[15py] border border-black rounded-full" onClick={shuffle}>Shuffle</button>
            <button className="" disabled={game.currentGuess.length == 0} onClick={deselectAll}>Deselect all</button>
            <button className="" disabled={game.currentGuess.length != 4}>Submit</button>
        </div>
    )
}

export default Menu