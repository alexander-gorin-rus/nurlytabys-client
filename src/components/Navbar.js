import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/employee_actions';

export const Navbar = ({ isAuthenticated, logout }) => {
    return (
        <Fragment>
             <div className="div-navbar">
                <ul className="navbar-custom">
                    {!isAuthenticated && (
                        <Fragment>
                            <li className="li-main li-custom"><Link className="link" to="/">Главная</Link></li>
                            <li className="li-register li-custom"><Link className="link" to="/register">Зарегистрироваться</Link></li>
                            <li className="li-login li-custom"><Link className="link" to="/login">Войти</Link></li>
                        </Fragment>  
                    )}
                    {isAuthenticated && (
                        <Fragment>
                            <li className="li-main li-custom"><Link className="link" to="/">Главная</Link></li>
                            <li className="li-register li-custom"><Link className="link" to="/login" onClick={logout}>Выйти из профиля</Link></li>
                            <li className="li-login li-custom"><Link className="link" to="/employee-dashboard">Моя страница</Link></li>
                        </Fragment>    
                    )}
                </ul>
            </div>
        </Fragment>
        
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.employee_reducer.isAuthenticated
})

export default connect(
    mapStateToProps,
    {logout}
)(Navbar)
