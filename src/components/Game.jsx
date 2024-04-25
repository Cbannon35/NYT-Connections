import React, { useState, useEffect } from 'react'
import Board from "./Board";
import Menu from './Menu'
import { getShuffledTestWords } from '../utils/games'

const Game = ({ gameID }) => {

    const [loaded, setLoaded] = useState(false);
    const [game, setGame] = useState({
        id: gameID,
        solved: false,
        words: [],
        categories: [],
        guesses: [],
        currentGuess: [],
        mistakes: 0
    });

    // useEffect(() => {
    //     console.log(game.currentGuess)
    // }, [game.currentGuess]);

    useEffect(() => {
        setLoaded(false);
        setGame(prevGame => ({
            ...prevGame,
            words: getShuffledTestWords()
        }));
        setLoaded(true);

    }, [gameID]);

    if (!loaded) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <section>
                <Board game={game} setGame={setGame} />
            </section>
            <section>Mistakes</section>
            <section>
                <Menu game={game} setGame={setGame} />
            </section>
        </div>
    );
}

export default Game