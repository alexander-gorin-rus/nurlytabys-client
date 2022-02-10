import React from 'react';

import { Carousel } from 'antd';

const  DetailedImagesSlider= (props) => {
    return (
        <Carousel autoplay>
            {props.images.map((i, index) => (
                <div key={index}>
                    {console.log(i)}
                    <img className='detailed_image' src={`http://nurlytabys.kz/${i}`} alt="detailed info" />
                </div> 
            ))}
        </Carousel> 
    )
}

export default DetailedImagesSlider
