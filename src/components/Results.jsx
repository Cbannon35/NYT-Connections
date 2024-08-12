import { COLORS } from "../utils/game";
import { motion } from "framer-motion";
const Results = ({ game }) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <h1 className="text-3xl font-extralight">{game.lost ? "Better luck next time" : "You solved it!"}</h1>
            <h2 className="text-2xl font-extralight">It took you {game.guesses.length} guesses</h2>

            <div className="flex flex-col gap-2">
                {game.results.map((result, index) => (
                    <div key={index} className="flex flex-row">
                        {result.words.map((word, index) => (
                            <div key={index} className="w-10 h-10 rounded-md" style={{ backgroundColor: COLORS[result.level] }} />
                        ))}
                    </div>
                ))
                }
            </div>
            <motion.button
                className="px-[15px] rounded-full font-semibold min-w-[5.5em] h-[3em] w-fit bg-black text-white"
                whileTap={{ scale: 0.9 }}
            >
                Share Your Results

            </motion.button>
        </div>
    );
}

export default Results;