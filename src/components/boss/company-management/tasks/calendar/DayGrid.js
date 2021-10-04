import React from 'react';
import './calendar.css'
import { Link } from 'react-router-dom';


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
                            <Link to={`task-full-info/${task._id}`}>
                            <li className='day-tasks-list' key={task._id}>
                                <p>Исполнители:</p>
                                
                                {task.employee.map((r) => (
                                    <>
                                    <div key={r._id}>
                                        <span >{r.name}</span>
                                        <span className='mx-2'>{r.lastName}</span>
                                    </div>
                                    
                                    </>
                                ))}
                                <div className='task-update-button' onDoubleClick={() => openModalHandler('Update', task)}>
                                    {task.content}
                                    <br />
                                    <p className="app-text-small d-inline mx-1">Выполнить к:</p>
                                    <p className="d-inline mx-1">{new Date(task.finish).toLocaleString('ru').substr(11)}</p>
                                </div>
                            </li>
                            </Link>
                        ))
                }
            </ul>
        </div>
    )
}

export default DayGrid;