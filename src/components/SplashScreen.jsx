import { Link } from 'react-router-dom';
import React from 'react';

import { BACKGROUND_COLORS, formatDate } from '../utils/game';


const SplashScreen = () => {
    const formattedDate = formatDate(new Date());

    const bgColor = BACKGROUND_COLORS[1];

    return (
        <>
            <div className='fixed w-full h-full flex flex-col justify-center items-center gap-5' >
                <img src="Connections logo.svg" alt="Connections logo" className="w-[80px] md:w-[150px]" />
                <h1 className="text-4xl md:text-6xl font-bold font-karnak">Connections</h1>
                <Link to={formattedDate}>
                    <button
                        className="px-[15px] rounded-full font-semibold min-w-[10em] h-[3em] w-fit bg-black text-white"

                    >
                        Play
                    </button>
                </Link>
            </div >
        </>
    );
};

export default SplashScreen;
