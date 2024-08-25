import React, { useEffect } from 'react'
import Word from './Word'
import "./Board.css"
import { getColor } from '../utils/game';
import { motion } from 'framer-motion'
import { useGameStore } from '../utils/gameStore';


const Board = () => {
    const game = useGameStore((state) => state.game);
    const guessWord = useGameStore((state) => state.guessWord);

    const guessAnimating = useGameStore((state) => state.guessAnimating);
    const correctGuessAnimating = useGameStore((state) => state.correctGuessAnimating);
    const incorrectGuessAnimating = useGameStore((state) => state.incorrectGuessAnimating);

    useEffect(() => {
        if (!guessAnimating) return;
        const selectedIndices = game.words
            .map((word, index) => game.currentGuess.includes(word) ? index : -1)
            .filter(index => index !== -1);

        selectedIndices.forEach((index, i) => {
            const animationControls = document.getElementById(`word-${index}`);
            if (animationControls) {
                animationControls.animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-15px)' },
                    { transform: 'translateY(0)' }
                ], {
                    duration: 400,
                    delay: i * 150,
                    easing: 'ease-in-out',
                    fill: 'forwards',
                });
            }
        });

    }, [guessAnimating]);

    useEffect(() => {
        if (!incorrectGuessAnimating) return;
        const selectedIndices = game.words
            .map((word, index) => game.currentGuess.includes(word) ? index : -1)
            .filter(index => index !== -1);

        selectedIndices.forEach((index, i) => {
            const animationControls = document.getElementById(`word-${index}`);
            if (animationControls) {
                animationControls.animate([
                    { transform: 'translateX(-3px)' },
                    { transform: 'translateX(3px)' },
                    { transform: 'translateX(-3px)' },
                    { transform: 'translateX(3px)' },
                    { transform: 'translateX(0)' }
                ], {
                    duration: 300,
                    easing: 'ease-in-out',
                    fill: 'forwards',
                });
            }
        });

    }, [guessAnimating]);

    // useEffect(() => {
    //     if (!correctGuessAnimating) return;

    //     const selectedIndices = game.words
    //         .map((word, index) => game.currentGuess.includes(word) ? index : -1)
    //         .filter(index => index !== -1);

    //     const firstRowIndices = [0, 1, 2, 3];
    //     const swapPairs = selectedIndices
    //         .filter(index => !firstRowIndices.includes(index))
    //         .map((selectedIndex, i) => ({
    //             selectedIndex,
    //             firstRowIndex: firstRowIndices[i % firstRowIndices.length]
    //         }));

    //     swapPairs.forEach(({ selectedIndex, firstRowIndex }) => {
    //         const selectedElement = document.getElementById(`word-${selectedIndex}`);
    //         const firstRowElement = document.getElementById(`word-${firstRowIndex}`);

    //         if (selectedElement && firstRowElement) {
    //             // Swap their positions using CSS grid row/column or absolute positioning
    //             const selectedElementRect = selectedElement.getBoundingClientRect();
    //             const firstRowElementRect = firstRowElement.getBoundingClientRect();

    //             // Temporarily use absolute positioning to animate the swap
    //             selectedElement.style.position = 'absolute';
    //             firstRowElement.style.position = 'absolute';

    //             selectedElement.style.zIndex = '1';
    //             firstRowElement.style.zIndex = '1';

    //             selectedElement.style.transition = 'transform 0.5s ease-in-out';
    //             firstRowElement.style.transition = 'transform 0.5s ease-in-out';

    //             selectedElement.style.transform = `translate(${firstRowElementRect.left - selectedElementRect.left}px, ${firstRowElementRect.top - selectedElementRect.top}px)`;
    //             firstRowElement.style.transform = `translate(${selectedElementRect.left - firstRowElementRect.left}px, ${selectedElementRect.top - firstRowElementRect.top}px)`;

    //             // After the animation ends, remove the inline styles and swap the grid positions
    //             setTimeout(() => {
    //                 selectedElement.style.position = '';
    //                 firstRowElement.style.position = '';
    //                 selectedElement.style.zIndex = '';
    //                 firstRowElement.style.zIndex = '';
    //                 selectedElement.style.transition = '';
    //                 firstRowElement.style.transition = '';
    //                 selectedElement.style.transform = '';
    //                 firstRowElement.style.transform = '';

    //                 // Swap the elements in the DOM
    //                 const selectedParent = selectedElement.parentNode;
    //                 const firstRowParent = firstRowElement.parentNode;

    //                 selectedParent.insertBefore(selectedElement, firstRowElement);
    //                 firstRowParent.insertBefore(firstRowElement, selectedElement);
    //             }, 500);
    //         }
    //     });

    // }, [correctGuessAnimating]);

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
            {!game.lost && !game.solved && (

                game.words.map((word, index) => (
                    <motion.div
                        key={index}
                        id={`word-${index}`}
                    >
                        <Word word={word} guessWord={guessWord} selectedCount={game.currentGuess.length} selected={game.currentGuess.includes(word)} game={game} />
                    </motion.div>
                ))
            )}
        </section>
    )
}

export default Board
