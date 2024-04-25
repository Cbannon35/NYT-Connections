import React, { useState, useEffect } from 'react'
import Word from './Word'
import SelectedWord from './SelectedWord';
import { checkTestGuess } from '../utils/games';


/**
 * The Board component
 * @param {ClientGame} game
 * @param {React.Dispatch<React.SetStateAction<ClientGame>>} setGame
 * @returns 
 */
const Board = ({ game, setGame }) => {

    function guessWord(word) {
        if (game.currentGuess.includes(word) || game.currentGuess.length > 3) {
            return;
        }

        setGame(prevGame => ({
            ...prevGame,
            currentGuess: [...prevGame.currentGuess, word]
        }));
    }

    function unguessWord(word) {
        if (!game.currentGuess.includes(word) || game.currentGuess.length <= 0) {
            return;
        }

        setGame(prevGame => ({
            ...prevGame,
            currentGuess: prevGame.currentGuess.filter(w => w !== word)
        }));
    }

    return (
        <div>
            <div>
                "hi"
            </div>
            <div className='cardContainer cardContainer2' >
                {game.words.map((word, index) => (
                    game.currentGuess.includes(word) ?
                        <SelectedWord key={index} word={word} unguessWord={unguessWord} /> :
                        <Word key={index} word={word} guessWord={guessWord} selectedCount={game.currentGuess.length} />
                ))}
            </div>
        </div>
    )
}

export default Board