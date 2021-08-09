import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../redux/actions/employee_actions';

export const Header = ( { 
    logout,
    boss
} ) => {
    return (
        <Fragment>
            <div className="div-header">
                <ul className="header-custom">
                        {boss === null ? (
                            <Fragment>
                                <li className="li-register li-custom"><Link className="link" to="/register-form">Зарегистрироваться</Link></li>
                                <li className="li-login li-custom"><Link className="link" to="/login">Войти</Link></li>
                            </Fragment>
                        )
                            :
                        (
                            <Fragment>
                                {boss && boss === 1 ? 
                            (
                                <Fragment>
                                    <li className='li-login li-custom'><Link className="link" to='/company-management'>Управление компанией</Link></li>
                                    <li className='li-login li-custom'><Link className="link" to='/site-management'>Управление сайтом</Link></li>
                                    <li onClick={logout} className="li-register li-custom"><Link className="link" to="/" >Выйти из профиля</Link></li> 
                                </Fragment> 
                            ) 
                                :
                            (
                                <Fragment>
                                    <li className="li-login li-custom"><Link className="link" to="/employee-dashboard">Моя страница</Link></li>
                                    <li onClick={logout} className="li-register li-custom"><Link className="link" to="/" >Выйти из профиля</Link></li> 
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
    boss: PropTypes.number,
  };
  
  const mapStateToProps = state => ({
    boss: state.employee_reducer.boss
  });
  
  export default connect(
    mapStateToProps,
    { logout }
  )(Header);
