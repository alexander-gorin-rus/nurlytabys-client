mport React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { GetDetailedVideo } from '../../../redux/actions/videos';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import styles from './DetailedInfo.module.css';
import main_styles from '../main/Main.module.css';
import DetailedImagesSlider from '../../forms/DetailedImagesSlider';

const DetailedVideo = ({
    GetDetailedVideo,
    videos: {detailed_info},
    match
}) => {

    const {slug} = match.params

    useEffect(() => {
        GetDetailedVideo(slug)
    },[GetDetailedVideo, slug]);

    return (
        <Fragment>
        {detailed_info && detailed_info.video ? (
            <div className={styles.detailed_info_main_div}>
                {detailed_info && detailed_info.video.filePath === "" ? 
                    (
                        <div className={styles.detailed_info_main}>
                            <div className={styles.detailed_info_video}>
                                <DetailedImagesSlider images={detailed_info.video.images}/>
                            </div>
                            <p className={styles.detailed_info_description}>{detailed_info.video.description}</p>
                        </div>
                    ) :
                    (
                        <>
                            <video style={{width: '80vw'}}  
                                src={`http://localhost:5003/${detailed_info.video.filePath}`} controls>
                            </video>
                            <div className={main_styles.main_page_categories}>
                                <p>{detailed_info.video.description}</p>
                            </div>
                        </>
                    )
                }
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
