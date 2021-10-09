import React from 'react';
import '../../boss/company-management/tasks/calendar/calendar.css';
import { Link } from 'react-router-dom';


const StaffDayGrid = ({
    startDay,
    tasks_by_role,
    employee
}) => {

    return (
        <div className='day-calendar'>
            <ul>
                {tasks_by_role.tasks && tasks_by_role.tasks.filter(task => task.finish.split('T', 1)[0] >= startDay.format('YYYY-MM-DD') && task.finish.split('T', 1)[0] <= startDay.clone().endOf('day').format('YYYY-MM-DD'))
                    .map((task) => 
                        (
                            <>
                            <Link to={`task-full-info/${task._id}`}>
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
                            <li className='day-tasks-list' key={task._id}>
                                <p>Исполнители:</p>
                                
                                {task.employee.map((r) => (
                                    <div key={r._id}>
                                        <span>{r.name}</span>
                                        <span className='mx-2'>{r.lastName}</span>
                                    </div>
                                ))}
                                <div className='task-update-button'>
                                    {task.content}
                                    <br />
                                    <p className="app-text-small d-inline mx-1">Выполнить к:</p>

                                    <p className="d-inline mx-1">{new Date(task.finish).toLocaleString('ru').substr(11)}</p>
                                </div>
                            </li>
                            </Link>
                            </>
                        ))
                }
            </ul>
            
        </div>
    )
}

export default StaffDayGrid;