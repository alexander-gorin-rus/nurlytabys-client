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

    const tasksCountLength = tasks_count && tasks_count.map(c => c.count);

    const tasksCountStrigify = JSON.stringify(tasksCountLength);

    const signsLength = tasksCountStrigify.length;

    let tasksCount = 0;
    
    if (signsLength === 3) {
        tasksCount = tasksCountStrigify.slice(1, 2);
    }

    if (signsLength === 4) {
        tasksCount = tasksCountStrigify.slice(1, 3);
    }

    if (signsLength === 5) {
        tasksCount = tasksCountStrigify.slice(1, 4);
    }    

    console.log(tasksCount);
    
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

    if (tasksByRoleLength === tasksCount) {
        setTimeout(() => {
            history.push('/employee-dashboard')
        }, 500)
    }

    return (
        <div className='main-div-content'>
            <p className="text-center">Одно или несколько заданий было удалено. 
            Пожалуйста, обновите список</p>
            <form onSubmit={handleReadSubmit}>
                <input 
                    className='hidden'
                    type="number"
                    name="count"
                    value={count}
                    onChange={handleCountChange}
                />
                <br />
                <button className="btn btn-outline-info mt-4">Обновить</button> 
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
