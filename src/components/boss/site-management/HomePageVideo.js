import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const { Title } = Typography;



const HomePageVideo = props => {
    const [title, setTitle] = useState("");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("")
    
    const handleChangeTitle = ( event ) => {
        setTitle(event.currentTarget.value);
    }

    const onSubmit = () => {
        
    }

    const onDrop = ( files ) => {
        let formData = new FormData();
        const config = {
            header: {
                'Content-Type': 'multipart/form-data'
            }
        }
        console.log(files)
        formData.append('file', files[0]);

        axios.post(`${process.env.REACT_APP_API}/video-download`, formData, config)
            .then(res => {
                if(res.data.success){
                    let variable = {
                        filePath: res.data.filePath,
                        fileName: res.data.fileName
                    }
                    setFilePath(res.data.filePath);

                    //generate thumbnail with this file
                    axios.post(`${process.env.REACT_APP_API}/video-thumbnail`, variable)
                        .then(res => {
                            if(res.data.success) {
                                //setDuration(res.data.fileDuration),
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
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={5} >Загрузить видео для главной страницы</Title>
        </div>

        <Form onSubmit={onSubmit}>
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
                            <h1>X</h1>

                        </div>
                    )}
                </Dropzone>

                {Thumbnail !== "" &&
                    <div>
                        <img src={`${process.env.REACT_APP_API}/video-thumbnail`} alt="haha" />
                    </div>
                }
            </div>

            <br /><br />
            <label>Название видео</label>
            <Input
                 onChange={handleChangeTitle}
                 value={title}
                 placeholder='название видео'
            />
            <br />
        
            <Button type="primary" size="large" onClick={onSubmit}>
                Загрузить
            </Button>

        </Form>
    </div>
    )
}

HomePageVideo.propTypes = {

}

export default HomePageVideo
