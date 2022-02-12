import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetCategories } from '../../../redux/actions/categories';
import styles from './Navigation.module.css'

const Navbar = ({ categories: {categories}, GetCategories }) => {

    useEffect(() => {
        GetCategories()
    },[GetCategories]);

    const reload = () => {
        window.location.reload()
    }

    return (
        <Fragment>
            <div className={styles.custom_navigation_abs}>
                <div className={styles.custom_navigation_rel}>
                    <ul className={styles.ul_navigation}>
                        <li className={styles.li_navigation}><Link to="/">Главная</Link></li>
         
                        {categories.map((category, index) => (
                            <li className={styles.li_navigation} key={index} onClick={reload} ><Link to={`/category/${category.slug}`}>{category.name}</Link></li>
                        ))}
                    </ul>
                    <p className={styles.main_page_navigation}>Навигация</p> 
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
