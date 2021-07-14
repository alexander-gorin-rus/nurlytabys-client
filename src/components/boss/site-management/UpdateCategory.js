import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetOneCategoryToUpdate, CategoryUpdate } from '../../../redux/actions/categories';
import { Link } from 'react-router-dom';

const UpdateCategory = ({
    GetOneCategoryToUpdate,
    CategoryUpdate,
    match, 
    categories: {category} 
}) => {

    const [values, setValues] = useState({
        name: '',
        description: ''
    });

    const { name, description } = values

    const {slug} = match.params

    useEffect(() => {
       GetOneCategoryToUpdate(slug);  
        getCategory()
    },[]]);

    const getCategory = () => {
       if(category){
           return setValues({
               name: category.category.name,
               description: category.category.description
           })
       } 
    }


    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        CategoryUpdate(slug)
    }

    return (
        <Fragment>
           <h4 className="text-center mt-4">Изменить категорию</h4>
                <div className='mt-5'>
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
                                    name='description'
                                    value={description}
                                    onChange={e => onChange(e)}    
                                />
                            
                            </div> 
                        </div>
                        <input type='submit' className='btn btn-primary' value='Отправить' />
                    </form>
                    <Link className='p-3 m-2' to='/categories'>Вернуться</Link>
                </div>
                        {category && JSON.stringify(category.category.name)}
                </div>    
        </Fragment>   
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