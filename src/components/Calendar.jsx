import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderYear = (year, curr_year) => {
    if (year !== curr_year) {
        return (
            <h3 key={curr_year} className='text-2xl w-full'>{curr_year}</h3>
        );
    } else {
        return null;
    }
}

const renderMonth = (month, curr_month, year) => {
    if (month !== curr_month) {
        return (
            <h3 key={year + "-" + curr_month} className='text-2xl w-full'>{months[parseInt(curr_month, 10) - 1]}</h3>
        );
    } else {
        return null;
    }
}


const Calendar = ({ calendar }) => {
    let [year, month, day] = calendar[0].split('-');
    month = ""
    return (
        <div
            className='flex flex-row gap-2 flex-wrap justify-center'
        >
            {calendar.map((date, index) => {
                // console.log("date", date, "index", index)
                const [curr_year, curr_month, curr_day] = date.split('-');
                const yearElem = renderYear(year, curr_year);
                const monthElem = renderMonth(month, curr_month, curr_year);

                if (yearElem !== null) {
                    year = curr_year;
                }
                if (monthElem !== null) {
                    month = curr_month;
                }
                return (
                    <React.Fragment key={index}>
                        {yearElem}
                        {monthElem}
                        <NavLink to={`/${date}`} key={date} >
                            <motion.div
                                className="rounded-md select-none text-center content-center cursor-pointer w-24 h-20"
                                style={{ backgroundColor: '#EFEFE6' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <h3 className='text-2xl'>{curr_day}</h3>
                            </motion.div>
                        </NavLink>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Calendar;