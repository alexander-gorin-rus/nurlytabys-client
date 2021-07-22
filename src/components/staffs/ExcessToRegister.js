import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router';

const ExcessToRegister = props => {

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
        //grantAccessToRegister(name, password); 
        setValues({
            name: "",
            password: ""
        });
        history.push('/')
    }
    return (
        <Fragment>
            
            <div style={{position: "relative", left: "10vw", width: "90vw", marginTop: "15vh"}}>
            <h4 className="text-center">Форма создания пароля для регистрации сотрудников</h4>
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

ExcessToRegister
.propTypes = {

}

export default ExcessToRegister

