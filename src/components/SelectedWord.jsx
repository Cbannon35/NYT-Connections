const SelectedWord = ({ word, unguessWord }) => {

    return (
      <div className="select-none bg-word-bg-selected text-word-text-selected text-[20px] cursor-pointer text-center content-center" onClick={() => {unguessWord(word)}}>
        <strong>{word}</strong>
      </div>
    );
}

export default SelectedWord