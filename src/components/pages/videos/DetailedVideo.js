import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { GetDetailedVideo } from '../../../redux/actions/videos';
import { connect } from 'react-redux';
import ImagesSlider from '../../forms/ImagesSlider';
import Spinner from '../../layout/Spinner';

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
                                <div className='main-page-detailed-video'>
                                    <p>{detailed_info.video.description}</p>
                                </div>
                            </div>
                        ) :
                        (
                            <>
                                <video style={{width: '80vw'}}  
                                    src={`http://localhost:5003/${detailed_info.video.filePath}`} controls>
                                </video>
                                <div className='main-page-categories'>
                                    <p>{detailed_info.video.description}</p>
                                </div>
                            </>
                        )
                        }
                        
                    </div>
               
                </div>
            </div>
        ) : (
            <Spinner />
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
})(DetailedVideo);