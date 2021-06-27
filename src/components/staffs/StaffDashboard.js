import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const StaffDashboard = ({employee}) => {

    return (
        <div>
            <h5 className='text-center bg-primary'>Персональная станица сотрудника</h5>
            <div>{employee.name}</div>
        </div>
    )
}

StaffDashboard.propTypes = {
    
}

const mapStateToProps = state => ({
    employee: state.employee_reducer.employee
})

export default connect(
    mapStateToProps, 
    {}
)(StaffDashboard)

//export default StaffDashboard;