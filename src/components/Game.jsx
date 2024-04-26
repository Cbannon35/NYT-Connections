import React, { useState, useEffect } from 'react'
import Board from "./Board";
import Menu from './Menu'
import { getShuffledTestWords } from '../utils/game.js'

// const { ClientGame } = require('../utils/types');
import { ClientGame } from '../utils/game.js';

const Game = ({ gameID }) => {

    const [loaded, setLoaded] = useState(false);
    /**
     * State hook for managing the game
     * @type {[ClientGame, function: React.Dispatch<ClientGame>]}
     */
    const [game, setGame] = useState(new ClientGame(gameID, []));

    /* TODO: Fetch the game data from the server */
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
            <section>
                <div>
                    <span>Mistakes emaining:</span>
                    <span></span>
                </div>
            </section>
            <section>
                <Menu game={game} setGame={setGame} />
            </section>
        </div>
    );
}

export default Game