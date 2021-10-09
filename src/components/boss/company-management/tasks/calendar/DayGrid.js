import React from 'react';
import './calendar.css'
import { Link } from 'react-router-dom';


const DayGrid = ({
    startDay,
    all_tasks,
    openModalHandler
}) => {
    
    return (
        <div className='day-calendar'>
            <ul>
                {all_tasks.tasks && all_tasks.tasks.filter(task => task.finish.split('T', 1)[0] >= startDay.format('YYYY-MM-DD') && task.finish.split('T', 1)[0] <= startDay.clone().endOf('day').format('YYYY-MM-DD'))
                    .map((task) => 
                        (
                            <Link to={`task-full-info/${task._id}`}>
                            <li className='day-tasks-list' key={task._id}>
                                <p>Исполнители:</p>
                                
                                {task.employee.map((e) => (
                                    <>
                                    <div key={e._id}>
                                        <span >{e.name}</span>
                                        <span className='mx-2'>{e.lastName}</span>
                                        {task.completed.map((c) => (
                                            <div key={c._id}>{e._id !== c.beEmployee && c.done === false ? null : (<div>Выполнено</div>)}</div>
                                            // <div key={c._id}>{r._id}</div>
                                        ))}
                                    </div>
                                    
                                    </>
                                ))}
                                <div onDoubleClick={() => openModalHandler('Update', task)}>
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
            <div className='bg-info' onDoubleClick={() => openModalHandler('Create')}><p className='text-center ' style={{cursor: 'pointer', fontWeight: 'bold'}}>Задать еще поручения</p></div>
        </div>
    )
}

export default DayGrid;