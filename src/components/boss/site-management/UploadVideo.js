import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { GetCategories } from '../../../redux/actions/categories';
import { LoadVideos, UploadVideoFunction } from '../../../redux/actions/videos';
import VideoCart from './VideoCart';

const { Title } = Typography;



const UploadVideo = ({
    categories: {categories}, 
    GetCategories,
    videos: { videos: {videos}},
    LoadVideos,
    UploadVideoFunction
}) => {

    useEffect(() => {
        GetCategories();
        LoadVideos();
    },[GetCategories]);

    

    const history = useHistory();
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");

    const [values, setValues] = useState({
        title: "", 
        filePath: FilePath,
        description: "",
        duration: Duration,
        categories: [], 
        thumbnail: Thumbnail,
        category: "",
    });

    const { 
        title,
        filePath,
        description,
        duration,
        //categories,
        thumbnail,
        category
    } = values;

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleCategoryChange = (e) => {
        console.log('the choosen category', e.target.value);
        setValues({ ...values, category: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variables = {
            title,
            filePath: FilePath,
            description,
            duration: Duration,
            thumbnail: Thumbnail,
            category
        }

        UploadVideoFunction(variables);
        history.push('/');
    }

    const onDrop = ( files ) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        console.log(files)
        formData.append('file', files[0]);

        axios.post(`${process.env.REACT_APP_API}/video-upload`, formData, config)
            .then(res => {
                if(res.data.success){
                    console.log(res)

                    let variable = {
                        filePath: res.data.filePath,
                        fileName: res.data.fileName
                    }
                    setFilePath(res.data.filePath);

                    //generate thumbnail with this file
                    axios.post(`${process.env.REACT_APP_API}/thumbnail`, variable)
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

    return (
        <Fragment>
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={5} >Загрузить видео для главной страницы</Title>
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
                        <img src={`http://localhost:5003/${Thumbnail}`} alt="construction" />
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
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                    placeholder="Текст к видео"
                />
            </div>

            <h6 className="text-center">Выбрать категорию</h6>

            <select
                name="category"
                className="form-control bg-primary text-light"
                onChange={handleCategoryChange}
            >
                <option>Выбрать категорию</option>
                {categories.length > 0 &&
                    categories.map((c) =>
                        <option
                            key={c._id}
                            value={c._id}
                        >{c.name}
                        </option>)}
            </select>

            <button className="btn btn-outline-info mt-4">Отправить</button>

        </form>
    </div>
    <h4 className='text-center'>Созданные видео</h4>
        <VideoCart videos={videos} />
    </Fragment>
    )
}

UploadVideo.propTypes = {
    GetCategories: PropTypes.func.isRequired,
    LoadVideos: PropTypes.func.isRequired,
    UploadVideoFunction: PropTypes.func.isRequired,
    videos: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories,
    videos: state.videos
})

export default connect(mapStateToProps, {
    GetCategories,
    LoadVideos,
    UploadVideoFunction
})(UploadVideo)
