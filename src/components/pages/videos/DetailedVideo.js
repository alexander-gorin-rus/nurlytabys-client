import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { GetDetailedVideo } from '../../../redux/actions/videos';
import { connect } from 'react-redux';
import ImagesSlider from '../../forms/ImagesSlider';

const DetailedVideo = ({
    GetDetailedVideo,
    videos: {detailed_info},
    match
}) => {

    const {slug} = match.params

    useEffect(() => {
        GetDetailedVideo(slug)
    },[]);

    return (
        <Fragment>
        {detailed_info && detailed_info.video ? (
            <div style={{position: 'relative', left: "0vw", marginTop: "15vh", width: "80vw"}}>
                <div className='row'>
                    <div col='col'>
                        {detailed_info.video && detailed_info.video.filePath === "" ? (
                            <div>
                                <ImagesSlider images={detailed_info.video.images}/>
                            </div>
                        ) :
                        (
                            <>
                                <video style={{width: '80vw'}}  
                                    src={`http://localhost:5003/${detailed_info.video.filePath}`} controls>
                                </video>
                                <div className='col'>
                                    <p>{detailed_info.video.description}</p>
                                </div>
                            </>
                        )
                        }
                        
                    </div>
               
                </div>
            </div>
        ) : (
            <h3 style={{
                position: "relative", 
                textAlign: "center", 
                marginTop: "35vh", 
                left: "20vw", 
                width: "60vw"
                }}>Загружаю...
            </h3>
        )}
        </Fragment>
    )
}

DetailedVideo.propTypes = {
    GetDetailedVideo: PropTypes.func.isRequired,
    videos: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    videos: state.videos
})

export default connect(mapStateToProps, {
    GetDetailedVideo
})(DetailedVideo)


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';


// const DetailedVideo = ({ match }) => {

//     const {slug} = match.params;
//     const { id } = useParams()

//     const [Video, setVideo] = useState([])
//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API}/getVideo/${slug}`)
//             .then(res => {
//                 if(res.data.success){
//                     console.log(res.data.video)
//                     setVideo(res.data.video)
//                 }else{
//                     alert('error in fetching data');
//                 }
//             })
//     },[]);

//     return (
//         <div style={{position: 'relative', left: "10vw", marginTop: "15vh", width: "80vw"}}>
//             <div className='row'>
//                 <div col='col'>
//                     <video style={{width: '80vw'}}  
//                         src={`http://localhost:5003/${Video.filePath}`} controls>
//                     </video>
//                 </div>
//                 <div className='col'>
//                     <p>{Video.description}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DetailedVideo
