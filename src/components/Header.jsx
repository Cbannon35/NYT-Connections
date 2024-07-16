import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const Header = () => {
    return (
        <>
            <Outlet />
            <header>
                <h1>My Website</h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
                <Link to="2024-12-22">Home</Link>
            </header>
        </>
    );
};

export default Header;