import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
    UpdateEmployee,
    GetEmployeeById
} from '../../redux/actions/employee_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alert';


const ChangeStaffInfo = ({
    employee_reducer: {employee_by_id},
    UpdateEmployee,
    GetEmployeeById
}) => {

    const { id } = useParams();

    useEffect(() => {
        GetEmployeeById(id)
    },[GetEmployeeById, id])

    const [values, setValues] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, lastName, phone, email, password, password2 } = values;

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    }


    useEffect(() => {
        if(employee_by_id === null){
            return null
        }else{
            setValues({
                name: employee_by_id.employee.name,
                lastName: employee_by_id.employee.lastName,
                phone: employee_by_id.employee.phone,
                email: employee_by_id.employee.email
            })
        }
    },[employee_by_id]);

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            name,
            lastName,
            phone,
            email,
            password,
            password2
        }
        if(password !== password2){
            setAlert("Пароли не совпадают", "danger")
        }else{
            UpdateEmployee(id, variables);
                setTimeout(() => {
                    window.location.reload();
                },6000)
            }
        
    }
    return (
        <Fragment>
            
        <div className='mt-5 main-div-content'>
        <p className="text-center text-large">Форма изменения данных сотрудника</p>
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
           
                <input type='submit' className='my-5 btn btn-primary' value='Изменить' />
            </form>
        </div>
        {employee_by_id && employee_by_id.employee.boss === 1 ? 
            (
                <Link className='d-block p-3 mt-4 bg-warning app-text-small ' to='/boss-page'>Вернуться на мою страницу</Link>
            )
                :
            (
                <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/employee-dashboard'>Вернуться на мою страницу</Link>
            )
        }
        
    </div>
    </Fragment>
    )
}


ChangeStaffInfo.propTypes = {
    employee_reducer: PropTypes.object,
    UpdateEmployee: PropTypes.func.isRequired,
    GetEmployeeById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    employee_reducer: state.employee_reducer
})

export default connect(mapStateToProps, {
    UpdateEmployee,
    GetEmployeeById
})(ChangeStaffInfo)
