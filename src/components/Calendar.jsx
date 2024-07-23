import React from 'react';
import { formatDate } from '../utils/game';


const Calendar = ({ calendar }) => {
    const date = new Date();
    return (
        <div>
            {calendar.map((day) => <div>{day}</div>)}
        </div>
    );
};

export default Calendar;