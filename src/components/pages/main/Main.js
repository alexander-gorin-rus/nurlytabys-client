import React, { useEffect, Fragment } from 'react';
import styles from './Main.module.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Aos from 'aos';
import "aos/dist/aos.css";
//import SliderCarousel from '../../forms/SliderCarousel';
import { GetCategories } from '../../../redux/actions/categories';
import {MainPageInfoShow} from '../../../redux/actions/main_page_info';
//import ImagesSlider from '../../forms/ImagesSlider';
import backVideo from '../../../video/pexels3.mp4'

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
        <div className={styles.main_div}>
            {loading ? (
                <div className={styles.main_page_div}>
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
                           

                    <video className="main-page-video-video" autoPlay loop muted 
                        src={backVideo}>     
                    </video>
                    <div className={styles.main_page_content_div_absolute}>
                        <div data-aos="fade-zoom-in" className=" d-flex justify-content-center">
                            <h4 className={styles.main_page_title}>{v.title}</h4>
                        </div>
                                
                        <div data-aos="flip-left" className={styles.main_page_companyInfo}>
                            <p>{v.companyInfo}</p>
                        </div>
                        <p  data-aos="flip-right" className={styles.main_page_description}>{v.description}</p>

                        <p data-aos="fade-up-left" className={styles.main_page_contacts}>{v.contacts}</p>
                        
                        {categories && categories.map((category, index) =>
                            <div data-aos="fade-zoom-in" className={styles.main_page_categories} key={index}>
                                <Link to={`/category/${category.slug}`}>{category.name}</Link>
                            </div>
                        )}
                        <div data-aos="flip-left" className={styles.main_page_partners}>
                            <p>Наши партнеры:</p>
                                <ul>
                                    <li>ТОО "Ақ Шаһар ltd"</li>
                                    <hr/>
                                    <li>ТОО "Арт Климат"</li>
                                    <hr/>
                                    <li>ТОО "Каз вент Курылыс"</li>
                                    <hr/>
                                    <li>ТОО "Завод ЖБИ - 5"</li>
                                    <hr/>
                                    <li>ТОО "Antey"</li>
                                    <hr/>
                                    <li>ТОО "Проект Инжиниринг"</li>
                                    <hr/>
                                    <li>ТОО "Kristal Stroy"</li>
                                    <hr/>
                                    <li>ТОО «KAZ BUILD COMPANY» Завод металлических конструкций</li>
                                    <hr/>
                                    <li>ТОО "РК Метиз"</li>
                                </ul>    
                            </div> 
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
