import React from 'react';
import Video from '../../video/Advertisement.mp4'

const Main = () => {
    return (
        <div className="main-page-video-div">
            <video className="main-page-video-video" autoPlay loop muted>
                <source className="main-page-video-source" src={Video} type="video/mp4" />
            </video>
        </div>
    )
}

export default Main
