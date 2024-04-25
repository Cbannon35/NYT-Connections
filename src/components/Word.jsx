const Word = ({ word }) => {
  return (
    <div className="bg-word-bg text-black text-[20px] cursor-pointer text-center content-center">
      <strong>{word}</strong>
    </div>
  );
}

export default Word