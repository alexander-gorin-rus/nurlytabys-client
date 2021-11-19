import React from 'react';
import { Carousel } from 'antd';


const EkibastysSliderCarousel = ({ images }) => {
    return (
        <div>
            <Carousel autoplay>
                {images.map((image, index) => (
                    <div className='image-carousel' key={index}>
                        <img style={{ width: "100vw", height: "100vh"}} src={image.image} alt="info about company" />
                    </div> 
                ))}
            </Carousel>
        </div>
    );
};

export default EkibastysSliderCarousel;