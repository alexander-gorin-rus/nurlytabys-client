import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { GetCategories } from '../../../redux/actions/categories';
import { 
    LoadVideos, 
    SaveVideoFunction, 
    DeleteVideo 
} from '../../../redux/actions/videos';
import { Link } from 'react-router-dom';
import ImagesUpload from './ImagesUpload';


const UploadVideo = ({
    categories: {categories}, 
    GetCategories,
    videos: { videos: {videos}},
    LoadVideos,
    DeleteVideo,
    SaveVideoFunction
}) => {

    useEffect(() => {
        GetCategories();
        loadAllVideos()
    },[GetCategories]);

    const loadAllVideos = () => {
        LoadVideos();
    }    

    
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    const [Images, setImages] = useState([])

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
        // filePath,
        // duration,
        // categories,
        // thumbnail,
        category
    } = values;

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleCategoryChange = (e) => {
        //console.log('the choosen category', e.target.value);
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
            category,
            images: Images
        }

        SaveVideoFunction(variables);
        //history.push('/')
        
        setValues({
            title: "", 
            filePath: "",
            description: "",
            duration: "",
            categories: [], 
            thumbnail: "",
            category: "",
        });
        setTimeout(() => {
            loadAllVideos()
        },300)
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

    const clickDelete = (slug) => {
        if(window.confirm('Вы точно желаете удалить это видео?')){
            DeleteVideo(slug)
        }
        setTimeout(() => {
            loadAllVideos()
        },300);
    }


    const updateImages = (newImages) => {
        console.log(newImages);
        setImages(newImages)
    }


    return (
        <Fragment>
            
        <p className="text-center bg-info p-3" style={{position: "relative", marginTop: "15vh", fontSize: "1.4rem", left: "15vw", width: "70vw"}}>Страница управления видео материалами и изображениями</p>
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        

        <form onSubmit={handleSubmit}>
        <ImagesUpload refreshFunction={updateImages}/>

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
                        </option>)
                }
            </select>

            <button className="btn btn-outline-info mt-4">Отправить</button>
            <Link className='d-block p-3 mt-4 bg-warning ' to='/site-management'>Вернуться на страницу управления сайтом</Link>
        </form>
    </div>
    { videos && videos.length === 0 ? (<h4 className="text-center pb-5">Вы пока не создали видео</h4>) : (
      <>
        <div className='mb-5' style={{marginTop: "15vh"}}>
        <h4 className='text-center'>Созданные видео</h4>
        {videos && videos.map((c, index) =>
            <div className="category-cart" key={index} style={{position: "relative", left: "10vw", width: "80vw"}}>
                <div className='bg-danger p-3 text-center'>
                    {c.filePath === "" ? 
                        (
                            <img style={{width: "200px", height: "auto"}} alt='construction' src={`http://localhost:5003/${c.images[0]}`} />
                        ) 
                            : 
                        (
                            <img alt='construction' src={`http://localhost:5003/${c.thumbnail}`} />
                        )    
                    }
                {/* <img alt='construction' src={`http://localhost:5003/${c.thumbnail}`} /> */}
                                <p>{c.title}</p>
                    <span className='delete-custom px-3' onClick={() => clickDelete(c.slug)}>
                        Удалить видео
                    </span>
                    <Link to={`update-video/${c._id}`}>Изменить видео</Link>
                </div>
            </div>
        )}
        </div>
    </>
    ) }
    </Fragment>
    )
}

UploadVideo.propTypes = {
    GetCategories: PropTypes.func.isRequired,
    LoadVideos: PropTypes.func.isRequired,
    SaveVideoFunction: PropTypes.func.isRequired,
    DeleteVideo: PropTypes.func.isRequired,
    videos: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories,
    videos: state.videos
})

export default connect(mapStateToProps, {
    GetCategories,
    LoadVideos,
    SaveVideoFunction,
    DeleteVideo
})(UploadVideo)
