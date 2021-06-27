import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { grantAccessToRegister } from '../redux/actions/register_entry';
import { Redirect, History, useHistory } from 'react-router-dom';

export const Register = ({ grantAccessToRegister, access_granted }) => {

    const history = useHistory();
    const [values, setValues] = useState({
        name: "",
        password: ""
    });

    const { name, password } = values;

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        grantAccessToRegister(name, password); 
        setValues({
            name: "",
            password: ""
        });
        history.push('/')
    }
    
    //Redirect if logged in
    if(access_granted){
        return <Redirect to="register-form" />
    }

    return (
        <Fragment>
            <h4 className="text-center mt-4 text-danger">Внимание! Зарегистрироваться могут только сотрудники компании</h4>
            <div className='mt-5'>
                <div className="row">
                    <form className="col s12" onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <input 
                                    id="icon_prefix" 
                                    type="text" 
                                    className="validate"
                                    name='name'
                                    value={name}
                                    onChange={e => onChange(e)}    
                                />
                                <label>Имя пароля</label>
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">password</i>
                                <input 
                                    id="icon_telephone" 
                                    type="password" 
                                    className="validate"
                                    name='password'
                                    value={password}
                                    onChange={e => onChange(e)}        
                                />
                                <label>Пароль</label>
                            </div>    
                        </div>
                        <input type='submit' className='btn btn-primary' value='Войти' />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

Register.propTypes = {
    grantAccessToRegister: PropTypes.func.isRequired,
    access_granted: PropTypes.bool
}

const mapStateToProps = state => ({
    access_granted: state.register_entry.access_granted
})

export default connect(mapStateToProps, {grantAccessToRegister})(Register);
