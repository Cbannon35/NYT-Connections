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

      // ugh works sometimes and breaks othertimes...
      let maxFontSize = window.innerWidth < 640 ? 16 : 20;
      let newFontSize = parseInt(window.getComputedStyle(text).fontSize);
      const containerWidth = box.offsetWidth - 12;
      let textWidth = text.offsetWidth;

      // If window is getting larger, greedily increase font size
      while ((textWidth < containerWidth) && newFontSize < maxFontSize) {
        newFontSize += 1;
        text.style.fontSize = `${newFontSize}px`;
        textWidth = text.offsetWidth;
      }

      // Decrease font size until it fits
      while ((textWidth > containerWidth) && newFontSize > 0) {
        newFontSize -= 1;
        text.style.fontSize = `${newFontSize}px`;
        textWidth = text.offsetWidth;
      }
      text.style.fontSize = `${newFontSize}px`;
      console.log('Resized', newFontSize);
    }
    // if word is 7 characters or more, resize font
    if (word.length > 7) {
      console.log("Adding resize event listener", word);
      window.addEventListener('resize', resize);
      resize();
    }

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
      className={`rounded-md select-none text-center content-center overflow-hidden whitespace-nowrap`}
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