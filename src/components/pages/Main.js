import React, { useEffect, Fragment } from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Aos from 'aos';
import "aos/dist/aos.css";

//mport ImagesSlider from '../forms/ImagesSlider';
import { GetCategories } from '../../redux/actions/categories';
import {MainPageInfoShow} from '../../redux/actions/main_page_info';
import SliderCarousel from '../forms/SliderCarousel';
import { ImagesArray } from '../../main-page-images/ImagesArray';

const Main = ({
    MainPageInfoShow,
    main_page_info: {main_page_info, loading},
    categories: {categories}, 
    GetCategories
}) => {

    useEffect(() => {
        MainPageInfoShow()
    },[MainPageInfoShow]);

    useEffect(() => {
        GetCategories()
    },[GetCategories]);
    
    useEffect(() => {
        Aos.init({duration: 2000});
    },[]);
    return (
        <div style={{position: "absolute", top: "0%", left: "0%"}}>
            {loading ? (
                <div style={{position: "relative", marginTop: "20vh", left: "20vw", width: "60vw"}}>
                    <h4 className="text-center">Строительная компания "Нурлы Табыс"</h4>
                </div>
            ) : (
                <Fragment>
                    {main_page_info.video && main_page_info.video.map((v, index) =>
                        <div key={index} className="main-page-video-div">
                            {/* {v.filePath === "" ? 
                                (
                                    <ImagesSlider images={v.images}/>
                                )
                                :
                                (
                                    <video className="main-page-video-video" autoPlay loop muted 
                                    src={`http://localhost:5003/${v.filePath}`}
                                    >     
                                    </video>
                                )
                            } */}
                            
                                <SliderCarousel slides={ImagesArray} />
                        
                            <div className="main-page-content-div-absolute">

                                <div data-aos="fade-zoom-in" className=" d-flex justify-content-center">
                                    <h4 className="text-center p-5 main-page-title">{v.title}</h4>
                                </div>
                                
                                <div data-aos="flip-left" className="main-page-companyInfo">
                                    <p>{v.companyInfo}</p>
                                </div>
                                <p  data-aos="flip-right" className="main-page-description">{v.description}</p>

                                <p data-aos="fade-up-left" className="main-page-contacts">{v.contacts}</p> 

                                {categories && categories.map((category, index) =>
                                    <div data-aos="fade-down-right" className="main-page-categories d-flex" key={index}>
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
