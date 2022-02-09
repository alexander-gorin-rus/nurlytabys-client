import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    CreateAccessToRegister,
    listOfRegisters,
    DeleteRegister
} from '../../../redux/actions/register_entry';

const ExcessToRegister = ({
    CreateAccessToRegister,
    listOfRegisters,
    DeleteRegister,
    register_entry
}) => {

    useEffect(() => {
        listOfRegisters()
    },[listOfRegisters]);

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
        CreateAccessToRegister(name, password); 
        setValues({
            name: "",
            password: ""
        });
        history.push('/boss-page')
    }

    const onDelete = (id) => {
        if(window.confirm('Вы точно желаете удалить пароль?')){
            DeleteRegister(id);
            history.push('/boss-page')
        }
    }
    return (
        <Fragment>
            {register_entry && register_entry.list_of_registers.length  === 0 ? (
                <Fragment>
                <div className='main-div-content'>
                <p className="text-center app-text-small">Форма создания пароля для регистрации сотрудников</p>
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
                            <input type='submit' className='btn btn-primary' value='Отправить' />
                        </form>
                        <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/site-management'>Вернуться на страницу управления сайтом </Link>
                    </div>
                </div>
        </Fragment>
                
            ) : (
                <Fragment>
                    {register_entry.list_of_registers.list && register_entry.list_of_registers.list.map((r) => 
                        <Fragment>
                            <h4 style={{marginTop: "15vh"}} className="text-center">Пароль для регистрации сотрудников уже создан</h4>
                            <div className="category-cart" key={r.id} style={{position: "relative", left: "10vw", width: "80vw"}}>
                                <h4 className='text-center bg-primary'> {r.name}</h4>
                                <div className='bg-danger p-3 text-center'>
                                    <span className='delete-custom px-3' onClick={() => onDelete(r._id)}>
                                        Удалить пароль
                                    </span>
                                    <Link to={`update-excess-to-register/${r._id}`}>Изменить пароль</Link>
                                </div>
                                <Link className='d-block p-3 mt-4 bg-warning ' to='/site-management'>Вернуться на страницу управления сайтом</Link>
                            </div>
                        </Fragment>
                    )}
                </Fragment> 
            )}
        </Fragment>
    )
}

ExcessToRegister.propTypes = {
    CreateAccessToRegister: PropTypes.func.isRequired,
    listOfRegisters: PropTypes.func.isRequired,
    register_entry: PropTypes.object,
    DeleteRegister: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    register_entry: state.register_entry
})

export default connect(mapStateToProps, {
    CreateAccessToRegister,
    listOfRegisters,
    DeleteRegister
})(ExcessToRegister)

