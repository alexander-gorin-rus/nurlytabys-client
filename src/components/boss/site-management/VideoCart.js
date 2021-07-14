import React from 'react'

const VideoCart = ({videos}) => {

    // const handleChange = e => {

    // }
    return (
        <div>
            {videos &&
            videos.map((c, index) =>
                <div key={index} className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div >
                                <img alt='construction' src={`http://localhost:5003/${c.thumbnail}`} />
                                <p>{c.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default VideoCart
