//This component is used in UploadVideo, MainPageInfo pages

import axios from 'axios';
import React, {useState} from 'react';
import Dropzone from 'react-dropzone';

function ImagesUpload(props) {

    const [Images, setImages] = useState([]);

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        console.log(files)
        formData.append('file', files[0]);

        axios.post(`${process.env.REACT_APP_API}/images-upload`, formData, config)
            .then(res => {
                if(res.data.success){
                    setImages([...Images, res.data.image]);
                    props.refreshFunction([...Images, res.data.image]);
                }else{
                    alert('Не удалось сохранить изображения')
                }
            })
    }

    const clickDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images];
        newImages.splice(currentIndex, 1);

        setImages(newImages);
        props.refreshFunction(newImages);

    }

    return (
        <div style={{position: "relative", marginTop: "15vh", display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={true}
                maxSize={800000000}
            >
                {({getRootProps, getInputProps}) => (
                    <div style={{width: "300px", height: "240px", border: "1px solid lightgrey", display: "flex", alignItems: "center", justifyContent: 'center'}}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <h4 className="text-center">Выбрать изображение</h4>
                    </div>
                )}
            </Dropzone>
            
            <div style={{display: "flex", width: "350px", height: "240px", overflowX: "scroll"}}>
                {Images.map((image, index) => (
                    <div onClick={() => clickDelete(image)} key={index}>
                        <img style={{ minWidth: "300px", width: "350px", height: "240px" }} src={`http://localhost:5003/${image}`} alt='info' />
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default ImagesUpload
