import React, { useState, useEffect } from 'react'
import { getShuffledTestWords, checkTestGuess } from '../utils/game'

const Menu = ({ game, setGame }) => {

    const deslectDisable = game.currentGuess.length == 0
    const submitDisable = game.currentGuess.length != 4

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

    function submit() {
        if (game.currentGuess.length != 4) {
            console.log("Somehow submit was clicked without 4 words selected")
            return;
        }

        game.guesses.push(game.currentGuess);

        if (game.id === 'test') {
            submitTest();
            return;
        }
        /* TODO: Submit the guess to the server for validation */
        console.log("TODO backend w/ fast")
    }

    function submitTest() {
        const category = checkTestGuess(game.currentGuess);
        if (category) {
            console.log("Correct guess: ", category);
            setGame(prevGame => ({
                ...prevGame,
                categories: [...prevGame.categories, category],
                currentGuess: [],
                words: [...prevGame.words.filter(word => !prevGame.currentGuess.includes(word))],
                solved: prevGame.categories.length >= 3
            }));
        } else {
            console.log("Incorrect guess");
            setGame(prevGame => ({
                ...prevGame,
                mistakes: prevGame.mistakes + 1,
                lost: prevGame.mistakes >= 3
            }));
        }
    }

    return (
        <div className='flex flex-row gap-[10px] justify-center'>
            {game.solved || game.lost ?
                <button className="px-[15py] rounded-full font-semibold min-w-[7.5em] h-[3em] w-fit" style={{ border: "1px solid black" }}>View Results</button> :
                <>
                    <button className="px-[15py] rounded-full font-semibold min-w-[5.5em] h-[3em] w-fit" onClick={shuffle} style={{ border: "1px solid black" }}>Shuffle</button>
                    <button className="px-[15py] rounded-full font-semibold min-w-[7.5em] h-[3em] w-fit" style={{ border: `1px solid ${deslectDisable ? "grey" : "black"}`, color: `${deslectDisable ? "grey" : "black"}` }} disabled={deslectDisable} onClick={deselectAll}>Deselect all</button>
                    <button className="px-[15py] rounded-full font-semibold min-w-[5.5em] h-[3em] w-fit" style={{ border: `1px solid ${submitDisable ? "grey" : "black"}`, color: `${submitDisable ? "grey" : "black"}` }} disabled={submitDisable} onClick={submit}>Submit</button>
                </>}
        </div>
    )
}

export default Menu