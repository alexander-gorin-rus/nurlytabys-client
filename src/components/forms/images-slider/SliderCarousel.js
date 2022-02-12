import React from 'react';
import { Carousel } from 'antd';


const SliderCarousel = ({ slides }) => {

    return (

        <div className="main-page-video-video">
            <Carousel autoplay>
                {slides.map((image, index) => (
                    <div style={{ width: "100vw", height: "100vh"}} key={index}>
                        <img style={{ width: "100vw", height: "100vh"}} src={image.image} alt="info about company" />
                    </div> 
                ))}
            </Carousel>
        </div>
    );
};

export default SliderCarousel;