import React from 'react';
import './calendar.css'


const DayGrid = ({
    startDay,
    all_tasks,
    openModalHandler
}) => {

    let dayOptions = {weekday: 'long'}
    
    return (
        <div className='day-calendar'  onDoubleClick={() => openModalHandler('Create')}>
            <ul className='day-tasks-list-wrapper'>
                {all_tasks.tasks && all_tasks.tasks.filter(task => task.finish.split('T', 1)[0] >= startDay.format('YYYY-MM-DD') && task.finish.split('T', 1)[0] <= startDay.clone().endOf('day').format('YYYY-MM-DD'))
                    .map((task) => 
                        (
                            <li className='day-tasks-list' key={task._id}>
                                <p>Исполнители:</p>
                                
                                {task.role.map((r) => (
                                    <div key={r._id}>{r.name}</div>
                                ))}
                                <div className='task-update-button' onDoubleClick={() => openModalHandler('Update', task)}>
                                    {task.content}
                                    <br />
                                    <p className="app-text-small d-inline mx-1">Выполнить к:</p>
                                    <p className="d-inline mx-1">{new Date(task.finish).toLocaleTimeString('ru', dayOptions).split(' ')[0]}</p>
                                    <p className="d-inline mx-1">{new Date(task.finish).toLocaleString('ru')}</p>
                                </div>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

export default DayGrid;