const SolvedCategory = ({ category }) => {
    return (
        <div className="flex flex-col gap-[10px] items-center">
            <h2 className="font-bold text-2xl">{category}</h2>
            <p className="text-lg">Solved!</p>
        </div>
    )
}

export default SolvedCategory;