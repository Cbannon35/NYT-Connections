import { COLORS } from "../utils/game";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const emojis = ["🟨", "🟩", "🟦", "🟪"]

const Results = ({ game }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const results = game.results

    const getWordLevel = (word) => {
        for (let i = 0; i < results.length; i++) {
            for (let j = 0; j < results[i].words.length; j++) {
                if (results[i].words[j] === word) {
                    return results[i].level
                }
            }
        }
    }

    const copyToClipboard = () => {
        // Create the result string to be copied
        const resultText = "Connections puzzle for " + game.id + "\n\n" + game.guesses.map((guess, index) => {
            return `${guess.map(word => `${emojis[getWordLevel(word)]}`).join('')}`
        }).join('\n');

        // Copy the result string to the clipboard
        navigator.clipboard.writeText(resultText).then(() => {
            setCopySuccess(true); // Show success message
            setTimeout(() => setCopySuccess(false), 3000); // Hide the message after 3 seconds
        }, () => {
            // Handle the error case if needed
            setCopySuccess(false);
        });
    };
    return (
        <div className="flex flex-col gap-2 items-center">
            <h1 className="text-3xl font-extralight">{game.lost ? "Better luck next time" : "You solved it!"}</h1>
            {game.lost ? null : <h2 className="text-2xl font-extralight">It took you {game.guesses.length} guesses</h2>}

            <div className="flex flex-col gap-2">
                {game.guesses.map((guess, index) => (
                    <div key={index} className="flex flex-row">
                        {guess.map((word, index) => (
                            <div key={index} className="w-10 h-10 rounded-md" style={{ backgroundColor: COLORS[getWordLevel(word)] }} />
                        ))}
                    </div>
                ))
                }
            </div>
            <motion.button
                className="px-[15px] rounded-full font-semibold min-w-[5.5em] h-[3em] w-fit bg-black text-white"
                whileTap={{ scale: 0.9 }}
                onTapStart={copyToClipboard}
            >
                Share Your Results
            </motion.button>
            <AnimatePresence>
                {copySuccess && (
                    <motion.div
                        className="mt-2 flex gap-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M8.5 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M15.5 4H18C19.1046 4 20 4.89543 20 6V15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M8 6.4V4.5C8 4.22386 8.22386 4 8.5 4C8.77614 4 9.00422 3.77604 9.05152 3.50398C9.19968 2.65171 9.77399 1 12 1C14.226 1 14.8003 2.65171 14.9485 3.50398C14.9958 3.77604 15.2239 4 15.5 4C15.7761 4 16 4.22386 16 4.5V6.4C16 6.73137 15.7314 7 15.4 7H8.6C8.26863 7 8 6.73137 8 6.4Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M15.5 20.5L17.5 22.5L22.5 17.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Results;