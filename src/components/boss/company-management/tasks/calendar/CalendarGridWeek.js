import React from 'react';
import styled from 'styled-components';
import './calendar.css'
import moment from 'moment';


const CalendarGridWeek = ({startWeek}) => {

    const totalDays = 42;
    const weekDay = startWeek.clone().subtract(1, 'day')
    //const weekDays = startWeek.clone().subtract(1, 'day')
    const daysArray = [...Array(7)].map(() => weekDay.add(1, 'day').clone());
    const weekDaysArray = [...Array(7)].map(() => weekDay.add(1, 'day').clone());

    const currentDay = (day) => moment().isSame(day, 'day');

    return (
        <div className='calendar'>
            {[...Array(7)].map((_, i) => (
                <div key={i} className='calendar-week-days'>
                    {moment().day(i + 1).format('ddd')}
                </div>
            ))}
            {/* {weekDaysArray.map((weekDayItem) => (
                <div key={weekDayItem.format('DDMMYYYY')}>{weekDayItem}</div>
            ))} */}
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
                        {[...Array(24)].map((_, i) => (
                            <div className='calendar-week-hours'>{i + 1}</div>
                        ))}
                       
                    </CellWrapper>
            ))}
        </div>
    )
}

export default CalendarGridWeek

const CellWrapper = styled.div`
        width: auto;
        height: auto;
        color: black;
        font-weight: bold;
        background: ${props => props.isWeekend ? 'aqua' : '#aae9e9'};
        @media(max-width: 850px){
            border-radius: 2px;
        }
    `
