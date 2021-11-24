import React from 'react';

import { Link } from 'react-router-dom';

import '../../boss/company-management/tasks/calendar/calendar.css';


const StaffDayGrid = ({
    startDay,
    tasks_by_role,
    employee,
    openModalHandler
}) => {

    return (
        <div className=''>
            <div className='bg-info' onClick={() => openModalHandler('Create')}><p className='text-center text-dark' style={{cursor: 'pointer', fontWeight: 'bold'}}>Дать поручение</p></div>
            <p className='text-center bg-warning'>Поручения для меня:</p>
            <ul>
                {tasks_by_role.tasks && tasks_by_role.tasks.filter(task => task.finish.split('T', 1)[0] >= startDay.format('YYYY-MM-DD') && task.finish.split('T', 1)[0] <= startDay.clone().endOf('day').format('YYYY-MM-DD'))
                    .map((task) => 
                        (
                        <Link to={`task-full-info/${task._id}`}>
                            <div className='border border-dark my-5' key={task._id}>
                                <div className='task-update-button mx-3'>
                                    {task.content}
                                    <br />
                                    <p className="app-text-small d-inline mt-5">Выполнить к:</p>

                                    <p className="d-inline mx-1">{new Date(task.finish).toLocaleString('ru').substr(11)}</p>
                                </div>
                            <span className='mx-2 bg-primary text-white p-1'>Задание поручил: {task.fromWhom.name} {task.fromWhom.lastName}</span>
                            <li className='day-tasks-list' key={task._id}>
                                <p>Исполнители:</p>
                                
                                {task.employees.map((r) => (
                                    <div key={r._id}>
                                        <span>{r.name}</span>
                                        <span className='mx-2'>{r.lastName}</span>
                                    </div>
                                ))}   
                            </li>
                            {task.read.map((read) => (
                                <div key={read._id}>{read.byEmployee === employee.employee._id && read.ok === true ? 
                                    (
                                        <div 
                                        className='task-day-read'
                                        >
                                            Задание прочитано
                                        </div>
                                    ) 
                                        : 
                                    (
                                        null
                                    )
                                    }
                                </div>
                                ))}
                                <hr />

                            {task.completed.map((complete) => (
                                <div key={complete._id}>{complete.byEmployee === employee.employee._id && complete.done === true ? 
                                    (
                                        <div 
                                        className='task-day-done'
                                        >
                                            Задание выполнено
                                        </div>
                                    ) 
                                        : 
                                    (
                                        null
                                    )
                                    }
                                </div>
                                ))}
                            </div>
                            </Link>
                        ))
                }
            </ul>
            
        </div>
    )
}

export default StaffDayGrid;