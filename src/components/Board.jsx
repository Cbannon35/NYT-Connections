import React, { useState, useEffect } from 'react'
import Word from './Word'
import SelectedWord from './SelectedWord';

const Board = ({ game, setGame }) => {
    const [selectedCount, setSelectedCount] = useState(0);

    function guessWord(word) {
        if (game.currentGuess.includes(word) || selectedCount > 3) {
            return;
        }

        setGame(prevGame => ({
            ...prevGame,
            currentGuess: [...prevGame.currentGuess, word]
        }));

        setSelectedCount(prevCount => prevCount + 1);
    }

    function unguessWord(word) {
        if (!game.currentGuess.includes(word) || selectedCount <= 0) {
            return;
        }

        setGame(prevGame => ({
            ...prevGame,
            currentGuess: prevGame.currentGuess.filter(w => w !== word)
        }));

        setSelectedCount(prevCount => prevCount - 1);
    }

    return (
        <>
            <div className='cardContainer cardContainer2' >
                {game.words.map((word, index) => (
                    game.currentGuess.includes(word) ?
                        <SelectedWord key={index} word={word} unguessWord={unguessWord} /> :
                        <Word key={index} word={word} guessWord={guessWord} selectedCount={selectedCount} />
                ))}
            </div>
        </>
    )
}

export default Board