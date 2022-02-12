import React from 'react';
import { Carousel } from 'antd';
import styles from './ImagesSlider.module.css';

const  ImagesSlider= (props) => {
    return (
        <Carousel autoplay>
            {props.images.map((i, index) => (
                <div key={index}>
                    <img 
                        className={styles.images}
                        //style={{ width: "130vw", height: "100vh"}} 
                        // src={`http://localhost:5003/${i}`} 
                        src={`${i}`} 
                        alt="info about company" 
                        />
                </div> 
            ))}
        </Carousel> 
    )
}

export default ImagesSlider
