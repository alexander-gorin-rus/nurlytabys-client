import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useParams, Link, useHistory } from 'react-router-dom'
import { 
    GetOneCategoryToUpdate,
    CategoryUpdate
} from '../../../redux/actions/categories';
import { connect } from 'react-redux';
import Spinner from '../../../layout/Spin-1.gif'

const UpdateCategory = ({
    GetOneCategoryToUpdate, 
    CategoryUpdate,
    categories: {category}
}) => {
    const { id } = useParams();

    const history = useHistory();
    
    useEffect(() => {
        GetOneCategoryToUpdate(id)
    },[]);

    useEffect(() => {
        if(category.category){
            setValues({
                name: category.category.name,
                description: category.category.description
            })
        }
    },[category.category])

    const [values, setValues] = useState({
        name: "",
        description: ""
    });

    const { name, description } = values;

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        CategoryUpdate(id, values);
        setTimeout(() => {
            history.push('/categories');
        },300)
    }
    return (
        <div>
            {category && category.category ? 
            (
                <Fragment>
                <h4 className="text-center" style={{marginTop: "15vh"}}>Изменить категорию</h4>
                <div className='mt-5' style={{position: "relative", left: "10vw", width: "90vw"}}>
                <div className="row">
                    <form className="col s12" onSubmit={e => onSubmit(e)}>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">add_box</i>
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
                                <i className="material-icons prefix">add_box</i>
                                <input 
                                    id="icon_prefix" 
                                    type="text" 
                                    className="validate"
                                    name="description"
                                    value={description}
                                    onChange={e => onChange(e)}    
                                />
                            </div> 
                        </div>
                        <input type='submit' className='btn btn-primary' value='Отправить' />
                        <Link className='d-block p-3 mt-4 bg-warning ' to='/categories'>Вернуться на страницу управления категориями</Link>
                    </form>
                </div>
                {/* {category && JSON.stringify(category.category.name)} */}
            </div>
            </Fragment>
            ) 
            : 
            (<h1 className="text-center text-warning">Загружаю</h1>)}
        </div>
    )
}

UpdateCategory.propTypes = {
    GetOneCategoryToUpdate: PropTypes.func.isRequired,
    CategoryUpdate: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories
  });
  
  export default connect(mapStateToProps, { 
    GetOneCategoryToUpdate,
    CategoryUpdate
})(UpdateCategory);
