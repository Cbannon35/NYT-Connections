import React, { useState, useEffect } from 'react'
import Results from './Results';
import BottomSheet from './BottomSheet';

import { addItem } from '../utils/indexedDB';
import { useGameStore } from '../utils/gameStore';

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

const delay = ms => new Promise(res => setTimeout(res, ms));

const Menu = () => {

    const [showResults, setShowResults] = useState(false);

    const game = useGameStore((state) => state.game);
    const loaded = useGameStore((state) => state.loaded);
    const deselectAll = useGameStore((state) => state.deselctAll);
    const shuffle = useGameStore((state) => state.shuffleGame);
    const setResults = useGameStore((state) => state.setResults);
    const correctGuess = useGameStore((state) => state.correctGuess);
    const incorrectGuess = useGameStore((state) => state.incorrectGuess);

    const setGuessAnimating = useGameStore((state) => state.setGuessAnimating);
    const setCorrectGuessAnimating = useGameStore((state) => state.setCorrectGuessAnimating);
    const setIncorrectGuessAnimating = useGameStore((state) => state.setIncorrectGuessAnimating);

    const deslectDisable = game.currentGuess.length == 0
    const submitDisable = game.currentGuess.length != 4

    useEffect(() => {
        if (!game) return;
        const url = `${import.meta.env.VITE_FAST_API_ENDPOINT}/${game.id}/categories/complete`;
        async function fetchCategoryResults() {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const results = [];
                for (let i = 0; i < data.data.length; i++) {
                    const category = data.data[i];
                    results.push({
                        level: i,
                        group: category.group,
                        words: category.members
                    });
                }
                setResults(results);

            } catch (error) {
                console.error("Error completing categories: ", error);
            }
        }
        if (game.solved || game.lost) {
            fetchCategoryResults();
        }
    }, [game.solved, game.lost]);

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

        setGuessAnimating(true);
        console.log("animating guess")
        const url = `${import.meta.env.VITE_FAST_API_ENDPOINT}/${game.id}/guess`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ guess: guess }),
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }); new Error(`HTTP error! status: ${response.status}`);

            const guessDelay = delay(1500)
            const [data] = await Promise.all([response, guessDelay]);
            const guess_level = data.data.level;
            setGuessAnimating(false)
            console.log('stop guess')

            if (guess_level == -1) {
                console.log("firing")
                incorrectGuess(guess);
                setIncorrectGuessAnimating(true);
                await delay(300);
                setIncorrectGuessAnimating(false)
            } else {
                setCorrectGuessAnimating(true);
                await delay(500);
                correctGuess(guess, data.data);
                setCorrectGuessAnimating(false);
            }
        } catch (error) {
            console.error("Error submitting guess: ", error);
        }
    }

    if (!loaded) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className='flex flex-row gap-[10px] justify-center'>
                {game && (game.solved || game.lost) ?
                    <button className="px-[15py] rounded-full font-semibold min-w-[7.5em] h-[3em] w-fit" style={{ border: "1px solid black" }} onClick={() => setShowResults(true)}>View Results</button>
                    :
                    <>
                        <button className="px-[15py] rounded-full font-semibold min-w-[5.5em] h-[3em] w-fit" onClick={shuffle} style={{ border: "1px solid black" }}>Shuffle</button>
                        <button className="px-[15py] rounded-full font-semibold min-w-[7.5em] h-[3em] w-fit" style={{ border: `1px solid ${deslectDisable ? "grey" : "black"}`, color: `${deslectDisable ? "grey" : "black"}` }} disabled={deslectDisable} onClick={deselectAll}>Deselect all</button>
                        <button className="px-[15py] rounded-full font-semibold min-w-[5.5em] h-[3em] w-fit" style={{ border: `1px solid ${submitDisable ? "grey" : "black"}`, color: `${submitDisable ? "grey" : "white"}`, backgroundColor: `${submitDisable ? "" : "black"}` }} disabled={submitDisable} onClick={submit}>Submit</button>
                    </>}
            </div>
            <BottomSheet isVisible={showResults} title={"Results"} onClose={() => setShowResults(false)}>
                <Results />
            </BottomSheet>
        </>
    )
}

export default Menu