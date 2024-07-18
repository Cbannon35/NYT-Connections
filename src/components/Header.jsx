import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { deleteItem } from '../utils/indexedDB';


const Header = () => {

    const date = useParams().date;

    return (
        <>
            <Outlet />
            <header>
                <button onClick={() => deleteItem(date)}>
                    Reset
                </button>
            </header>
        </>
    );
};

export default Header;