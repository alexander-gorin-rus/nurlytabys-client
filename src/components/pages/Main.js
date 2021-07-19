import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {MainPageInfoShow} from '../../redux/actions/main_page_info';
import { GetCategories } from '../../redux/actions/categories';

const Main = ({
    MainPageInfoShow,
    main_page_info: {main_page_info, loading},
    categories: {categories}, GetCategories
}) => {

    useEffect(() => {
        MainPageInfoShow()
    },[]);

    useEffect(() => {
        GetCategories()
    },[GetCategories]);
    
    return (
        <div style={{position: "absolute", top: "0%", left: "0%"}}>
            {loading ? (
                <Fragment>
                    <h3 className="text-center">Строительная компания "Нурлы Табыс"</h3>
                </Fragment>
            ) : (
                <Fragment>
                    {main_page_info && main_page_info.video.map((v, index) =>
                        <div key={index} className="main-page-video-div">
                            <video className="main-page-video-video" autoPlay loop muted 
                                src={`http://localhost:5003/${v.filePath}`}
                            >     
                            </video>
                            <div className="main-page-content-div-absolute">
                                <div className="main-page-title">
                                    <h4 className="text-center p-5">{v.title}</h4>
                                </div>
                                <div className="main-page-companyInfo">
                                    <p>{v.companyInfo}</p>
                                </div>
                                <p className="main-page-description">{v.description}</p>

                                <p className="main-page-contacts">{v.contacts}</p> 

                                {categories && categories.map((category, index) =>
                                    <div className="main-page-categories" key={index}>
                                        <Link to={`/category/${category.slug}`}>{category.name}</Link>
                                    </div>
                                )}
                            </div>

                    
                               
                               
                 
                        </div>  
                    )}
                </Fragment>
            )}
            
        </div>
    )
}

Main.propTypes = {
    MainPageInfoShow: PropTypes.func.isRequired,
    main_page_info: PropTypes.object.isRequired,
    GetCategories: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    main_page_info: state.main_page_info,
    categories: state.categories
})

export default connect(mapStateToProps, {
    MainPageInfoShow,
    GetCategories
})(Main)





// filePath: "uploads/1626422495966_small-mech1.mp4"

// filePath: "uploadsMainPageInfo/1626626365772_Advertizement2.mp4"