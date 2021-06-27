import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const EmployeePrivateRoutes = ({
    component: Component,
    employee_reducer: {isAuthenticated, loading},
    ...rest
}) => (
    <Route
        {...rest}
        render={props => 
            !isAuthenticated && !loading ? (
                <Redirect to='/' />
            ) : (
                <Component {...props} />
            )
        }
    />
);

EmployeePrivateRoutes.propTypes = {
    employee_reducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps)(EmployeePrivateRoutes)
