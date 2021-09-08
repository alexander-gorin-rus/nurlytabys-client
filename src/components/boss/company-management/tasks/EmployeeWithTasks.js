import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadEmployeeWithTasks } from '../../../../redux/actions/employee_actions';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import TaskStatus from './TaskStatus';
import { DeleteTask } from '../../../../redux/actions/task';

const EmployeeWithTasks = ({
    loadEmployeeWithTasks,
    DeleteTask,
    employee_reducer: {employee_with_tasks}
}) => {

    const { id } = useParams()

    useEffect(() => {
        loadEmployeeWithTasks(id)
    },[])

    const clickDelete = (id) => {
        if(window.confirm('Вы действительно хотите удалить это задание?')){
            DeleteTask(id)
        }
        setTimeout(() => {
            loadEmployeeWithTasks(id);
        }, 300);
    }
    return (
        <div className="main-div-content">
            <p className="text-center">Задания выданные:
                <br />
                {employee_with_tasks && employee_with_tasks.employee.name}
                <br />
                {employee_with_tasks && employee_with_tasks.employee.lastName}
                </p>
            
            {employee_with_tasks && employee_with_tasks.tasks.map((t, index) => (
                <div className="task-card" key={index}>
                <p className="task-card-description">{t.description}</p>
                <br />
                <p className="app-text-small text-center">Задание задано:</p>
                <p className="text-center">{new Date(t.createdAt).toLocaleString('en-GB')}</p>
                <p className="app-text-small text-center">Задание необходимо закончить:</p>
                <p className="text-center">{new Date(t.finish).toLocaleString('en-GB')}</p>
                <p className="app-text-small text-center">Статус задания</p>
                <TaskStatus t={t} />
                <p className="app-text-small text-center bg-danger" style={{cursor: "pointer"}} onClick={() => clickDelete(t._id)}>Удалить задания</p>

             </div>
            ))}
             <Link className='d-block p-3 mt-4 bg-warning ' to='/tasks'>Вернуться на страницу заданий</Link>
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
