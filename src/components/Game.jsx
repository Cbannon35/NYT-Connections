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
        <div className='flex flex-col gap-[20px]'>
            <section>
                <Board game={game} setGame={setGame} />
            </section>
            <section>
                <div className='flex justify-center'>
                    <p className='flex flex-row items-center gap-[10px]'>
                        Mistakes remaining:
                        <span className='flex flex-row gap-[10px]'>
                            {[...Array(4 - game.mistakes)].map((_, index) => (
                                <span key={index} className="bg-gray-600 w-[16px] h-[16px] rounded-full"></span>
                            ))}
                        </span>
                    </p>
                </div>
            </section>
            <section>
                <Menu game={game} setGame={setGame} />
            </section>
        </div>
    );
}

export default Game