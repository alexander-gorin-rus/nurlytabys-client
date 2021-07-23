import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { 
    getSingleRegisterToUpdate,
    UpdateRegister
} from '../../../redux/actions/register_entry';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'

const UpdateExcessToRegister = ({
    getSingleRegisterToUpdate,
    UpdateRegister,
    register_entry: {single_register}
}) => {

    const { id } = useParams()

    useEffect(() => {
        getSingleRegisterToUpdate(id)
    },[]);

    useEffect(() => {
        if(single_register && single_register){
            setValues({
                name: single_register.name,
                password: single_register.password
            })
        }
    },[single_register])

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
        UpdateRegister(id, values); 
        history.push('/site-management')
    }
    return (
        <Fragment>
            <div style={{position: "relative", left: "10vw", width: "90vw", marginTop: "15vh"}}>
            <h4 className="text-center">Изменить пароль для регистрации сотрудников</h4>
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
                            </div>    
                        </div>
                        <input type='submit' className='btn btn-primary' value='Отправить' />
                        <Link className='d-block p-3 mt-4 bg-warning ' to='/excess-to-register'>Вернуться на страницу управления паролем</Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

UpdateExcessToRegister.propTypes = {
    getSingleRegisterToUpdate: PropTypes.func.isRequired,
    UpdateRegister: PropTypes.func.isRequired,
    register_entry: PropTypes.object
}
const mapStateToProps = state => ({
    register_entry: state.register_entry
}) 

export default connect(mapStateToProps, {
    getSingleRegisterToUpdate,
    UpdateRegister
})(UpdateExcessToRegister)
