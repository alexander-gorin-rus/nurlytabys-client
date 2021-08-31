import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerEmployee } from '../../redux/actions/employee_actions';
import { LoadAllRoles } from '../../redux/actions/roles';
import { setAlert } from '../../redux/actions/alert';
import { useHistory } from 'react-router-dom';

const RegisterForm = ({
    registerEmployee, 
    setAlert,
    LoadAllRoles,
    roles: {load_all_roles}
}) => {

    useEffect(() => {
        LoadAllRoles()
    },[]);

    const history = useHistory();

    const [values, setValues] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        password2: "",
        role: ""
    });

    const { name, lastName, phone, email, password, password2, role } = values;

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleRoleCreate = (e) => {
        setValues({ ...values, role: e.target.value });
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
                password2,
                role
            });
            setValues({
                name: '',
                lastName: '',
                phone: '',
                email: '',
                password: '',
                password2: '',
                role
            });
            history.push('/');
        }
    }

    return (
        <Fragment>
            <p className="text-center text-large" style={{marginTop: "15vh"}}>Форма регистрации сотрудников</p>
            <div className='mt-5 main-div-content'>
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
                                    placeholder='имя'  
                                />
                                {/* <label >Имя</label> */}
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
                                    placeholder='фамилия'
                                />
                                {/* <label htmlFor="icon_telephone">Фамилия</label> */}
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
                                    placeholder='телефон'  
                                />
                                {/* <label htmlFor="icon_telephone">Телефон</label> */}
                            </div>
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
                                {/* <label htmlFor="icon_telephone">Почта</label> */}
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
                                    placeholder='пароль'     
                                />
                                {/* <label htmlFor="icon_telephone">Пароль</label> */}
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
                                    placeholder='повторить пароль'     
                                />
                                {/* <label className='app-text-small'>Повторить пароль</label> */}
                            </div>
                        </div>
                       
                            {/* <label>Выбор должности</label> 
                                <select
                                    name="category"
                                    className="form-control bg-primary text-light"
                                    onChange={handleRoleCreate}
                                >
                                    <option>Выбрать должность</option>
                                    {load_all_roles.roles &&
                                        load_all_roles.roles.map((r) =>
                                            <option
                                                key={r._id}
                                                value={r._id}
                                            >{r.name}
                                            </option>)}
                                </select> */}
                            
                        <input type='submit' className='my-5 btn btn-primary' value='Зарегистрироваться' />
                    </form>
                </div>
            </div>
        </Fragment>
        
    )
}

RegisterForm.propTypes = {
    registerEmployee: PropTypes.func.isRequired,
    LoadAllRoles: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    roles: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default connect(mapStateToProps,{
        registerEmployee,
        LoadAllRoles, 
        setAlert}
)(RegisterForm)
