import React from 'react';

import { Carousel } from 'antd';

const  ImagesSlider= (props) => {
    return (
        <Carousel autoplay>
            {props.images.map((i, index) => (
                <div key={index}>
                    <img style={{ width: "100vw", height: "100vh"}} src={`http://localhost:5003/${i}`} alt="info about company" />
                </div> 
            ))}
        </Carousel> 
    )
}

export default ImagesSlider
