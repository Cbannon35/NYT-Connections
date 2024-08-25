import React from 'react'
import Word from './Word'
import { ClientGame } from '../utils/game';
import "./Board.css"

import { getColor } from '../utils/game';
import { addItem } from '../utils/indexedDB';
import { motion } from 'framer-motion'
import { useGameStore } from '../utils/gameStore';

/**
 * The Board component
 * @param {ClientGame} game
 * @param {React.Dispatch<React.SetStateAction<ClientGame>>} setGame
 * @returns 
 */
const Board = () => {
    const game = useGameStore((state) => state.game);
    const guessWord = useGameStore((state) => state.guessWord);

    return (
        <section className='boardContainer m-auto'>
            {game.categories.map((category, index) => (
                <motion.section
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={index}
                    style={{ backgroundColor: getColor(category.level) }}
                    className='rounded-md leading-[19px] flex flex-col justify-center items-center col-span-4'
                >
                    <h3 className='font-bold'>{category.group}</h3>
                    <ol>
                        {category.words.map((word, index) => (
                            <li
                                key={index}
                                className='inline'
                            >
                                {word}{index < category.words.length - 1 ? ',' : ''}{' '}
                            </li>
                        ))}
                    </ol>
                </motion.section>
            ))}
            {game.words.map((word, index) => (
                <Word key={index} word={word} guessWord={guessWord} selectedCount={game.currentGuess.length} selected={game.currentGuess.includes(word)} game={game} />
            ))}
        </section>
    )
}

export default Board
