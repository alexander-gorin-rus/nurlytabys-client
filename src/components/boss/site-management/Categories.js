import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { 
    CreateCategory, 
    GetCategories, 
    DeleteCategory 
} from '../../../redux/actions/categories';
import { Link } from 'react-router-dom';
import ImagesUpload from './ImagesUpload';



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
    const [Images, setImages] = useState([]);

    const [values, setValues] = useState({
        name: "",
        description: "",
        filePath: FilePath,
        duration: Duration,
        thumbnail: Thumbnail,
        images: ""
    });

    const { 
        name, 
        description,
        // filePath,
        // duration,
        // thumbnail,
        images
    } = values;

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !description){
            alert('Все поля должны быть заполнены')
        }

        const variables = {
            name,
            description,
            filePath: FilePath,
            duration: Duration,
            thumbnail: Thumbnail,
            images,
        }
        CreateCategory(variables);
        setValues({
            name: "",
            description: "",
            filePath: "",
            duration: "",
            thumbnail: "",
            images: []
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

        axios.post(`http://localhost:5003/api/v1/category-video-upload`, formData, config)
            .then(res => {
                if(res.data.success){
                    console.log(res)

                    // let variable = {
                    //     filePath: res.data.filePath,
                    //     fileName: res.data.fileName
                    // }
                    setFilePath(res.data.filePath);
                    alert('Видео успешно добавлено');

                    //generate thumbnail with this file
                    // axios.post(`${process.env.REACT_APP_API}/category-thumbnail`, variable)
                    //     .then(res => {
                    //         if(res.data.success) {
                    //             setDuration(res.data.fileDuration)
                    //             setThumbnail(res.data.thumbsFilePath)
                    //         }else{
                    //             alert('Unable to make thumbnails')
                    //         }
                    //     })
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

    const updateImages = (newImages) => {
        console.log(newImages);
        setImages(newImages)
    }

    return (
        <Fragment>
            <div className='main-div-content'>
            <p className="text-center bg-info p-3 app-text-small">Создать категорию</p>
                <div className="row">
                    <form onSubmit={handleSubmit}>
                    <ImagesUpload 
                        refreshFunction={updateImages}
                    />

                    <div style={{ position: "relative", marginTop: "3vh", display: 'flex', justifyContent: 'space-between' }}>
                        <Dropzone
                            onDrop={onDrop} 
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div className='upload-div'
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <p className='app-text'>Выбрать видео</p>

                                </div>
                            )}
                        </Dropzone>

                        {Thumbnail !== "" &&
                            <div>
                                <img src={`http://localhost:5003/${Thumbnail}`} alt="main page" />
                            </div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="images"
                            className="form-control"
                            value={images}
                            onChange={e => onChange(e)}
                            placeholder="Вставьте путь к изображению"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={e => onChange(e)}
                            placeholder="Название категории"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            value={description}
                            onChange={e => onChange(e)}
                            placeholder="Описание категории"
                        />
                    </div>
                        <input type='submit' className='btn btn-primary' value='Отправить' />
                        <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/site-management'>Вернуться на страницу управления сайтом</Link>
                    </form>
                </div>
            </div>
            
            {categories && categories.length === 0 ? 
                (
                    <p className="text-center app-text">Вы пока не создали категории</p>
                ) 
                    : 
                (
                    <div>
                        <p className='text-center mb-5 app-text'>Созданные категории</p>
                    {
                    categories && categories.map((category) => (
                        <div className="category-cart" key={category.id} style={{position: "relative", left: "10vw", width: "80vw"}}>
                            <div className='bg-danger p-3 text-center'>
                                {
                                    category.filePath === "" ? 
                                    (
                                        <img style={{width: "200px", height: "auto"}} alt='construction' src={`http://localhost:5003/${category.images[0]}`} />
                                    ) 
                                        : 
                                    (
                                        <img alt='construction' src={`http://localhost:5003/${category.thumbnail}`} />
                                    )
                                }
                                    {/* <img alt='construction' src={`http://localhost:5003/${category.thumbnail}`} /> */}
                                    <p className='app-text-small'>{category.name}</p>
                                    <span className='delete-custom px-3 app-text-small' onClick={() => onDelete(category.slug)}>
                                            Удалить категорию
                                    </span>
                                        <Link className='app-text-small' to={`get-category-to-update/${category.id}`}>Изменить категорию</Link>
                                </div>
                        </div>
                        ))
                    }
                    </div>   
                )
            }
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
