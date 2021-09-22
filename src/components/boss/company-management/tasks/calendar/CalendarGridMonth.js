import React from 'react';
import styled from 'styled-components';
import './calendar.css'
import moment from 'moment';


const CalendarGridMont = ({startMonth}) => {

    const totalDays = 42;
    const monthDay = startMonth.clone().subtract(1, 'day')

    const daysArray = [...Array(42)].map(() => monthDay.add(1, 'day').clone());

    const currentDay = (day) => moment().isSame(day, 'day');
    const isSelectedMonth = (day) => moment().isSame(day, 'month');

    return (
        <div className='calendar'>
            {[...Array(7)].map((_, i) => (
                <div key={i} className='calendar-week-days'>
                    {moment().day(i + 1).format('ddd')}
                </div>
            ))}
            {
                daysArray.map((dayItem) => (
                    <CellWrapper 
                        key={dayItem.format('DDMMYYYY')}
                        isWeekend={dayItem.day() === 6 || dayItem.day() === 0} 
                        isSelectedMonth={isSelectedMonth(dayItem)}
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

export default CalendarGridMont

const CellWrapper = styled.div`
        width: auto;
        height: 16vh;
        color: ${props => props.isSelectedMonth ? 'black' : 'grey'};
        font-weight: bold;
        background: ${props => props.isWeekend ? 'aqua' : '#aae9e9'};
        @media(max-width: 850px){
            border-radius: 2px;
        }
    `
