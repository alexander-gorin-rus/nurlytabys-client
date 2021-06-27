import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { loginEmployee } from '../../redux/actions/employee_actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

const LoginForm = ( { loginEmployee }) => {

    const history = useHistory();

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const { email, password } = values;

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        loginEmployee(email, password);
        setValues({
            email: "",
            password: ""
        });
        history.push('/')
    }

    return (
        <Fragment>
            <h4 className="text-center mt-4">Вход для сотрудников компании</h4>
            <div className='mt-5'>
                <div className="row">
                    <form className="col s12" onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">email</i>
                                <input 
                                    id="icon_telephone" 
                                    type="tel" 
                                    className="validate"
                                    name='email'
                                    value={email}
                                    onChange={e => onChange(e)}    
                                />
                                <label htmlFor="icon_telephone">Почта</label>
                            </div>
                            <div className="input-field col s3">
                                <i className="material-icons prefix">password</i>
                                <input 
                                    id="icon_telephone" 
                                    type="password" 
                                    className="validate"
                                    name='password'
                                    value={password}
                                    onChange={e => onChange(e)}        
                                />
                                <label htmlFor="icon_telephone">Пароль</label>
                            </div>
                        </div>
                        <input type='submit' className='btn btn-primary' value='Войти' />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

LoginForm.propTypes = {
    loginEmployee: PropTypes.func.isRequired,
    role: PropTypes.string,
    //employee_reducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    role: state.employee_reducer.role,
    //employee_reducer: state.employee_reducer.employee
})
export default connect(
    mapStateToProps,
    {loginEmployee}
)(LoginForm)
