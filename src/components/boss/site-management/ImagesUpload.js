//This component is used in UploadVideo, MainPageInfo pages

import React from 'react';
import Dropzone from 'react-dropzone';

function ImagesUpload() {

    const onDrop = () => {

    }

    return (
        <div style={{position: "relative", marginTop: "15vh"}}>
            <Dropzone
                onDrop={onDrop}
                multiple={true}
                maxSize={800000000}
            >
                {({getRootProps, getInputProps}) => (
                    <div style={{width: "300px", height: "240px", border: "1px solid lightgrey", display: "flex", alignItems: "center", justifyContent: 'center'}}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <h4 className="text-center">Выбрать изображение</h4>
                    </div>
                )}
            </Dropzone>
            
        </div>
    )
}

export default ImagesUpload
