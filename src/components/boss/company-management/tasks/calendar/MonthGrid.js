import React from 'react';
import styled from 'styled-components';
import './calendar.css'
import moment from 'moment';


const MonthGrid = ({
    startMonth, 
    totalMonthDays,
    all_tasks,
    openModalHandler
}) => {

    const monthDay = startMonth.clone().subtract(1, 'day')

    const daysArray = [...Array(totalMonthDays)].map(() => monthDay.add(1, 'day').clone());

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
                        key={dayItem.unix()}
                        isWeekend={dayItem.day() === 6 || dayItem.day() === 0} 
                        isSelectedMonth={isSelectedMonth(dayItem)}
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
                                {/* <div>Start: {dayItem.format('X')}</div> */}

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

export default MonthGrid

const CellWrapper = styled.div`
        width: auto;
        min-height: 16vh;
        height: auto;
        color: ${props => props.isSelectedMonth ? 'black' : 'grey'};
        font-weight: bold;
        background: ${props => props.isWeekend ? 'aqua' : '#aae9e9'};
        @media(max-width: 850px){
            border-radius: 2px;
        }
    `
