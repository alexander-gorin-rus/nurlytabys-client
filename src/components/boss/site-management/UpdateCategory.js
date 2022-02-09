import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone';

import axios from 'axios';

import { connect } from 'react-redux';

import { useParams, useHistory } from 'react-router';

import { Link } from 'react-router-dom'; 

import { GetOneCategoryToUpdate, CategoryUpdate } from '../../../redux/actions/categories';

import ImagesUpload from './ImagesUpload';
//import Spinner from '../../layout/spinner1.gif'

const UpdateCategory = ({
    GetOneCategoryToUpdate, 
    CategoryUpdate,
    categories: {category}
}) => {
    const { id } = useParams();

    const history = useHistory();
    
    useEffect(() => {
        GetOneCategoryToUpdate(id)
    },[GetOneCategoryToUpdate, id]);


    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    const [Images, setImages] = useState([]);


    const [values, setValues] = useState({
        name: "",
        description: "",
        filePath: "",
        duration: "",
        thumbnail: "",
        images: []
    });

    const { 
        name, 
        description,
        // filePath,
        // duration,
        // thumbnail,
        // images
    } = values;

    useEffect(() => {
        if(category.category){
            setValues({
                name: category.category.name,
                description: category.category.description,
                filePath: category.category.filePath,
                duration: category.category.duration,
                thumbnail: category.category.thumbnail,
                images: category.category.images
            })
        }
    },[category.category]);

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();

        const varibles = {
            name,
            description,
            filePath: FilePath,
            duration: Duration,
            thumbnail: Thumbnail,
            images: Images
        }
        CategoryUpdate(id, varibles);
        setTimeout(() => {
            history.push('/categories');
        },300)
    }

    const onDrop = ( files ) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
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


    const updateImages = (images, newImages) => {
        setImages(images, newImages)
    }


    return (
        <div>
            {category && category.category ? 
            (
                <Fragment>
                <div className='main-div-content'>
                <p className="text-center app-text">Изменить категорию</p>
                {category.category.images.map((i, index) => (
                    <img style={{width: "200px", height: "auto"}} alt='category' key={index} src={`http://localhost:5003/${i}`}/>
                ))}
                <div className="row">
                {/* {JSON.stringify(values)} */}
                    <form onSubmit={e => onSubmit(e)}>
                        <ImagesUpload refreshFunction={updateImages} images={category.category.images} />
                        <div style={{position: "relative", marginTop: "3vh", display: 'flex', justifyContent: 'space-between' }}>
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
                        <img src={`http://localhost:5003/${Thumbnail}`} alt="construction" />
                    </div>
                }
            </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={name}
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <input type='submit' className='btn btn-primary' value='Отправить' />
                        <Link className='d-block p-3 mt-4 bg-warning ' to='/categories'>Вернуться на страницу управления категориями</Link>
                    </form>
                </div>
            </div>
            </Fragment>
            ) 
            : 
            (
                // <Spinner />
            <h1 className="text-center text-warning">Загружаю</h1>
            )}
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
