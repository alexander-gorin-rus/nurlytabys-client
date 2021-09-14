import React, {Fragment,  useEffect} from 'react';
import PropTypes from 'prop-types';
import { 
    GetEmployeeList,
    DeleteEmployee
} from '../../../redux/actions/employee_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const EmployeeList = ({
    GetEmployeeList,
    DeleteEmployee,
    employee_reducer: {employee_list}
}) => {
    
    useEffect(() => {
        GetEmployeeList()
    },[GetEmployeeList]);

    const clickDelete = (id) => {
        if(window.confirm('Вы действительно хотите удалить этого работника?')){
            DeleteEmployee(id);
            setTimeout(() => {
                GetEmployeeList()
            }, 300)
        }
    }
    return (
        <div className="main-div-content">
            <p className="text-center app-text-large">Список сотрудников</p>
            {employee_list.list && (
                <p className="text-center bg-primary text-light p-3 app-text-small">В Вашей компании зарегистрировано <p className="text-danger">{employee_list.list.length - 1} </p> сотрудников</p>
            )}
            {employee_list.list && employee_list.list.map((l, index) => 
                (
                    <div className="bg-info" key={index}>
                        {l && l.boss === 1 ? 
                            (
                                <Fragment></Fragment>
                            )
                                :
                            (
                                <Fragment>
                                <p className="text-center app-text-small">{l.name}</p>
                                <p className="text-center app-text-small">{l.lastName}</p>  
                                {l && l.role === undefined ? 
                                    (
                                        <p className="text-center app-text-small">Должность пока не присвоена</p>
                                    ) 
                                        : 
                                    (
                                        <p className="text-center app-text-small">{l.role.name}</p>
                                    )
                                }
                                <Link to={`/employee/${l._id}`}>
                                {l && l.role === undefined ? 
                                    (
                                        <p className="text-center text-warning app-text-small">Присвоить должность</p>
                                    ) 
                                        : 
                                    (
                                        <p className="text-center text-warning app-text-small">Изменить должность</p>
                                    )
                                }
                                </Link>
                                <p onClick={() => clickDelete(l._id)} className="text-center text-danger app-text-small" style={{cursor: "pointer"}} >Удалить работника</p>
                                </Fragment>
                            )
                        }
                    </div>
                ))
            }
            <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/company-management'>Вернуться на страницу управления компанией</Link>
        </div>
    )
}

EmployeeList.propTypes = {
    GetEmployeeList: PropTypes.func.isRequired,
    DeleteEmployee: PropTypes.func.isRequired,
    employee_reducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
});

export default connect(mapStateToProps, {
    GetEmployeeList,
    DeleteEmployee
})(EmployeeList)
