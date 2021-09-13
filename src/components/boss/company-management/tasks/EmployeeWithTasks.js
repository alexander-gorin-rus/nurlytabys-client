import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadEmployeeWithTasks } from '../../../../redux/actions/employee_actions';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import TaskStatus from './TaskStatus';
import { DeleteTask } from '../../../../redux/actions/task';

const EmployeeWithTasks = ({
    loadEmployeeWithTasks,
    DeleteTask,
    employee_reducer: {employee_with_tasks}
}) => {

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        loadEmployeeWithTasks(id)
    },[loadEmployeeWithTasks])

    const clickDelete = (id) => {
        if(window.confirm('Вы действительно хотите удалить это задание?')){
            DeleteTask(id)
        } 
        
        setTimeout(() => {
            history.push('/tasks');
        },1000)
    }
    return (
        <div className="main-div-content">
            <div className="text-center d-inline px-3">Задания поручены:
               
                {employee_with_tasks === null ? (null) : (<p className='d-inline px-1'>{employee_with_tasks.employee.name}</p>) }
               
                {employee_with_tasks === null ? (null) : (<p className='d-inline'>{employee_with_tasks.employee.lastName}</p>) }

            </div>
            <br />
            <br />
            <br />
            {employee_with_tasks && employee_with_tasks.tasks.map((t, index) => (
                <div className="task-card" key={index}>
                    <p className="task-card-description">{t.content}</p>
                    <p className="app-text-small text-center">Задание задано:</p>
                    <p className="text-center">{new Date(t.createdAt).toLocaleString('en-GB')}</p>
                    <p className="app-text-small text-center">Задание необходимо закончить:</p>
                    <p className="text-center">{new Date(t.finish).toLocaleString('en-GB')}</p>
                    <TaskStatus t={t} />
                    <br />
                    <p className="app-text-small text-center bg-danger" style={{cursor: "pointer"}} onClick={() => clickDelete(t._id)}>Удалить задание</p>

                </div>
            ))}
            <Link className='d-block p-3 my-4 bg-warning app-text-small' to='/tasks'>Вернуться на страницу заданий</Link>
        </div>
    )
}

EmployeeWithTasks.propTypes = {
    employee_reducer: PropTypes.object,
    loadEmployeeWithTasks: PropTypes.func.isRequired,
    DeleteTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps, {
    loadEmployeeWithTasks,
    DeleteTask
})(EmployeeWithTasks)
