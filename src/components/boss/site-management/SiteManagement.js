import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SiteManagement = props => {
    return (
        <div className='container mt-5 bg-info'>
            <div className='row pt-5'>
                <div className='col-6'>
                    <Link className='link-text-color' to='/upload-video'>Создать видео</Link>
                </div>
                <div className='col-6'>
                <Link className='link-text-color' to='/create-home-video'>Создать информацию для главной страницы</Link>
                </div>
            </div>
            <div className='row pt-5 pb-5'>
                <div className='col-6'>
                    <Link className='link-text-color' to='/categories'>Создать категории</Link>
                </div>
                <div className='col-6'>
                <Link className='link-text-color' to='/create-contacts'>Создать контакты</Link>
                </div>
            </div>
        </div>
    )
}

SiteManagement.propTypes = {

}

export default SiteManagement
