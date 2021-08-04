import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { 
    CreateRole,
    LoadAllRoles,
    DeleteRole
} from '../../../redux/actions/roles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const RoleComponent = ({
    CreateRole,
    LoadAllRoles,
    DeleteRole,
    roles :{load_all_roles}
}) => {

    useEffect(() => {
        LoadAllRoles()
    },[])

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
            alert('Название роль обязательно должно быть указано')
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
        if(window.confirm('Вы точно желаете удалить эту роль?')){
            DeleteRole(id);
        }
       setTimeout(() => {
            LoadAllRoles();
        }, 300);
    }

    return (
        <Fragment>
            <div className='mt-5' style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <h4 className="text-center" style={{marginTop: "15vh"}}>Форма управления ролями</h4>
            
            <h4 className="text-center" style={{marginTop: "15vh"}}>Создать роль</h4>
                <form className="col s12" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={e => onChange(e)}
                            placeholder="Название роли"
                        />
                    </div>
                    <input type='submit' className='btn btn-primary' value='Отправить'/>
                    <Link className='d-block p-3 mt-4 bg-warning ' to='/company-management'>Вернуться на страницу управления компанией</Link>
                </form>
                {load_all_roles.roles && load_all_roles.roles.length === 0 ? 
                    (
                        <h3 className="text-center">Вы пока не создали ролей</h3>
                    )
                        :
                    (
                        <div>
                            <h4 className='text-center mb-5'>Созданные роли</h4>
                        {load_all_roles.roles && load_all_roles.roles.map((r, index) => (
                            <div className="category-cart" key={index}>
                                <div className='bg-danger p-3 text-center'>
                                <p>{r.name}</p>
                                <span className='delete-custom px-3' onClick={() => onDelete(r._id)}>
                                            Удалить роль
                                </span>
                                <Link to={`/update-role/${r._id}`}>Изменить роль</Link>
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
