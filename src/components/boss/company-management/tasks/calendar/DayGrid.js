import React from 'react';

import { Link } from 'react-router-dom';

import './calendar.css';
import Spinner from '../../../../layout/Spinner'


const DayGrid = ({
    startDay,
    all_tasks,
    openModalHandler
}) => {
    
    return (
        <>
            {!all_tasks ? 
            
            (<Spinner />) 
                :
            (
                <div className=''>
                <div className='bg-info' onClick={() => openModalHandler('Create')}><p className='text-center text-dark' style={{cursor: 'pointer', fontWeight: 'bold'}}>Дать поручение</p></div>
                <ul>
                    {all_tasks.tasks && all_tasks.tasks.filter(task => task.finish.split('T', 1)[0] >= startDay.format('YYYY-MM-DD') && task.finish.split('T', 1)[0] <= startDay.clone().endOf('day').format('YYYY-MM-DD'))
                        .map((task) => 
                            (
                                <div className='border border-dark my-5'>
                                <Link to={`task-full-info/${task._id}`} className='border border-secondary'>
                                    <div className='m-3 bg-warning px-3 '>
                                        {task.content}
                                        <br />
                                        <p className="app-text-small d-inline p-3">Выполнить к:</p>
                                        <p className="d-inline">{new Date(task.finish).toLocaleString('ru').substr(11)}</p>
                                    </div>
                                    <li key={task._id}>
                                        <p className='px-3'>Исполнители:</p>
                                        
                                        {task && task.employees.map((e) => (
                                           
                                            <div className='px-3' key={e._id}>
                                                <span >{e.name}</span>
                                                <span className='mx-2'>{e.lastName}</span>
    
                                            {task && task.read.map((r) => (
                                                <div className='px-2' key={r._id}>{e._id === r.byEmployee && r.byEmployee !== null && r.ok === true && r.ok !== null ? (<p className='px-2 m-3 bg-info text-dark'>Задание прочитано и принято к исполнению</p>) : null}</div>
                                            )) } 
    
                                            {task && task.completed.map((c) => (
                                                <div className='px-2' key={c._id}>{e._id === c.byEmployee && c.byEmployee !== null && c.done === true && c.done !== null ? (<p className='px-2 m-3 bg-success text-white'>Задание выполнено</p>) : null}</div>
                                            )) }
                                                
                                            {task && task.comments.map((c) => (
                                                <div key={c._id}>{e._id === c.byEmployee && c.byEmployee !== null && c.comment !== null ? (
                                                    <div className='comments'>  
                                                        <p className='text-center'>Комментарий исполнителя</p>
                                                        <p className=''>{c.comment}</p>
                                                    </div>    
                                                    ) : null}
                                                </div>
                                            )) }
                                            </div>
                                        ))}
                                    </li>
                                </Link>
                                </div>
                            ))
                    }
                </ul>
            </div>
            )
        }
        </>
    )
}

export default DayGrid;