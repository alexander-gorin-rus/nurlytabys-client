import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const BossPrivateRoutes = ({
    component: Component,
    employee_reducer: {isAuthenticated, role},
    ...rest
}) => (
    <Route
        {...rest}
        render={props => 
            !isAuthenticated && role !== 'boss' ? (
                <Redirect to='/' />
            ) : (
                <Component {...props} />
            )
        }
    />
);

BossPrivateRoutes.propTypes = {
    employee_reducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps)(BossPrivateRoutes)
