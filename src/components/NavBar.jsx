import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const NavBar = () => {
    const [currentDate, setCurrentDate] = useState("");
    const location = useLocation();
    const { date: routeDate } = useParams();
    useEffect(() => {
        if (routeDate !== undefined) {
            setCurrentDate(routeDate);
        }
    }, [location.pathname]);

    return (
        <nav className="w-full px-12 bottom-0 fixed border-t-black py-2 border-[1px] bg-white">
            <ul className='flex justify-between'>
                <motion.li whileTap={{ scale: 0.9 }}>
                    <NavLink to="/games" end
                    >
                        {({ isActive, isPending, isTransitioning }) => (
                            <div className={`${isActive ? 'bg-[#EFEFE6]' : ""} p-2 rounded-full`}>
                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 10V6C3 4.89543 3.89543 4 5 4H7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7 2V6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                        )}
                    </NavLink>
                </motion.li>
                <motion.li whileTap={{ scale: 0.9 }}>
                    <NavLink to={`/${currentDate}`}
                    >
                        {({ isActive, isPending, isTransitioning }) => (
                            <div className={`${isActive ? 'bg-[#EFEFE6]' : ""} p-2 rounded-full`}>
                                <img width="24px" height="24px" src="/Connections nav icon.svg"></img>
                            </div>
                        )}
                    </NavLink>
                </motion.li>
                <motion.li whileTap={{ scale: 0.9 }}>
                    <NavLink to="/profile" end
                    >
                        {({ isActive, isPending, isTransitioning }) => (
                            <div className={`${isActive ? 'bg-[#EFEFE6]' : ""} p-2 rounded-full`}>
                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                            </div>
                        )}
                    </NavLink>
                </motion.li>
            </ul>
        </nav >
    );
}

export default NavBar;