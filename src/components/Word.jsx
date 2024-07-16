import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Word = ({ word, guessWord, selectedCount, selected }) => {
  const bgColor = selected ? '#5A594E' : '#EFEFE6';
  const textColor = selected ? '#FFFFFF' : '#000000';

  let canTap = selectedCount < 4 || selected;
  return (
    <motion.div
      whileTap={canTap ? { scale: 0.9 } : undefined}
      animate={{ backgroundColor: bgColor, color: textColor }}
      className="rounded-md select-none text-[16px] sm:text-[20px] text-center content-center"
      style={{ cursor: canTap ? "pointer" : "" }}
      onMouseDown={() => {
        guessWord(word);
      }}
    >
      <strong>{word}</strong>
    </motion.div>
  );
}

export default Word