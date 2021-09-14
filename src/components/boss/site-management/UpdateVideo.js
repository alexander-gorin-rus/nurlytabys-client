import React, {useEffect, useState, Fragment} from 'react'
import PropTypes from 'prop-types';
import { 
    GetSingleVideo,
    UpdateSingleVideo
} from '../../../redux/actions/videos';
import { GetCategories } from '../../../redux/actions/categories';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ImagesUpload from './ImagesUpload';



const UpdateVideo = ({
    GetSingleVideo,
    GetCategories,
    UpdateSingleVideo,
    videos: {single_video},
    categories: {categories},
}) => {

    const { id } = useParams();
    const history = useHistory()

    useEffect(() => {
        GetSingleVideo(id);
        GetCategories()
    },[GetCategories]);

    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    const [Images, setImages] = useState([]);


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
        description,
        //filePath,
        //duration,
        //categories,
        //thumbnail,
        category
    } = values;

    useEffect(() => {
        if(single_video.video && single_video.video){
            setValues({
                thumbnail: single_video.video.thumbnail,
                title: single_video.video.title,
                filePath: single_video.video.filePath,
                description: single_video.video.description,
                duration: single_video.video.duration
            })
        }
    },[single_video.video])

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

        UpdateSingleVideo(id, variables);
        history.push('/upload-video')
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

    const updateImages = (newImages) => {
        console.log(newImages);
        setImages(newImages)
    }
    return (
        <Fragment>
           
                <div className='main-div-content'>
                <p className="text-center app-text">Изменить видео</p>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    
                </div>

                <form onSubmit={handleSubmit}>
                <ImagesUpload refreshFunction={updateImages} />
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
                    <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/upload-video'>Вернуться на страницу видео материалов</Link>
                </form>
            </div>
        </Fragment>
    )
}

UpdateVideo.propTypes = {
    GetSingleVideo: PropTypes.func.isRequired,
    GetCategories: PropTypes.func.isRequired,
    UpdateSingleVideo: PropTypes.func.isRequired,
    videos: PropTypes.object,
    categories: PropTypes.object,
}

const mapStateToProps = state => ({
    videos: state.videos,
    categories: state.categories
})

export default connect(mapStateToProps, {
    GetSingleVideo,
    GetCategories,
    UpdateSingleVideo
})(UpdateVideo)
