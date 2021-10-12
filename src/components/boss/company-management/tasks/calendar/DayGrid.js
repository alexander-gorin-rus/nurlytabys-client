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
                                <div className='m-3 bg-warning px-3'>
                                    {task.content}
                                    <br />
                                    <p className="app-text-small d-inline p-3">Выполнить к:</p>
                                    <p className="d-inline">{new Date(task.finish).toLocaleString('ru').substr(11)}</p>
                                </div>
                                <li className='day-tasks-list' key={task._id}>
                                    <p>Исполнители:</p>
                                    
                                    {task && task.employee.map((e) => (
                                       
                                        <div key={e._id}>
                                            <span >{e.name}</span>
                                            <span className='mx-2'>{e.lastName}</span>
                                            

                                        {task && task.completed.map((c) => (
                                        <div className='px-2' key={c._id}>{e._id === c.byEmployee && c.byEmployee !== null && c.done === true && c.done !== null ? (<p className='px-2 m-3 bg-success text-white'>Задание выполнено</p>) : null}</div>
                                        )) }
                                            
                                        </div>
                                    ))}
                                </li>
                            </Link>
                        ))
                }
            </ul>
            <div className='bg-warning' onClick={() => openModalHandler('Create')}><p className='text-center text-danger' style={{cursor: 'pointer', fontWeight: 'bold'}}>Дать поручение</p></div>
        </div>
    )
}

export default DayGrid;