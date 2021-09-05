import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { loginEmployee } from '../../redux/actions/employee_actions';
import { connect } from 'react-redux';
import { 
    //useHistory, 
    Redirect 
} from 'react-router-dom'

const LoginForm = ( { 
    loginEmployee,
    employee_reducer: {employee}
}) => {

    //const history = useHistory();

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
        //history.push('/')
    }

    if(employee && employee.boss === 1){
        return <Redirect to='/boss-page' />
    }

    if(employee && employee.boss === 0){
        return <Redirect to='/employee-dashboard' />
    }

    return (
        <Fragment>
            <p className="text-center app-text-large" style={{marginTop: "15vh"}}>Вход для сотрудников компании</p>
            <div className='mt-5 main-div-content'>
                <div className="row">
                    <form className="col s12" onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">email</i>
                                <input 
                                    id="icon_telephone" 
                                    type="email" 
                                    className="validate"
                                    name='email'
                                    value={email}
                                    onChange={e => onChange(e)}
                                    placeholder='почта'    
                                />
                               
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
                                    placeholder='пароль'        
                                />
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
    employee_reducer: PropTypes.object,
}

const mapStateToProps = state => ({
    role: state.employee_reducer.role,
    employee_reducer: state.employee_reducer
})
export default connect(
    mapStateToProps,
    {loginEmployee}
)(LoginForm)
