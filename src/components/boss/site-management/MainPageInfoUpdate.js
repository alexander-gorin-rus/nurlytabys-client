import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { 
    UpdateMainPageInfo,
    GetMainPageInfoById 
} from '../../../redux/actions/main_page_info'
import { Link, useHistory, useParams } from 'react-router-dom';
import ImagesUpload from './ImagesUpload';


const MainPageInfoUpdate = ({
    UpdateMainPageInfo,
    GetMainPageInfoById,
    main_page_info: {main_page_info_by_id}
}) => {

    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        GetMainPageInfoById(id)
    },[GetMainPageInfoById]); 


    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    const [Images, setImages] = useState([]);


    const [values, setValues] = useState({
        title: "",
        companyInfo: "",
        description: "",
        contacts: "",
        filePath: FilePath,
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

    useEffect(() => {
        if(main_page_info_by_id && main_page_info_by_id.info){
            setValues({
                title: main_page_info_by_id.info.title,
                companyInfo: main_page_info_by_id.info.companyInfo,
                description: main_page_info_by_id.info.description,
                contacts: main_page_info_by_id.info.contacts,
                filePath: main_page_info_by_id.info.filePath,
                duration: main_page_info_by_id.info.duration,
                thumbnail: main_page_info_by_id.info.thumbnail,
                images: main_page_info_by_id.info.images
            })
            //console.log(values)
        }
    },[main_page_info_by_id])

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

        UpdateMainPageInfo(id, variables);
        history.push('/main-page-info')
        
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
                    alert('Не удалось сохранить видео')
                }
            })
    }

    const updateImages = (newImages) => {
        //console.log(newImages);
        setImages(newImages)
    }
    return (
        <Fragment>
            <h4 className="text-center" style={{marginTop: "15vh"}}>Изменить информацию для главной страницы</h4>
            <div style={{ maxWidth: '700px', margin: '2rem auto', marginTop: "15vh", marginBottom: "10vh" }}>
            {JSON.stringify(values.images)}
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
                            <img src={`http://localhost:5003/${Thumbnail}`} alt="main page" />
                        </div>
                    }
                </div>

                <div className="form-group">
                    <label>Название компании</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={title}
                        onChange={handleChange}
                        
                    />
                </div>
                    <label>Краткая информация о компании</label>
                <div className="form-group">
                    <input
                        type="text"
                        name="companyInfo"
                        className="form-control"
                        value={companyInfo}
                        onChange={handleChange}
                        
                    />
                </div>
                    <label>Подробная информация о компании</label>
                <div className="form-group">
                    <input
                        type="text"
                        name="description"
                        className="form-control"
                        value={description}
                        onChange={handleChange}
                        
                    />
                </div>
                    <label>Контактная информация</label>
                <div className="form-group">
                    <input
                        type="text"
                        name="contacts"
                        className="form-control"
                        value={contacts}
                        onChange={handleChange}
                        
                    />
                </div>

                <button className="btn btn-outline-info mt-4">Отправить</button>
                <Link className='d-block p-3 mt-4 bg-warning mb-5' to='/main-page-info'>Вернуться на страницу управления главной страницой</Link>
            </form>
            </div>
    </Fragment>
    )
}

MainPageInfoUpdate.propTypes = {
    UpdateMainPageInfo: PropTypes.func.isRequired,
    GetMainPageInfoById: PropTypes.func.isRequired,
    main_page_info: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    main_page_info: state.main_page_info
})

export default connect(mapStateToProps, {
    UpdateMainPageInfo,
    GetMainPageInfoById
})(MainPageInfoUpdate)



