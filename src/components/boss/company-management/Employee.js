import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { 
    GetEmployeeById,
    UpdateEmployee
} from '../../../redux/actions/employee_actions';
import { LoadAllRoles } from '../../../redux/actions/roles';
import { useParams, Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const Employee = ({
    GetEmployeeById,
    LoadAllRoles,
    UpdateEmployee,
    employee_reducer: {employee_by_id},
    roles: {load_all_roles}
}) => {

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        GetEmployeeById(id);
         LoadAllRoles()
    },[GetEmployeeById, LoadAllRoles, id]);

    const [values, setValues] = useState({
        role: ""
    });

    const { role } = values;

    const handleRoleChange = (e) => {
        setValues({ ...values, role: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            role
        }
        
        UpdateEmployee(id, variables);
        history.push('/employee-list')
    }

    return (
        <div className="main-div-content">
            {employee_by_id && employee_by_id.employee ? 
                (
                    <form onSubmit={handleSubmit}>
                        <div className="category-cart">
                        <div className='bg-danger p-3 text-center'>
                            <p>{employee_by_id.employee.name}</p>
                            <p>{employee_by_id.employee.lastName}</p>
                            {/* <p>{employee_by_id.employee.role.name}</p> */}
                            
                                <select
                                    name="category"
                                    className="form-control bg-primary text-light"
                                    onChange={handleRoleChange}
                                >
                                <option className='app-text-small'>Выбрать должность</option>
                                    {load_all_roles.roles &&
                                        load_all_roles.roles.map((c) =>
                                            <option
                                                key={c._id}
                                                value={c._id}
                                            >{c.name}
                                            </option>)
                                    }
                                </select>
                        </div>
                    </div>
                    <button className="btn btn-outline-info mt-4">Отправить</button>
                    </form>
                    
                )
                    :
                (
                    <h1 className="text-center text-warning">Загружаю</h1>
                )
            }
            
            <Link className='d-block p-3 mt-4 bg-warning ' to='/employee-list'>Вернуться к списку сотрудников</Link>
        </div>
    )
}

Employee.propTypes = {
    GetEmployeeById: PropTypes.func.isRequired,
    LoadAllRoles: PropTypes.func.isRequired,
    employee_reducer: PropTypes.object.isRequired,
    UpdateEmployee: PropTypes.func.isRequired,
    roles: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer,
    roles: state.roles
})

export default connect(mapStateToProps, {
    GetEmployeeById,
    LoadAllRoles,
    UpdateEmployee
})(Employee)
