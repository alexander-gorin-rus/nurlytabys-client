// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Category = ({ match }) => {

//     const [category, setCategory] = useState({});
//     const [Videos, setVideos] = useState([]);

//     const {slug} = match.params

//     const getOneCategory = (slug) => {
        
//         axios.get(`${process.env.REACT_APP_API}/category/${slug}`)
//             .then(res => {
//                 setCategory(res.data.category);
//                 setVideos(res.data.videos)
//                 console.log(res.data.videos)
//             });
           
//     }

//     useEffect(() => {
//         getOneCategory(slug);
//     },[]);

    
//     const renderCart = Videos.map((video, index) => {
//         return(
//             <div key={index}>
//                 <Link to={`/video/${video.slug}`}>
//                     <img  className='my-3' src={`http://localhost:5003/${video.thumbnail}`} alt='construction' />
//                     <p className='text-center'>{video.title}</p>
//                 </Link>
//             </div>
//         )})

//     return (
//         <div key={category.id} style={{marginTop: "15vh"}}>
//             <h4 className="text-center text-primary">{category.name}</h4>
//             <div className='container'>
//                 <div className="row">
//                     <div className="col-sm">
//                         <p className="text-danger">{category.description}</p>
//                     </div>
//                     <div className='col-sm'>
//                         {renderCart}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Category




import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
//import axios from 'axios';
import { GetOneCategory } from '../../../redux/actions/categories';
import { connect } from 'react-redux';
import Aos from 'aos';
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

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
                <video className="main-page-video-video" autoPlay loop muted 
                    src={`http://localhost:5003/${load_category.category.filePath}`}
                >     
                </video>
                <div className="main-page-content-div-absolute">

                <div data-aos="fade-zoom-in" className=" d-flex justify-content-center">
                    <h4 className="text-center p-5 main-page-title">{load_category.category.name}</h4>
                </div> 
                <p  data-aos="flip-right" className="main-page-description">{load_category.category.description}</p> 
                {load_category && load_category.videos.map((v, index) =>
                    <div data-aos="fade-down-right" className="main-page-categories d-flex" key={index}>
                        <Link to={`/video/${v.slug}`}>
                            <img  className='my-3' src={`http://localhost:5003/${v.thumbnail}`} alt='construction' />
                            <p className='text-center'>{v.title}</p>
                        </Link>
                    </div>
                )}        
                </div>
            </div>
            ) 
            : 
            (<h3 style={{position: "relative", textAlign: "center", marginTop: "35vh", left: "20vw", width: "60vw"}}>Загружаю...</h3>)}
        </Fragment>
    )
}

Category.propTypes = {
    GetOneCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories
})

export default connect(mapStateToProps, {
    GetOneCategory
})(Category)

