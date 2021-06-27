import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/employee_actions';

export const Navbar = ( { logout, role} ) => {
    return (
        <Fragment>
            <div className="div-navbar">
                <ul className="navbar-custom">
                    <li className="li-main li-custom"><Link className="link" to="/">Главная</Link></li>
                        {role === null && (
                            <Fragment>
                                <li className="li-register li-custom"><Link className="link" to="/register">Зарегистрироваться</Link></li>
                            <li className="li-login li-custom"><Link className="link" to="/login">Войти</Link></li>
                            </Fragment>
                        )}
                        {role && (
                            <Fragment>
                                {role === 'boss' && (
                                    <Fragment>
                                        <li className='li-login li-custom'><Link className="link" to='/company-management'>Управление компанией</Link></li>
                                        <li className='li-login li-custom'><Link className="link" to='/site-management'>Управление сайтом</Link></li>
                                        <li onClick={logout} className="li-register li-custom"><Link className="link" to="/" >Выйти из профиля</Link></li> 
                                    </Fragment> 
                                )}
                                {role !== 'boss' && (
                                    <Fragment>
                                        <li className="li-login li-custom"><Link className="link" to="/employee-dashboard">Моя страница</Link></li>
                                        <li onClick={logout} className="li-register li-custom"><Link className="link" to="/" >Выйти из профиля</Link></li> 
                                    </Fragment>  
                                )}    
                            </Fragment>
                            
                        )}           
                </ul>
            </div>
        </Fragment>    
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    //employee_reducer: PropTypes.object.isRequired,
    role: PropTypes.string
  };
  
  const mapStateToProps = state => ({
    //employee_reducer: state.employee_reducer,
    role: state.employee_reducer.role
  });
  
  export default connect(
    mapStateToProps,
    { logout }
  )(Navbar);
