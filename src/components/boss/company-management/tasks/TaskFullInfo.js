import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { 
    GetTaskById, 
    UpdateTask,
    DeleteTask,
    GetTasksByRole
} from '../../../../redux/actions/task';
import { connect } from 'react-redux'
import { useParams, Link, useHistory  } from 'react-router-dom';
import CommentForm from './CommentForm';


const TaskFullInfo = ({
    UpdateTask,
    GetTaskById,
    DeleteTask,
    task: {task_by_id, task},
    employee_reducer: {employee},
    match
}) => {

    let employeeId = employee && employee.employee._id
    let taskId = task_by_id && task_by_id.task._id

    console.log(employeeId)
    console.log(taskId)

    const { id } = useParams();
    const history = useHistory()

    useEffect(() => {
        GetTaskById(match.params.id) 
    },[GetTaskById]);

    const onDelete = (id) => {
        if(window.confirm('Вы точно желаете удалить это задание?')){
            DeleteTask(id);
        }
        history.push('/tasks')
    }

    return (
        <div className='main-div-content'>
            <div>
                <p className='text-center'>{task_by_id && task_by_id.task.title}</p>
               
                {task_by_id && task_by_id.task.content}
            </div>
            <hr />
            <div>
                <p>Задание было поручено:</p>
               
                {task_by_id && task_by_id.task.role.map((r) => (
                    <p key={r._id}>{r.name}</p>
                ))}
            </div>
            <CommentForm UpdateTask={UpdateTask} taskId={task_by_id && task_by_id.task._id} />

            {/* <div>
                <p className="app-text text-center bg-warning">Изменить статус задания</p>
                <select
                    onChange={(e) => UpdateTask(task_by_id.task._id, e.target.value)}
                    className="form-control"
                    name="completed"
                    defaultValue={task_by_id && task_by_id.task.complete}
                >
                <option value="Не выполнено">Не выполнено</option>
                <option value="Выполнено">Выполнено</option>
                </select>
            </div> */}
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
}

const mapStateToProps = state => ({
    task: state.task,
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps, {
    GetTaskById,
    UpdateTask,
    DeleteTask
})(TaskFullInfo)
