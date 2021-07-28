import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { 
    CreateCategory, 
    GetCategories, 
    DeleteCategory 
} from '../../../redux/actions/categories';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Categories = ({
    CreateCategory, 
    GetCategories, 
    DeleteCategory,
    categories: {categories}
}) => {

    useEffect(() => {
        GetCategories()
    },[GetCategories]);


    const loadCategories = () => {
        GetCategories();
    }
        

    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");

    const [values, setValues] = useState({
        name: "",
        description: "",
        filePath: FilePath,
        duration: Duration,
        thumbnail: Thumbnail
    });

    const { 
        name, 
        description,
        filePath,
        duration,
        thumbnail
    } = values;

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            name,
            description,
            filePath: FilePath,
            duration: Duration,
            thumbnail: Thumbnail
        }
        CreateCategory(variables);
        setValues({
            name: "",
            description: "",
            filePath: "",
            duration: "",
            thumbnail: ""
        });
        setTimeout(() => {
            loadCategories();
        }, 300);
        
    }

    const onDrop = ( files ) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        console.log('Сохраненный файл:', files)
        formData.append('file', files[0]);

        axios.post(`${process.env.REACT_APP_API}/category-video-upload`, formData, config)
            .then(res => {
                if(res.data.success){
                    console.log(res)

                    let variable = {
                        filePath: res.data.filePath,
                        fileName: res.data.fileName
                    }
                    setFilePath(res.data.filePath);

                    //generate thumbnail with this file
                    axios.post(`${process.env.REACT_APP_API}/category-thumbnail`, variable)
                        .then(res => {
                            if(res.data.success) {
                                setDuration(res.data.fileDuration)
                                setThumbnail(res.data.thumbsFilePath)
                            }else{
                                alert('Unable to make thumbnails')
                            }
                        })
                }else{
                    alert('Не удалось сохранить видео')
                }
            })
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
                    <form className="col s12" onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Dropzone
                            onDrop={onDrop} 
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <h4>Выбрать видео</h4>

                                </div>
                            )}
                        </Dropzone>

                        {Thumbnail !== "" &&
                            <div>
                                <img src={`http://localhost:5003/${Thumbnail}`} alt="main page" />
                            </div>
                        }
                    </div>
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
                    <div className="category-cart" key={category.id} style={{position: "relative", left: "10vw", width: "80vw"}}>
                        <div className='bg-danger p-3 text-center'>
                        <img alt='construction' src={`http://localhost:5003/${category.thumbnail}`} />
                                <p>{category.name}</p>
                                <span className='delete-custom px-3' onClick={() => onDelete(category.slug)}>
                                        Удалить категорию
                                </span>
                                    <Link to={`get-category-to-update/${category.id}`}>Изменить категорию</Link>
                            </div>
                    </div>
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
    categories: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    categories: state.categories
})

export default connect(mapStateToProps, {
    CreateCategory, 
    GetCategories,
    DeleteCategory
})(Categories)
