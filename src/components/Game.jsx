import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Board from "./Board";
import Menu from './Menu'
import { openDB, addItem, getItem } from '../utils/indexedDB.js';
import { ClientGame } from '../utils/game.js';
import Spinner from './Spinner.jsx';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../utils/gameStore.js';

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 sec

const Game = () => {

    const date = useParams().date;
    /**
     * State hook for managing the game
     * @type {[ClientGame, function: React.Dispatch<ClientGame>]}
     */
    const game = useGameStore((state) => state.game);
    const loaded = useGameStore((state) => state.loaded);
    const error = useGameStore((state) => state.error);
    const setGame = useGameStore((state) => state.setNewGame);
    const setLoaded = useGameStore((state) => state.setLoaded);
    const setError = useGameStore((state) => state.setError);
    const shuffleGame = useGameStore((state) => state.shuffleGame);
    const loadGame = useGameStore((state) => state.loadGame);


    /* TODO: Fetch the game data from NYT */
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setLoaded(false);

        const URL = `${import.meta.env.VITE_FAST_API_ENDPOINT}/${date}/words`;
        async function fetchWithRetry(url, retries) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                // console.log("data", data)

                if (data.code === 429) {
                    throw new Error("Rate limited");
                }

                if (data.code !== 200) {
                    throw new Error("Error fetching game data");
                }

                return data;
            } catch (error) {
                if (retries > 0) {
                    console.log(`Retrying... (${retries} attempts left)`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                    return fetchWithRetry(url, retries - 1);
                } else {
                    return null;
                }
            }
        }

        async function fetchGame() {
            let foundGame = await loadGame(date);
            if (foundGame) {
                console.log("Game already exists in indexedDB");
                setLoaded(true);
                return;
            }

            const data = await fetchWithRetry(URL, MAX_RETRIES);
            if (data === null) {
                console.error("Error fetching game data: ", error);
                setError(true);
                setLoaded(true);
            } else {
                const fetchedGame = new ClientGame(date, data.data);
                setGame(fetchedGame);
            }
        }
        fetchGame();

        return () => {
            // Abort the fetch if the component unmounts
            controller.abort();
        };

    }, [date]);

    if (!loaded) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <Spinner color={"black"} width={"20px"} height={"20px"} />
            </div>
        )
    }

    if (error) {
        return (
            <div className='mt-36 flex flex-col justify-center text-center'>
                There was an error getting this connections game <br /> Please try again later
                <NavLink to="/games" className="text-blue-500 underline">Back to games</NavLink>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-[18px] mt-16'>
            <div className='text-center pt-4'>Create four groups of four!</div>
            <Board game={game} setGame={setGame} />
            <section>
                <div className='flex justify-center'>
                    <p className='flex flex-row items-center gap-[10px]'>
                        Mistakes remaining:
                        <span className='flex flex-row gap-[10px]'>
                            <AnimatePresence>
                                {[...Array((4 - game.mistakes) > 0 ? (4 - game.mistakes) : 0)].map((_, index) => (

                                    <motion.span key={index} className="bg-gray-600 w-[16px] h-[16px] rounded-full origin-center" exit={{ scale: 0 }} transition={{ duration: 0.2 }}></motion.span>

                                ))}
                            </AnimatePresence>
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