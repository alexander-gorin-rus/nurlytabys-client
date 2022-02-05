import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    MainPageInfoShow,
    MainPageInfoUpload,
    MainPageInfoDelete
} from '../../../redux/actions/main_page_info';

import ImagesUpload from './ImagesUpload';



const MainPageVideo = ({
    main_page_info: {main_page_info},
    MainPageInfoShow,
    MainPageInfoDelete,
    MainPageInfoUpload
}) => {


    useEffect(() => {
        MainPageInfoShow()
    },[MainPageInfoShow]); 

    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    const [Images, setImages] = useState([]);


    const [values, setValues] = useState({
        title: "", 
        filePath: FilePath,
        companyInfo: "",
        description: "",
        contacts: "",
        duration: Duration,
        thumbnail: Thumbnail,
        images: Images
    });

    const { 
        title,
        companyInfo,
        description,
        contacts,
        filePath,
        duration,
        thumbnail,
        images
    } = values;

    const history = useHistory();

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            title,
            companyInfo,
            description,
            contacts,
            filePath: FilePath,
            duration: Duration,
            thumbnail: Thumbnail,
            images: Images
        }

        MainPageInfoUpload(variables);
        history.push('/');
    }

    const onDrop = ( files ) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        console.log('Сохраненный файл:', files)
        formData.append('file', files[0]);

        axios.post(`${process.env.REACT_APP_API}/main-page-video-upload`, formData, config)
            .then(res => {
                if(res.data.success){
                    console.log(res)

                    let variable = {
                        filePath: res.data.filePath,
                        fileName: res.data.fileName
                    }
                    setFilePath(res.data.filePath);

                    //generate thumbnail with this file
                    axios.post(`${process.env.REACT_APP_API}/main-page-thumbnail`, variable)
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

    const clickDelete = (slug) => {
        if(window.confirm('Вы точно желаете удалить это видео?')){
            MainPageInfoDelete(slug)
            history.push('/site-management')
        }
    }

    const updateImages = (newImages) => {
        console.log(newImages);
        setImages(newImages)
    }


    return (
        <Fragment>
        {main_page_info && main_page_info.length === 0 ? (
            <Fragment>
                <div className='main-div-content'>
                <p className="text-center app-text">Управление информацией для главной страницы</p>
                <form onSubmit={handleSubmit}>
                <ImagesUpload refreshFunction={updateImages}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "3vh"}}>
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
                                name="title"
                                className="form-control"
                                value={title}
                                onChange={handleChange}
                                placeholder="Название компании"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="companyInfo"
                                className="form-control"
                                value={companyInfo}
                                onChange={handleChange}
                                placeholder="Краткая информация о компании"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={handleChange}
                                placeholder="Подробная информация о компании"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="contacts"
                                className="form-control"
                                value={contacts}
                                onChange={handleChange}
                                placeholder="Контактная информация"
                            />
                        </div>

                        <button className="btn btn-outline-info mt-4">Отправить</button>
                        <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/site-management'>Вернуться на страницу управления сайтом</Link>
                    </form>
                </div>
            </Fragment>
            ) : (
            <div className='main-div-content'>
                <p 
                    className="text-center bg-info p-3" 
                    style={{ position: "relative", left: "0", width: "60vw"}}>
                        Вы уже создали информацию для главной страницы
                </p>
                <div className='mb-5' style={{position: "relative", left: "0", width: "60vw"}}>
                    {main_page_info.video && main_page_info.video.map((c, index) =>
                    <div className="category-cart" key={index} >
                    <div className='bg-danger p-3 text-center'>
                        {c.filePath === "" ? 
                            (
                                <img style={{width: "40vw", height: "auto"}} alt='construction' src={`http://localhost:5003/${c.images[0]}`} />
                            )
                            :
                            (
                                <img alt='construction' src={`http://localhost:5003/${c.thumbnail}`} />
                            )
                        }
                                    <p>{c.title}</p>
                        <span className='delete-custom px-3' onClick={() => clickDelete(c.slug)}>
                            Удалить
                        </span>
                        <Link to={`main-page-info-update/${c._id}`}>Изменить</Link>
                    </div>
                </div>
                        )}
                        <Link className='d-block p-3 mt-4 bg-warning ' to='/site-management'>Вернуться на страницу управления сайтом</Link>
                </div>
                
            </div>)}
    </Fragment>
    )
}

MainPageVideo.propTypes = {
    MainPageInfoUpload: PropTypes.func.isRequired,
    MainPageInfoShow: PropTypes.func.isRequired,
    MainPageInfoDelete: PropTypes.func.isRequired,
    main_page_info: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    main_page_info: state.main_page_info
})

export default connect(mapStateToProps, {
    MainPageInfoUpload,
    MainPageInfoShow,
    MainPageInfoDelete
})(MainPageVideo)



