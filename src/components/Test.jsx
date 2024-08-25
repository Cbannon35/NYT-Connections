import React, { useState } from "react";
import { motion } from "framer-motion";

const FakeWord = ({ word, selected, onTap, position }) => {
    const bgColor = selected ? '#5A594E' : '#EFEFE6';
    const textColor = selected ? '#FFFFFF' : '#000000';

    return (
        <motion.div
            layoutId={word}
            style={{
                position: 'absolute',
                width: '6rem',
                height: '6rem',
                top: position.top,
                left: position.left,
                cursor: 'pointer',
                backgroundColor: bgColor,
                color: textColor,
            }}
            onTapStart={onTap}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="rounded-md select-none text-center content-center flex items-center justify-center"
        >
            <strong className='text-[16px] md:text-[20px]'>
                {word}
            </strong>
        </motion.div>
    );
};

const Test = () => {
    const [words, setWords] = useState(Array(16).fill(null).map((_, i) => ({
        word: `Word ${i + 1}`,
        selected: false,
        id: i,
        position: {
            top: `${Math.floor(i / 4) * 7}rem`,
            left: `${(i % 4) * 7}rem`,
        }
    })));

    const handleGuess = () => {
        const newWords = [...words];
        let firstRowIndex = 0;

        // Find the next available spot in the first row
        for (let i = 0; i < 4; i++) {
            if (!newWords[i].selected) {
                firstRowIndex = i;
                break;
            }
        }

        newWords.forEach((word, index) => {
            if (word.selected && index >= 4) { // Only move selected words not already in the first row
                // Swap positions
                const targetPosition = {
                    top: '0rem',
                    left: `${firstRowIndex * 7}rem`
                };

                // Find the word currently at the target position
                const targetWord = newWords[firstRowIndex];
                const originalPosition = word.position;

                // Swap the positions
                newWords[firstRowIndex].position = originalPosition;
                word.position = targetPosition;

                // Deselect the word in the first row
                newWords[firstRowIndex].selected = false;

                // Move to the next available spot in the first row
                firstRowIndex++;
            }
        });

        setWords(newWords);
    };

    const toggleSelectWord = (index) => {
        const newWords = words.map((word, i) =>
            i === index ? { ...word, selected: !word.selected } : word
        );
        setWords(newWords);
    };

    return (
        <div style={{ position: 'relative', width: '28rem', height: '28rem' }}>
            {words.map((wordObj, index) => (
                <FakeWord
                    key={wordObj.id}
                    word={wordObj.word}
                    selected={wordObj.selected}
                    onTap={() => toggleSelectWord(index)}
                    position={wordObj.position}
                />
            ))}
            <div className="fixed bottom-12 flex mt-8 space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleGuess}>Guess</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">Guess Wrong</button>
            </div>
        </div>
    );
};

export default Test;
