import React from 'react';
import styled from 'styled-components';
import './calendar.css'
import moment from 'moment';


const DayGrid = ({
    startDay,
    all_tasks,
    openModalHandler
}) => {

    const totalDays = 42;
    //const day = startDay.clone().subtract(1, 'day')
    // const daysArray = [...Array(7)].map(() => day.add(1, 'day').clone());
    // const weekDaysArray = [...Array(7)].map(() => day.add(1, 'day').clone());

    const currentDay = (day) => moment().isSame(day, 'day');

    return (
        <div className='calendar'>
            <ul className='tasks-list-wrapper'>
                {all_tasks.tasks && all_tasks.tasks.filter(task => task.finish.split('T', 1)[0] >= startDay.format('YYYY-MM-DD') && task.finish.split('T', 1)[0] <= startDay.clone().endOf('day').format('YYYY-MM-DD'))
                    .map((task) => (
                                        <li className='' key={task._id}>
                                            <button className='task-button' onDoubleClick={() => openModalHandler('Update', task)}>
                                                {task.content}
                                            </button>
                                        </li>
                                    ))
                }
            </ul>
        </div>
    )
}

export default DayGrid

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
