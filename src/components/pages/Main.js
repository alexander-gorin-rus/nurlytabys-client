import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {MainPageInfoShow} from '../../redux/actions/main_page_info';

const Main = ({
    MainPageInfoShow,
    main_page_info: {main_page_info, loading}
}) => {

    useEffect(() => {
        MainPageInfoShow()
    },[])
    return (
        <div>
            {loading ? (
                <Fragment>
                    <div>sdfsdfsdfsdfsgfhfghdfghdfghdfghdfghdfghdfghdf</div>
                </Fragment>
            ) : (
                <Fragment>
                    {main_page_info && main_page_info.video.map((v, index) => 
                        <div key={index} className="main-page-video-div">
                        <video className="main-page-video-video" autoPlay loop muted 
                        
                        src={`http://localhost:5003/${v.filePath}`}>     
                        </video>
                    </div>
                )}
                </Fragment>
            )}
            
        </div>
    )
}

Main.propTypes = {
    MainPageInfoShow: PropTypes.func.isRequired,
    main_page_info: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    main_page_info: state.main_page_info
})

export default connect(mapStateToProps, {
    MainPageInfoShow
})(Main)



