import React from 'react';

import { Carousel } from 'antd';

const  DetailedImagesSlider= (props) => {
    return (
        <Carousel autoplay>
            {props.images.map((i, index) => (
                <div key={index}>
                    <img className='detailed_image' src={`http://localhost:5003/${i}`} alt="info about company" />
                </div> 
            ))}
        </Carousel> 
    )
}

export default DetailedImagesSlider
