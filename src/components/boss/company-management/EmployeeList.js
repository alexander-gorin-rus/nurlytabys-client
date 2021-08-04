import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { GetEmployeeList } from '../../../redux/actions/employee_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const EmployeeList = ({
    GetEmployeeList,
    employee_reducer: {employee_list}
}) => {
    
    useEffect(() => {
        GetEmployeeList()
    },[])
    return (
        <div className="main_container">
            {employee_list.list && employee_list.list.map((l, index) => (
                <div className="bg-info" key={index}>
                    <Link to={`/employee/${l._id}`}> 
                        <p className="text-center">{l.name}</p>
                        <p className="text-center">{l.lastName}</p>
                    </Link>
                </div>
            ))}
            <Link className='d-block p-3 mt-4 bg-warning ' to='/company-management'>Вернуться на страницу управления компанией</Link>
        </div>
    )
}

EmployeeList.propTypes = {
    GetEmployeeList: PropTypes.func.isRequired,
    employee_reducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
});

export default connect(mapStateToProps, {
    GetEmployeeList,
})(EmployeeList)
