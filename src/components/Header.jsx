import React, { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { deleteItem } from '../utils/indexedDB';

import BottomSheet from './BottomSheet';


const Header = () => {

    const date = useParams().date;

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    return (
        <>
            <Outlet />
            <header>
                <button onClick={() => deleteItem(date)}>
                    Reset
                </button>
                <button onClick={() => setIsBottomSheetVisible(true)}>show sheet</button>
            </header>
            <BottomSheet isVisible={isBottomSheetVisible} onClose={() => setIsBottomSheetVisible(false)} />
        </>
    );
};

export default Header;