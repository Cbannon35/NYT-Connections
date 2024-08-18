import React from 'react';
import { motion } from 'framer-motion';

const loadingCircleTransition = {
    duration: 0.5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse",
}

const Spinner = ({ color, width, height }) => {
    return (
        <motion.div
            className='flex flex-row gap-1'
            variants={{ start: { transition: { staggerChildren: 0.1 } }, end: { transition: { staggerChildren: 0.1 } } }}
            initial="start"
            animate="end"
        >
            <motion.span
                className='rounded-full'
                style={{ backgroundColor: color, width: width, height: height }}
                variants={{ start: { y: "-25%" }, end: { y: "75%" } }}
                transition={loadingCircleTransition}
            />
            <motion.span
                className='rounded-full'
                style={{ backgroundColor: color, width: width, height: height }}
                variants={{ start: { y: "-25%" }, end: { y: "75%" } }}
                transition={loadingCircleTransition}
            />
            <motion.span
                className='rounded-full'
                style={{ backgroundColor: color, width: width, height: height }}
                variants={{ start: { y: "-25%" }, end: { y: "75%" } }}
                transition={loadingCircleTransition}
            />
        </motion.div>
    );
};

export default Spinner;
