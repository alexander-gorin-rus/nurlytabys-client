import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetCurrentCategory, CategoryUpdate } from '../../../redux/actions/categories';
import { Link } from 'react-router-dom';

const UpdateCategory = ({
    GetCurrentCategory,
    CategoryUpdate,
    match, 
    categories: {category} 
}) => {

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("");

    useEffect(() => {
       //loadCategory()
        GetCurrentCategory(match.params.slug)
    }, []);

    const loadCategory = () => {
        setLoading(true)
        GetCurrentCategory(match.params.slug).then( () => {
            setName(category.name)
            setLoading(false)
        })
    }


    const onChange = e => {
        setName({[e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        
    }

    return (
        <Fragment>
           <h4 className="text-center mt-4">Изменить категорию</h4>
                <div className='mt-5'>
                    <div className="row">
                        <form className="col s12" onSubmit={e => onSubmit(e)}>
                            <div className="row">
                                <div className="input-field col s12">
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
                            </div>
                            <input type='submit' className='btn btn-primary' value='Отправить' />
                        </form>
                            <Link className='p-3 m-2' to='/categories'>Вернуться</Link>
                    </div>
                        {/* {JSON.stringify(category.name)} */}
                </div>    
        </Fragment>   
    )
}

UpdateCategory.propTypes = {
    GetCurrentCategory: PropTypes.func.isRequired,
    CategoryUpdate: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories
  });
  
  export default connect(mapStateToProps, { 
    GetCurrentCategory,
    CategoryUpdate
})(UpdateCategory);