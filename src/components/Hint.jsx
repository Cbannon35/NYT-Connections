import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { COLORS, BACKGROUND_COLORS } from '../utils/game';
import { getItem, addItem } from '../utils/indexedDB';

const Portal = ({ children }) => {
    return ReactDOM.createPortal(
        children,
        document.body
    );
};

const loadingCircleTransition = {
    duration: 0.5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse",
}

const Hints = () => {
    const date = useParams().date;
    const [game, setGame] = useState(null);
    const [loadingGame, setLoadingGame] = useState(true);
    const [hintLevel, setHintLevel] = useState(0);
    const [canTap, setCanTap] = useState(true);

    useEffect(() => {
        getItem(date).then((result) => {
            if (result) {
                console.log("Found game in indexedDB", result.game)
                setGame(result.game);
                setLoadingGame(false);
            }
        });
    }, []);

    async function getHint() {
        setCanTap(false);

        // await new Promise(resolve => setTimeout(resolve, 5000));

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
            console.log(response)
            if (!response.ok) {
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
        <>
            {game.hints.length === 0 ?
                <h1>Hints you generate will appear here!</h1> :
                console.log(game.hints) ||
                <div className="flex flex-col gap-4 items-center px-8">
                    {game.hints.map((hint, index) => (
                        <motion.div
                            // whileTap={{ scale: 0.85 }}
                            key={index}
                            className='flex flex-row gap-4 items-center w-full h-24 sm:text-[20px] text-[16px] font-bold rounded-full text-center px-4'
                            style={{ backgroundColor: COLORS[hint.level] }}>
                            {hint.hint}
                        </motion.div>
                    ))}
                </div>
            }

            <Portal>
                <motion.menu
                    initial={{ y: "100%" }}
                    animate={{ y: -20 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 650, damping: 35 }}
                    className='fixed bottom-0 w-full flex flex-col items-center justify-center gap-2 z-100'
                >
                    <AnimatePresence >
                        {
                            canTap && <motion.button
                                initial={{ width: 0 }}
                                animate={{ width: 100 }}
                                exit={{ width: 0 }}
                                className="px-[15px] rounded-full text-sm font-light min-w-[5em] h-[2em] text-black bg-gray-100 flex flex-row gap-2 items-center justify-center"
                                whileTap={canTap ? { scale: 0.9 } : undefined}
                            >
                                <div className='rounded-full w-2 h-2' style={{ backgroundColor: COLORS[hintLevel] }} />
                                Level {hintLevel + 1}
                            </motion.button>
                        }
                    </AnimatePresence>
                    <motion.button
                        className="px-[15px] rounded-full font-semibold min-w-[5.5em] h-[3em] w-40 text-white bg-black flex justify-center items-center gap-2"
                        style={{ backgroundColor: canTap ? "black" : "grey" }}
                        whileTap={canTap ? { scale: 0.9 } : undefined}
                        disabled={!canTap}
                        onClick={getHint}
                    >
                        {canTap ?
                            <>Generate < svg width="18px" height="18px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#FFFFFF" aria-hidden="true"><path d="M3 21L13 11M18 6L15.5 8.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.5 2L10.4453 4.55468L13 5.5L10.4453 6.44532L9.5 9L8.55468 6.44532L6 5.5L8.55468 4.55468L9.5 2Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round"></path><path d="M19 10L19.5402 11.4598L21 12L19.5402 12.5402L19 14L18.4598 12.5402L17 12L18.4598 11.4598L19 10Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round"></path></svg></>
                            :
                            <>Generating
                                <motion.div
                                    className='flex flex-row gap-1'
                                    variants={{ start: { transition: { staggerChildren: 0.1 } }, end: { transition: { staggerChildren: 0.1 } } }}
                                    initial="start"
                                    animate="end"
                                >
                                    <motion.span
                                        className='rounded-full w-2 h-2 bg-white'
                                        variants={{ start: { y: "-25%" }, end: { y: "75%" } }}
                                        transition={loadingCircleTransition}
                                    />
                                    <motion.span
                                        className='rounded-full w-2 h-2 bg-white'
                                        variants={{ start: { y: "-25%" }, end: { y: "75%" } }}
                                        transition={loadingCircleTransition}
                                    />
                                    <motion.span
                                        className='rounded-full w-2 h-2 bg-white'
                                        variants={{ start: { y: "-25%" }, end: { y: "75%" } }}
                                        transition={loadingCircleTransition}
                                    />
                                </motion.div>
                            </>
                        }
                    </motion.button>
                </motion.menu>
            </Portal >
        </>
    );
};

export default Hints;