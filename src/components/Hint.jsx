import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { COLORS, BACKGROUND_COLORS } from '../utils/game';
import { getItem, addItem } from '../utils/indexedDB';
import LevelSelect from './LevelSelect';
import Spinner from './Spinner';

const Hints = () => {
    const date = useParams().date;
    const [game, setGame] = useState(null);
    const [loadingGame, setLoadingGame] = useState(true);
    const [hintLevel, setHintLevel] = useState(0);
    const [canTap, setCanTap] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const lastHintRef = useRef(null);

    useEffect(() => {
        getItem(date).then((result) => {
            if (result) {
                setGame(result.game);
                setLoadingGame(false);
            }
        });
    }, []);

    useEffect(() => {
        // Scroll to the last hint whenever game.hints changes
        if (lastHintRef.current) {
            lastHintRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [game?.hints]);

    async function getHint() {
        setCanTap(false);

        const url = `${import.meta.env.VITE_FAST_API_ENDPOINT}/${date}/hint`;
        const prevGuesses = game.hints.filter(hint => hint.level == hintLevel).length;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ level: hintLevel, prev_hints: prevGuesses }),
            })
            if (!response.ok) {
                if (response.status === 400) {
                    setError("Max hints reached for level");
                    setTimeout(() => setError(false), 2000);
                } else if (response.status === 429) {
                    setError("Requested too fast");
                    setTimeout(() => setError(false), 2000);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // const hint: Hint = new Hint(data.hint, hintLevel, new Date());
            const hint = {
                hint: data.data,
                level: hintLevel,
                date: new Date(),
            };

            setGame({ ...game, hints: [...game.hints, hint] });
            addItem(date, { ...game, hints: [...game.hints, hint] });
        } catch (error) {
            console.error("Error submitting guess: ", error);
        }

        setCanTap(true);
    }

    if (loadingGame === true) {
        return <h1>Retrieving Hints...</h1>
    }

    return (
        <div className='absolute inset-0 flex flex-col'>
            {game.hints.length === 0 ?
                <h1 className='flex flex-1 pt-8 justify-center'>Hints you generate will appear here!</h1> :
                <div className="flex flex-col flex-1 gap-4 items-center mt-4 mb-4 px-8 overflow-y-scroll no-scrollbar">
                    {game.hints.map((hint, index) => (
                        <motion.div
                            initial={{ width: "100px" }}
                            animate={{ width: "100%" }}
                            key={index}
                            className='flex flex-row gap-4 items-center w-full min-h-24 md:text-[20px] text-[16px] font-bold rounded-[2rem] text-center px-4 min-w-[100px]'
                            style={{ backgroundColor: COLORS[hint.level] }}
                            ref={index === game.hints.length - 1 ? lastHintRef : null}
                        >
                            {hint.hint}
                        </motion.div>
                    ))}
                </div>
            }
            <motion.menu
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 650, damping: 35 }}
                className='sticky bottom-0 w-full py-6 border-black border-t-[1px] z-[999999999] bg-white'
            >
                <div className='relative flex flex-col items-center justify-center gap-2 pb-4 pt-8'>
                    <LevelSelect generating={!canTap} hintLevel={hintLevel} setHintLevel={setHintLevel} />


                    <motion.button
                        className="px-[15px] rounded-full font-semibold min-w-[5.5em] h-[3em] w-40 text-white bg-black flex justify-center items-center gap-2 select-none"
                        style={{ backgroundColor: error ? '#fc716b' : canTap ? "black" : "grey" }}
                        whileTap={canTap && !error ? { scale: 0.9 } : undefined}
                        disabled={!canTap || error}
                        onClick={getHint}
                        initial={false}
                        animate={{ width: "auto" }}
                    >
                        {error ? error :
                            canTap ?
                                <>Generate < svg width="18px" height="18px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#FFFFFF" aria-hidden="true"><path d="M3 21L13 11M18 6L15.5 8.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.5 2L10.4453 4.55468L13 5.5L10.4453 6.44532L9.5 9L8.55468 6.44532L6 5.5L8.55468 4.55468L9.5 2Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round"></path><path d="M19 10L19.5402 11.4598L21 12L19.5402 12.5402L19 14L18.4598 12.5402L17 12L18.4598 11.4598L19 10Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round"></path></svg></>
                                :
                                <>Generating
                                    <Spinner color="white" width="8px" height="8px" />
                                </>
                        }
                    </motion.button>
                </div>
            </motion.menu >
        </div>
    );
};

export default Hints;