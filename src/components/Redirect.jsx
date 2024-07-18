
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const RedirectToDate = () => {
    const navigate = useNavigate();
    const myDate = new Date();
    const formattedDate = formatDate(myDate);

    useEffect(() => {
        navigate(`/${formattedDate}`);
    }, []);

    return (
        <div>Hi</div>
    );
};

export default RedirectToDate;
