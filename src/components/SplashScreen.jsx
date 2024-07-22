
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import React from 'react';

import { BACKGROUND_COLORS } from '../utils/game';


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const SplashScreen = () => {
    const navigate = useNavigate();
    const myDate = new Date();
    const formattedDate = formatDate(myDate);

    const bgColor = BACKGROUND_COLORS[1];
    console.log(bgColor)

    return (
        <>
            <div className='fixed w-full h-full flex flex-col justify-center items-center gap-5' style={{ backgroundColor: bgColor }}>
                <img src="Connections logo.svg" alt="Connections logo" className="w-[80px] sm:w-[150px]" />
                <h1 className="text-4xl sm:text-6xl font-bold font-karnak">Connections</h1>
                <Link to={formattedDate}>
                    <button
                        className="px-[15py] rounded-full font-semibold min-w-[10em] h-[3em] w-fit bg-black text-white"

                    >
                        Play
                    </button>
                </Link>
            </div >
        </>
    );
};

export default SplashScreen;
