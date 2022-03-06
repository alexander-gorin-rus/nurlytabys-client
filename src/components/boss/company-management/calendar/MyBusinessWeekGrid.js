import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const MyBusinessWeekGrid = ({
    startWeek,
    openModalHandler,
    business_list
}) => {

    const weekDay = startWeek.clone().subtract(1, 'day')
    const daysArray = [...Array(7)].map(() => weekDay.add(1, 'day').clone());

    const currentDay = (day) => moment().isSame(day, 'day');
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
        
                    >
                         <div className="top-row-cell">
                         <div className='show-day-wrapper' onDoubleClick={() => openModalHandler()}>
                               {currentDay(dayItem) && dayItem.format('D') ? 
                               (
                                    <div className="day-wrapper">
                                        {dayItem.format('D')}
                                    </div>
                                        
                                ) 
                                    : 
                                (
                                    dayItem.format('D')
                                )} 
                            </div>
                        </div>
                        <ul className='tasks-list-wrapper'>
                        {business_list && business_list.list && business_list.list.filter(task => task.finish.split('T', 1)[0] >= dayItem.format('YYYY-MM-DD') && task.finish.split('T', 1)[0] <= dayItem.clone().endOf('day').format('YYYY-MM-DD'))
                            .map((business) => 
                            (
                                <li className='' key={business._id}>
                                    <div className='task-button'>
                                        {business.content}  
                                    </div>
                                </li>
                            ))
                        } 
                        </ul>
                    </CellWrapper>
            ))}
        </div>
    )
}

export default MyBusinessWeekGrid

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
