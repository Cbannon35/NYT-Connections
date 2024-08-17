import React, { useState, useEffect } from 'react'
import Word from './Word'
import { ClientGame } from '../utils/game';
import "./Board.css"

import { getColor, COLORS } from '../utils/game';
import { addItem } from '../utils/indexedDB';

/**
 * The Board component
 * @param {ClientGame} game
 * @param {React.Dispatch<React.SetStateAction<ClientGame>>} setGame
 * @returns 
 */
const Board = ({ game, setGame }) => {

    function guessWord(word) {
        console.log('Guessing word:', word);
        if (game.currentGuess.includes(word)) {
            setGame(prevGame => ({
                ...prevGame,
                currentGuess: prevGame.currentGuess.filter(guess => guess !== word)
            }));
            return;
        }

        if (game.currentGuess.length >= 4) {
            return;
        }
        console.log('Adding word to guess:', word);

        setGame(prevGame => {
            const newGame = { ...prevGame };
            newGame.currentGuess.push(word);
            addItem(newGame.id, newGame);
            return newGame;
        });
    }

    return (
        <section className='boardContainer m-auto'>
            {game.categories.map((category, index) => (
                <section
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
                </section>
            ))}
            {game.words.map((word, index) => (
                <Word key={index} word={word} guessWord={guessWord} selectedCount={game.currentGuess.length} selected={game.currentGuess.includes(word)} />
            ))}
        </section>
    )
}

export default Board
