import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../utils/game';

const LevelSelect = ({ generating, hintLevel, setHintLevel }) => {
    const [open, setOpen] = useState(false);

    const handleOptionClick = (level) => {
        setHintLevel(level);
        setOpen(false);
    };

    const levels = [0, 1, 2, 3];

    const dropdownVariants = {
        closed: {
            height: '40px',
            width: '120px', // Set a fixed width
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
            },
        },
        open: {
            height: 'auto',
            width: '120px', // Keep the same width when open
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                staggerChildren: 0.05,
            },
        },
    };

    const listVariants = {
        open: {
            opacity: 1,
            height: 'auto',
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                // staggerChildren: 0.05,
            },
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                // when: 'afterChildren',
            },
        },
    };

    const itemVariants = {
        open: {
            opacity: 1,
            x: 0,
        },
        closed: {
            opacity: 0,
            x: -50,
        },
    };

    return (
        generating ? null : (
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-24">
                <motion.div
                    onClick={() => setOpen(!open)}
                    className="rounded-3xl text-black bg-gray-100"
                    initial={false}
                    animate={open ? 'open' : 'closed'}
                    variants={dropdownVariants}
                >
                    {open ? null : (
                        <motion.div
                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-full"
                            layout
                        >
                            <div
                                className="rounded-full w-4 h-4"
                                style={{ backgroundColor: COLORS[hintLevel] }}
                            />
                            <span className="text-lg font-medium select-none">{`Level ${hintLevel + 1}`}</span>
                        </motion.div>
                    )}


                    <AnimatePresence>
                        {open && (
                            <motion.ul
                                variants={listVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="space-y-2 mt-2 origin-bottom"
                            >
                                {levels.map(level => (
                                    <motion.li
                                        key={level}
                                        variants={itemVariants}
                                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                                        onClick={() => handleOptionClick(level)}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div
                                            className="rounded-full w-4 h-4"
                                            style={{ backgroundColor: COLORS[level] }}
                                        />
                                        <span className="text-lg select-none">{level === hintLevel ? <b>Level {level + 1}</b> : `Level ${level + 1}`}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        )
    );
};

export default LevelSelect;
