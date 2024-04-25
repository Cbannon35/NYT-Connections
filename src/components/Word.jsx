const Word = ({ word, guessWord, selectedCount }) => {
  console.log(selectedCount)
  return (
    <div className="select-none bg-word-bg text-black text-[20px] text-center content-center" onClick={() => { guessWord(word) }} style={{ cursor: selectedCount < 4 ? "pointer" : "" }}>
      <strong>{word}</strong>
    </div>
  );
}

export default Word