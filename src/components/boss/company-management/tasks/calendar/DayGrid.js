import React from 'react';
import styled from 'styled-components';
import './calendar.css'


const DayGrid = ({
    startDay,
    all_tasks,
    openModalHandler
}) => {
    return (
        <div className='day-calendar'  onDoubleClick={() => openModalHandler('Create')}>
            <ul className='day-tasks-list-wrapper'>
                {all_tasks.tasks && all_tasks.tasks.filter(task => task.finish.split('T', 1)[0] >= startDay.format('YYYY-MM-DD') && task.finish.split('T', 1)[0] <= startDay.clone().endOf('day').format('YYYY-MM-DD'))
                    .map((task) => 
                        (
                            <li className='day-tasks-list' key={task._id}>
                                <div className='task-update-button' onDoubleClick={() => openModalHandler('Update', task)}>
                                    {task.content}
                                </div>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

export default DayGrid;