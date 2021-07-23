import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';


const DetailedVideo = ({ match }) => {

    const {slug} = match.params;
    const { id } = useParams()

    const [Video, setVideo] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/get-video/${id}`)
            .then(res => {
                if(res.data.success){
                    console.log(res.data.video)
                    setVideo(res.data.video)
                }else{
                    alert('error in fetching data');
                }
            })
    },[]);

    return (
        <div className="container-fluid">
            <div className='row'>
                <div col='col'>
                    <video style={{width: '80vw'}}  
                        src={`http://localhost:5003/${Video.filePath}`} controls>
                    </video>
                </div>
                <div className='col'>
                    <p>{Video.description}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailedVideo
