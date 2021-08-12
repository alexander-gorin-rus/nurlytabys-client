import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
//import axios from 'axios';
import { GetOneCategory } from '../../../redux/actions/categories';
import { connect } from 'react-redux';
import Aos from 'aos';
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import ImagesSlider from '../../forms/ImagesSlider';

const Category = ({ 
    categories: {load_category}, 
    GetOneCategory, 
    match }) => {

    const {slug} = match.params


    useEffect(() => {
        GetOneCategory(slug);
    },[]);

    useEffect(() => {
        Aos.init({duration: 2000});
    },[]);

    return (
        <Fragment>
        {load_category && load_category.category ? (
            <div className="main-page-video-div">
                {load_category.category && load_category.category.filePath === "" ? (
                    <ImagesSlider images={load_category.category.images}/>
                ) 
                    : 
                (
                    <video className="main-page-video-video" autoPlay loop muted 
                        src={`http://localhost:5003/${load_category.category.filePath}`}
                    >     
                    </video>
                )    
            }
               
                <div className="main-page-content-div-absolute">

                <div data-aos="fade-zoom-in" className=" d-flex justify-content-center">
                    <h4 className="text-center p-5 main-page-title">{load_category.category.name}</h4>
                </div> 
                <p  data-aos="flip-right" className="main-page-description">{load_category.category.description}</p> 

               {load_category && load_category.videos.map((v, index) =>
                    <div data-aos="fade-down-right" className="main-page-categories " key={index}>
                        <p className='text-center text-light'>{v.title}</p>
                        <Link to={`/video/${v.slug}`}>
                            {v.filePath === "" ? 
                            (    
                                <img style={{position: "relative", width: "35vw", height: "auto"}} src={`http://localhost:5003/${v.images[0]}`}  alt="cool" />      
                            ) : 
                            (
                                <img className="my-3" src={`http://localhost:5003/${v.thumbnail}` } alt="construction" />
                            )
                            }
                            {/* <img className="my-3" src={`http://localhost:5003/${v.thumbnail}` } alt="construction" /> */}
                        </Link>
                        
                    </div>
                )}
                </div>
            </div>
            ) 
            : 
            (
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