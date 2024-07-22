import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Board from "./Board";
import Menu from './Menu'
import { openDB, addItem, getItem } from '../utils/indexedDB.js';
import { ClientGame } from '../utils/game.js';

const textDate = (date) => {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [year, month, day] = date.split('-');
    return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
}


const Game = () => {

    const date = useParams().date;

    const [loaded, setLoaded] = useState(false);
    /**
     * State hook for managing the game
     * @type {[ClientGame, function: React.Dispatch<ClientGame>]}
     */
    const [game, setGame] = useState(new ClientGame(date, []));

    /* TODO: Fetch the game data from NYT */
    useEffect(() => {
        setLoaded(false);

        const URL = `${import.meta.env.VITE_FAST_API_ENDPOINT}/${date}/words`;
        async function fetchGame() {
            // attempt to read from indexedDB
            try {
                const game = await getItem(date);
                if (game !== undefined) {
                    console.log("Found game in indexedDB", game)
                    setGame(game.game)
                    setLoaded(true);
                    return;
                }
                else {
                    console.log('Did not find game object in DB.')
                }
            } catch (error) {
                console.log('Did not find game object in DB. Error:', error);
            }

            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)

                const game = new ClientGame(date, data.data);
                setGame(game);
                await addItem(date, game);
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching game data: ", error);
            }
        }
        fetchGame();
    }, [date]);

    if (!loaded) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className='flex flex-col gap-[18px]'>
            <header className='border-b border-black pt-8'>
                <h1 className='text-center text-3xl sm:text-4xl'><span>{textDate(date)}</span>
                </h1>
            </header>
            <div className='text-center'>Create four groups of four!</div>
            <Board game={game} setGame={setGame} />
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