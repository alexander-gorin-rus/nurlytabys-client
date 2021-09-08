import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadEmployeeWithTasks } from '../../../../redux/actions/employee_actions';
import { useParams } from 'react-router';

const EmployeeWithTasks = ({
    loadEmployeeWithTasks,
    employee_reducer: {employee_with_tasks}
}) => {

    const { id } = useParams()

    useEffect(() => {
        loadEmployeeWithTasks(id)
    },[])

    return (
        <div className="main-div-content">
            {employee_with_tasks && employee_with_tasks.tasks.map((t, index) => (
                <div key={index}>
                    <p>{t.description}</p>
                </div>
            ))}
        </div>
    )
}

EmployeeWithTasks.propTypes = {
    employee_reducer: PropTypes.object,
    loadEmployeeWithTasks: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps, {
    loadEmployeeWithTasks
})(EmployeeWithTasks)
