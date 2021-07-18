import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
//import { LoadVideos, SaveVideoFunction, DeleteVideo } from '../../../redux/actions/videos';
import { Link } from 'react-router-dom';

const { Title } = Typography;



const MainPageVideo = ({
    // videos: { videos: {videos}},
    // LoadVideos,
    // DeleteVideo,
    // SaveVideoFunction
}) => {

    useEffect(() => {
        //loadAllVideos()
    },[]);

    const loadAllVideos = () => {
        //LoadVideos();
    }    

    
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");

    const [values, setValues] = useState({
        title: "", 
        filePath: FilePath,
        companyInfo: "",
        description: "",
        contacts: "",
        duration: Duration,
        thumbnail: Thumbnail,
    });

    const { 
        title,
        filePath,
        companyInfo,
        description,
        contacts,
        duration,
        thumbnail,
    } = values;

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            title,
            filePath: FilePath,
            companyInfo,
            description,
            contacts,
            duration: Duration,
            thumbnail: Thumbnail,
        }

        //SaveVideoFunction(variables);
        //history.push('/')
        
        setValues({
            title: "", 
            filePath: "",
            companyInfo: "",
            description: "",
            contacts: "",
            duration: "",
            categories: [], 
            thumbnail: "",
        });
        // setTimeout(() => {
        //     loadAllVideos()
        // },300);
    }

    const onDrop = ( files ) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        console.log(files)
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
                    alert('unable to save video')
                }
            })
    }

    const clickDelete = (slug) => {
        // if(window.confirm('Вы точно желаете удалить это видео?')){
        //     DeleteVideo(slug)
        // }
        // setTimeout(() => {
        //     loadAllVideos()
        // },300);
    }

    return (
        <Fragment>
        <h3 className="text-center">Управление информацией для главной страницы</h3>
        
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={5} >Загрузить видео</Title>
        </div>

        <form onSubmit={handleSubmit}>

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

            <div className="form-group">
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                    placeholder="Название видео"
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
            <Link className='d-block p-3 mt-4 bg-warning ' to='/site-management'>Вернуться на страницу управления сайтом</Link>
        </form>
    </div>
    
    </Fragment>
    )
}

MainPageVideo.propTypes = {
    // GetCategories: PropTypes.func.isRequired,
    // LoadVideos: PropTypes.func.isRequired,
    // SaveVideoFunction: PropTypes.func.isRequired,
    // DeleteVideo: PropTypes.func.isRequired,
    // videos: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    // categories: state.categories,
    // videos: state.videos
})

export default connect(mapStateToProps, {
    // GetCategories,
    // LoadVideos,
    // SaveVideoFunction,
    // DeleteVideo
})(MainPageVideo)
