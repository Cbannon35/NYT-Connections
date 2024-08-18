import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';

const bgColor = '#EFEFE6';
const textColor = '#000000';

const ScrollCalendar = forwardRef((props, ref) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const Navigate = useNavigate();

    const handleSelectedDate = (e, value) => {
        e && e.preventDefault();
        if (isDisabled(props.minDate, value, props.maxDate)) return;
        Navigate(`/${value.format('YYYY-MM-DD')}`);
    };

    useEffect(() => {
        setSelectedDate(props.selectedDate);
        const element = document.getElementById(
            moment(props.selectedDate, 'DD/MMM/YYYY').format('MMMM-YYYY')
        );
        if (element) {
            element.scrollIntoView();
        }
    }, [props.selectedDate]);

    const renderProps = {
        minDate: props.minDate,
        maxDate: props.maxDate,
        selectedDate: selectedDate,
        handleSelect: handleSelectedDate,
        className: `${props.className} w-full text-gray-700 mt-24 h-full`,
        yearFormat: props.yearFormat,
        monthFormat: props.monthFormat,
        enableYearTitle: props.enableYearTitle,
        enableMonthTitle: props.enableMonthTitle,
        r: ref
    };

    return <RenderCalendarYear {...renderProps} />;
});

const RenderCalendarYear = (props) => {
    const { minDate, maxDate, r } = props;
    const totalMonth = Math.round(maxDate.diff(minDate, 'months', true)) + 1;
    let now = moment(minDate, 'DD/MMM/YYYY');
    const elements = [];

    for (let i = 0; i < totalMonth; i++) {
        elements.push(
            <RenderMonthCard key={i} currentMonth={now.clone()} {...props} />
        );
        now = now.add(1, 'M');
    }

    return <div ref={r} className={props.className}>{elements}</div>;
};

const RenderMonthCard = (props) => {
    const now = props.currentMonth;
    return (
        <section className="w-full mb-4" id={now.format('MMMM-YYYY')}>
            <RenderMonthHeader date={now} {...props} />
            {/* <RenderDayHeader /> */}
            <RenderDays date={now} {...props} />
        </section>
    );
};

const RenderMonthHeader = (props) => {
    const month = props.date.format(props.monthFormat);
    const year = props.date.format(props.yearFormat);
    return (
        <p className="w-full flex flex-row-reverse justify-end items-center gap-2 font-bold text-lg leading-6 tracking-tight mb-4">
            {props.enableYearTitle ? (
                <span className="font-light text-sm leading-5 tracking-tight text-gray-500 block">
                    {year}
                </span>
            ) : null}
            {props.enableMonthTitle ? month : null}
        </p>
    );
};

const RenderSingleDay = ({
    isActive,
    handleClick,
    currentValue,
    isDisabled,
    i
}) => {
    // const className = `${isActive ? 'bg-gray-700 text-white font-bold' : ''} ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'
    //     } text-lg leading-6 tracking-tighter font-light mb-2 h-8`;

    const className = `${isDisabled ? 'cursor-disabled text-[0px]' : 'cursor-pointer text-lg'} rounded-md py-4`;

    return (
        <li className={className} key={i} style={{ backgroundColor: bgColor, color: textColor }}>
            <span
                className="text-center inline-block w-full h-8 rounded-full hover:font-bold"
                onClick={(e) => handleClick(e, currentValue)}
            >
                {currentValue.date()}
            </span>
        </li>
    );
};

const RenderDays = ({
    date,
    selectedDate,
    handleSelect,
    minDate,
    maxDate
}) => {
    const daysInMonth = date.daysInMonth();
    const startDate = date.startOf('month');
    const balanceDayCount = startDate.day(); // This will help to align the first day correctly

    const renderDay = () => {
        const elements = [];
        let now = moment(date, 'DD/MMM/YYYY');
        for (let i = 1; i <= daysInMonth; i++) {
            elements.push(
                <RenderSingleDay
                    isActive={isSameDate(now.clone(), selectedDate)}
                    isDisabled={isDisabled(minDate, now.clone(), maxDate)}
                    handleClick={handleSelect}
                    currentValue={now.clone()}
                    key={i + balanceDayCount} // Use a unique key that accounts for the offset
                />
            );
            now = now.add(1, 'days');
        }
        return elements;
    };

    const renderUnwantedDay = (balanceDayCount) => {
        const elements = [];
        for (let i = 0; i < balanceDayCount; i++) {
            elements.push(
                <li className="opacity-0 invisible pointer-events-none" key={i} />
            );
        }
        return elements;
    };

    return (
        <ul className="grid grid-cols-7 gap-1 m-0 p-0 list-none">
            {renderUnwantedDay(balanceDayCount)}
            {renderDay()}
        </ul>
    );
};

ScrollCalendar.defaultProps = {
    minDate: moment().add(1, 'd'),
    maxDate: moment().add(9, 'M'),
    selectedDate: null,
    monthFormat: 'MMMM',
    yearFormat: 'YYYY',
    enableYearTitle: true,
    enableMonthTitle: true
};

function isSameDate(firstDate, secondDate) {
    return (
        moment(firstDate, 'DD/MM/YYYY').diff(
            moment(secondDate, 'DD/MM/YYYY'),
            'days',
            false
        ) === 0
    );
}

function isDisabled(minDate, currentDate, maxDate) {
    const min = moment(minDate, 'DD/MM/YYYY');
    const max = moment(maxDate, 'DD/MM/YYYY');
    const current = moment(currentDate, 'DD/MM/YYYY');
    return !(min <= current && current <= max);
}

export default ScrollCalendar;
