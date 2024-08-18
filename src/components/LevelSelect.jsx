// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { COLORS } from '../utils/game';

// const LevelSelect = ({ generating, hintLevel, setHintLevel }) => {
//     const [open, setOpen] = useState(false);

//     const handleOptionClick = (level) => {
//         setHintLevel(level);
//         setOpen(false);
//     };

//     const levels = [0, 1, 2, 3];

//     const dropdownVariants = {
//         closed: {
//             height: 'auto',
//             width: 'auto', // Set a fixed width
//             transition: {
//                 type: 'spring',
//                 stiffness: 500,
//                 damping: 30,
//             },
//         },
//         open: {
//             height: 'auto',
//             width: 'auto', // Keep the same width when open
//             transition: {
//                 type: 'spring',
//                 stiffness: 500,
//                 damping: 30,
//                 staggerChildren: 0.05,
//             },
//         },
//     };

//     const listVariants = {
//         open: {
//             opacity: 1,
//             height: 'auto',
//             transition: {
//                 type: 'spring',
//                 stiffness: 500,
//                 damping: 30,
//                 staggerChildren: 0.05,
//             },
//         },
//         closed: {
//             opacity: 0,
//             height: 0,
//             transition: {
//                 type: 'spring',
//                 stiffness: 500,
//                 damping: 30,
//                 when: 'afterChildren',
//             },
//         },
//     };

//     const itemVariants = {
//         open: {
//             opacity: 1,
//             x: 0,
//         },
//         closed: {
//             opacity: 0,
//             x: -50,
//         },
//     };

//     return (
//         generating ? null : (
//             <div className="relative">
//                 <motion.div
//                     onClick={() => setOpen(!open)}
//                     className="rounded-3xl text-black bg-gray-100 overflow-hidden"
//                     initial={false}
//                     animate={open ? 'open' : 'closed'}
//                     variants={dropdownVariants}
//                 >
//                     {open ? null : (
//                         <motion.div
//                             className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-full"
//                             layout
//                         >
//                             <div
//                                 className="rounded-full w-4 h-4"
//                                 style={{ backgroundColor: COLORS[hintLevel] }}
//                             />
//                             <span className="text-lg font-medium select-none">{`Level ${hintLevel + 1}`}</span>
//                         </motion.div>
//                     )}


//                     <AnimatePresence>
//                         {open && (
//                             <motion.ul
//                                 variants={listVariants}
//                                 initial="closed"
//                                 animate="open"
//                                 exit="closed"
//                                 className="space-y-2 mt-2"
//                             >
//                                 {levels.map(level => (
//                                     <motion.li
//                                         key={level}
//                                         variants={itemVariants}
//                                         className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
//                                         onClick={() => handleOptionClick(level)}
//                                         whileHover={{ scale: 1.05 }}
//                                     >
//                                         <div
//                                             className="rounded-full w-4 h-4"
//                                             style={{ backgroundColor: COLORS[level] }}
//                                         />
//                                         <span className="text-lg select-none">{level === hintLevel ? <b>Level {level + 1}</b> : `Level ${level + 1}`}</span>
//                                     </motion.li>
//                                 ))}
//                             </motion.ul>
//                         )}
//                     </AnimatePresence>
//                 </motion.div>
//             </div>
//         )
//     );
// };

// export default LevelSelect;


import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../utils/game';

const LevelSelect = ({ hintLevel, setHintLevel }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const levels = useMemo(() => [0, 1, 2, 3], []);

    const handleOptionClick = useCallback((level) => {
        setHintLevel(level);
        setOpen(false);
    }, [setHintLevel]);

    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const handleKeyDown = useCallback((event) => {
        if (!open) {
            if (event.key === 'Enter' || event.key === ' ') {
                setOpen(true);
                event.preventDefault();
            }
        } else {
            switch (event.key) {
                case 'Escape':
                    setOpen(false);
                    break;
                case 'ArrowUp':
                    setHintLevel(prev => (prev > 0 ? prev - 1 : levels.length - 1));
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    setHintLevel(prev => (prev < levels.length - 1 ? prev + 1 : 0));
                    event.preventDefault();
                    break;
                case 'Enter':
                case ' ':
                    setOpen(false);
                    event.preventDefault();
                    break;
                default:
                    break;
            }
        }
    }, [open, levels, setHintLevel]);

    const dropdownVariants = {
        closed: {
            height: '40px',
            width: '120px',
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
            },
        },
        open: {
            height: 'auto',
            width: '120px',
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
                staggerChildren: 0.05,
            },
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                when: 'afterChildren',
            },
        },
    };

    const itemVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: 0 },
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.div
                onClick={() => setOpen(!open)}
                onKeyDown={handleKeyDown}
                className="rounded-3xl text-black bg-gray-100 overflow-hidden cursor-pointer"
                initial={false}
                animate={open ? 'open' : 'closed'}
                variants={dropdownVariants}
                tabIndex={0}
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-controls="level-select-options"
            >
                {!open && <motion.div
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md"
                    layout
                >
                    <div
                        className="rounded-full w-4 h-4"
                        style={{ backgroundColor: COLORS[hintLevel] }}
                    />
                    <span className="text-lg font-medium select-none">{`Level ${hintLevel + 1}`}</span>
                </motion.div>
                }

                <AnimatePresence>
                    {open && (
                        <motion.ul
                            id="level-select-options"
                            variants={listVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="space-y-2 mt-2"
                            role="listbox"
                        >
                            {levels.map(level => (
                                <motion.li
                                    key={level}
                                    variants={itemVariants}
                                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                                    onClick={() => handleOptionClick(level)}
                                    whileHover={{ scale: 1.05 }}
                                    role="option"
                                    aria-selected={level === hintLevel}
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
    );
};

export default LevelSelect;