import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import ScrollCalendar from './ScrollCalender';
import { END_DATE } from '../utils/constants';

const Calendar = () => {
    const contentRef = useRef(null);

    // Key for storing the scroll position
    const scrollPositionKey = 'scrollPosition';

    useEffect(() => {
        console.log(contentRef.current)
        // Ensure the div is mounted before interacting with it
        if (contentRef.current) {
            // Check if there is a saved scroll position
            const savedScrollPosition = localStorage.getItem(scrollPositionKey);

            if (savedScrollPosition) {
                contentRef.current.scrollTop = parseInt(savedScrollPosition, 10);
            } else {
                // Scroll to bottom if no position is saved
                const lastElement = document.getElementById('last-element');
                if (lastElement) {
                    // console.log("scrolling to last element")
                    lastElement.scrollIntoView({ behavior: 'auto', block: 'end' });
                }
            }

            // Save the scroll position when the user scrolls
            const handleScroll = (e) => {
                // console.log("event", e)
                localStorage.setItem(scrollPositionKey, e.target.scrollTop);
            }
            // contentRef.current.addEventListener('scroll', handleScroll, true);
            contentRef.current.addEventListener('scroll', handleScroll, true);

            // Cleanup event listener on unmount
            return () => {
                if (contentRef.current) {
                    // contentRef.current.removeEventListener('scroll', handleScroll, true);
                    contentRef.current.removeEventListener('scroll', handleScroll, true);
                }
            };
        }
    }, [contentRef]); // Empty dependency array to ensure this effect runs only once

    return (
        <React.Fragment>
            <ScrollCalendar
                ref={contentRef}
                minDate={moment(END_DATE, 'YYYY-MM-DD')}
                selectedDate={moment('2019-01-23', 'YYYY-MM-DD')}
                maxDate={moment(new Date(), 'YYYY-MM-DD')}
                className='overflow-y-scroll mb-16'
            />
            <div id='last-element'></div>
        </React.Fragment>
    );
}

export default Calendar;