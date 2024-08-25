import { COLORS } from "../utils/game";

const CalendarHelp = () => {
    return (
        <div className="flex h-full flex-col justify-center items-center text-3xl">
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-md" style={{ backgroundColor: "rgb(252, 113, 107)" }} />
                    Loss
                </div>
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-md" style={{ backgroundColor: COLORS["1"] }} />
                    Win
                </div>
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-md" style={{ backgroundColor: COLORS["0"] }} />
                    Incomplete
                </div>
            </div>
        </div>
    );
}

export default CalendarHelp;