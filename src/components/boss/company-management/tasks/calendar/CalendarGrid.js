import React from 'react';
import styled from 'styled-components';
import './calendar.css'



const CalendarGrid = () => {

    const totalDays = 42;

    
    const daysArray = [...Array(42)]
    return (
        <div className='calendar'>
            {
                daysArray.map((_, i) => (
                    <div className="calendar-cell">
                        <div className="top-row-cell">
                            <div className="day-wrapper">
                                {i}
                            </div>
                            
                        </div>
                        
                    </div>
            ))}
        </div>
    )
}

export default CalendarGrid
