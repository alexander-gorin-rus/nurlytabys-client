import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = ({ match }) => {

    const [category, setCategory] = useState({});
    const [Videos, setVideos] = useState([]);

    const {slug} = match.params

    const getOneCategory = (slug) => {
        
        axios.get(`${process.env.REACT_APP_API}/category/${slug}`)
            .then(res => {
                setCategory(res.data.category);
                setVideos(res.data.videos)
                console.log(res.data.videos)
            });
           
    }

    useEffect(() => {
        getOneCategory(slug);
    },[]);

    
    const renderCart = Videos.map((video, index) => {
        return(
            <div key={index}>
                <Link to={`/video/${video.slug}`}>
                    <img  className='my-3' src={`http://localhost:5003/${video.thumbnail}`} alt='construction' />
                    <p className='text-center'>{video.title}</p>
                </Link>
            </div>
        )})

    return (
        <div key={category.id} style={{marginTop: "15vh"}}>
            <h4 className="text-center text-primary">{category.name}</h4>
            <div className='container'>
                <div className="row">
                    <div className="col-sm">
                        <p className="text-danger">{category.description}</p>
                    </div>
                    <div className='col-sm'>
                        {renderCart}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category




// import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types';
// //import axios from 'axios';
// import { GetOneCategory } from '../../../redux/actions/categories';
// import { connect } from 'react-redux';

// const Category = ({ categories: {load_category}, GetOneCategory, match }) => {

//     // const [category, setCategory] = useState({});
//     // const [videos, setVideos] = useState([]);

//     const {slug} = match.params

//     const loadCategory = () => {
//         GetOneCategory(slug);
//     }

//     useEffect(() => {
//         loadCategory();
//     },[]);


//     return (
//         <>
//         <div>
//             { load_category && load_category.category.name === null ? (<h2>Loading</h2>) : (
//                 <div>{`${load_category.category.name}`}</div>
//             )}
//         </div>
//         <h3>OK</h3>
//         </>
//     )
// }

// Category.propTypes = {
//     GetOneCategory: PropTypes.func.isRequired,
//     categories: PropTypes.array.isRequired,
// }

// const mapStateToProps = state => ({
//     categories: state.categories
// })

// export default connect(mapStateToProps, {
//     GetOneCategory
// })(Category)

