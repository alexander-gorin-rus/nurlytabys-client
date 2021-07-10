import React, { Profiler, useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types';
import { GetCategories } from '../../redux/actions/categories';
import { connect } from 'react-redux';


const Main = ({ categories: {categories}, GetCategories }) => {

    useEffect(() => {
        GetCategories()
    },[GetCategories]);

    return (
        <Fragment>
            <div>
                <div className="custom_navigation_abs">
               
                    <div className="custom_navigation_rel">
                        <ul className='ul_navigation'>
                            {categories.map((category, index) => (
                                <li className="li_navigation" key={index}>{category.name}</li>
                            ))}
                        </ul>
                        <p className="main_page_navigation">Навигация</p>
                        
                    </div>
                </div>   
            </div>   
        </Fragment>
          
    )
}

Main.propTypes = {
    GetCategories: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    categories: state.categories
})

export default connect(mapStateToProps,{
    GetCategories
})(Main)
