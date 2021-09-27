import React from 'react';
import styled from 'styled-components';
import './calendar.css'
import moment from 'moment';


const WeekGrid = ({
    startWeek,
    all_tasks,
    openModalHandler
}) => {

    const totalDays = 42;
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
                         <div className='show-day-wrapper' onDoubleClick={() => openModalHandler('Create')}>
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
                                <ul className='tasks-list-wrapper'>
                                    {all_tasks.tasks && all_tasks.tasks.filter(task => task.finish.split('T', 1)[0] >= dayItem.format('YYYY-MM-DD') && task.finish.split('T', 1)[0] <= dayItem.clone().endOf('day').format('YYYY-MM-DD'))
                                        .map((task) => (
                                            <li className='' key={task._id}>
                                                <button className='task-button' onDoubleClick={() => openModalHandler('Update', task)}>
                                                    {task.title}
                                                </button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                         </div>
                       
                    </CellWrapper>
            ))}
        </div>
    )
}

export default WeekGrid

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
