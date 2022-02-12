import React from 'react';
import { Carousel } from 'antd';
import styles from './ImagesSlider.module.css';

const  DetailedImagesSlider= ({images}) => {
    return (
        <Carousel autoplay>
            {images.map((i, index) => (
                <div key={index}>
                    <img className={styles.detailed_images} src={`${i}`} alt="detailed info" />
                </div> 
            ))}
        </Carousel> 
    )
}

export default DetailedImagesSlider
