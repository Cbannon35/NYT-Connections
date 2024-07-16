import React, { useState, useEffect } from 'react'
import Word from './Word'
import { checkTestGuess } from '../utils/game';
import { ClientGame } from '../utils/game';

/**
 * The Board component
 * @param {ClientGame} game
 * @param {React.Dispatch<React.SetStateAction<ClientGame>>} setGame
 * @returns 
 */
const Board = ({ game, setGame }) => {

    function guessWord(word) {
        if (game.currentGuess.includes(word)) {
            setGame(prevGame => ({
                ...prevGame,
                currentGuess: prevGame.currentGuess.filter(guess => guess !== word)
            }));
            return;
        }

        if (game.currentGuess.length >= 4) {
            return;
        }

        setGame(prevGame => ({
            ...prevGame,
            currentGuess: [...prevGame.currentGuess, word]
        }));
    }

    return (
        <div className='flex flex-col justify-center boardContainer my-[24px]'>
            <div className='flex flex-col gap-[8px]'>
                {game.categories.map((category, index) => (
                    <div key={index}>
                        <span>{category}</span>
                    </div>
                ))}
            </div>
            <div className='cardContainer cardContainer2' >
                {game.words.map((word, index) => (
                    <Word key={index} word={word} guessWord={guessWord} selectedCount={game.currentGuess.length} selected={game.currentGuess.includes(word)} />
                ))}
            </div>
        </div>
    )
}

export default Board