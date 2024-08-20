import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Board from "./Board";
import Menu from './Menu'
import { openDB, addItem, getItem } from '../utils/indexedDB.js';
import { ClientGame } from '../utils/game.js';
import Spinner from './Spinner.jsx';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 sec

const Game = () => {

    const date = useParams().date;
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const [correctGuess, setCorrectGuess] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    function guess(isCorrect) {
        setCorrectGuess((prev) => {
            if (isCorrect) {
                console.log(prev + 1)
                return prev + 1;
            } else {
                if (prev > 0) {
                    console.log(0)
                    return 0
                } else {
                    console.log(prev - 1)
                    return prev - 1;
                }
            }
        })
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    }
    /**
     * State hook for managing the game
     * @type {[ClientGame, function: React.Dispatch<ClientGame>]}
     */
    const [game, setGame] = useState(new ClientGame(date, []));

    /* TODO: Fetch the game data from NYT */
    useEffect(() => {
        setLoaded(false);

        const URL = `${import.meta.env.VITE_FAST_API_ENDPOINT}/${date}/words`;
        async function fetchWithRetry(url, retries) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                // console.log("data", data)

                if (response.status === 429) {
                    throw new Error("Rate limited");
                }

                if (data.error) {
                    console.error("Error fetching game data: ", data.error);
                    setError(true);
                    setLoaded(true);
                    return null;
                }

                return data;
            } catch (error) {
                if (retries > 0) {
                    console.log(`Retrying... (${retries} attempts left)`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                    return fetchWithRetry(url, retries - 1);
                } else {
                    // console.error("Error fetching game data: ", error);
                    setError(true);
                    setLoaded(true);
                    return null;
                }
            }
        }

        async function fetchGame() {
            try {
                // Attempt to read from IndexedDB
                const savedGame = await getItem(date);
                if (savedGame) {
                    // console.log("Found game in IndexedDB", savedGame);
                    setGame(savedGame.game);
                    setLoaded(true);
                    return;
                } else {
                    // console.log('Did not find game object in DB.');
                }
            } catch (error) {
                // console.log('Error reading game object from DB:', error);
            }

            const data = await fetchWithRetry(URL, MAX_RETRIES);

            if (data) {
                const fetchedGame = new ClientGame(date, data.data);
                setGame(fetchedGame);
                await addItem(date, fetchedGame);
                setLoaded(true);
            }
        }

        fetchGame();

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
            <Board game={game} setGame={setGame} correctGuess={correctGuess} isAnimating={isAnimating} />
            <section>
                <div className='flex justify-center'>
                    <p className='flex flex-row items-center gap-[10px]'>
                        Mistakes remaining:
                        <span className='flex flex-row gap-[10px]'>
                            <AnimatePresence>
                                {[...Array(4 - game.mistakes)].map((_, index) => (

                                    <motion.span key={index} className="bg-gray-600 w-[16px] h-[16px] rounded-full origin-center" exit={{ scale: 0 }} transition={{ duration: 0.2 }}></motion.span>

                                ))}
                            </AnimatePresence>
                        </span>
                    </p>
                </div>
            </section>
            <section>
                <Menu game={game} setGame={setGame} guessing={guess} />
            </section>
        </div>
    );
}

export default Game