import React, { useState, useEffect } from 'react'

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    a = a.slice().sort();
    b = b.slice().sort();

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

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
        setGame(prevGame => {
            const newGame = { ...prevGame };
            newGame.words = newGame.words.sort(() => Math.random() - 0.5);
            return newGame;
        });
    }

    async function submit() {
        if (game.currentGuess.length != 4) {
            console.log("Somehow submit was clicked without 4 words selected")
            return;
        }
        const guess = game.currentGuess;
        for (let prev_guess of game.guesses) {
            if (arraysEqual(guess, prev_guess)) {
                console.log("Already guessed this combination");
                return;
            }
        }

        const url = `http://localhost:8000/${game.id}/guess`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ guess: guess }),
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            const guess_level = data.data.level;
            game.guesses.push(guess);
            if (guess_level == -1) {
                console.log("Incorrect guess");
                setGame(prevGame => ({
                    ...prevGame,
                    mistakes: prevGame.mistakes + 1,
                    lost: prevGame.mistakes >= 3
                }));
            } else {
                console.log("Correct guess: ", guess_level);
                setGame(prevGame => ({
                    ...prevGame,
                    categories: [...prevGame.categories, {
                        level: guess_level,
                        group: data.data.group,
                        words: guess
                    }],
                    currentGuess: [],
                    words: [...prevGame.words.filter(word => !prevGame.currentGuess.includes(word))],
                    solved: prevGame.categories.length >= 3
                }));
            }
        } catch (error) {
            console.error("Error submitting guess: ", error);
        }
    }

    return (
        <div className='flex flex-row gap-[10px] justify-center'>
            {game.solved || game.lost ?
                <button className="px-[15py] rounded-full font-semibold min-w-[7.5em] h-[3em] w-fit" style={{ border: "1px solid black" }}>View Results</button> :
                <>
                    <button className="px-[15py] rounded-full font-semibold min-w-[5.5em] h-[3em] w-fit" onClick={shuffle} style={{ border: "1px solid black" }}>Shuffle</button>
                    <button className="px-[15py] rounded-full font-semibold min-w-[7.5em] h-[3em] w-fit" style={{ border: `1px solid ${deslectDisable ? "grey" : "black"}`, color: `${deslectDisable ? "grey" : "black"}` }} disabled={deslectDisable} onClick={deselectAll}>Deselect all</button>
                    <button className="px-[15py] rounded-full font-semibold min-w-[5.5em] h-[3em] w-fit" style={{ border: `1px solid ${submitDisable ? "grey" : "black"}`, color: `${submitDisable ? "grey" : "white"}`, backgroundColor: `${submitDisable ? "" : "black"}` }} disabled={submitDisable} onClick={submit}>Submit</button>
                </>}
        </div>
    )
}

export default Menu