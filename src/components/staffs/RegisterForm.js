import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerEmployee } from '../../redux/actions/employee_actions';
import { setAlert } from '../../redux/actions/alert';
import { useHistory } from 'react-router-dom';

const RegisterForm = ({registerEmployee, setAlert}) => {

    const history = useHistory();

    const [values, setValues] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, lastName, phone, email, password, password2 } = values;

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Пароли не совпадают, повторите пароль правильно', 'danger')
        }else{
            registerEmployee({
                name,
                lastName,
                phone,
                email,
                password,
                password2
            });
            setValues({
                name: '',
                lastName: '',
                phone: '',
                email: '',
                password: '',
                password2: ''
            });
            history.push('/');
        }
    }

    return (
        <Fragment>
            <h4 className="text-center" style={{marginTop: "15vh"}}>Форма регистрации сотрудников</h4>
            <div className='mt-5' style={{position: "relative", left: "10vw", width: "90vw"}}>
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
                                <label htmlFor="icon_prefix">Имя</label>
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <input 
                                    id="icon_prefix" 
                                    type="text" 
                                    className="validate"
                                    name='lastName'
                                    value={lastName}
                                    onChange={e => onChange(e)} 
                                />
                                <label htmlFor="icon_telephone">Фамилия</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">phone</i>
                                <input 
                                    id="icon_telephone" 
                                    type="tel" 
                                    className="validate"
                                    name='phone'
                                    value={phone}
                                    onChange={e => onChange(e)}    
                                />
                                <label htmlFor="icon_telephone">Телефон</label>
                            </div>
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
                        </div>
                        <div className="row">
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
                            <div className="input-field col s3">
                                <i className="material-icons prefix">password</i>
                                <input 
                                    id="icon_telephone" 
                                    type="password" 
                                    className="validate"
                                    name='password2'
                                    value={password2}
                                    onChange={e => onChange(e)}        
                                />
                                <label htmlFor="icon_telephone">Повторить пароль</label>
                            </div>
                        </div>
                        <input type='submit' className='btn btn-primary' value='Зарегистрироваться' />
                    </form>
                </div>
            </div>
        </Fragment>
        
    )
}

RegisterForm.propTypes = {
    registerEmployee: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    setAlert: PropTypes.func.isRequired
})

export default connect(
    mapStateToProps,
    {registerEmployee, setAlert}
)(RegisterForm)
