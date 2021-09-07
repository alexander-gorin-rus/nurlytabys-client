import React, {useState,  useEffect} from 'react';
import PropTypes from 'prop-types';
import { 
    GetEmployeeList
} from '../../../../redux/actions/employee_actions';
import {
    CreateTask
} from '../../../../redux/actions/task'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const EmployeeList = ({
    GetEmployeeList,
    CreateTask,
    employee_reducer: {employee_list}
}) => {
    
    useEffect(() => {
        GetEmployeeList()
    },[GetEmployeeList]);

    const [values, setValues] = useState({
        description: "",
        employee: ""
    });

    const { 
        description,
        employee
    } = values;

    const handleEmployeeChange = (e) => {
        setValues({...values, employee: e.target.value})
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
        //console.log('The choosen employee is', e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const variables = {
            description,
            employee
        }

        CreateTask(variables)
        
        setValues({
            description: "",
            employee: ""
        })
    }

    return (
        <div className="main-div-content">
            <p className='app-text text-center'>Форма заполнения задания</p>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                    placeholder="Текст задания"
                />
            </div>
            <select
                name="employee"
                className="form-control bg-primary text-light"
                onChange={handleEmployeeChange}
            >
                <option>Выбрать сотрудника</option>
                {employee_list.list && employee_list.list.length > 0 &&
                    employee_list.list.map((l) =>
                        <option
                            key={l._id}
                            value={l._id}
                        >{l.name}
                        </option>)
                }
            </select>

            <button className="btn btn-outline-info mt-4">Отправить</button>
           
        </form>
            <Link className='d-block p-3 mt-4 bg-warning ' to='/company-management'>Вернуться на страницу управления компанией</Link>
        </div>
    )
}

EmployeeList.propTypes = {
    GetEmployeeList: PropTypes.func.isRequired,
    CreateTask: PropTypes.func.isRequired,
    employee_reducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
});

export default connect(mapStateToProps, {
    GetEmployeeList,
    CreateTask
})(EmployeeList)
