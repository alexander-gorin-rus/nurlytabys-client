import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { GetEmployeeById } from '../../../redux/actions/employee_actions';
import { LoadAllRoles } from '../../../redux/actions/roles';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Employee = ({
    GetEmployeeById,
    LoadAllRoles,
    employee_reducer: {employee_by_id},
    roles: {load_all_roles}
}) => {

    const { id } = useParams();

    useEffect(() => {
        GetEmployeeById(id);
        LoadAllRoles()
    },[]);

    const [values, setValues] = useState({
        role: ""
    });

    const { role } = values;

    const handleRoleChange = (e) => {
        setValues({ ...values, role: e.target.value });
    }

    return (
        <div className="main_container">
            {employee_by_id.employee && employee_by_id.employee ? 
                (
                    <form>
                        <div className="category-cart">
                        <div className='bg-danger p-3 text-center'>
                            <p>{employee_by_id.employee.name}</p>
                            <p>{employee_by_id.employee.lastName}</p>
                            
                                <select
                                    name="category"
                                    className="form-control bg-primary text-light"
                                    onChange={handleRoleChange}
                                >
                            <option>Выбрать категорию</option>
                                {load_all_roles.roles.length > 0 &&
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
    roles: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer,
    roles: state.roles
})

export default connect(mapStateToProps, {
    GetEmployeeById,
    LoadAllRoles
})(Employee)
