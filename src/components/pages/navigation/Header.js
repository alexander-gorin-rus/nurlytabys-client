import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/actions/employee_actions';

export const Header = ( { 
    logout,
    employee_reducer
} ) => {

    const clickLogout = () => {
        logout()
        window.location.reload()
    }


    return (
        <Fragment>
            <div className="div-header">
                <ul className="header-custom">
                        {employee_reducer.employee === null ? (
                            <Fragment>
                                <li className="li-register li-custom"><Link className="link" to="/register">Зарегистрироваться</Link></li>
                                <li className="li-login li-custom"><Link className="link" to="/login">Войти</Link></li>
                            </Fragment>
                        )
                            :
                        (
                            <Fragment>
                                {employee_reducer.employee && employee_reducer.employee.employee.boss === 1 ? 
                            (
                                <Fragment>
                                    <li onClick={clickLogout} className="li-register li-custom"><Link className="link" to="/" >Выйти</Link></li>
                                    <li className='li-login li-custom'><Link className="link" to='/boss-page'>Моя страница</Link></li> 
                                </Fragment> 
                            ) 
                                :
                            (
                                <Fragment>
                                    <li onClick={clickLogout} className="li-register li-custom"><Link className="link" to="/" >Выйти</Link></li> 
                                    <li className="li-login li-custom"><Link className="link" to="/employee-dashboard">Моя страница</Link></li>
                                </Fragment>  
                            )
                        }
                            </Fragment>
                        )
                    }
                </ul>
            </div>
        </Fragment>    
    )
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    employee_reducer: PropTypes.object,
  };
  
  const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
  });
  
  export default connect(
    mapStateToProps,
    { logout }
  )(Header);
