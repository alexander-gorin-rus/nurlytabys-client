import React, { useEffect, useState, useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import PropTypes from 'prop-types';
import { Link, useHistory  } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../../layout/Spinner';
import { 
    GetTaskById,
    UpdateTask, 
    DeleteTask,
    TaskStatusCompleted,
    TaskStatusRead,
    GetAllTasks,
    GetTasksByEmployee,
    TasksCountUpdate,
    TasksCountCreate,
    GetTasksCount
} from '../../../../redux/actions/task';

import CommentForm from './CommentForm';


const TaskFullInfo = ({
    UpdateTask,
    GetTaskById,
    DeleteTask,
    TaskStatusCompleted,
    TaskStatusRead,
    GetAllTasks,
    GetTasksByEmployee,
    TasksCountCreate,
    TasksCountUpdate,
    GetTasksCount,
    task: {
        task_by_id, 
        task, 
        tasks_by_role,
        tasks_count,
        tasks_count_by_id
    },
    employee_reducer: {employee},
    match
}) => {

    const notRead = task_by_id && task_by_id.task.read.length
    console.log(notRead);
    const IdleTimerRef = useRef(null);

    const onIdle = () => {
        history.push('/employee-dashboard');
    }

    const [done, setDone] = useState(false);
    const [ok, setOk] = useState(false);
    const [values, setValues] = useState({
        count: tasks_by_role.length,
        employeeId: employee && employee.employee._id
    });
    const { count, employeeId } = values;

    const handleCountChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    let taskId = task_by_id && task_by_id.task._id;

    const tasksCountId = tasks_count && tasks_count.map(t => t._id);
    const countsStringify = JSON.stringify(tasksCountId);
    let countId = countsStringify.slice(2, 26);

    //SECTION TO HIDE OF SHOW READ FORM
    const employeeLength = task_by_id && task_by_id.task.employees.length;
    const readLength = task_by_id && task_by_id.task.read.length;
    console.log(employeeLength);
    console.log(readLength);
    

    //SECTION FOR UPDATING TASKS LENGTH
    const _tasksCountLength_ = tasks_count && tasks_count.map(c => c.count);
    const tasksCountStrigify = JSON.stringify(_tasksCountLength_);
    const signsLength = tasksCountStrigify.length;


    //The final step is to create variable that gets pure numbers without "[" "]" signs
    let tasksCount = tasks_count_by_id;
    
    //Let's cut  "["  "]" if tasks less than 10:
    if (signsLength === 3) {
        tasksCount = tasksCountStrigify.slice(1, 2);
    }

    //Let's cut  "["  "]" if tasks more than 9, but less than 100:
    if (signsLength === 4) {
        tasksCount = tasksCountStrigify.slice(1, 3);
    }

    //Let's cut  "["  "]" if tasks more than 100:
    if (signsLength === 5) {
        tasksCount = tasksCountStrigify.slice(1, 4);
    }  
    
    //The meaning of this variable is to check if tasks_count object exists.
    const tasksCountLength = tasks_count && tasks_count.length
    //console.log(tasksCountLength);

    const history = useHistory()

    useEffect(() => {
        GetTasksByEmployee(employee && employee.employee._id)
        GetTasksCount(employee && employee.employee._id)
        GetTaskById(match.params.id) 
    },[GetTasksByEmployee, employee, GetTaskById, task, match.params.id, GetTasksCount]);

    const onDelete = (id) => {
        if(window.confirm('Вы точно желаете удалить это задание?')){
            DeleteTask(id);
        }
        GetAllTasks()
        setTimeout(() => {
            history.push('/tasks')
        }, 500)
       
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        TaskStatusCompleted(taskId, {done})
    }

    const handleReadSubmit = (e) => {
        e.preventDefault();
        TaskStatusRead(taskId, {ok})

        const variables = {
            count,
            employeeId
        }

        //if tasks_count doesn't exists, create it
        if (tasksCountLength === 0) {
            TasksCountCreate(variables)
        }

        //if tasks_counts already exists, update it
        //DON'T CREATE A NEW ONE!!!!!!!!!!!
        if (tasksCountLength !== 0) {
            TasksCountUpdate(countId, variables);
        }
        setTimeout(() => {
            GetTasksByEmployee(employee && employee.employee._id)
            GetTasksCount(employee && employee.employee._id)
            GetTaskById(match.params.id) 
        }, 1000);
    }

    const handleChange = () => {
        setOk(true);
        // setTimeout(() => {
        //     history.push('/employee-dashboard')
        // },1000);
    }
     
    const setDoneTrue = () => {
        setDone(true);
        setTimeout(() => {
            window.location.reload()
        },5000)
    }   


    return (
        <>
        {!taskId ? 
            (
                <Spinner />
            )
                :
            (
                <div className='main-div-content'>
                    <IdleTimer
                        ref={IdleTimerRef}
                        timeout={60 * 1000}
                        onIdle={onIdle}
                    ></IdleTimer>
            <div>
                <p className='text-center'>{task_by_id && task_by_id.task.title}</p>
                {task_by_id && task_by_id.task.content}
            </div>
            <hr />
            <div>
                <p className="app-text-small d-inline mx-1 bg-info p-2">Выполнить к:</p>
                <p className="d-inline mx-1 bg-warning p-2">{new Date(task_by_id && task_by_id.task.finish).toLocaleString('ru').substr(11)}</p>
            </div>
            <hr />
            
                <div>
                {/* {task_by_id && task_by_id.task.employee.map((e) => (
                    <div key={e._id}>
                        {task_by_id && task_by_id.task.read.map((r) => (
                            <div key={r._id}>
                                {e._id === employee.employee._id && r.byEmployee === employee.employee._id && r.ok !== true
                                 ? (
                                   
                                    <form onSubmit={handleReadSubmit}>
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={handleChange}
                                        className="form-check-input" 
                                    />
                                <span><p className='px-2 bg-warning text-dark'>Отметить задание как прочитанное и принятое к исполнению</p></span>
                                </label>
                                    <input
                                        className="hidden" 
                                        type="number"
                                        name="count"
                                        value={count}
                                        onChange={handleCountChange}
                                    />
                                    <br />
                                    <button className="btn btn-outline-info mt-4">Отправить</button> 
                            </form> 
                                
                                
                                )
                                :
                                null
                                }
                            </div>
                        ))}
                    </div>
                ))} */}
                <form onSubmit={handleReadSubmit}>
                    <label>
                        <input
                            type="checkbox"
                            onChange={handleChange}
                            className="form-check-input" 
                        />
                    <span><p className='px-2 bg-warning text-dark'>Отметить задание как прочитанное и принятое к исполнению</p></span>
                    </label>
                        <input
                            className="hidden" 
                            type="number"
                            name="count"
                            value={count}
                            onChange={handleCountChange}
                        />
                        <br />
                        <button className="btn btn-outline-info mt-4">Отправить</button> 
                </form> 
               
                    <br />
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => setDoneTrue()}
                                className="form-check-input" 
                        />
                        <span ><p className='px-2 bg-success text-white'>Задать статус заданию: Выполнено</p></span>
                        </label>
                        <br />
                        <button className="btn btn-outline-info mt-4">Отправить</button> 
                    </form> 
                    <br />
                    <hr />
                </div>
                <br />
                
             <CommentForm 
                UpdateTask={UpdateTask} 
                taskId={taskId} 
                employee={employee}
            />
            <div>
                <p>Задание было поручено:</p>
               
                {task_by_id && task_by_id.task.employees.map((e) => (
                    <div className='card inline-flex' key={e._id}>
                        <div className=' px-2 bg-primary text-white'>{e.name}</div>
                        <div className=' px-2 bg-primary text-white'>{e.lastName}</div>
                        {task_by_id && task_by_id.task.comments.map((t) => (
                            <div key={t._id} className='px-2'>{e._id !== t.byEmployee ? null : (<p>{t.comment}</p>) }</div>
                        ))}
                         {task_by_id && task_by_id.task.read.map((r) => (
                            <div className='px-2' key={r._id}>{e._id !== r.byEmployee || r.ok === false ? null : (<p className='px-2 m-3 bg-warning text-dark'>Задание принято к исполнению{r.read}</p>)}</div>
                        )) }
                        {task_by_id && task_by_id.task.completed.map((c) => (
                            <div className='px-2' key={c._id}>{e._id !== c.byEmployee || c.done === false ? null : (<p className='px-2 m-3 bg-success text-white'>Задание выполнено{c.done}</p>)}</div>
                        )) }
                    </div>
                ))}
            </div>
            {employee && employee.employee.boss === 1 ?
                (
                    <span className='delete-task' onClick={() => onDelete(task_by_id.task._id)}>
                        Удалить задание
                    </span>
                )
                    :
                null        
            }
           
           {employee && employee.employee.boss === 1 ?
                (
                    <Link className='d-block p-3 mt-3 bg-warning app-text' to='/tasks'>Вернуться к моим поручениям</Link>
                )
                    :
                (
                    <Link className='d-block p-3 mt-3 bg-warning app-text' to='/employee-dashboard'>Вернуться на мою страницу</Link>
                )        
            }
            
        </div>
            )
        }
        </>
    )
}

TaskFullInfo.propTypes = {
    GetTaskById: PropTypes.func.isRequired,
    UpdateTask: PropTypes.func.isRequired,
    DeleteTask: PropTypes.func.isRequired,
    TaskStatusCompleted: PropTypes.func.isRequired,
    TaskStatusRead: PropTypes.func.isRequired,
    GetAllTasks: PropTypes.func.isRequired,
    GetTasksByEmployee: PropTypes.func.isRequired,
    TasksCountUpdate: PropTypes.func.isRequired,
    TasksCountCreate: PropTypes.func.isRequired,
    GetTasksCount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    task: state.task,
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps, {
    GetTaskById,
    UpdateTask,
    DeleteTask,
    TaskStatusCompleted,
    TaskStatusRead,
    GetAllTasks,
    GetTasksByEmployee,
    TasksCountUpdate,
    TasksCountCreate,
    GetTasksCount,
})(TaskFullInfo)