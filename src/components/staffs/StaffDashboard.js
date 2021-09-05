import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPersonalPage from '../pages/personalPage/MyPersonalPage';


const StaffDashboard = ({
    employee
}) => {
    return (
        <MyPersonalPage employee={employee} />
    )
}

StaffDashboard.propTypes = {
    employee_reducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    employee: state.employee_reducer.employee
})

export default connect(
    mapStateToProps, 
    {}
)(StaffDashboard)

//export default StaffDashboard;