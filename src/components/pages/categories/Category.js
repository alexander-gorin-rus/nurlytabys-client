import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
//import axios from 'axios';
import { GetOneCategory } from '../../../redux/actions/categories';
import { connect } from 'react-redux';
import Aos from 'aos';
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import ImagesSlider from '../../forms/images-slider/ImagesSlider';
import Spinner from '../../layout/Spinner'
import main_styles from '../main/Main.module.css'
import styles from './Category.module.css'

const Category = ({ 
    categories: {load_category}, 
    GetOneCategory, 
    match }) => {

    const {slug} = match.params

        console.log(load_category)
    useEffect(() => {
        GetOneCategory(slug);
    },[GetOneCategory, slug]);

    useEffect(() => {
        Aos.init({duration: 2000});
    },[]);

    return (
        <Fragment>
        {load_category && load_category.category ? 
        (
        <>
            <div className={styles.images_slider}>
                {load_category.category && load_category.category.filePath === "" ? 
                    (
                        <ImagesSlider className={styles.images_slider} images={load_category.category.images}/>
                    ) 
                        : 
                    (
                        <video className={main_styles.main_page_video_video} autoPlay loop muted 
                            src={`http://localhost:5003/${load_category.category.filePath}`}
                        >     
                        </video>
                    )    
                }  
            </div>
            <div className={main_styles.main_page_content_div_absolute}>
            <h4 className={main_styles.main_page_title}>{load_category.category.name}</h4>
           
            <p  data-aos="flip-left" className={styles.category_description}>{load_category.category.description}</p> 

            {load_category && load_category.videos.map((v, index) =>
                <Link to={`/detailed-info/${v.slug}`}>
                    {console.log(v)}
                    <div data-aos="fade-down-right" className={main_styles.main_page_categories} key={index}>
                    <p>{v.title}</p>
                        {v.filePath === "" ? 
                        (    
                            <img className='image-card-content' src={`http://localhost:5003/${v.images[0]}`}  alt="card" />      
                        ) : 
                        (
                            <img className="my-3" src={`http://localhost:5003/${v.thumbnail}` } alt="construction" />
                        )
                        }    
                    </div>
                </Link>    
            )}
            </div>       
        </>
        ) 
            : 
        (
            <Spinner />
        )}
        </Fragment>
    )
}

Category.propTypes = {
    GetOneCategory: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories
})

export default connect(mapStateToProps, {
    GetOneCategory
})(Category)



// {load_category.videos.map((image, index) => (
//     <div style={{position: "relative", width: "50vw", height: "50vh"}} key={index}>
//         {/* {JSON.stringify(image)} */}
//         <img style={{position: "relative", width: "30vw", height: "auto"}} src={`http://localhost:5003/${image.images[0]}`}  alt="cool" />
//     </div>
// ))}