import React, {Fragment, useEffect, useState} from 'react';
import { 
    LoadRoleById,
    UpdatedRole
} from '../../../redux/actions/roles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';


const UpdateRole = ({
    LoadRoleById,
    UpdatedRole,
    roles: {role}
}) => {

    const { id } = useParams();

    const history = useHistory();


    useEffect(() => {
        LoadRoleById(id)
    },[]);

    const [values, setValues] = useState({
        name: ""
    });

    const {name} = values;

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if(role.role){
            setValues({
                name: role.role.name
            })
        }
    },[role.role])

    const handleSubmit = (e) => {
        e.preventDefault();
        const variables = {
            name
        };
        UpdatedRole(id, variables);
        setTimeout(() => {
            history.push('/role-component');
        },300)
    }

    return (
        <Fragment>
            <div className='main-div-content'>
            <p className="text-center app-text-small">Изменить должность</p>
                <form className="col s12" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type='submit' className='btn btn-primary' value='Отправить'/>
                    <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/role-component'>Вернуться на страницу управления ролями</Link>
                </form>
            </div>
        </Fragment>
    )
}

UpdateRole.propTypes = {
    LoadRoleById: PropTypes.func.isRequired,
    UpdatedRole: PropTypes.func.isRequired,
    roles: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default connect(mapStateToProps, {
    LoadRoleById,
    UpdatedRole
})(UpdateRole)
