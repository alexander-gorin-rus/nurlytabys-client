import React from 'react';
import { Carousel } from 'antd';

const  ImagesSlider= (props) => {
    return (
        <div className="main-page-video-video">
            <Carousel autoplay>
                {props.images.map((i, index) => (
                    <div style={{ width: "100vw", height: "100vh"}} key={index}>
                        <img style={{ width: "100vw", height: "100vh"}} src={`http://localhost:5003/${i}`} alt="info about company" />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImagesSlider
