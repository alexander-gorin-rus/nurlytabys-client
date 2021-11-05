import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { useHistory } from 'react-router';

import { 
    TasksCountUpdate,
    GetTasksByEmployee
} from '../../../../redux/actions/task';

const UpdateTasksLength = ({
    TasksCountUpdate,
    GetTasksByEmployee,
    task: {
        task_by_id, 
        task, 
        tasks_by_role,
        tasks_count,
        tasks_count_by_id
    },
    employee_reducer: {employee},
}) => {

    const history = useHistory();
    const tasksByRoleLength = tasks_by_role && tasks_by_role.length;
    console.log(tasksByRoleLength);
    
    const [values, setValues] = useState({
        count: tasks_by_role.length,
    });
    const { count } = values;

    const handleCountChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const tasksCountId = tasks_count && tasks_count.map(t => t._id);
    const countsStringify = JSON.stringify(tasksCountId);
    let countId = countsStringify.slice(2, 26);

    const handleReadSubmit = (e) => {
        e.preventDefault();

        const variables = {
            count
        }

        TasksCountUpdate(countId, variables);

        setTimeout(() => {
            history.push('/employee-dashboard')
        }, 500)
    }

    // useEffect(() => {
    //     //GetTasksCount(employee && employee.employee._id);
    //     GetTasksByEmployee();
    // },[
    //     GetTasksByEmployee, 
    //     // employee, 
    //     // GetTasksCount,
    //     // tasksCount
    //     ])
    return (
        <div className='main-div-content'>
            <p className="text-center">Одно или несколько заданий было удалено. 
            Пожалуйста, обновите список</p>
            <form onSubmit={handleReadSubmit}>
                <input 
                    type="number"
                    name="count"
                    value={count}
                    onChange={handleCountChange}
                />
                <br />
                <button className="btn btn-outline-info mt-4">Отправить</button> 
            </form> 
        </div>
    )
}

UpdateTasksLength.propTypes = {
    TasksCountUpdate: PropTypes.func.isRequired,
    GetTasksByEmployee: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    task: state.task,
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps, {
    TasksCountUpdate,
    GetTasksByEmployee
})(UpdateTasksLength);
