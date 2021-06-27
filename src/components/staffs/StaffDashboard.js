import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const StaffDashboard = () => {
    return (
        <h3>Loading</h3>
    )
}

StaffDashboard.propTypes = {
    employee_reducer: PropTypes.object.isRequired,
}

// const mapStateToProps = state => ({
//     employee: state.employee_reducer.employee
// })

export default connect(
    null, 
    {}
)(StaffDashboard)

//export default StaffDashboard;