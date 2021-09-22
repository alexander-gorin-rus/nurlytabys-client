import React from 'react';
import styled from 'styled-components';
import './calendar.css'
import moment from 'moment';


const CalendarGrid = ({startMonth}) => {

    const totalDays = 42;
    const monthDay = startMonth.clone().subtract(1, 'day')

    const daysArray = [...Array(42)].map(() => monthDay.add(1, 'day').clone());

    const currentDay = (day) => moment().isSame(day, 'day')

    return (
        <div className='calendar'>
            {
                daysArray.map((dayItem) => (
                    <CellWrapper 
                        key={dayItem.format('DDMMYYYY')}
                        isWeekend={dayItem.day() === 6 || dayItem.day() === 0} 
                    >
                        <div className="top-row-cell">
                            {!currentDay(dayItem) && dayItem.format('D')}
                            {currentDay(dayItem) && <div className="day-wrapper">
                                                        {dayItem.format('D')}
                                                    </div>}
                             
                            
                         </div>
                    </CellWrapper>
            ))}
        </div>
    )
}

export default CalendarGrid

const CellWrapper = styled.div`
        width: auto;
        height: 16vh;
       
        background: ${props => props.isWeekend ? 'aqua' : '#aae9e9'};
        @media(max-width: 850px){
            border-radius: 2px;
        }
    `
