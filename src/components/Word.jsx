const Word = ({ word, guessWord, selectedCount }) => {
  return (
    <div className="rounded-md select-none bg-word-bg text-black text-[20px] text-center content-center" onClick={() => { guessWord(word) }} style={{ cursor: selectedCount < 4 ? "pointer" : "" }}>
      <strong>{word}</strong>
    </div>
  );
}

export default Word