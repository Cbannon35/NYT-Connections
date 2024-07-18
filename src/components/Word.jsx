import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Word = ({ word, guessWord, selectedCount, selected }) => {
  const bgColor = selected ? '#5A594E' : '#EFEFE6';
  const textColor = selected ? '#FFFFFF' : '#000000';

  let canTap = selectedCount < 4 || selected;
  return (
    <motion.div
      initial={{ backgroundColor: bgColor, color: textColor }}
      whileTap={canTap ? { scale: 0.9 } : undefined}
      animate={{ backgroundColor: bgColor, color: textColor }}
      className="rounded-md select-none text-[16px] sm:text-[20px] text-center content-center"
      style={{ cursor: canTap ? "pointer" : "" }}
      // onMouseDown={() => {
      //   guessWord(word);
      // }}
      onTapStart={() => {
        guessWord(word);
      }}

    >
      <motion.strong
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {word}
      </motion.strong>
    </motion.div>
  );
}

export default Word