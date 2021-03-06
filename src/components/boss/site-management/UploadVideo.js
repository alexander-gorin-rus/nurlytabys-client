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
        LoadVideos();
    },[GetCategories, LoadVideos]);  

    
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    //const [Images, setImages] = useState([])

    const [values, setValues] = useState({
        title: "", 
        filePath: "",
        description: "",
        duration: "",
        categories: [], 
        thumbnail: "",
        category: "",
        images: ""
    });

    const { 
        title,
        description,
        category,
        images
    } = values;

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleCategoryChange = (e) => {
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
            images
        }

        SaveVideoFunction(variables);
        
        setValues({
            title: "", 
            filePath: "",
            description: "",
            duration: "",
            categories: [], 
            thumbnail: "",
            category: "",
            images: ""
        });
        setTimeout(() => {
            LoadVideos()
        },300)
    }

    const onDrop = ( files ) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        console.log(files)
        formData.append('file', files[0]);

        axios.post(`api/v1/video-upload`, formData, config)
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
        if(window.confirm('???? ?????????? ?????????????? ?????????????? ?????? ???????????')){
            DeleteVideo(slug)
        }
        setTimeout(() => {
            LoadVideos()
        },300);
    }


    // const updateImages = (newImages) => {
    //     setImages(newImages)
    // }


    return (
        <Fragment>
            
        
        <div className='main-div-content'>
        <p className="text-center bg-info p-3 app-text-small">???????????????? ???????????????????? ?????????? ?????????????????????? ?? ??????????????????????????</p>

        <form onSubmit={handleSubmit}>
        <ImagesUpload 
            //refreshFunction={updateImages}
        />

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
                            <p className='app-text'>?????????????? ??????????</p>

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
                    name="images"
                    className="form-control"
                    value={images}
                    onChange={handleChange}
                    placeholder="?????????????? ???????? ?? ??????????"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                    placeholder="???????????????? ??????????"
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                    placeholder="?????????? ?? ??????????"
                />
            </div>
            <select
                name="category"
                className="form-control bg-primary text-light"
                onChange={handleCategoryChange}
            >
                <option>?????????????? ??????????????????</option>
                {categories.length > 0 &&
                    categories.map((c) =>
                        <option
                            key={c._id}
                            value={c._id}
                        >{c.name}
                        </option>)
                }
            </select>

            <button className="btn btn-outline-info mt-4 app-text-small">??????????????????</button>
            <Link className='d-block p-3 mt-4 bg-warning app-text-small' to='/site-management'>?????????????????? ???? ???????????????? ???????????????????? ????????????</Link>
        </form>
    </div>
    { videos && videos.length === 0 ? (<h4 className="text-center pb-5">???? ???????? ???? ?????????????? ??????????</h4>
    ) 
        : 
    (
        <>
        <div className='mb-5' style={{marginTop: "15vh"}}>
        <p className='text-center app-text'>?????????????????? ??????????</p>
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
                                <p className='app-text-small'>{c.title}</p>
                    <span className='delete-custom px-3 app-text-small' onClick={() => clickDelete(c.slug)}>
                        ?????????????? ??????????
                    </span>
                    <Link className='app-text-small' to={`update-video/${c._id}`}>???????????????? ??????????</Link>
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
