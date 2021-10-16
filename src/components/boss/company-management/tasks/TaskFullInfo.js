import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { 
    GetTaskById, 
    UpdateTask,
    DeleteTask,
    TaskStatusCompleted,
    TaskStatusRead
} from '../../../../redux/actions/task';
import { connect } from 'react-redux'
import { Link, useHistory  } from 'react-router-dom';
import CommentForm from './CommentForm';


const TaskFullInfo = ({
    UpdateTask,
    GetTaskById,
    DeleteTask,
    TaskStatusCompleted,
    TaskStatusRead,
    task: {task_by_id, task},
    employee_reducer: {employee},
    match
}) => {

    const [done, setDone] = useState(false)
    const [ok, setOk] = useState(false)

    let taskId = task_by_id && task_by_id.task._id

    const history = useHistory()

    useEffect(() => {
        GetTaskById(match.params.id) 
    },[task]);

    const onDelete = (id) => {
        if(window.confirm('Вы точно желаете удалить это задание?')){
            DeleteTask(id);
        }
        history.push('/tasks')
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        TaskStatusCompleted(taskId, {done})
    }

    const handleReadSubmit = (e) => {
        e.preventDefault();
        TaskStatusRead(taskId, {ok})
    }

    const setReadTrue = () => {
        setOk(true);
        setTimeout(() => {
            window.location.reload()
        },5000)
    }    

    const setDoneTrue = () => {
        setDone(true);
        setTimeout(() => {
            window.location.reload()
        },5000)
    }   


    return (
        <div className='main-div-content'>
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
            {employee && employee.employee.boss === 1 ?  null : (
                <>
                <div>
                <form onSubmit={handleReadSubmit}>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => setReadTrue()}
                                className="form-check-input" 
                        />
                        <span><p className='px-2 bg-warning text-dark'>Отметить задание как прочитанное и принятое к исполнению</p></span>
                        </label>
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
                </>
            )}
             <CommentForm 
                UpdateTask={UpdateTask} 
                taskId={taskId} 
                employee={employee}
            />
            <div>
                <p>Задание было поручено:</p>
               
                {task_by_id && task_by_id.task.employee.map((e) => (
                    <div className='card inline-flex' key={e._id}>
                        <div className=' px-2 bg-primary text-white'>{e.name}</div>
                        <div className=' px-2 bg-primary text-white'>{e.lastName}</div>
                        {task_by_id && task_by_id.task.comments.map((t) => (
                            <div key={t._id} className='px-2'>{e._id !== t.byEmployee ? null : (<p>{t.comment}</p>) }</div>
                        ))}
                         {task_by_id && task_by_id.task.read.map((r) => (
                            <div className='px-2' key={r._id}>{e._id !== r.byEmployee || r.ok === false ? null : (<p className='px-2 m-3 bg-warning text-dark'>Задание принято к исполнению{r.ok}</p>)}</div>
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

TaskFullInfo.propTypes = {
    GetTaskById: PropTypes.func.isRequired,
    UpdateTask: PropTypes.func.isRequired,
    DeleteTask: PropTypes.func.isRequired,
    TaskStatusCompleted: PropTypes.func.isRequired,
    TaskStatusRead: PropTypes.func.isRequired,
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
    TaskStatusRead
})(TaskFullInfo)
