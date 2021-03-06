import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { 
    CreateRole,
    LoadAllRoles,
    DeleteRole
} from '../../../redux/actions/roles';

const RoleComponent = ({
    CreateRole,
    LoadAllRoles,
    DeleteRole,
    roles: {load_all_roles}
}) => {

    useEffect(() => {
        LoadAllRoles()
    },[LoadAllRoles])

    const [values, setValues] = useState({
        name: ""
    });

    const { name } = values;

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name){
            alert('Название должности обязательно должно быть указано')
        }

        const variables = {
            name
        }
        CreateRole(variables);
        setValues({
            name: "",
            
        });
        setTimeout(() => {
            LoadAllRoles();
        }, 300);
        
    }

    const onDelete = (id) => {
        if(window.confirm('Вы точно желаете удалить эту должность?')){
            DeleteRole(id);
        }
       setTimeout(() => {
            LoadAllRoles();
        }, 300);
    }

    return (
        <Fragment>
            <div className='mt-5 main-div-content'>
            <p className="text-center app-text-small" style={{marginTop: "15vh"}}>Форма управления должностями</p>
            
            <p className="text-center app-text-small">Создать должность</p>
                <form className="col s12" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={e => onChange(e)}
                            placeholder="Название должности"
                        />
                    </div>
                    <input type='submit' className='btn btn-primary' value='Отправить'/>
                    <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/company-management'>Вернуться на страницу управления компанией</Link>
                </form>
                {load_all_roles.roles && load_all_roles.roles.length === 0 ? 
                    (
                        <p className="text-center app-text-small">Вы пока не создали должности</p>
                    )
                        :
                    (
                        <div>
                            <p className='text-center mb-5 mt-5 app-text-small'>Созданные должности</p>
                        {load_all_roles.roles && load_all_roles.roles.map((r, index) => (
                            <div className="category-cart" key={index}>
                                <div className='bg-danger p-3 text-center'>
                                <p className='app-text-small'>{r.name}</p>
                                <span className='delete-custom px-3 app-text-small' onClick={() => onDelete(r._id)}>
                                            Удалить должность
                                </span>
                                <Link className='app-text-small' to={`/update-role/${r._id}`}>Изменить должность</Link>
                                </div>
                            </div>
                        ))}
                        </div>
                    )
                }
                
            </div>
            
        </Fragment>
    )
}

RoleComponent.propTypes = {
    CreateRole: PropTypes.func.isRequired,
    DeleteRole: PropTypes.func.isRequired,
    LoadAllRoles: PropTypes.func.isRequired,
    roles: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default connect(mapStateToProps, {
    CreateRole,
    LoadAllRoles,
    DeleteRole
})(RoleComponent)
