import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CreateCategory, GetCategories, DeleteCategory } from '../../../redux/actions/categories';
import { Link } from 'react-router-dom';

const Categories = ({
    CreateCategory, 
    GetCategories, 
    DeleteCategory,
    categories: {categories}
}) => {

    useEffect(() => {
        GetCategories()
    },[GetCategories]);


    const loadCategories = () =>
        GetCategories();

    const [values, setValues] = useState({
        name: "",
        description: ""
    });

    const { name, description } = values;

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        CreateCategory(name, description);
        setValues({
            name: "",
            description: ""
        });
        setTimeout(() => {
            loadCategories();
        }, 300);
        
    }

    const onDelete = (slug) => {
        if(window.confirm(`Вы точно желаете удалить категорию ${slug}`)){
            DeleteCategory(slug);
        }
       setTimeout(() => {
            loadCategories();
        }, 300);
    }

    return (
        <Fragment>
            <h4 className="text-center" style={{marginTop: "15vh"}}>Создать категорию</h4>
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
                                <label htmlFor="icon_prefix">Название категории</label>
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
                                <label htmlFor="icon_prefix">Описание категории</label>
                            </div> 
                        </div>
                        <input type='submit' className='btn btn-primary' value='Отправить' />
                        <Link className='d-block p-3 mt-4 bg-warning ' to='/site-management'>Вернуться на страницу управления сайтом</Link>
                    </form>
                </div>
            </div>
            
            {categories && categories.length === 0 ? (<h3 className="text-center">Вы пока не создали категории</h3>) : 
            (
                <div>
                    <h4 className='text-center mb-5'>Созданные категории</h4>
                {
                categories.map((category) => (
                    <Fragment>
                            <div className="category-cart" key={category.id} style={{position: "relative", left: "10vw", width: "80vw"}}>
                                <h4 className='text-center bg-primary'> {category.name}</h4>
                                <div className='bg-danger p-3 text-center'>
                                    <span className='delete-custom px-3' onClick={() => onDelete(category.slug)}>
                                        Удалить категорию
                                    </span>
                                    <Link to={`get-category-to-update/${category.id}`}>Изменить категорию</Link>
                                </div>
                            </div>
                    </Fragment>
                    ))
                }
                </div>   
            )}
        </Fragment>
    )
}

Categories.propTypes = {
    CreateCategory: PropTypes.func.isRequired,
    GetCategories: PropTypes.func.isRequired,
    DeleteCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    categories: state.categories
})

export default connect(mapStateToProps, {
    CreateCategory, 
    GetCategories,
    DeleteCategory
})(Categories)
