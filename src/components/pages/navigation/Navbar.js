import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { GetCategories } from '../../../redux/actions/categories';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ categories: {categories}, GetCategories }) => {

    useEffect(() => {
        GetCategories()
    },[GetCategories]);

    const reload = () => {
        window.location.reload()
    }

    return (
        <Fragment>
            <div>
                <div className="custom_navigation_abs">
                    <div className="custom_navigation_rel">
                        <ul className='ul_navigation'>
                            {categories.map((category, index) => (
                                <li className="li_navigation" key={index} onClick={reload} ><Link to={`/category/${category.slug}`}>{category.name}</Link></li>
                            ))}
                        </ul>
                        <p className="main_page_navigation">Навигация</p> 
                    </div>
                </div>   
            </div>   
        </Fragment>
          
    )
}

Navbar.propTypes = {
    GetCategories: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories
})

export default connect(mapStateToProps,{
    GetCategories
})(Navbar)
