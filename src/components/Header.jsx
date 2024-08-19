import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { deleteItem, getItem } from '../utils/indexedDB';
import BottomSheet from './BottomSheet';
import Hints from './Hint';
import Help from './Help';
import CalendarHelp from './CalendarHelp';
import { Sheet } from 'react-modal-sheet';

import NavBar from './NavBar';

const textDate = (date) => {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [year, month, day] = date.split('-');
    return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
}
const RenderDayHeader = () => {
    return (
        <ul className=" grid grid-cols-7 gap-1 m-0 pt-4 list-none text-center bg-white">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <li
                    key={day}
                    className="font-bold text-sm leading-5 tracking-tight text-gray-400"
                >
                    {day}
                </li>
            ))}
        </ul>
    );
};

const Header = () => {

    const date = useParams().date;
    const location = useLocation();
    const showBottomNavBar = location.pathname !== '/';
    const showHeader = date !== undefined || location.pathname === '/games';

    const [hintSheet, setHintSheet] = useState(false);
    const [helpSheet, setHelpSheet] = useState(false);
    const [calHelpSheet, setCalHelpSheet] = useState(false);

    return (
        <>
            {showHeader ?

                <header className='fixed w-full top-0 bg-white border-b-black border-[1px] pt-6 px-2 z-50'>

                    {date !== undefined ?
                        <div className='flex flex-row justify-between md:justify-around items-center'>
                            <h1 className='text-center text-2xl md:text-4xl font-extralight'>{textDate(date)}</h1>
                            <nav className="flex flex-row gap-4">
                                <button className="tooltip" onClick={() => setHintSheet(true)}>
                                    <div className="tooltiptext tooltip-bottom">Hints</div>
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 2L20 3" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 2L4 3" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 16L20 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 16L4 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 18H15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10 21H14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.9998 3C7.9997 3 5.95186 4.95029 5.99985 8C6.02324 9.48689 6.4997 10.5 7.49985 11.5C8.5 12.5 9 13 8.99985 15H14.9998C15 13.0001 15.5 12.5 16.4997 11.5001L16.4998 11.5C17.4997 10.5 17.9765 9.48689 17.9998 8C18.0478 4.95029 16 3 11.9998 3Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>
                                <button onClick={() => setHelpSheet(true)}>
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 18.01L12.01 17.9989" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>
                                <button onClick={async () => {
                                    const game = await getItem(date);
                                    if (game === undefined) return;
                                    if (game.game.currentGuess.length > 0 || game.game.guesses.length > 0 || game.game.hints.length > 0) {
                                        deleteItem(date);
                                        window.location.reload();
                                    }
                                }}>
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>
                            </nav>
                        </div>
                        :
                        <div className='flex justify-center gap-4 items-center '>
                            <h1 className='text-center text-2xl md:text-4xl font-extralight'>Calendar</h1>
                            <nav className="flex flex-row gap-4">
                                <button onClick={() => setCalHelpSheet(true)}>
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 18.01L12.01 17.9989" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>
                            </nav>
                        </div>
                    }
                    {date === undefined ? <RenderDayHeader /> : null}
                </header>

                : null}

            <main className='touch-pan-y'>
                <Outlet />
            </main>

            {showBottomNavBar ? <NavBar /> : null}
            <BottomSheet isVisible={hintSheet} title={"Hints"} onClose={() => setHintSheet(false)}>
                <Hints />
            </BottomSheet>
            <BottomSheet isVisible={helpSheet} title={"Help"} onClose={() => setHelpSheet(false)}>
                <Help />
            </BottomSheet>
            <BottomSheet isVisible={calHelpSheet} title={"Help"} onClose={() => setCalHelpSheet(false)}>
                <CalendarHelp />
            </BottomSheet>
        </>
    );
};

export default Header;