import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#FF6347', '#FFD700', '#ADFF2F', '#1E90FF'];

const LevelSelect = ({ hintLevel, setHintLevel }) => {
    const [open, setOpen] = useState(false);

    const handleOptionClick = (level) => {
        setHintLevel(level);
        setOpen(false);
    };

    const filteredLevels = [...Array(4).keys()].filter(level => level !== hintLevel);

    const dropdownVariants = {
        closed: {
            borderRadius: '9999px',
            height: '40px',
            width: '160px',
            padding: '0 15px',
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                when: 'afterChildren',
            },
        },
        open: {
            borderRadius: '20px',
            height: 'auto',
            padding: '10px',
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                when: 'beforeChildren',
                staggerChildren: 0.05,
            },
        },
    };

    return (
        <div className="relative">
            <motion.div
                onClick={() => setOpen(!open)}
                className="rounded-full flex flex-col text-black bg-gray-100 items-center justify-between cursor-pointer overflow-hidden"
                initial={false}
                animate={open ? 'open' : 'closed'}
                variants={dropdownVariants}
            >
                <motion.div
                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                    layout
                    whileHover={{ scale: 1.05 }}
                >
                    <div
                        className="rounded-full w-4 h-4"
                        style={{ backgroundColor: COLORS[hintLevel] }}
                    />
                    <span className="text-lg font-medium">{`Level ${hintLevel + 1}`}</span>
                </motion.div>

                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="mt-2 space-y-2"
                        >
                            {filteredLevels.map(level => (
                                <motion.li
                                    key={level}
                                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                                    onClick={() => handleOptionClick(level)}
                                    whileHover={{ scale: 1.05 }}
                                    layout
                                >
                                    <div
                                        className="rounded-full w-4 h-4"
                                        style={{ backgroundColor: COLORS[level] }}
                                    />
                                    <span className="text-lg">{`Level ${level + 1}`}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default LevelSelect;
