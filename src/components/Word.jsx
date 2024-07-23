import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const Word = ({ word, guessWord, selectedCount, selected }) => {
  const bgColor = selected ? '#5A594E' : '#EFEFE6';
  const textColor = selected ? '#FFFFFF' : '#000000';

  const boxRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    function resize() {
      const box = boxRef.current;
      const text = textRef.current;
      if (!box || !text) return;

      let maxFontSize = window.innerWidth < 640 ? 16 : 20;
      let newFontSize = maxFontSize
      const containerWidth = box.offsetWidth - 4;
      let textWidth = text.offsetWidth;

      while ((textWidth > containerWidth) && newFontSize > 0) {
        newFontSize -= 1;
        text.style.fontSize = `${newFontSize}px`;
        textWidth = text.offsetWidth;
      }
      text.style.fontSize = `${newFontSize}px`;
    }
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', () => {
        console.log('Removed');
      })
    }
  }, [])


  let canTap = selectedCount < 4 || selected;
  return (
    <motion.div
      initial={{ backgroundColor: bgColor, color: textColor }}
      whileTap={canTap ? { scale: 0.9 } : undefined}
      animate={{ backgroundColor: bgColor, color: textColor }}
      className={`rounded-md select-none text-center content-center overflow-hidden`}
      style={{ cursor: canTap ? "pointer" : "" }}
      onTapStart={() => {
        guessWord(word);
      }}
      ref={boxRef}
    >
      <strong
        className='text-[16px] sm:text-[20px]'
        ref={textRef}
      >
        {word}
      </strong>
    </motion.div>
  );
}

export default Word